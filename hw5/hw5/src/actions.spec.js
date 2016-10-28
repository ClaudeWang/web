import { expect } from 'chai'
import fetch, { mock } from 'mock-fetch'
import {updateProfile, follows, articles, warningText} from './reducer'
import mockery from 'mockery'
import {url} from './actions'
import {updateWarningText} from './components/login/loginControl'
import {navToMain, navToLogin, navToProfile} from './actions'
describe('Test the actions', () => {
    let resource

    beforeEach(() => {
        if (mockery.enable) {
            mockery.enable({warnOnUnregistered: false, useCleanCache:true})
            mockery.registerMock('node-fetch', fetch)
            require('node-fetch')
            resource = require('./actions').resource
        }
    })

    afterEach(() => {
        if (mockery.enable) {
            mockery.deregisterMock('node-fetch')
            mockery.disable()
        } 
    })

    it('resource should be a resource', (done)=>{
        mock(`${url}/headlines`,{
            method: 'GET',
            headers: {'Content-Type':'application/json'},
            json:{headlines: 'testHeadline'}
        })

        resource("GET", 'headlines')
        .then(r => {
            expect(r.headlines).to.equal('testHeadline');
            done();
        })
    })

    it('resource should give me the http error', (done)=>{
        mock(`${url}/noneExistingURL`,{
            status: 404,
            method: 'GET',
            headers: {'Content-Type':'application/json'}
        })

        resource("GET", 'noneExistingURL')
        .catch(r => done())
    })

    it('resource should be POSTable', (done)=>{
        const username = 'testUser'
        const password = 'testPassword'

        mock(`${url}/login`,{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            json:{username: username, result: "success"}
        })

        resource("POST", 'login', {username: username, password: password})
        .then(r => {
            expect(r.result).to.equal('success');
            done();
        })
    })

    it('should update error message', (done)=>{
        const result = updateWarningText('fail', 'failMessage');
        expect(result.warningText).to.equal('failMessage');
        expect(result.type).to.equal('fail');
        done();
    })

    it('should update success message', (done)=>{
        const result = updateWarningText('success', 'successMessage');
        expect(result.warningText).to.equal('successMessage');
        expect(result.type).to.equal('success');
        done();
    })

    it('should navigate', (done)=>{
        const main = navToMain();
        expect(main.type).to.equal('toMain');
        const login = navToLogin();
        expect(login.type).to.equal('toLogin');
        const profile = navToProfile();
        expect(profile.type).to.equal('toProfile');
        done();
    })
  
})