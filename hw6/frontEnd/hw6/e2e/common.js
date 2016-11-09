import { expect } from 'chai'
import { findId, sleep } from './selenium'

// TODO add your test user credentials here!
exports.creds = {
    username: "zw21test",
    password: "attempt-train-farmers"
}

exports.login = () => 
    sleep(100)
    .then(findId('login_account').clear())
    .then(findId('login_password').clear())
    .then(findId('login_account').sendKeys(exports.creds.username))
    .then(findId('login_password').sendKeys(exports.creds.password))
    .then(findId('login-btn').click())
    .then(sleep(2000))

exports.logout = () =>
    sleep(100)
    .then(findId('logoutLink').click())
    // IMPLEMENT ME
    // validate the message says: 'You have logged out'
