import React, { useState } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom'
 
// Actions
import { register } from '../actions/user';
import { createAlert } from '../actions/alert';

const Register = ({ authenticated, register, createAlert }) => {

    const [registerForm, setStateValue] = useState({
        email: '',
        password: '',
        confirmpassword: '',
    });

    const handleChange = event => setStateValue({
        ...registerForm, 
        [event.target.id]: event.target.value,
    });

    const handleSubmit = async event => {
        event.preventDefault();
        if (registerForm.password !== registerForm.confirmpassword) {
            createAlert('Passwords do not match!', 'danger');
        } else {
            var user = registerForm;
            delete user.confirmpassword;
            register(user);
        }
    }

    if (authenticated) {
        return <Redirect to='/home' />
    }

    return (
        <div className="app-border app-border-top">
            <div className="banner center">
                <h1>Register</h1>
            </div>
            <form onSubmit={event => handleSubmit(event)}>
                <div className="form-group">
                    <label htmlFor="email">Email*</label>
                    <input type="email" 
                        className="form-control" 
                        id="email" 
                        aria-describedby="email" 
                        placeholder="" 
                        value={registerForm.email}
                        onChange={event => handleChange(event)}
                    />
                    <small id="email" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" 
                        className="form-control" 
                        id="password" 
                        placeholder=""
                        value={registerForm.password}
                        onChange={event => handleChange(event)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmpassword">Password (confirm)</label>
                    <input type="password" 
                        className="form-control" 
                        id="confirmpassword" 
                        placeholder="" 
                        value={registerForm.confirmpassword}
                        onChange={event => handleChange(event)}
                    />
                    <small id="emailHelp" className="form-text text-muted">Your password needs to be at least 8 characters long.</small>
                </div>
                <button type="submit" className="btn btn-primary btn-block">Register</button>
                <small id="redirect" className="form-text text-muted"><Link to='/login'>Already have an account?</Link></small>
            </form>
        </div>
    );
}

Register.propTypes = {
    authenticated: PropTypes.bool,
    register: PropTypes.func.isRequired,
    createAlert: PropTypes.func.isRequired,
}

const mapStateToProps = state => (
    { 
        authenticated: state.authenticated 
    }
);

export default connect(
    mapStateToProps, 
    { 
        createAlert,
        register
    }
)(Register);
