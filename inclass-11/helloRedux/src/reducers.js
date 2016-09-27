
const Reducer = (state =  {
	nextId: 2,
	todoItems: [
	    {id: 0, text: "This is an item", done: false},
	    {id: 1, text: "Another item", done: false}
	]
}, action) => {
	switch(action.type) {
		case 'ADD_TODO':
			return {
				nextId: state.nextId + 1,
				todoItems: [...state.todoItems, {id: state.nextId, text: action.text, done:false}]
			}
		case 'REMOVE_TODO':
			return {
				nextId: state.nextId,
				todoItems: state.todoItems.filter((item) => item.id != action.id)
			}
		case 'TOGGLE_TODO':
			return {
				nextId: state.nextId,
				todoItems: state.todoItems.map(function(item) {
								if (item.id == action.id){ return {...item, done: !item.done}}
								else return item
							})
			}
		default: 
			return state
	}
}

export default Reducer