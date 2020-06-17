
    import React, { Component } from 'react'
    import ReactDOM from 'react-dom'
    import { BrowserRouter, Route, Switch } from 'react-router-dom'
    import Login from './Login'
    import Register from './Register'
    import Landing from './Landing'
    import Chat from './Chat'


    class App extends Component {
      render () {
        return (
          <BrowserRouter>
            <div>
              <Chat/>
            {/* <Landing/>
            <Switch>
              <Route exact path ="/login" component={Login}/>
              <Route exact path ="/register" component={Register}/>
            </Switch> */}
            </div>
          </BrowserRouter>
        )
      }
    }

    ReactDOM.render(<App />, document.getElementById('app'))