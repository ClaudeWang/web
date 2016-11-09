import {resource} from '../../actions'
//controls whether to hide or show comments from an article.
function viewOrHideComments(input) {
	if (input == 0)
		return 1;
	return 0;
}

//format the time to be human readable.
function formatTime(time) {
	const date = new Date(time);
	return date.getMonth() + "-" + date.getDate() + "-" 
		+ date.getFullYear() + " "
		+ date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
}

//update the comment, equivalent to a re-render.
function updateComment() {
	return {type: 'commentUpdate'}
}

//update the search keyword
function updateKeyword(keyword) {
	return {type: 'keyword', keyword: keyword}
}

//add a new article
function addArticle(newArticle) {
	return {type: 'newArticle', article: newArticle}
}

//add a new comment
function addNewComment(textField, articleId) {
	return (dispatch) => {
		if (textField.value.length == 0)
			return;
		resource("PUT", "articles/" + articleId, {
			text: textField.value,
			commentId: -1
		}).then(r => dispatch({type: "reloadArticle", 
			articleId: articleId, newArticle: r.articles[0]}))
		textField.value = "";
	}
}
//edit an article
function editArticle(textField, articleId) {
	resource("PUT", "articles/" + articleId, {
		text: textField.innerHTML
	})
}
//edit a comment
function editComment(textField, articleId, commentId) {
	resource("PUT", "articles/" + articleId, {
		text: textField.innerHTML,
		commentId: commentId
	})
}


export {viewOrHideComments, formatTime, updateComment, addNewComment,
	updateKeyword, addArticle, editArticle, editComment}