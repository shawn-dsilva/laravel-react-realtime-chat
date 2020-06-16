
    import React, { Component } from 'react'
    import ReactDOM from 'react-dom'
    import { BrowserRouter, Route, Switch } from 'react-router-dom'
    import Login from './Login'

    class App extends Component {
      render () {
        return (
          <BrowserRouter>
            <div>
              <Login />
            </div>
          </BrowserRouter>
        )
      }
    }

    ReactDOM.render(<App />, document.getElementById('app'))