const { Component, createFactory } = require('react')
const { RaisedButton, ToolbarGroup, Toolbar } = require('./material-factories')

const { fetch } = window

class App extends Component {
  render () {
    return Toolbar(null,
      ToolbarGroup({ firstChild: true },
        RaisedButton({ onClick: doRequest }, 'Request'),
        RaisedButton(null, 'Action')
      )
    )
  }
}

function doRequest () {
  fetch('https://localhost:7357/values', { credentials: 'include' })
    .then(res => res.text())
    .then(text => console.log(text))
    .catch(err => console.error(err))
}

module.exports = createFactory(App)
