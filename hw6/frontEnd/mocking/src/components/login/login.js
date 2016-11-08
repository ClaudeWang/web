import React from 'react'
import {validateFields, login, register} from './loginControl'
import {navToMain} from '../../actions'
import {connect} from 'react-redux'
const LoginPage = ({dispatch, warningText, warningType}) => {
	return (
    	<div id="landing-body">
    		<h1 className="bg-primary">
    			RiceBook
    		</h1>
    		<div id="body-content">
    			<WarningText warningText={warningText} 
    			warningType={warningType}/><br /><br/>
    			<LoginSection dispatch={dispatch}/>
    			<RegistrationSection dispatch={dispatch}/>
    		</div>
    	</div>
    )
}

const WarningText = ({warningText, warningType})=>{
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

const LoginSection = ({dispatch}) => {
	let username, password
	return(
		<div id="login">
			<h2 className="text-primary">Login</h2>
			<div id="login-fields-div">
				<div className="form-group">
					<label>Account Name:</label>
					<input type="text" name="account_name"  
						className="form-control" id="login_account" 
						placeholder="Your account name" 
						required pattern="[a-zA-Z0-9]*"
					ref={(node) => {username = node}}></input> <br /><br />
				</div>
				<div className="form-group">
					<label>Password</label>
					<input type="password" className="form-control" 
					name="password" id="login_password" 
					placeholder="Your password" required
					ref={(node) => {password = node}}></input> <br /><br />
				</div>
				<div id="login-btn-div" onClick={
					(e) => {dispatch(login(username.value, password.value))}
				}>
					<button className="btn btn-primary" id="login-btn">
						Login
					</button>
				</div>
			</div>
		</div>
	)
}

const RegistrationSection = ({dispatch}) =>{

	let password;
	let password_conf;
	let email;
	let dob;
	let zipcode;
	let username;

	return (
		<div id="registration">
		<h2 className="text-warning">Register</h2>
		<form onSubmit={(e) => {e.preventDefault(); dispatch(register(password, password_conf, dob, email, zipcode, username));}} id="register-form">
			<div className="form-group">
			<label>Account Name:</label>
			<input type="text" name="account_name"  className="form-control" 
			id="account_name" placeholder="Your account name" 
			required pattern="[a-zA-Z0-9]*" ref={(input) => username = input}></input> <br /><br />
			</div>
			<div className="form-group">
				<label>Display Name:</label>
				<input type="text" className="form-control" name="display_name" 
				id="display_name" placeholder="Your display name"></input> 
				<br /><br />
			</div>
			<div className="form-group">
				<label>Email Address:</label>
				<input type="email" className="form-control" 
				name="email_address" id="email_address" 
				placeholder="Your email address" 
				required pattern=".+@.+\..+" ref={(input) => email = input}></input> <br /><br />
			</div>
			<div className="form-group">
				<label>Phone Number:</label>
				<input type="text" className="form-control" name="phone_number" 
				id="phone_number" placeholder="xxx-xxx-xxxx" required 
				pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"></input>
				<br /><br />
			</div>
			<div className="form-group">
				<label>Date of Birth:</label>
				<input type="date" className="form-control" name="dob" id="dob"
				 placeholder="Your date of birth" required ref={(input) => dob = input}></input><br /><br />
			</div>
			<div className="form-group">
				<label>Zipcode:</label>
				<input type="text" className="form-control" name="zipcode" 
				id="zipcode" placeholder="Your zip code" required 
				pattern="[0-9]{5}" ref={(input) => zipcode = input}></input> <br /><br />
			</div>
			<div className="form-group">
				<label>Password</label>
				<input type="password" className="form-control" name="password" 
				id="password" placeholder="Your password" required ref={(input) => password = input}></input> 
				<br /><br />
			</div>
			<div className="form-group">
				<label>Password Confirmation:</label>
				<input type="password" className="form-control" 
				id="password_conf" placeholder="Retype your password" 
				required ref={(input) => password_conf = input}></input> <br /><br />
			<input type="hidden" name="hidden_time" id="hidden_time"></input>
			</div>
			<div id="btn-div">
				<input type="submit" id="submit_button" 
				className="btn btn-warning"></input>
				<input type="reset" id="reset_button" 
				className = "btn btn-secondary"></input>
			</div>
		</form>
	</div>
	)
}
export default connect((state) => {
	return {
		warningText: state.warningText.warningText,
		warningType: state.warningText.type
	}
})(LoginPage)

