import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Actions
import { login } from '../actions/auth';

const Login = ({ login }) => {
    
    const [loginForm, setState] = useState({
        email: '',
        password: '',
    });

    const handleChange = event => setState({
        ...loginForm, 
        [event.target.name]: event.target.value,
    });

    const handleSubmit = async event => {
        event.preventDefault();
        console.log(loginForm); // TEMPORARY
        login(loginForm);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" 
                    className="form-control" 
                    name="email"
                    id="email" 
                    aria-describedby="email" 
                    placeholder=""
                    onChange={event => handleChange(event)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" 
                    className="form-control" 
                    name="password" 
                    id="password" 
                    placeholder=""
                    onChange={event => handleChange(event)}
                />
            </div>
            <button type="submit" className="btn btn-primary btn-block">Login</button>
            <small id="redirect" className="form-text text-muted"><Link to='/register'>New to Stickies?</Link></small>
        </form>
    );
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
}

export default connect(
    null,
    {
        login
    }
)(Login);
