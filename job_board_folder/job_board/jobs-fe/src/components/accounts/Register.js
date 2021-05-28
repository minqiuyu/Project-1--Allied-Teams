import React, { Component } from "react";

export class Register extends Component {
    state = {
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        password2: '',
    }


    onSubmit = (e) => {
        e.preventDefault();
        const { username, email, first_name, last_name, password, password2 } = this.state;
        if (password !== password2) {
          this.props.createMessage({ passwordNotMatch: 'Passwords do not match' });
        } else {
          const newUser = {
            username,
            password,
            email,
            first_name,
            last_name,
          };
          this.props.register(newUser);
        }
      };
    
    onChange = e => this.setState({ [e.target.name]: e.target.value})

    render() {
        const {username, email, first_name, last_name, password, password2} =
        this.state;
        return (
        <div>
            <form onSubmit={this.onSubmit}>
                <label>Username</label>
                <input type="text" name="username" onChange={this.onChange}
                value={username}
                />
                <label>Email</label>
                <input type="email" name="email" onChange={this.onChange}
                value={email}
                />
                <label>First Name</label>
                <input type="text" name="first_name" onChange={this.onChange} 
                value={first_name}
                />
                <label>Last Name</label>
                <input type="text" name="last_name" onChange={this.onChange}
                value={last_name}
                />
              <label>Password</label>
              <input
                type="password" name="password" onChange={this.onChange} value={password}
              />
              <label>Confirm Password</label>
              <input
                type="password" name="password2" onChange={this.onChange} value={password2}
              />
              <button type="submit">
                Register
              </button>
            </form>
        </div>
            )
    }
}

export default Register;