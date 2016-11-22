import {navToProfile, navToLogin, resource} from '../../actions'
import {fetchField} from '../login/loginActions'



function logOut() {
	return (dispatch) => {
		resource("PUT", "logout")
		.then(r => dispatch(navToLogin()))
		.catch(e => console.log("Error when logging out " + e))
	}
}

function updateHeadline(newHeadline) {
	return (dispatch) => {
		resource("PUT", 'headline', {headline: newHeadline})
		.then(r => dispatch(fetchField('headline')))
	}
}
export {logOut, updateHeadline}