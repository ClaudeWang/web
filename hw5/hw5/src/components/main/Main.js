import React from 'react'
import {clearPost, updateStatus, goToProfile, logOut, updateHeadline} from './mainControl'
import {connect} from 'react-redux'
import {navToProfile} from '../../actions'
import Article from '../articles/articles'
import {updateKeyword, addArticle} from '../articles/articlesActions'

const MainPage = ({dispatch, avatar, headline, username, friendsInfo, 
    articles, keyword}) => {
    return (
        <div id="main-body">
            <div id="header-area">
                <h1 className="bg-primary" id="header">RiceBook</h1>
            </div>
            <SideBar dispatch={dispatch} avatar={avatar} headline={headline} 
            username={username} friendsInfo={friendsInfo}/>
            <FeedSection articles={articles} keyword={keyword} 
            dispatch={dispatch}/>
        </div>
    )
}

const SideBar = ({dispatch, avatar, headline, username, friendsInfo}) => {
        return (
            <div id="sidebar">
                <ProfileArea dispatch={dispatch} avatar={avatar} 
                headline={headline} username={username} 
                friendsInfo={friendsInfo}/>
            </div>
        )
}

const ProfileArea = ({dispatch, avatar, headline, username, friendsInfo}) => {
        return (
            <div id="profile-area">
                <Navigation dispatch={dispatch}/>
                <ProfileCard avatar={avatar} headline={headline} 
                username={username} dispatch={dispatch}/>
                <FriendsArea friendsInfo={friendsInfo}/>
            </div>
        )
}

const Navigation = ({dispatch}) => {
        return (
            <div id="navigation">
                <button id="profileLink" className="btn btn-primary" 
                onClick={(e) => dispatch(navToProfile())}>Profile Page</button>
                <button id="logoutLink" className="btn btn-danger" 
                onClick={(e) => dispatch(logOut())}> Log out</button>
            </div>
        )
}

const ProfileCard = ({avatar, headline, username, dispatch}) => {
    let newHeadline;
    return (
    <div className="card">
        <div>
            <img className="img-fluid" src={avatar} width="100%"/>
        </div>
        <div className="card-block" id="profile-card-block">
            <h2>
                {username}
            </h2>
            <p id="profile-status">
                {headline}
            </p>
            <div id="update-status">
                <input type="text" className="form-control" 
                    id="update-status-field" 
                    placeholder="Share your status!" 
                    ref={(node) => newHeadline = node}/>
                <button className="btn btn-primary" id="update-status-button" 
                    onClick={r => dispatch(updateHeadline(newHeadline.value))}>
                    Update
                </button>
            </div>
        </div>
    </div>
    )
}



const FriendsArea = ({friendsInfo}) => {
        return (
            <div id="friends-area">
                <h2 className="text-primary"> Friends followed</h2>
                {
                    friendsInfo.follows.map((a, index) => {
                        return <FriendCard profilePic={friendsInfo.avatars[a]} 
                        name={a} headline={friendsInfo.headlines[a]} key={index}/>
                    })
                }
            </div>
        )
}

const FeedSection = ({articles, keyword, dispatch}) => {
    return(
        <div id="feed-div">
            <AddPostArea dispatch={dispatch}/>
            <PostTable articles={articles} keyword={keyword} 
            dispatch={dispatch}/>
        </div>
    )
}

const AddPostArea = ({dispatch}) => {
    let keyword;
    return(
    <div id="add-post">
        <textarea className="form-control" rows="6" id="post-content" 
            placeholder="Add a post here."></textarea>
        <div id="post-buttons">
            <label className="btn btn-primary">Upload Picture
                <input type="file" id="upload-pic" className="file"/>
            </label> <br />
            <button className="btn btn-primary">Add Post</button> <br/>
            <button className="btn btn-default" id="clearPost" 
                onClick={clearPost}>Cancel</button> <br />
        </div>
        <input className="form-control" id="search-post" 
            placeholder="Search a post." 
            ref={(node) => keyword = node}/>
        <div id="search-button-div">
            <button className="btn btn-warning" id="search-button" 
            onClick={(e) => dispatch(updateKeyword(keyword.value))}>
                Search
            </button>
        </div>
    </div>
    )
}

const PostTable = ({articles, keyword, dispatch}) => {
        const filteredArticles = filterArticles(articles, keyword);
        return (
            <table className="table">
                <tbody>
                    {
                        filteredArticles.map(function(article, index) {
                            return <Article articleInfo={article} 
                            dispatch={dispatch} key={index}/>
                        })
                    }
                </tbody>
            </table>
        )
}

const FriendCard = ({profilePic, name, headline}) => {
    return (
        <div className="card">
            <div className="friend-profile">
                <img className="img-fluid" src={profilePic} width="80%"/>
            </div>
            <label>{name}</label> <br />
            <label>{headline}</label> <br />
            <button className="btn btn-danger">Unfollow</button>
        </div>
    )
}


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
export default connect((state) => {
    return {
        avatar: state.updateProfile.avatar,
        headline: state.updateProfile.headline,
        username: state.updateProfile.username,
        friendsInfo: {follows: state.follows.follows, 
            headlines: state.follows.followsHeadlines,
            avatars: state.follows.followsAvatars},
        articles: state.articles.articles,
        keyword: state.articles.keyword
    }
})(MainPage)
export {PostTable}
//ReactDOM.render(<MainPage/>, document.getElementById('app'));