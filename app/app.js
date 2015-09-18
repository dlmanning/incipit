import React, { Component } from 'react'

class Message extends Component {

  constructor () {
    super()

    this.state = {
      hello: 'world'
    }
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.state, nextProps)
  }

  render () {
    return <h1>{"Hi, I'm counting " + this.props.counter }</h1>
  }
}

Message.propTypes = {
  counter: React.PropTypes.number
}

export default class App extends Component {
  constructor () {
    super()

    this.state = {
      counter: 0
    }
  }

  componentDidMount () {
    setInterval(() => {
      this.setState({ counter: ++this.state.counter })
    }, 1000)
  }

  render () {
    return <Message counter={this.state.counter}/>
  }
}
