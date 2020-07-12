import React, { Component } from 'react'
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { withRouter } from 'react-router-dom';

class Login extends Component {

  state = {
    name: "",
    email: "",
    password: "",
  };


  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Calls action to register user
  onSubmit = (e) => {
    e.preventDefault();

    const { name, email, password } = this.state;

    const body = JSON.stringify({ name, email, password });

    const headers = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    axios
      .post("/api/auth/login", body, headers)
      .then((res) =>{
       if(res.status === 200) {
         console.log(res);
          console.log(res.data.user);
          localStorage.setItem("LRC_Token", res.data.token);
           this.props.history.push("/chat");
           window.location.reload();

        }
      })
      .catch((err) => {
        const errors = err.response.data.errors;
        console.log(errors);
        Object.values(errors).map( error => {
          console.log(error.toString());
        });
      });
  };

  render() {
    return (
      <div>
            <Form onSubmit={this.onSubmit}>
              <FormGroup className="text-center">
                <Label for="email">E-mail</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="you@youremail.com"
                  className="mb-3"
                  bsSize="lg"
                  onChange={this.onChange}
                />

                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your Password"
                  className="mb-3"
                  bsSize="lg"
                  onChange={this.onChange}
                />
                <Button color="dark" className="mt-5" size="lg" block>
              <span>Login</span>
                </Button>
              </FormGroup>
            </Form>
      </div>
    )
  }
}

export default withRouter(Login);
