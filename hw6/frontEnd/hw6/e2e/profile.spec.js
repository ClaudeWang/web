import { expect } from 'chai'
import { go, sleep, findId, findCSS, By } from './selenium'
import common from './common'
const webdriver = require('selenium-webdriver')

describe('Test Profile Page', () => {

    before('should log in', (done) => {
        go().then(common.login).then(findId('profileLink').click()).then(done)
    })


    it("Update user email and verify", (done) => {
        const dummyEmail = "test1@gmail.com"
        let original;
        sleep(300)
        
        .then(() => findId('label-email').then(r => {
        	original = r.getText()
        }))
        .then(findId('email').sendKeys(dummyEmail))
        .then(findId('submitChanges').click())
        .then(sleep(300))
        .then(findId('label-email').getText().then(r => {
         	expect(r).to.equal(dummyEmail);
         	findId('email').sendKeys(original)
         	.then(findId('submitChanges').click())
         	.then(done)
        }))
    })

    it("Update user zipcode and verify", (done) => {
       
        const dummyZip = "11111"
        let original;
        sleep(300)
        .then(() => findId('label-zipcode').then(r => {
        	original = r.getText()
        }))
        .then(findId('zipcode').sendKeys(dummyZip))
        .then(findId('submitChanges').click())
        .then(sleep(300))
        .then(findId('label-zipcode').getText().then(r => {
         	expect(r).to.equal(dummyZip);
         	findId('zipcode').sendKeys(original)
         	.then(findId('submitChanges').click())
         	.then(done)
        }))
    })

    it("Update user password and verify", (done) => {
        
        const dummyPassword = "testPass"
        let original;
        sleep(300)
        .then(() => findId('label-password').then(r => {
        	original = r.getText()
        }))
        .then(findId('password').sendKeys(dummyPassword))
        .then(findId('passwordConf').sendKeys(dummyPassword))
        .then(findId('submitChanges').click())
        .then(sleep(300))
        .then(findId('label-password').getText().then(r => {
         	expect(r).to.equal(dummyPassword);
            findId('success-text').then(r => {
                r.getAttribute('innerHTML').then(res => {
                    expect(res).to.equal(
                    "Profile has been updated successfully." + 
                    " Password Unchanged.")
                })
            })
         	.then(findId('password').sendKeys(original))
            .then(findId('passwordConf').sendKeys(original))
         	.then(findId('submitChanges').click())
         	.then(done)
        }))
    })


    after('should log out', (done) => {
        findId("profileToMain").click()
        .then(common.logout())
        .then(done)
    })
})