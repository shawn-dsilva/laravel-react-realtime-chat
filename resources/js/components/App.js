
    import React, { Component } from 'react'
    import ReactDOM from 'react-dom'
    import { BrowserRouter, Route, Switch } from 'react-router-dom'
    import { Provider } from "react-redux";
    import Login from './Login'
    import Register from './Register'
    import Landing from './Landing'
    import Chat from './Chat'
    import store from "../store";



    class App extends Component {
      render () {
        return (
          <Provider store={store}>
          <BrowserRouter>
            <div>
            <Switch>
              <Route exact path ="/" component={Landing}/>
              <Route exact path ="/chat" component={Chat}/>
              <Route exact path ="/login" component={Login}/>
              <Route exact path ="/register" component={Register}/>
            </Switch>
            </div>
          </BrowserRouter>
          </Provider>
        )
      }
    }

    ReactDOM.render(<App />, document.getElementById('app'))