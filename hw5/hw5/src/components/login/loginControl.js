import {resource, navToMain} from '../../actions'
import {initialVisit, updateUsername} from './loginActions'
function validateFields() {
	return true;
}

function login(username, password) {
	//login to the server and update all the fields.
	return (dispatch) => {
		resource("POST", "login", {"username" : username, "password": password})
		.then(r => 
				{
					dispatch({type: 'username', username: r.username});
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
export {validateFields, login, updateWarningText}
