import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from './rdx/store'

export default class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <h1>Hello World</h1>
      </Provider>
    )
  }
}
