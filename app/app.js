const { Component, createFactory } = require('react')
const { RaisedButton, ToolbarGroup, Toolbar } = require('./material-factories')

const { fetch } = window

class App extends Component {
  render () {
    return Toolbar(null,
      ToolbarGroup({ firstChild: true },
        RaisedButton({ onClick: doProxyRequest }, 'Proxy'),
        RaisedButton({ onClick: doDirectRequest }, 'Direct')
      )
    )
  }
}

function doProxyRequest () {
  fetch('https://localhost:7357/permissions', { credentials: 'include' })
    .then(res => res.text())
    .then(text => console.log(text))
    .catch(err => console.error(err))
}

function doDirectRequest () {
  fetch('https://localhost:44333/permissions', { credentials: 'include' })
    .then(res => res.text())
    .then(text => console.log(text))
    .catch(err => console.error(err))
}

module.exports = createFactory(App)
