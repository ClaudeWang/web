import { expect } from 'chai'
import { go, sleep, findId, findCSS, By } from './selenium'
import common from './common'
const webdriver = require('selenium-webdriver')

describe('Test Main Page add functionalities', () => {

    before('should log in', (done) => {
        go().then(common.login).then(done)
    })

    it("Remove the Follower user and verify following count decreases by one/Add the 'Follower'" +
     "user and verify following count increases by one", (done) => {
        
        const dummyFriend = "cz16"
        let secondInitial;
        sleep(1000)
        .then(
            findCSS("#friends-area .card")
            .then(r => secondInitial = r.length)
            .then(
                findId("add-friend-field").sendKeys(dummyFriend)
                .then(findId("add-friend-button").click())
                .then(sleep(500))
                .then(() => findCSS("#friends-area .card"))
                .then(r => {
                    expect(r.length).to.equal(secondInitial + 1);
                })
            )
            //delete the friend.
            .then(findCSS("#friends-area .card").then(r => {
                r.forEach((a) => {
                    a.findElement(webdriver.By.css(".friend-id"))
                    .then(s => s.getAttribute("innerHTML")
                        .then(id => {
                            if (id === dummyFriend)
                                a.findElement(webdriver.By.css("button"))
                                            .then(unfollow => unfollow.click())
                        })
                    );
                })
            }))
            .then(() => 
                findCSS("#friends-area .card").then(follows => {
                    expect(follows.length == secondInitial);
                    done();
                })
            )
        )
    })


    it("Create new article and validate article appears in feed", (done) => {
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
        .then(findCSS('td .card-block').then(r => {
            expect(r.length).to.equal(1);
            findId('search-post').clear().then(done);
        }))
    })

    it("Search for special 'Only One Article Like This' article and verify author", (done) => {
        const specialArticle = "Only One Article Like This"
        const author = "zw21test"
        sleep(100)
        .then(findId('search-post').sendKeys(specialArticle))
        .then(findId('search-button').click())
        .then(() => findCSS('td .card-block')
                    .then(r => {
                        expect(r.length).to.equal(1);
                        r[0].findElement(webdriver.By.css(".author-text")).getText()
                        .then(r => {
                            expect(r.substring(8)).to.equal(author);
                            done();
                        })
                    })
        )

    })

    after('should log out', (done) => {
        common.logout().then(r => {
            console.log("logout");
            done()
        });
    })
})
