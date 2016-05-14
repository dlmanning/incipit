const { createStore, combineReducers, applyMiddleware } = require('redux')
const createLogger = require('redux-logger')
const reducers = require('./reducers')

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

module.exports = store
