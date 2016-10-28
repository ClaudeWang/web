//controls whether to hide or show comments from an article.
function viewOrHideComments(input) {
	if (input == 0)
		return 1;
	return 0;
}

//format the time to be human readable.
function formatTime(time) {
	const date = new Date(time);
	return date.getMonth() + "-" + date.getDate() + "-" + date.getFullYear() + " "
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
export {viewOrHideComments, formatTime, updateComment, updateKeyword, addArticle}