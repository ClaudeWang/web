import {resource, navToMain} from '../../actions'

//the first time the page is loaded.
function initialVisit() {
	return (dispatch) => {
		resource('GET', 'headlines')
		.then((response) => {
			dispatch(fetchProfileArea())
			dispatch(fetchFollowsList())
			dispatch(fetchArticles())
			dispatch(navToMain())
		})
		.catch((err) => {})

	}
}

//fetch the profile area of the webpage.
function fetchProfileArea() {
	return (dispatch) => {
		dispatch(fetchField('avatar'));
		dispatch(fetchField('headline'));
		dispatch(fetchField('email'));
		dispatch(fetchField('zipcode'));
		dispatch(fetchField('dob'));
	}
}

//fetch the follow list of the current user.
function fetchFollowsList() {
	return (dispatch) => {
		let followList = [];
		resource("GET", "following")
		.then(r => 	{dispatch(updateFollowList(r)); return r;})
		.then(
			r => {
				resource("GET", "headlines/" + r.following)
					.then(r => dispatch(updateFollowsHeadlines(r)));
				return r;
			}
			)
		.then(
			r => resource("GET", "avatars/" + r.following)
				.then(r => dispatch(updateFollowsAvatars(r)))
			)
	}
}

//fetch a list of articles.
function fetchArticles() {
	return (dispatch) => {
		resource("GET", "articles")
		.then(r => dispatch({type: 'articles', 
			articles: sortArticles(r.articles)}))
	}
}

//fetch a specific field and update it with resource call.
function fetchField(field) {

	return (dispatch) => {
		switch(field) {
			case 'avatar':
				resource("GET", "avatars").then(r => {
					dispatch(updateAvatar(r.avatars[0]))
				}) 
				break;
			case 'headline':
				resource("GET", "headlines").then (r => dispatch(
					updateHeadline(r.headlines[0])))
				break;
			case 'email':
				resource("GET", "email").then (r => dispatch(updateEmail(r)))
				break;
			case 'zipcode':
				resource("GET", "zipcode").then (r => dispatch(
					updateZipcode(r)))
				break;
			case 'dob':
				resource("GET", "dob").then (r => dispatch(
					updateDob(r)))
				break;
		}
	}
}

//update Avatar.
function updateAvatar(payload) {
	return {type: "avatars", avatar: payload.avatar}
}

//update Headline.
function updateHeadline(payload) {
	return {type: "headlines", headline: payload.headline}
}

//update email.
function updateEmail(payload) {
	return {type: "email", email: payload.email}
}

//update zipcode.
function updateZipcode(payload) {
	return {type: "zipcode", zipcode: payload.zipcode}
}

//update dob.
function updateDob(payload) {
	return {type: "dob", dob: payload.dob}
}

//update username.
function updateUsername(payload) {
	return {type: 'username', username: payload.username}
}

//update the list of users followed by the current user.
function updateFollowList(payload) {
	return {type: 'follows', follows: payload.following}
}

//update the headlines of the follow list.
function updateFollowsHeadlines(payload) {
	//process it to be a map
	var result = {}
	payload.headlines.forEach((a) => {
		result[a.username] = a.headline
	})
	return {type: 'followsHeadlines', followsHeadlines: result}
}

//update the avatars of the follow list.
function updateFollowsAvatars(payload) {
	var result = {}
	payload.avatars.forEach((a) => {
		result[a.username] = a.avatar
	})
	return {type: 'followsAvatars', followsAvatars: result}
}

function updateArticles(payload) {
	return {type: 'articles', articles: sortArticles(payload.articles)}
}

//helper functions for sorting the articles by time.
function sortArticles(articles) {
	articles.sort(compareDate);
	return articles;
}
//helper function for comparing two articles.
function compareDate(a,b) {
	if (a.date > b.date)
		return -1;
	if (a.date < b.date)
		return 1;
	return 0;
}

export {initialVisit, updateUsername, fetchField, fetchArticles}