import React from 'react'
import {navToMain} from '../../actions'
import {connect} from 'react-redux'


const ProfilePage = ({dispatch, profilePackage}) => {
	return (
			<div id="profile-body">
				<h1 className="bg-primary" id="profile_title">RiceBook</h1>
				<h2 className="text-primary">Profile Page</h2>
				<PageWarning/>
				<ProfilePicDiv avatar={profilePackage.avatar}/>
				<BackLink dispatch={dispatch}/>
				<FormDiv email={profilePackage.email} 
					zipcode={profilePackage.zipcode}
					dob={profilePackage.dob}/>
			</div>
		)
}

const PageWarning = () => {
	return (
		<div id="page_warning">
			<p id="update-text"></p>
		</div>
	)
}

const ProfilePicDiv = ({avatar}) => {
	return (
		<div id="profile-pic-div">
			<img id="profile-pic-profile" src={avatar} 
			style= {{width: 30 + '%'}}></img>
		</div>
		)
}

const FormDiv = ({email, zipcode, dob}) => {
	return (
	<div id="formDiv">
		<div className="row">
			<p className="text-primary">Date of Birth: </p>
			<div className="groupEntry" >
				<label id="label-dob">{dob}</label> 
				<input type="text" style={{visibility: 'hidden'}}/>
			</div>
		</div><br />
		<div className="row">
			<div>
				<p className="text-primary">Email Address: </p>
				<div className="groupEntry">
					<label id="label-email">{email}</label>
					<input type="email" name="email_address" id="email" 
					placeholder="Your email address" pattern=".+@.+\..+" />
				</div>
			</div>
		</div><br />
		<div className="row">
			<div>
				<p className="text-primary">Zipcode: </p>
				<div className="groupEntry">
					<label id="label-zipcode">{zipcode}</label> 
					<input type="text" name="zipcode" id="zipcode" 
					placeholder="Your zip code" pattern="[0-9]{5}" />
				</div>
			</div>
		</div><br />
		<div className="row">
			<div>
				<p className="text-primary">Password: </p>
				<div className="groupEntry">
					<label id="label-password">12345</label>
		 			<input type="password" name="password" id="password" 
		 			placeholder="Your password" />
		 		</div>
		 	</div>
		 </div><br /> 
		<div className="row">
			<div>
				<p className="text-primary">Password Confirmation: </p>
				<div className="groupEntry">
					<label id="label-passwordConf">12345</label>
					<input type="password" name="password" id="passwordConf" 
					placeholder="Your password" />
				</div>
			</div>
		</div><br />
		<div className="row" id="submit-changes-container">
			<button className="btn btn-primary" id="submitChanges" 
			onClick={submitChanges}>change</button>
		</div>
	</div>
	)
}

const BackLink = ({dispatch}) => {
	return (
		<div id="backLink"><button className="btn btn-danger" 
		onClick={(e) => dispatch(navToMain())}>Back to Main Page</button></div>
		)
}

function formatDOB(dob) {
	let date = new Date(dob);
	let formattedDate = "" + date.getMonth() + "/" + date.getDate() + "/" 
						+ date.getFullYear();
	return formattedDate;
}


export default connect((state) => {
	//console.log("dob " + Math.round(state.updateProfile.dob))
	let profilePackage = {
		avatar: state.updateProfile.avatar,
		email: state.updateProfile.email,
		zipcode: state.updateProfile.zipcode,
		dob: formatDOB(Math.round(state.updateProfile.dob))
	}
	return {
		profilePackage
	}
})(ProfilePage)

