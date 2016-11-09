import {resource, navToMain} from '../../actions'
import {initialVisit, updateUsername, registerUser} from './loginActions'
function validateFields(password, password_conf, dob) {
	//Check if passwords match.
	if (password.value != password_conf.value) {
		return "Password must match Password Confirmation.";
	}
	//Check if password starts with a digit.
	var password = password.value;
	var firstChar = password.charAt(0);
	if (firstChar >= '0' && firstChar <= '9') {
		return "The password is invalid";
	}
	//Validate date of birth.
	var cur = new Date();
	var dob = new Date(dob.value);
	cur.setFullYear(cur.getFullYear() - 18);
	//If current date - 18 years is earlier than dob, reject the request.
	if (dob > cur) {
		return "Please select a valid date of birth." +
			" You should be at least 18 years old to register";
	}
	return "";
}

function register(password, password_conf, dob, email, zipcode, username) {
	return (dispatch) => {
		const message = validateFields(password, password_conf, dob);
		if (message.length == 0) {
			//when an user is regiserted successfully
			dispatch(registerUser(username, email, zipcode, password))
			dispatch({type: "success", 
				warningText: "A new user is registered successfully."})
		} else {
			//when there is an error.
			dispatch({type: "fail", warningText: message})
		}
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
