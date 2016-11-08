import { expect } from 'chai'
import fetch, { mock } from 'mock-fetch'
import {url} from '../../actions'
import mockery from 'mockery'
import {updateHeadline} from '../main/mainControl'
 
describe('Test articleActions', () => {
 	let URL = url
    let fetchField
    let resource

 	beforeEach(() => {
        if (mockery.enable) {
            mockery.enable({warnOnUnregistered: false, useCleanCache:true})
            mockery.registerMock('node-fetch', fetch)
            require('node-fetch')
            fetchField = require('../login/loginActions').fetchField
            resource = require('../../actions').resource
        }
    })

    afterEach(() => {
        if (mockery.enable) {
            mockery.deregisterMock('node-fetch')
            mockery.disable()
        } 
    })

    it('should fetch profile email', (done)=>{	
    	
        mock(`${URL}/email`,{
            method: 'GET',
            headers: {'Content-Type':'application/json'},
            json:{username: "test", email: 'testEmail'}
        })

  		fetchField('email')((result) => {
  			expect(result.type).to.equal('email')
            expect(result.email).to.equal('testEmail')
  			done();
  		})
    })

    it('should fetch profile zipcode', (done)=>{  
        
        mock(`${URL}/zipcode`,{
            method: 'GET',
            headers: {'Content-Type':'application/json'},
            json:{username: "test", zipcode: 'testZipcode'}
        })

        fetchField('zipcode')((result) => {
            expect(result.type).to.equal('zipcode')
            expect(result.zipcode).to.equal('testZipcode')
            done();
        })
    })

    it('should fetch profile dob', (done)=>{  
        
        mock(`${URL}/dob`,{
            method: 'GET',
            headers: {'Content-Type':'application/json'},
            json:{username: "test", dob: 'testDob'}
        })

        fetchField('dob')((result) => {
            expect(result.type).to.equal('dob')
            expect(result.dob).to.equal('testDob')
            done();
        })
    })
    it('should update headline', (done)=> {
    	
        mock(`${URL}/headline`,{
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            json:{status: "success"}
        })

        updateHeadline("test new Headline")((r) => {
            //no error returned.
        })
        resource("PUT", 'headline')
        .then(r => {
            expect(r.status).to.equal("success");
            done();
        })
    }) 
})