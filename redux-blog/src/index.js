import React from 'react';
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux' // Import applyMiddleware function from redux dependency
import thunk from 'redux-thunk' // import thunk from the redux-thunk depenency
// So what thunk does is whenever we call an action, the action function will be sent to redux thunk first, inside redux thunk, thunk will check to see if what is getting returned is a function or not.
// If what is getting returned from the action function is another function, redux thunk will call the inner function then send the result back through the reducer.
// the reducer will send the result of that back through thunk, but this time what was passed is the returned value of the inner function rather than the inner function itself.
// This prevents us from getting the error, action creators must return plain action object.
// The gotcha is that the inner function must return an action object having a type and optionally a payload.

import App from './components/App'
import reducers from './reducers'
                                    // second argument to createStore is optionally the applyMiddleWare function, add the middlewares you want to apply as the arguments of applyMiddleware
const store = createStore(reducers, applyMiddleware(thunk))

ReactDOM.render(<Provider store={store}>
    <App />
</Provider>,

document.querySelector('#root'))