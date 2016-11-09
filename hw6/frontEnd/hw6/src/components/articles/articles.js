import React, {Component} from 'react'
import {connect} from 'react-redux'
import {viewOrHideComments, formatTime, updateComment, editComment,
	addNewComment, editArticle} from './articlesActions'

//Article component.
class Article extends Component {

	constructor(props) {
		super(props);
		this.hidden = 1;
	}
	render() {
		const articleInfo = this.props.articleInfo;
		let textBox;
		return (
		   <tr>
	       <td className="col-sm-12">
            <div className="card"> <div className="card-block">
                <h4 className="card-title">
                	Article id {articleInfo._id}
                </h4>
                <div className="cardImageDiv">
                    <img className="img-fluid" src={articleInfo.img} 
                    width="50%" id="img0"/>
                </div>
                <div className="card-text">
                	{
						(this.props.username === articleInfo.author)?
							(<div contentEditable="true" ref={r => textBox=r}
								suppressContentEditableWarning={true}>
								{articleInfo.text}
							</div>):
							(articleInfo.text)
					}                        
                </div>
                <p className="author-text">Author: {articleInfo.author}</p>
                <p className="date-text">{formatTime(articleInfo.date)}</p>
                {

            	(this.props.username === articleInfo.author)?
            		(<button className="btn btn-danger" 
            			onClick={(e) => editArticle(textBox, articleInfo._id)}>
            			Finish Editing Article</button>):
            		null
                }
                <button className="btn btn-primary" 
                	onClick={() => 
        			{
        				this.hidden = viewOrHideComments(this.hidden);
        				this.props.dispatch(updateComment());
        			}
                	}>View/Hide Comments</button>
                <br/><br/><br/>
            	<Comments comments={articleInfo.comments} 
            	username={this.props.username} 
            	hide={this.hidden} dispatch={this.props.dispatch}
            	articleID={articleInfo._id}/></div>
            </div>
	        </td>
		    </tr>
	    )
	}
}

//the list of comments.
const Comments = ({comments, hide, dispatch, articleID, username}) => {
	if (hide == 1)
		return null;
	if (comments.length == 0) {
		return (
			<div>
				<NewComment dispatch={dispatch} articleID={articleID}/>
			</div>
			)
	}
	return (
		<div>
			<NewComment dispatch={dispatch} articleID={articleID}/>
			<table className="commentTable" width="100%">

		        <tbody>
		            {	
		                comments.map(function(comment, index) {
		                    return <Comment comment={comment} key={index} 
		                    	username={username} articleId={articleID}/>
		                })
		            }
		        </tbody>
		    </table>
		</div>
    )
}
//add comment
const NewComment = ({dispatch, articleID}) => {
	let commentContent;
	return (
		<div className="row">
	      <div className="col-xs-16">
	        <div className="input-group">
	            <input type="text" className="form-control" 
	            ref={r => commentContent = r}/>
	          <div className="input-group-btn">
	            <button type="submit" className="btn" 
	            onClick={(e) => 
	            	{dispatch(addNewComment(commentContent, articleID))}
	            }>Add Comment</button>
	          </div>
	        </div>
	      </div>
	    </div>
	)
}


//the component of each comment.
const Comment = ({comment, username, articleId}) => {
	let commentContainer;
	return(
		<tr>
			<td>
			<div>
				<h5>
					{comment.author} commented on: {formatTime(comment.date)}
				<br/></h5>
				{
					(comment.author === username)?
					(<div>
						<div contentEditable="true" 
						suppressContentEditableWarning={true} 
						ref={ref=> commentContainer=ref}>
						{comment.text}
						</div><br/>
						<button className="btn btn-primary"
							onClick={e=>editComment(commentContainer, articleId, 
								comment.commentId)}>Save</button>
						<button className="btn btn-warning" 
						onClick={e=>commentContainer.innerHTML=comment.text}>
							Cancel
						</button>
					</div>):
					(comment.text)
				}
			</div>
			</td>
		</tr>
	)

}

//editable content
const EditableText = ({text}) => {
	let textBox;
	return (
		<div contentEditable="true" ref={r => textBox=r}>
			{text}
		</div>
		)
}
export default connect((state) => {
	return {
		commentUpdate: state.articles.commentUpdate,
		username: state.updateProfile.username
	}
})(Article)