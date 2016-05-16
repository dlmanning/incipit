const materialComponents = require('material-ui')
const { createFactory } = require('react')

const materialFactories = {}

Object.keys(materialComponents).forEach(componentName => {
  materialFactories[componentName] = createFactory(materialComponents[componentName])
})

module.exports = materialFactories
