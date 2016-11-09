import ReactDOM from 'react-dom'
import React from 'react'
import ControlView from './components/app'
import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import Reducer from './reducer'
import {initialVisit} from './components/login/loginActions'
import {Provider} from 'react-redux'

//create store and attempt to login.
let store = createStore(Reducer, applyMiddleware(thunkMiddleware));
store.dispatch(initialVisit());

const LOGINTAG = 0;
const MAINTAG = 1;
const PROFILETAG = 2;

//actually render the app.
ReactDOM.render(
	<Provider store={store}>
 		<ControlView/>
 	</Provider>,
 	document.getElementById('app')
);


