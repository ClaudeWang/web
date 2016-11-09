import { expect } from 'chai'
import { go, sleep, findId, findCSS, By} from './selenium'
// import {get_attribute} from 'selenium-webdriver'
import common from './common'

describe('Test Register Functionality', () => {

	it("should register a user and display the appropriate message", (done) => {
		const accout = "yes"
		const email = "test@gmail.com"
		const phoneNumber = "123-123-1234"
		const dateOfBirth = "01/01/1990"
		const zipcode = "77000"
		const password = "zx123"
		const passwordConf = "zx123"

		const register = () => {
			go()
			.then(sleep(200))
			.then(findId('account_name').sendKeys(accout))
            .then(findId('email_address').sendKeys(email))
            .then(findId('phone_number').sendKeys(phoneNumber))
            .then(findId('dob').sendKeys(dateOfBirth))
            .then(findId('zipcode').sendKeys(zipcode))
            .then(findId('password').sendKeys(password))
            .then(findId('password_conf').sendKeys(passwordConf))
            .then(findId('submit_button').click())
            .then(sleep(500))
            .then(findId("success-text").getAttribute('innerHTML').then(text => {
            	expect(text).to.equal("A new user has been registered")
            	done();
            }))
        }
        register();
	})
})