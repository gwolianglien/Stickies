import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to='/'>Stickies</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto"></ul>
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link" to="/">Logout</Link>
                </li>
            </ul>
        </div>
    </nav>
)

export default Navbar