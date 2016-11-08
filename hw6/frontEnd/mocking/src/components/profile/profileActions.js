import {resource, url} from '../../actions'
import fetch from 'isomorphic-fetch'
import {fetchProfileArea, refresh} from '../login/loginActions'

function updateProfilePage(oldZipcode, zipcodeField, oldEmail, emailField, oldPassword, passwordField, passswordConf) {
	return (dispatch) => {
		var dispatchList = [];
		if (zipcodeField.value !== "" && oldZipcode !== zipcodeField.value) {
			if (zipcodeField.checkValidity())
				dispatchList.push("zipcode") //queue the dispatch.
			else {
				//when thre is an error.
				dispatch({type: "fail", warningText: "Failed to update. Zipcode field has the wrong format."});
				return;
			}
		} else {
			zipcodeField.value = ""
		}

		if (emailField.value !== "" && oldEmail !== emailField.value) {
			if (emailField.checkValidity())
				dispatchList.push("email") //queue the dispatch.
			else {
				//when thre is an error.
				dispatch({type: "fail", warningText: "Failed to update. Email field has the wrong format."});
				return;
			}			
		} else {
			emailField.value = ""
		}
		console.log("two values are " + oldPassword + " " + passwordField.value)
		if (passwordField.value !== "" && oldPassword !== passwordField.value) {

			if (passwordField.value != passswordConf.value){
				dispatch({type: "fail", warningText: "Failed to update. Password must match confimation."});
				return;
			}
			else if (passwordField.value.charAt[0] >= '0' && passwordField.value.charAt[0] >= '9') {
				dispatch({type: "fail", warningText: "Failed to update. Password must not start with a digit."});
				return;
			}
			else {
				dispatchList.push("password")
			}			
		} else {
			passwordField.value = ""; passswordConf.value = "";
		}

		//only update when there is no error.
		if (dispatchList.length > 0) {
			dispatch({type: "success", warningText: "Profile has been updated successfully."});
			dispatchList.forEach((r) => {
				switch (r) {
					case 'zipcode': 
						dispatch(updateProfileZipcode(zipcodeField));
						break;
					case 'email':
						dispatch(updateProfileEmail(emailField));
						break;
					case 'password':
						dispatch({type: "password", password: passwordField.value})
						passwordField.value = ""
						passswordConf.value = ""
						break;
				}
			})
		}
	}
}


function updateProfileZipcode(zipcodeField) {
	return (dispatch) => {
		resource("PUT", "zipcode", {zipcode: zipcodeField.value})
		.then (r => {
			dispatch({type: "zipcode", zipcode: zipcodeField.value});
			zipcodeField.value = "";
		})
	}
}

function updateProfileEmail(emailField) {

	return (dispatch) => {
		resource("PUT", "email", {email: emailField.value})
		.then (r => {
			dispatch({type: "email", email: emailField.value})
			console.log("clean email field")
			emailField.value = "";
		})
	}
}

function updateProfilePic(profilePicField) {

	return (dispatch) => {
		const fd = new FormData();
		fd.append('image', profilePicField.target.files[0]);
		fetch(url + '/avatar', {
			method: "PUT",
			credentials: 'include',
			body: fd
		})
		.then(r => dispatch(refresh()))	
	}

}

export {updateProfilePic, updateProfilePage}