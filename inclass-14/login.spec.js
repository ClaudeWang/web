import { expect } from 'chai'
import { go, sleep, findId, findCSS, By } from './selenium'
import common from './common'

describe('Test Dummy Server Example Page', () => {

    const preamble = 'you are logged in as'

    before('should log in', (done) => {
        go().then(common.login).then(done)
    })

    it('should log in as the test user', (done) => {
        sleep(500)
        .then(findId('message').getText()
            .then(text => {
                expect(text.indexOf(preamble)).to.equal(0)
            })
            .then(done))
    })

    it("Update the headline and verify the change", (done) => {
        // IMPLEMENT ME
        // find the headline input
        var oldMessage = "This is the old message"

        sleep(500)
        .then(findId('newHeadline').sendKeys("Test Test"))
        .then(findId('headline').click())
        .then(sleep(500))
        .then(findId('message').getText()
            .then(r => {
                expect(r).to.equal("Test Test")
                        console.log('oldMessage', oldMessage)

        }))
        .then(sleep(500))
        .then(findId('newHeadline').clear())
        .then(findId('newHeadline').sendKeys(oldMessage))
        .then(findId('headline').click())
        .then(sleep(1000))
        .then(findId('message').getText()
            .then(r => expect(r).to.equal(oldMessage)))
        .then(done)
    })

    after('should log out', (done) => {
        common.logout().then(done)
    })
})
