const { Component, createFactory, DOM } = require('react')
const { Provider: ProviderComponent } = require('react-redux')
const store = require('./rdx/store')

const Provider = createFactory(ProviderComponent)
const { h1 } = DOM

class App extends Component {
  render () {
    return Provider({ store }, h1(null, 'Hello World'))
  }
}

module.exports = App
