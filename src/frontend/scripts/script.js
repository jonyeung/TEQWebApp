
$(document).ready(function() {
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
		      alert("log in error has occured");
		   	},
		   	dataType:"json",
		   	traditional: true,
			success:function(data, status){
				console.log(data);
				console.log(status);
				if(data.result.authenticated){
					alert("Successfully logged in as " + data.result.user.access_level);
				}else{
					alert("Username/password does not match,please try again.")
				}	
			}
		});
		return false;
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
				alert("User creation error");
			},
			dataType:"json",
			traditional: true,
			success:function(data,status){
				if(data.success){
					alert("Registered user with id" + data.result.id);
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
			alert("Error during getUsers");
		},
		dataType:"json",
		traditional:true,
		success:function(data,status){
			if(data.success){
				$(data.result.users).each(function(index){
					var row = '<tr><td>'+this.ID+'</td><td>'+this.username+ '</td><td>'+
					this.currently_logged_in+'</td><td>'+this.access_level+'</td><td>' + 
					generateDropdown(this.ID) + '</td></tr>';

					function generateDropdown(id) {
						var dropdown = '<select class="changeLevelDropdown" id="'+id+'" name="usertype"><option value=""' + 
						'disabled selected>Pick a user type from the dropdown list...</option>' + 
						'<option value="support_agency">Support Agency</option><option value="TEQ_low_level">TEQ Low Level</option>'+
						'<option value="TEQ_mid_level">TEQ Mid Level</option><option value="TEQ_high_level">TEQ High Level</option>'+
						'<option value="UTSC_staff">UTSC Project Staff</option></select>'
						return dropdown;
					}

					$('#userList tr:last').after(row);
				})
			}else{
				console.log("Error in getting data from server.")
			}
		}

	})


	$("button#saveButton").on("click", function(){
		$('.changeLevelDropdown').each(function() {
			if($(this).find('option:selected').text() != "Pick a user type from the dropdown list...") {
				var id = $(this).attr('id')
				var accessLevel = $(this).val();
				console.log(id + accessLevel)
				$.ajax({
					type:"POST",
					url: "https://c01.mechanus.io/changeAccess",
					data: ({
						access_level : accessLevel,
						id: id
					}),
					error: function(){
						alert("User access level update error");
					},
					dataType:"json",
					traditional: true,
					success:function(data,status){
						// console.log(data);
						// console.log(status);
						if(data.success){
							alert("Updated user id: " + data.result.id + " to access level: " + data.result.access_level);
							location.reload();
						}else{
							alert("Could not update user, please select a new access level");
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
		// validate whether file is valid excel file
		var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
        if (regex.test(file.value.toLowerCase())) {
        	//alert("is excel file"); 
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
        	alert("Invalid format, please upload files in excel format (.xls) or (.xlsx)");
        	return;
        }

	});

	function processExcel(data){
		var workbook = XLSX.read(data,{
			type: 'binary'
		});
		// only read the first sheet
		var firstSheet = workbook.SheetNames[0];
		var formType = $("select#templateTypeSelect :selected").val();

		//{range:i} will skip the first i row
		//var excelRows = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheet], {range:1});
		var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet], {range:1});

		for(var i = 1; i < excelRows.length; i++){
			if(excelRows[i] != undefined){
				console.log(excelRows[i]);
				var data = excelRows[i];

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
					}else if(formType == "info_ori"){
						data["preferred_official_lang_id"] = data["service_official_language_id"];
						delete data["service_official_language_id"];
					}else if(formType == "employ_services"){
						data["preferred_official_lang_id"] = data["session_official_lang_id"];
						delete data["session_official_lang_id"];
					}
				}
				data = {"row" : data};
				console.log(data);


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
						// console.log(data);
						// console.log(status);
						if(data.success){
							alert("Data uploaded" );
						}else{
							alert("Could not upload data, please try again");
						}
					}
				})

			}
		}
	}
});