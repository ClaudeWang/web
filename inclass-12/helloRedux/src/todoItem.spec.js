import React from 'react'
import TestUtils from 'react-addons-test-utils'
import {findDOMNode} from 'react-dom'
import {expect} from 'chai'

import { ToDoItem } from './todoItem'

describe('Validate ToDoItem', () => {

	it('should display a single ToDo', () => {
		// use TestUtils.renderIntoDocument
		const node = TestUtils.renderIntoDocument(
			<div>
				<ToDoItem text="test" done={false} toggle={_=>_} remove={_=>_}/>
			</div>)
		// findDOMNode and assert 3 children of the ToDoItem element
		const elements = findDOMNode(node).children[0]
		expect(elements.children.length).to.equal(3)
		// assert the className is ''
		expect(elements.children[1].className).to.equal("")
		// assert the innerHTML of the todo is the text you initially set
		const testText = elements.children[1].innerHTML
		expect(testText).to.equal('test')
	})

	it('should toggle completed when clicked', () => {
		let toggled = false
		// use TestUtils.renderIntoDocument
		const node = TestUtils.renderIntoDocument(
			<div>
				<ToDoItem text="test" done={false} toggle={()=> toggled = true} remove={_=>_}/>
			</div>)
		// when the checkbox is clicked via TestUtils.Simulate.click()
		const elements = findDOMNode(node).children[0]
		TestUtils.Simulate.click(elements.children[0])
		// we expect the variable toggled to be true
		expect(toggled).to.be.true
	})

	it('should remove an item when clicked', () => {
		let removed = false
		// use TestUtils.renderIntoDocument
		const node = TestUtils.renderIntoDocument(
			<div>
				<ToDoItem text="test" done={false} toggle={_=>_} remove={() => removed=true}/>
			</div>)
		// when the remove button is clicked via TestUtils.Simulate.click()
		const elements = findDOMNode(node).children[0]
		TestUtils.Simulate.click(elements.children[2])
		// we expect the variable removed to be true
		expect(removed).to.be.true
	})

	it('should display a completed ToDo', () => {
		// use TestUtils.renderIntoDocument
		const node = TestUtils.renderIntoDocument(
			<div>
				<ToDoItem text="test" done={true} toggle={_=>_} remove={_=>_}/>
			</div>)
		// the item should have done=true
		// assert that the rendered className is "completed"
		const elements = findDOMNode(node).children[0]
		expect(elements.children[1].className).to.equal("completed")
	})

})
