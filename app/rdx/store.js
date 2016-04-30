import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import * as reducers from './reducers'

const logger = createLogger()

const reducer = combineReducers(Object.assign(
  {},
  reducers
))

const store = createStore(
  reducer,
  applyMiddleware(logger)
)

window.peakState = () => store.getState()

export default store
