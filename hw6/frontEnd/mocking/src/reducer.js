import { combineReducers} from 'redux'
const LOGINTAG = 0;
const MAINTAG = 1;
const PROFILETAG = 2;
const initAvartar = ""
const initHeadLine = ""

function route(state = {location: LOGINTAG}, action) {
	switch (action.type) {
		case 'toMain':
			return {location: MAINTAG}
		case 'toProfile':
			return {location: PROFILETAG}
		case 'toLogin':
			return {location: LOGINTAG}
	}
	return state
}
function updateProfile(state = {avatar: initAvartar, headline: initHeadLine, 
	email: "", zipcode: "", dob:"", username: "", password: ""}, action) {
	switch (action.type) {
		case 'avatars':
			return {...state, avatar: action.avatar}
		case 'headlines':
			return {...state, headline: action.headline}
		case 'email':
			return {...state, email: action.email}
		case 'zipcode':
			return {...state, zipcode: action.zipcode}
		case 'dob':
			return {...state, dob: action.dob}
		case 'username':
			return {...state, username: action.username}
		case 'password':
			return {...state, password: action.password}
		case 'clear':
			return {...state, username:"", headline: "", email: "", zipcode: "",
			 dob: "", avatar: ""}
	}
	return state;
}

function follows(state={follows: [], followsHeadlines:{}, followsAvatars:{}}, 
	action) {
	switch (action.type) {
		case 'follows':
			return {...state, follows: action.follows};
		case 'followsHeadlines':
			return {...state, followsHeadlines: action.followsHeadlines};
		case 'followsAvatars':
			return {...state, followsAvatars: action.followsAvatars};
	}
	return state;
}

function articles(state={articles: [], keyword: "", commentUpdate:1}, 
	action) {
	let newArticleList;
	switch (action.type) {
		case 'articles':
			return {...state, articles: action.articles}
		case 'keyword':
			return {...state, keyword: action.keyword}
		case 'commentUpdate':
			return {...state, commentUpdate: -state.commentUpdate}
		case 'addArticle':
			newArticleList = state.articles.slice();
			newArticleList.push(action.article)
			return {...state, articles: newArticleList}
		case 'reloadArticle':
			const articleId = action.articleId;
			newArticleList = state.articles.map(function(item) {
				if (item._id === articleId){
					return action.newArticle;
				}
				return item;
			})
			return {...state, articles: newArticleList}
	}
	return state
}

function warningText(state={warningText: "", type:"fail"}, action) {
	switch (action.type) {
		case 'fail':
			return {...state, warningText: action.warningText, type: "fail"}
		case 'success':
			return {...state, warningText: action.warningText, type: "success"}
		case 'clearText':
			return {...state, warningText: ""}
	}
	return state;
}

const Reducer = combineReducers({route, updateProfile, follows, articles, 
	warningText})
export {route, updateProfile, follows, articles, warningText}
export default Reducer

