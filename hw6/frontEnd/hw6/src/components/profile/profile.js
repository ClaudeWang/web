import React from 'react'
import {navToMain} from '../../actions'
import {connect} from 'react-redux'
import {initialVisit} from '../login/loginActions'
import {updateProfilePage, updateProfilePic} from './profileActions'

const ProfilePage = ({dispatch, profilePackage, warningTextPackage}) => {
	return (
			<div id="profile-body">
				<h1 className="bg-primary" id="profile_title">RiceBook</h1>
				<h2 className="text-primary">Profile Page</h2>
				<PageWarning warningText={warningTextPackage.warningText}
					warningType={warningTextPackage.warningType}/>
				<ProfilePicDiv avatar={profilePackage.avatar}/>
				<BackLink dispatch={dispatch}/>
				<FormDiv
					dispatch={dispatch} 
					email={profilePackage.email} 
					zipcode={profilePackage.zipcode}
					dob={profilePackage.dob}
					password={profilePackage.password}/>
			</div>
		)
}

const PageWarning = ({warningText, warningType}) => {
	//three cases for displaying the warning text.
	if (warningText.length == 0)
		return null;
	let textboxDiv;
	if (warningType === 'fail')
		textboxDiv = (<div id="warning-text">{warningText}</div>)
	else
		textboxDiv = (<div id="success-text">{warningText}</div>)
	return (
		<div>
			{textboxDiv}
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

const FormDiv = ({dispatch, email, zipcode, dob, password}) => {


	let emailField;
	let zipcodeField;
	let passwordField;
	let passwordConf;
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
					placeholder="Your email address" pattern=".+@.+\..+" ref={r => emailField = r}/>
				</div>
			</div>
		</div><br />
		<div className="row">
			<div>
				<p className="text-primary">Zipcode: </p>
				<div className="groupEntry">
					<label id="label-zipcode">{zipcode}</label> 
					<input type="text" name="zipcode" id="zipcode" 
					placeholder="Your zip code" pattern="[0-9]{5}" ref={r => zipcodeField = r}/>
				</div>
			</div>
		</div><br />
		<div className="row">
			<div>
				<p className="text-primary">Password: </p>
				<div className="groupEntry">
					<label id="label-password">{password}</label>
		 			<input type="password" name="password" id="password" 
		 			placeholder="Your password" ref={r => passwordField = r}/>
		 		</div>
		 	</div>
		 </div><br /> 
		<div className="row">
			<div>
				<p className="text-primary">Password Confirmation: </p>
				<div className="groupEntry">
					<label id="label-passwordConf">{password}</label>
					<input type="password" name="password" id="passwordConf" 
					placeholder="Your password" ref={r => passwordConf = r}/>
				</div>
			</div>
		</div><br />
		<div className="row" id="submit-changes-container">
			<button className="btn btn-primary" id="submitChanges" 
			onClick={(e) => dispatch(updateProfilePage(zipcode, zipcodeField,
				email, emailField, password, passwordField, passwordConf))}>
					Save
			</button>
		</div>
	</div>
	)
}

const BackLink = ({dispatch}) => {
	return (
		<div id="backLink">
		<label className="btn btn-primary">Change Profile Picture
        <input type="file" accept="image/*" className="upload-pic" 
        onChange={(e) => dispatch(updateProfilePic(e))}/>
        </label> <br />
		<button className="btn btn-danger" id="profileToMain"
		onClick={(e) => {dispatch(navToMain())}}>Back to Main Page</button><br />
		</div>
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
		dob: formatDOB(Math.round(state.updateProfile.dob)),
		password: state.updateProfile.password
	}

	let warningTextPackage = {
		warningText: state.warningText.warningText,
		warningType: state.warningText.type
	}
	return {
		profilePackage,
		warningTextPackage
	}
})(ProfilePage)

