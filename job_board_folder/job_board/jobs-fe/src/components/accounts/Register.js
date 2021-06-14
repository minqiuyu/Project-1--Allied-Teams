import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from "../../actions/auth";
import { createMessage } from '../../actions/messages';

export class Register extends Component {
    state = {
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        password2: '',
    }

    static propTypes = {
        register: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
      };

    onSubmit = (e) => {
       // e.preventDefault();
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
          this.props.register(newUser)
        }
      };
    
    onChange = (e) => this.setState({ [e.target.name]: e.target.value})

    render() {
      if (this.props.isAuthenticated) {
        return <Redirect to="/" />;
      }
        const {username, email, first_name, last_name, password, password2} = this.state;
        return (
        <div>
            <form onSubmit={this.onSubmit}>
                <label>Username</label>
                <input type="text" name="username" onChange={this.onChange}
                value={username} />
                <label>Email</label>
                <input type="email" name="email" onChange={this.onChange}
                value={email} />
                <label>First Name</label>
                <input type="text" name="first_name" onChange={this.onChange} 
                value={first_name} />
                <label>Last Name</label>
                <input type="text" name="last_name" onChange={this.onChange}
                value={last_name} />
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
              <p>Already have an account? <Link to="/login">Login</Link></p>
            </form>
        </div>
            );
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
  });
  
export default connect(mapStateToProps, { register, createMessage })(Register);
//export default Register;