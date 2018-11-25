$(document).ready(function() {

	$(window).on("load", function() {
		// If there is no valid user signed in, then redirect to login
		if(($(".loginDiv").length <= 0) && (sessionStorage.userLevel == null)) {
			alert("Please sign in to a valid account.");
			document.location.href = "index.html";
		}

	});

	// user sign-in
	$("button#loginBtn").on("click", function(){
		var username = $("#loginUsername[name=username]").val();
		var password = $("#loginPassword[name=password]").val();

		$.ajax({
			type:"GET",
			url: "https://c01.mechanus.io/authenticate",
			data: ({
				username : username,
				password : password}),
			error: function() {
		      alert("Log in error has occured.");
		   	},
		   	dataType:"json",
		   	traditional: true,
			success:function(data, status){
				if(data.result.authenticated){
					window.location.href = "dashboard.html";
					sessionStorage.setItem("username", username.toString());
					sessionStorage.setItem("userLevel", (data.result.user.access_level).toString());
				}else{
					alert("Username/password does not match, please try again.")
				}
			}
		});
		return false;
	});

	// logout, clears session data
	$("button#logoutBtn").on("click", function(){
		sessionStorage.clear();
	});

	// register users
	$("button#registerBtn").on("click", function(){
		var username = $("#regUsername[name=username]").val();
		var password = $("#regPassword[name=password]").val();
		var accessLevel = $("select#userTypeSelect :selected").val();

		$.ajax({
			type:"POST",
			url:"https://c01.mechanus.io/user",
			data: ({
				username : username,
				password : password,
				access_level : accessLevel
			}),
			error: function(){
				alert("User creation error.");
			},
			dataType:"json",
			traditional: true,
			success:function(data,status){
				if(data.success){
					alert("Registered user with id" + data.result.id + ".");
				}else{
					alert("Register failed, username already exists.")
				}
			}
		})
		return false;
	});

	// call getUsers from server and populate user list to a table
	$.ajax({
		type:"GET",
		url:"https://c01.mechanus.io/user",
		error: function(){
			alert("Error in getting data from server.");
		},
		dataType:"json",
		traditional:true,
		success:function(data,status){
			if(data.success){
				$(data.result.users).each(function(index){
					var row = '<tr><td>'+this.ID+'</td><td>'+this.username+ '</td><td>'+
					this.currently_logged_in+'</td><td>'+this.access_level+'</td><td>' +
					generateDropdown(this.ID) + '</td></tr>';
					$('#userList tr:last').after(row);
				})
			}else{
				console.log("Error in getting data from server.")
			}
		}

	})

	// save button function
	$("button#saveButton").on("click", function(){
		$('.changeLevelDropdown').each(function() {
			if($(this).find('option:selected').text() != "Pick a user type from the dropdown list...") {
				var id = $(this).attr('id')
				var accessLevel = $(this).val();
				$.ajax({
					type:"POST",
					url: "https://c01.mechanus.io/changeAccess",
					data: ({
						access_level : accessLevel,
						id: id
					}),
					error: function(){
						alert("User access level update error.");
					},
					dataType:"json",
					traditional: true,
					success:function(data,status){
						if(data.success){
							alert("Updated user id: " + data.result.id + " to access level: "
							 + data.result.access_level + ".");
							location.reload();
						}else{
							alert("Could not update user, please select a new access level.");
						}
					}
				})
			}
		})
	});

	// upload data function
	$("button#uploadButton").on("click", function(){
		var file = $("input#uploadedFile")[0];
		var result = {};
		if($("select#templateTypeSelect :selected").val() == ""){
			alert("Please select a template type.");
		} else {
			// validate whether file is valid excel file
			var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
			if (regex.test(file.value.toLowerCase())) {
				var reader = new FileReader();
				if (reader.readAsBinaryString) {
					reader.onload = function (e) {
						processExcel(e.target.result);
					};
					reader.readAsBinaryString(file.files[0]);
				} else {
					//For IE Browser.
					reader.onload = function (e) {
						var data = "";
						var bytes = new Uint8Array(e.target.result);
						for (var i = 0; i < bytes.byteLength; i++) {
							data += String.fromCharCode(bytes[i]);
						}
						processExcel(data);
					};
					reader.readAsArrayBuffer(file.files[0]);
				}
			}else{
				alert("Invalid format, please upload files in excel format (.xls) or (.xlsx).");
			}
		}
		return;
	});

	function processExcel(data){
		var workbook = XLSX.read(data,{
			type: 'binary'
		});
		// only read the first sheet
		var firstSheet = workbook.SheetNames[0];
		var formType = $("select#templateTypeSelect :selected").val();

		//{range:i} will skip the first i row
		var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet], {range:1});

		for(var i = 1; i < excelRows.length; i++){
			if(excelRows[i] != undefined){
				var data = excelRows[i];

				data = cleanData(data, formType);
				data = {"row" : data};

				$.ajax({
					type:"POST",
					url: "https://c01.mechanus.io/insertRow",
					data: JSON.stringify(data),
					error: function(){
						alert("Excel processing is unsuccessful.");
					},
					dataType:"json",
					contentType:"application/json",
					traditional: true,
					success:function(data,status){
						if(data.success){
							alert("Data uploaded." );
						}else{
							alert("Could not upload data, please try again.");
						}
					}
				})

			}
		}
	}

	// save the selected columns function
	$("button#saveQueryButton").on("click", function(){
		var query_name = $("input#saveQueryName").val();
		if (query_name == "") {
			alert("Please enter a name for the query.")
			return;
		} else if (selectedFilters.length < 1) {
			alert("Please select at least 1 column to query.")
			return;
		}

		$.ajax({
			type:"POST",
			url:"https://c01.mechanus.io/saveQuery",
			data: ({
				query_name : query_name,
				column_list : selectedFilters,
				traditional: true
			}),
			error: function(){
				alert("Query saving error.");
			},
			dataType:"json",
			traditional: true,
			success:function(data,status){
				if(data.success){
					alert(query_name + " has sucessfully been saved.");
				}else{
					alert("Query saving failed, please try again.")
				}
			}
		})
		return false;

	});

	// change current user password function
	$("button#changePasswordBtn").on("click", function(){
		const currentUsername = sessionStorage.getItem("username");
		var inputUsername = $("#changePassUsername[name=username]").val();
		var oldPassword = $("#oldPassword[name=oldPassword]").val();
		var newPassword = $("#newPassword[name=newPassword]").val();

		// check empty fields
		if (inputUsername == "" || oldPassword == "" || newPassword == "") {
			alert("Fields cannot be empty.");
			return false;
		// check if entered username is the current username
		} else if(currentUsername != inputUsername) {
			alert("Current username mismatch. Please enter your current username.");
			return false;
		}

		$.ajax({
			type:"POST",
			url:"https://c01.mechanus.io/changePassword",
			data: ({
				username : inputUsername,
				oldPW : oldPassword,
				newPW : newPassword
			}),
			error: function(){
				alert("Password changing error.");
			},
			dataType:"json",
			traditional: true,
			success:function(data,status){
				if(data.success){
					if(data.result.rowChanged == 1) {
						alert(data.result.username + "'s password has sucessfully been changed.");
						location.reload();
					} else {
						alert("Password unchanged. Please enter the correct current username and password.");
					}
				}else{
					alert("Change password failed, please try again.")
				}
			}
		})
		return false;
	});

});

