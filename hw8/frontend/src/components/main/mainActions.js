import {url, resource} from '../../actions'
import {fetchArticles, fetchFollowsList, updateFollowsHeadlines, 
	updateFollowsAvatars} from '../login/loginActions'
//helper function to filter result by keyword.
function filterArticles(articles, keyword) {
    const filteredArticles = articles.filter(function(article) {
        if (article.text.search(keyword) >= 0 || 
        	article.author.search(keyword) >= 0)
            return true;
        return false;
    });
    return filteredArticles;
}

/*This method is commented out because a temporary method is 
there to perform the same function. In hw8, this will be used.*/

//add a new Article
function addNewArticle(textField, image) {
	//add text
	return (dispatch) => {
		if (textField.value.length == 0) {
			return;
		}
		const fd = new FormData();
		fd.append('text', textField.value);
		if (image) {
			fd.append("image", image);
		}
		console.log(image)
		fetch(url + "/article", {
			method: "POST",
			credentials: 'include',
			body: fd
		})
		.then(r => 
			{
				textField.value = ""
				dispatch(fetchArticles());
				dispatch({type: 'clearText'}) 
			})
	}
}


// function addNewArticle(textField, image) {
// 	//add text
// 	return (dispatch) => {
// 		if (textField.value.length == 0) {
// 			return;
// 		}
// 		let request = {text: textField.value}
// 		if (image) {
// 			request.image = image;
// 		}
// 		resource("POST", "article", request)
// 		.then(r => 
// 			{
// 				textField.value = ""
// 				dispatch(fetchArticles());
// 				dispatch({type: 'clearText'}) 
// 			})
// 	}
// }

//unfollow a friend.
function unfollow(userName) {
	return (dispatch) => {
		resource("DELETE", "following/" + userName)
		.then(r => dispatch(fetchFollowsList()));
	}
}

//follow a friend.
function follow(userName, originalSize) {
	return (dispatch) => {
		if (userName.length == 0)
			return;
		resource("PUT", "following/" + userName)
		.then(r => {
			if (r.following.length == originalSize) {
				dispatch({type:"fail", 
					warningText: ("The user does not exist.")});
				return;
			}
			dispatch({type: 'follows', follows: r.following});
			resource("GET", "headlines/" + r.following)
					.then(r => dispatch(updateFollowsHeadlines(r)));
			resource("GET", "avatars/" + r.following)
					.then(r => dispatch(updateFollowsAvatars(r)))
		})
	}
}
export {filterArticles, addNewArticle, unfollow, follow}