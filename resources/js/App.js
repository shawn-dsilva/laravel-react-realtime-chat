
    import React, { Component } from 'react'
    import ReactDOM from 'react-dom'
    import { BrowserRouter } from 'react-router-dom'
    import { Provider } from "react-redux";
    import Main from "./components/Main";
    import store from "./store";



    class App extends Component {
      render () {
        return (
          <Provider store={store}>
              <Main/>
          </Provider>
        )
      }
    }

  export default App;
