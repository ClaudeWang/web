import { expect } from 'chai'
import fetch, { mock } from 'mock-fetch'
import {updateKeyword, addArticle} from './articlesActions'
import {url} from '../../actions'
import {shallow} from 'enzyme'
import {PostTable} from '../main/Main'
import React from 'react'
import {articles} from '../../reducer'
 
describe('Test article views', () => {
    
    it('should render articles', (done)=>{	

        const article1 = {_id: 1, text: "text article 1", 
        date: "2015-09-05T04:12:10.521Z", 
            comments:[], author: 'zw21'}
        const article2 = {_id: 2, text: "text article 2", 
        date: "2015-09-05T04:12:10.521Z", 
            comments:[], author: 'zw21'}
        const articles = [];
        articles.push(article1);
        articles.push(article2);
        const node = shallow(<PostTable articles={articles}/>)
        expect(node.find('tbody').children()).to.have.length(2);
        done();
    })

    it('should dispatch actions to create a new article', (done)=> {
        
        //test the action is sent.
        const article1 = {_id: 1, text: "text article 1", 
        date: "2015-09-05T04:12:10.521Z", 
            comments:[], author: 'zw21'}
        const result = addArticle(article1)
        expect(result.type).to.equal('newArticle');
        expect(result.article).to.equal(article1);

        //test the action takes effect.
        const reducer = articles({articles: []}, {type:'addArticle', article1});
        expect(reducer.articles).to.have.length(1);
        done();
    }) 
})