window.onload = function(){
	var register_form = document.getElementById("register-form").onsubmit = function(){return validateFields()};
	document.getElementById("register-form").action = "main.html";
	document.getElementById("register-form").method = "get";
	document.getElementById("login-btn").onclick = login;
}


function validateFields() {
	//Check if passwords match.
	if (document.getElementById("password").value != document.getElementById("password_conf").value) {
		document.getElementById("warning-text").innerHTML = "The password must match the password comfirmation.";
		document.getElementById("warning-text").style = "display:block";
		return false;
	}
	//Check if password starts with a digit.
	var password = document.getElementById("password").value;
	var firstChar = password.charAt(0);
	if (firstChar >= '0' && firstChar <= '9') {
		document.getElementById("warning-text").innerHTML = "The password cannot start with a digit.";
		document.getElementById("warning-text").style = "display:block";
		return false;
	}
	//Validate date of birth.
	var cur = new Date();
	var dob = new Date(document.getElementById("dob").value);
	cur.setFullYear(cur.getFullYear() - 18);
	//If current date - 18 years is earlier than dob, reject the request.
	if (dob > cur) {
		document.getElementById("warning-text").innerHTML = "Please select a valid date of birth. You should be at least 18 years old to be able to register";
		document.getElementById("warning-text").style = "display:block";
		//alert("Please select a valid date of birth. You should be at least 18 years old to be able to register");
		return false;
	}
	//Set time stamp.
	document.getElementById("hidden_time").value = (new Date()).getTime();
	return true;
}

function login() {
	//check if the fields are of the correct format.
	if (!document.getElementById("login_account").checkValidity()){
		console.log("in here")
		document.getElementById("warning-text").innerHTML = "The login account field cannot be empty and should be composed of only letters and numbers."
		document.getElementById("warning-text").style = "display:block";
		return;
	}
	if (!document.getElementById("login_password").checkValidity()){
		document.getElementById("warning-text").innerHTML = "The password field must not be empty."
		document.getElementById("warning-text").style = "display:block";
		return;
	}
	window.location = "main.html";
}