// Call get logs from server, and insert onto the page.
$.ajax({
	type:"GET",
	url:"https://c01.mechanus.io/logs",
	error: function(){
		alert("Error in getting historical logs from server.");
	},
	dataType:"json",
	traditional:true,
	success:function(data,status){
		if(data.success){
			$(data.result).each(function(index){
				var row = '<tr><td>'+this[0]+'</td><td>'+this[1]+ '</td><td>'+
				this[2]+'</td></tr>';
				$('#historicalLogTable tr:last').after(row);
			})
		}else{
			console.log("Error in getting historical logs from server.");
		}
	}

});

// Cleans data from Excel file by keeping it consistent with columns in db
function cleanData(data, formType){
	for (var key in data){
		if(data[key] == "Yes"){
			data[key] = 1;
		}else if (data[key] == "No"){
			data[key] = 0;
		}
		if(formType == "profile"){
			data["preferred_official_lang_id"] = data["official_language_id"];
			delete data["official_language_id"];
		}else if(formType == "needs_access"){
			data["preferred_official_lang_id"] = data["preferred_official_language_id"];
			delete data["preferred_official_language_id"];
			data["service_lang_id"] = data["assessment_language_id"];
			delete data["assessment_language_id"];
			delete data["childminding_required_ind"];
			delete data["transportation_required_ind"];
			delete data["support_disability_required_ind"];
			delete data["translation_required_ind"];
			delete data["interpretation_required_ind"];
			delete data["counselling_required_ind"];
		}else if(formType == "info_ori"){
			data["preferred_official_lang_id"] = data["service_official_language_id"];
			delete data["service_official_language_id"];
			data["service_lang_id"] = data["service_language_id"];
			delete data["service_language_id"];
			data["assessment_referral_id"] = data["service_referred_by_id"];
			delete data["service_referred_by_id"];
			data["training_received_life_skills_ind"] = data["essential_skill_life_ind"];
			delete data["essential_skill_life_ind"];
		}else if(formType == "employ_services"){
			data["preferred_official_lang_id"] = data["session_official_lang_id"];
			delete data["session_official_lang_id"];
			data["service_lang_id"] = data["session_service_lang_id"];
			delete data["session_service_lang_id"];
		}else if(formType == "lt_setup"){
			data["transportation_ind"] = data["available_transportation_ind"];
			delete data["available_transportation_ind"];
			data["childminding_ind"] = data["available_childminding_ind"];
			delete data["available_childminding_ind"];
			data["support_disablility_ind"] = data["available_support_disability_ind"];
			delete data["available_support_disability_ind"];
		}
	}
	return data;
}

