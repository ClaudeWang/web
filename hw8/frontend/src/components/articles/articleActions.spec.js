import { expect } from 'chai'
import fetch, { mock } from 'mock-fetch'
import {updateKeyword} from './articlesActions'
import {url} from '../../actions'
import mockery from 'mockery'

 
describe('Test articleActions', () => {
 	let URL = url
 	let fetchArticles

 	beforeEach(() => {
        if (mockery.enable) {
            mockery.enable({warnOnUnregistered: false, useCleanCache:true})
            mockery.registerMock('node-fetch', fetch)
            require('node-fetch')
            fetchArticles = require('../login/loginActions').fetchArticles
        }
    })

    afterEach(() => {
        if (mockery.enable) {
            mockery.deregisterMock('node-fetch')
            mockery.disable()
        } 
    })


    it('should fetch articles', (done)=>{	
    	mock(`${URL}/articles`,{
            method: 'GET',
            headers: {'Content-Type':'application/json'},
            json:{articles:[{_id: 0, text:"test"}]}
        })
  		fetchArticles()((result) => {
  			expect(result.type).to.equal("articles");
  			expect(result.articles[0].text).to.equal("test");
  			done();
  		})
    })

    it('should update search keyword', (done)=> {
    	const result = updateKeyword("someKeyWord")
    	expect(result.type).to.equal("keyword")
    	expect(result.keyword).to.equal("someKeyWord")
    	done()
    }) 
})