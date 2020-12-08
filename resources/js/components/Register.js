import React, { Component } from 'react'
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

class Register extends Component {

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
      .post("/api/auth/register", body, headers)
      .then((res) =>{
       if(res.status === 201) {
          console.log(res.data.message);
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
      <div className="authcontainer">
            <Form className="authcard" onSubmit={this.onSubmit}>
              <h1>REGISTER</h1>
              <p>Already have an account? <a href="/login">Login.</a></p>
              <FormGroup className="text-center">
                <Label className="authlabel" for="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter your name"
                  className="mb-3"
                  size="lg"
                  onChange={this.onChange}
                />

                <Label className="authlabel"  for="email">E-Mail</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="you@youremail.com"
                  className="mb-3"
                  size="lg"
                  onChange={this.onChange}
                />

                <Label className="authlabel"  for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your Password"
                  className="mb-3"
                  size="lg"
                  onChange={this.onChange}
                />
                <Button color="dark" className="mt-5" size="lg" block>
              <span>Register</span> &nbsp;
              <i class="fa fa-arrow-circle-right" aria-hidden="true"></i>
                </Button>
              </FormGroup>
            </Form>
      </div>
    )
  }
}

export default Register
