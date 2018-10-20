
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
				console.log(data);
				console.log(status);
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
					console.log(this.ID + this.username);
					var row = '<tr><td>'+this.ID+'</td><td>'+this.username+ '</td><td>'+
					this.currently_logged_in+'</td><td>'+this.access_level+'</td></tr>'
					$('#userList tr:last').after(row);
				})
			}else{
				console.log("Error in getting data from server.")
			}
		}

	})
});