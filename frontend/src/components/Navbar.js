import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';

const Navbar = ({ authenticated, logout }) => (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to='/'>Stickies</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto"></ul>
            <ul className="navbar-nav">
                { authenticated ?
                    <li className="nav-item">
                        <Link className="nav-link" to="/" onClick={logout()}>Logout</Link>
                    </li>
                    :
                    null
                }
            </ul>
        </div>
    </nav>
)

const mapStateToProps = state => ({ authenticated: state.authenticated });

export default connect(
    mapStateToProps,
    { logout }
)(Navbar);