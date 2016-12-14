import { expect } from 'chai'
import { go, sleep, findId, findCSS, By } from './selenium'
import common from './common'
const webdriver = require('selenium-webdriver')

describe('Test Main Page functionalities', () => {

    before('should log in', (done) => {
        go().then(common.login).then(done)
    })

    it("Edit an article and validate changed article text.", (done) => {
        
        const editArticles = () => {
            let num;
            let message;
            sleep(200)
            .then(r => {
                message = (new Date()).toISOString();
                findId("post-content").sendKeys(message)
            })
            .then(() => {findId('addPost-btn').click()})
            .then(() => {findId('search-post').sendKeys(message)})
            .then(findId('search-button').click())
            .then(findCSS('td .card-block .card-text div')
                .then(r => {
                    r[0].clear();
                    r[0].sendKeys("test input");
                })
                .then(findCSS('td .card-block .card-text div')
                    .then(r => {
                        r[0].getAttribute('innerHTML').then(r => 
                            {expect(r).to.be.equal("test input"); done()}
                        )
                    })
                )
            )
        }
        editArticles();
    })
    after('should log out', (done) => {
        common.logout().then(done)
    })
})
