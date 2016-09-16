import { expect } from 'chai'
import particle from './particle'
import { update } from './particle'

describe('Particle Functionality', () => {

    it('should have default values', () => {
        const p = particle({})
        expect(p).to.be.ok
        expect(p.missingAttribute).to.not.be.ok
        expect(p.mass).to.not.be.undefined;
        expect(p.position).to.not.be.undefined;
        expect(p.velocity).to.not.be.undefined;
        expect(p.acceleration).to.not.be.undefined;

        expect(p.mass).to.be.a('number');
        p.position.forEach(function(value) {
            expect(value).to.be.a('number');
        });
        p.velocity.forEach(function(value) {
            expect(value).to.be.a('number');
        });
        p.acceleration.forEach(function(value) {
            expect(value).to.be.a('number');
        });
    })

    it('should update the position by the velocity', () => {
        const p = particle({ position: [1, 1], velocity: [0.5, -0.5] })
        const { position } = update(p, 1.0)
        position.forEach((value, index) => expect(value).to.equal(([1.5, 0.5])[index]))
    })

    it('should update the position by the velocity and time delta', () => {
        const p = particle({ position: [1, 1], velocity: [0.5, -0.5] })
        const { position } = update(p, 2.0) // dt is different here
        position.forEach((value, index) => expect(value).to.equal(([2.0, 0])[index]))
    })

    it('should update the velocity by the acceleration', () => {
        // similar to the previous check
        const p = particle({ acceleration: [1, 1], position: [1, 1], velocity: [0.5, -0.5] })
        const { velocity } = update(p, 2.0) // dt is different here
        velocity.forEach((value, index) => expect(value).to.equal(([2.5, 1.5])[index]))
    })

    it('particles should wrap around the world', () => {
        // create a particle with position outside
        // of the canvas area.  update() should
        // bring the particle back inside
        // check all four sides
        const p = particle({ position: [600, 600], velocity: [20, 20] })
        const { position } = update(p, 10.0, {width: 800, height:800}) // dt is different here
        position.forEach(function(value, index) {
            expect(value).to.be.within(0, 800);
        })
    })

})
