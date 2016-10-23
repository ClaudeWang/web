const expect = require('chai').expect
const fetch = require('isomorphic-fetch')

const resource = (method, endpoint, payload) => {
	const url = `http://localhost:3000/${endpoint}`
	const options = { method, headers: { 'Content-Type': 'application/json' }}
	if (payload) options.body = JSON.stringify(payload)
	return fetch(url, options).then(r => {
			if (r.status == 200) {
				return r.json()
			} else {	
				const msg = `ERROR ${method} ${endpoint} returned ${r.status}`
				console.error(msg)
				throw new Error(msg)
			}
		})
}

describe('Test Stub Inclass Exercise', () => {

	it('should GET headlines', done => {
		resource('GET', 'headlines').then(body => {
			expect(body.headlines).to.be.ok
			expect(body.headlines.length).to.be.at.least(1)
			const headline = body.headlines[0]
			expect(headline.username).to.be.ok
			expect(headline.headline).to.be.ok		
		}).then(done).catch(done)
	})

	it('should GET headlines for a user', done => {
		resource('GET', 'headlines/me').then(body => {
			expect(body.headlines).to.be.ok
			expect(body.headlines.length).to.be.at.least(1)
			const headline = body.headlines[0]
			expect(headline.username).to.be.eql('me')
			expect(headline.headline).to.be.ok		
		}).then(done).catch(done)
	})

	it('should PUT headline', done => {
		const now = new Date().getTime()
		resource('PUT', 'headline', { headline: now }).then(body => {
			expect(body.username).to.be.ok
			expect(body.headline).to.be.eql(now)
		}).then(done).catch(done)
	})

	it('should GET email', done => {
		resource('GET', 'email').then(body => {
			expect(body.username).to.be.ok
			expect(body.email).to.be.ok
		}).then(done).catch(done)
	})

	it('should GET email for a user', done => {
		resource('GET', 'email/me').then(body => {
			expect(body.username).to.be.eql('me')
			expect(body.email).to.be.ok
		}).then(done).catch(done)
	})

	it('should PUT email', done => {
		const now = `${new Date().getTime()}@email.addr`
		resource('PUT', 'email', { email: now}).then(body => {
			expect(body.username).to.be.ok
			expect(body.email).to.be.eql(now)
		}).then(done).catch(done)
	})

	it('should GET zipcode', done => {
		resource('GET', 'zipcode').then(body => {
			expect(body.username).to.be.ok
			expect(body.zipcode).to.be.ok
		}).then(done).catch(done)
	})

	it('should GET zipcode for a user', done => {
		resource('GET', 'zipcode/me').then(body => {
			expect(body.username).to.be.eql('me')
			expect(body.zipcode).to.be.ok
		}).then(done).catch(done)
	})

	it('should PUT zipcode', done => {
		const now = new Date().getTime()
		resource('PUT', 'zipcode', { zipcode: now}).then(body => {
			expect(body.username).to.be.zipcode
			expect(body.zipcode).to.be.eql(now)
		}).then(done).catch(done)
	})

	it('should GET avatars', done => {
		resource('GET', 'avatars').then(body => {
			expect(body.avatars).to.be.ok
			expect(body.avatars.length).to.be.at.least(1)
			const avatar = body.avatars[0]
			expect(avatar.username).to.be.ok
			expect(avatar.avatar).to.be.ok
		}).then(done).catch(done)
	})

	it('should GET avatars for a user', done => {
		resource('GET', 'avatars/me').then(body => {
			expect(body.avatars).to.be.ok
			expect(body.avatars.length).to.be.at.least(1)
			const avatar = body.avatars[0]
			expect(avatar.username).to.be.eql('me')
			expect(avatar.avatar).to.be.ok
		}).then(done).catch(done)
	})
		it('should PUT avatar', done => {
		const url = 'https://webdev-dummy.herokuapp.com/img/owl.png-' + new Date().getTime()
		resource('PUT', 'avatar', { avatar: url }).then(body => {
			expect(body.username).to.be.zipcode
			expect(body.avatar).to.be.eql(url)
		}).then(done).catch(done)
	})

})