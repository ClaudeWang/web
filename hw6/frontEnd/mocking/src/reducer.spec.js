import { expect } from 'chai'
import fetch, { mock } from 'mock-fetch'
import {updateProfile, follows, articles, warningText} from './reducer'
 
describe('Test the reducers', () => {
    it('should initialize state', (done)=>{      
        const result = updateProfile({}, { type: 'clear'})
        expect(result.username).to.equal('')
        expect(result.avatar).to.equal('')
        expect(result.headline).to.equal('')
        expect(result.zipcode).to.equal('')
        expect(result.email).to.equal('')
        expect(result.dob).to.equal('')
        done()
    })

    it('should state success', (done)=>{      
        const result = warningText({}, { type: 'success', warningText: 'Test success'})
        expect(result.type).to.equal('success')
        expect(result.warningText).to.equal('Test success')
        done()
    })

    it('should state error', (done)=>{      
        const result = warningText({}, { type: 'fail', warningText: 'Test fail'})
        expect(result.type).to.equal('fail')
        expect(result.warningText).to.equal('Test fail')
        done()
    })

    it('should set articles', (done)=>{
        let testarticles = ["test", "test1"]      
        const result = articles({}, { type: 'articles', articles: testarticles})
        expect(result.articles).to.equal(testarticles)
        done()
    })

    it('should set the search keyword', (done)=>{      
        const result = articles({}, {type: 'keyword', keyword: 'test'})
        expect(result.keyword).to.equal('test')
        done();
    })  
})