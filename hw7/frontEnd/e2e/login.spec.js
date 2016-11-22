import { expect } from 'chai'
import { go, sleep, findId, findCSS, By } from './selenium'
import common from './common'

describe('Test Login Functionalities', () => {


    before('should log in', (done) => {
        sleep(300).then(go()).then(common.login).then(done)
    })

    it('should log in as the test user', (done) => {
        sleep(100)
        .then(findId('profile-status').getText()
            .then(text => {
                expect(text.length).to.be.above(0);
            })
            .then(done))
    })

    it("Update the headline and verify the change", (done) => {
        
        let initialHeadline;
        findId('profile-status').getText()
        .then(initialHeadline => {
            const newHeadline = 'A new status message ' + Math.random();
            const updateHeadline = (msg) => () => 
                findId('update-status-field').sendKeys(msg)
                .then(findId('update-status-button').click())
                .then(sleep(500))
                .then(common.logout)
                .then(common.login)
                .then(findId('update-status-field').clear())
                .then(findId('profile-status').getText().then(text => {
                    expect(text).to.equal(msg)
                }))
            updateHeadline(newHeadline)()
            .then(updateHeadline(initialHeadline))
            .then(findId('update-status-field').clear())
            .then(done)
        })
    })

    after('should log out', (done) => {
        common.logout().then(done)
    })
})
