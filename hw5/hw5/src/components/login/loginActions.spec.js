import { expect } from 'chai'
import fetch, { mock } from 'mock-fetch'
import mockery from 'mockery'
import {url} from '../../actions'

describe('Test Login Actions', () => {
	let logOut, login

	beforeEach(() => {
        if (mockery.enable) {
            mockery.enable({warnOnUnregistered: false, useCleanCache:true})
            mockery.registerMock('node-fetch', fetch)
            require('node-fetch')
            logOut = require('../main/mainControl').logOut
            login = require('./loginControl').login

        }
    })

    afterEach(() => {
        if (mockery.enable) {
            mockery.deregisterMock('node-fetch')
            mockery.disable()
        } 
    })
    
	it('should login a user', (done)=> {
		mock(`${url}/login`,{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            json:{username: "test", result: "success"}
        })
        login("shoudPass", "shouldSuccess")((r) => {
        	expect(r.type).to.equal('username')
        	done()
        })

    })

    it('should not login an invalid user', (done)=> {
		mock(`${url}/login`,{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            json:"Unauthorized"
        })
        login("shoudNotPass", "shouldFail")((r) => {
        	expect(r.type).to.equal('fail')
        	done()
        })
    })

	it('should log out a user', (done)=> {
		mock(`${url}/logout`,{
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            json:"OK"
        })
        logOut()((r) => {
        	expect(r.type).to.equal("toLogin")
        	done()
        })
    })    
})