// generate dropdown to change access level for getUser page
function generateDropdown(id) {
	var dropdown = '<select class="changeLevelDropdown" id="'+id+'" name="usertype"><option value=""' +
			'disabled selected>Pick a user type from the dropdown list...</option>' +
			'<option value="support_agency">Support Agency</option><option value="TEQ_low_level">TEQ Low Level</option>'+
			'<option value="TEQ_mid_level">TEQ Mid Level</option><option value="TEQ_high_level">TEQ High Level</option>'+
			'<option value="UTSC_staff">UTSC Project Staff</option></select>';
	return dropdown;
}

// Runs everytime the Dashboard page is loaded.
$(window).on("load", function() {
	if($("#dashboardCenter").length > 0) {
		setDashboard(sessionStorage.getItem("userLevel"));
	}
});

// Sets the information displayed on the dashboard based on userlevel.
function setDashboard(userLevel) {
		var map = {};
		map["support_agency"] = "Support Agency";
		map["TEQ_low_level"] = "TEQ Low Level";
		map["TEQ_mid_level"] = "TEQ Mid Level";
		map["TEQ_high_level"] = "TEQ High Level";
		map["UTSC_staff"] = "UTSC Project Staff";
		var levelName = map[userLevel];
		if (typeof levelName == "undefined") {
			alert("Error: User type is not supported, please sign in with a valid account.");
			document.location.href = "index.html";
		}
		$("#loggedInAccessLevel").text("You are logged in as a: " + levelName);
		// If the user is a support agency staff then only allow upload.
		if (userLevel == "support_agency") {
			$("#queryDataBtn").prop('disabled', true);
			$("#registerUserBtn").prop('disabled', true);
			$("#changeUserBtn").prop('disabled', true);
			$("#viewLogsBtn").prop('disable', true);
			$("#queryDataBtn").hide();
			$("#registerUserBtn").hide();
			$("#changeUserBtn").hide();
			$("#viewLogsBtn").hide();
		}
		else if (userLevel == "TEQ_low_level" || userLevel == "TEQ_mid_level") {
			$("#registerUserBtn").prop('disabled', true);
			$("#changeUserBtn").prop('disabled', true);
			$("#viewLogsBtn").prop('disable', true);
			$("#registerUserBtn").hide();
			$("#changeUserBtn").hide();
			$("#viewLogsBtn").hide();
		}
		else if (userLevel == "TEQ_high_level") {
			$("#viewLogsBtn").prop('disable', true);
			$("#viewLogsBtn").hide();
		}
		else {
			$("#queryDataBtn").prop('disabled', false);
			$("#registerUserBtn").prop('disabled', false);
			$("#changeUserBtn").prop('disabled', false);
			$("#queryDataBtn").show();
			$("#registerUserBtn").show();
			$("#changeUserBtn").show();
		}
}
