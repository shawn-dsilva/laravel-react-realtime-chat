import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import Button from 'reactstrap/lib/Button';

export class Landing extends Component {

  componentDidMount() {

    let tokenValue = localStorage.getItem("LRC_Token");

    axios.defaults.headers.common["Authorization"] =
    "Bearer " + tokenValue;

    axios.get("/api/auth/user")
    .then((res) =>{
      // if(res.status === 201) {
        console.log(res.data.user);
      // }
    })
    .catch((err) => {

    });
  }




  render() {

    return (
      <div>
        <ul>
          <li><a href="register">Register</a></li>
          <li><a href="login">Login</a></li>
          <li><a href="chat">Start Chatting</a></li>
        </ul>
      </div>
    )
  }
}

export default withRouter(Landing);
