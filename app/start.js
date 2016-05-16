const App = require('./app')
const { createFactory } = require('react')
const { Provider } = require('react-redux')
const { render } = require('react-dom')

const getMuiTheme = require('material-ui/styles/getMuiTheme').default
const MuiThemeProvider = require('material-ui/styles/MuiThemeProvider').default
const store = require('./rdx/store')

const MaterialTheme = createFactory(MuiThemeProvider)
const Redux = createFactory(Provider)

const Root = Redux(
  { store },
  MaterialTheme(
    { muiTheme: getMuiTheme() },
    App()
  )
)

render(Root, document.getElementById('app'))
