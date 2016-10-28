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

export {filterArticles}