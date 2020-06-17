import React, { Component } from 'react'

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

      </div>
    )
  }
}

export default Landing
