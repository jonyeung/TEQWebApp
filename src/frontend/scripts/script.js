
$(document).ready(function() {
	// user sign-in
	$("button#loginBtn").on("click", function(){

		var username = $("#loginUsername[name=username]").val();
		var password = $("#loginPassword[name=password]").val();
		console.log(username+password);
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
					alert("Successfully logged in");
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
		var accessLevel = $("select#userTypeSelect").val();
		console.log(username+ " " + password+ "Access: " + accessLevel);

		$.ajax({
			type:"POST",
			url:"https://c01.mechanus.io/user",
			data: ({
				username : username,
				password : password,
				access_level : "TEQ_mid_level"
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

});