import { createStore, combineReducers, applyMiddleware } from 'redux'
import * as reducers from './reducers'
import { syncHistory, routeReducer } from 'react-router-redux'
import { hashHistory } from 'react-router'

const reduxRouterMiddleware = syncHistory(hashHistory)

const reducer = combineReducers({
  ...reducers,
  routing: routeReducer
})

const createStoreWithMiddleware = applyMiddleware(reduxRouterMiddleware)(createStore)
const store = createStoreWithMiddleware(reducer)

window.peakState = () => store.getState()

export default store
