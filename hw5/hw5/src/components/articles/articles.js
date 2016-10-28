import React, {Component} from 'react'
import {connect} from 'react-redux'
import {viewOrHideComments, formatTime, updateComment} from './articlesActions'

//Article component.
class Article extends Component {

	constructor(props) {
		super(props);
		this.hidden = 1;
	}

	render() {
		const articleInfo = this.props.articleInfo;
		return (
		    <tr>
		       <td className="col-sm-12">
	            <div className="card">
	                <div className="card-block">
	                    <h4 className="card-title">
	                    	Article id {articleInfo._id}
	                    </h4>
	                    <div className="cardImageDiv">
	                        <img className="img-fluid" src={articleInfo.img} 
	                        width="50%" id="img0"/>
	                    </div>
	                    <p className="card-text">
							{articleInfo.text}                        
	                    </p>
	                    <p className="tag-text">Author: {articleInfo.author}</p>
	                    <p className="tag-text">{formatTime(articleInfo.date)}</p>
	                    <button className="btn btn-primary">Edit Feed</button>
	                    <button className="btn btn-primary" 
	                    	onClick={() => 
                			{
                				this.hidden = viewOrHideComments(this.hidden);
                				this.props.dispatch(updateComment());
                			}
	                    	}>View/Hide Comments</button>
	                    <br/><br/><br/>
                    	<Comments comments={articleInfo.comments} 
                    	hide={this.hidden}/>
	                </div>
	            </div>
		        </td>
		    </tr>
	    )
	}
}

//the list of comments.
const Comments = ({comments, hide}) => {
	if (hide == 1)
		return null;
	return (
		<table className="commentTable" width="100%">
	        <tbody>
	            {	
	                comments.map(function(comment, index) {
	                    return <Comment comment={comment} key={index}/>
	                })
	            }
	        </tbody>
	    </table>
    )
}

//the component of each comment.
const Comment = ({comment}) => {
	return(
		<tr>
			<td>
			<div>
				<h5>
					{comment.author} commented on: {formatTime(comment.date)}
				<br/></h5>
				{comment.text}
			</div>
			</td>
		</tr>
	)

}

export default connect((state) => {
	return {
		commentUpdate: state.articles.commentUpdate
	}
})(Article)