import React, { useState } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
 
// Actions
import { register } from '../actions/auth';
import { createAlert } from '../actions/alert';

const Register = ({ register, createAlert }) => {

    const [registerForm, setState] = useState({
        email: '',
        password: '',
        confirmpassword: '',
    });

    const handleChange = event => setState({
        ...registerForm, 
        [event.target.name]: event.target.value,
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

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="email">Email*</label>
                <input type="email" 
                    className="form-control" 
                    name="email"
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
                    name="password" 
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
                    name="confirmpassword" 
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
    );
}

Register.propTypes = {
    register: PropTypes.func.isRequired,
    createAlert: PropTypes.func.isRequired,
}

export default connect(
    null, 
    { 
        createAlert,
        register
    }
)(Register);
