import {resource, navToMain} from '../../actions'
import {initialVisit, updateUsername, registerUser} from './loginActions'
function validateFields(password, password_conf, dob) {
	//Check if passwords match.
	if (password.value != password_conf.value) {
		// document.getElementById("warning-text").innerHTML = "The password must match the password comfirmation.";
		// document.getElementById("warning-text").style = "display:block";
		console.log("password mismatch")
		return false;
	}
	//Check if password starts with a digit.
	var password = password.value;
	var firstChar = password.charAt(0);
	if (firstChar >= '0' && firstChar <= '9') {
		// document.getElementById("warning-text").innerHTML = "The password cannot start with a digit.";
		// document.getElementById("warning-text").style = "display:block";
		console.log("invalid password")
		return false;
	}
	//Validate date of birth.
	var cur = new Date();
	var dob = new Date(dob.value);
	cur.setFullYear(cur.getFullYear() - 18);
	//If current date - 18 years is earlier than dob, reject the request.
	if (dob > cur) {
		// document.getElementById("warning-text").innerHTML = "Please select a valid date of birth. You should be at least 18 years old to be able to register";
		// document.getElementById("warning-text").style = "display:block";
		console.log("Please select a valid date of birth. You should be at least 18 years old to be able to register");
		//alert("Please select a valid date of birth. You should be at least 18 years old to be able to register");
		return false;
	}
	console.log("valid fields!");
	return true;
}

function register(password, password_conf, dob, email, zipcode, username) {
	return (dispatch) => {
		if (validateFields(password, password_conf, dob)) {
			dispatch(registerUser(username, email, zipcode, password))
			console.log("successfully register an user.")
		}
		//do nothing if the form is not correctly filled out.
	}
} 

function login(username, password) {
	//login to the server and update all the fields.
	return (dispatch) => {
		resource("POST", "login", {"username" : username, "password": password})
		.then(r => 
				{
					dispatch({type: 'username', username: r.username});
					dispatch({type: 'password', password})
					dispatch(initialVisit());
					dispatch(clearWarning());
				}
			)
		.catch(r => dispatch(updateWarningText('fail', 
			'Login Failed. Please use valid authorization or register.')))
	}
}

function updateWarningText(state, warningText) {
	return {type: state, warningText: warningText};
}

function clearWarning() {
	//clear the error text message.
	return {type: 'warningText', warningText: ""}
}
export {validateFields, login, updateWarningText, register}
