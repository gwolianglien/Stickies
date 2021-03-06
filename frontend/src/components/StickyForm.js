import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { postSticky } from '../actions/profile';

const StickyForm = ({ postSticky }) => {

    const [stickyForm, setValues] = useState({
        note: '',
    });

    const handleChange = event => setValues({
        ...stickyForm,
        [event.target.name]: event.target.value, 
    });

    const handleSubmit = async event => {
        event.preventDefault();
        postSticky(stickyForm);
    }

    return (
        <form onSubmit={event=>handleSubmit(event)}>
            <div className="form-group">
                <label htmlFor="note">Add a Sticky!</label>
                <input type="text" 
                    className="form-control" 
                    id="note"
                    name="note"
                    placeholder="" 
                    value={stickyForm.note}
                    onChange={event => handleChange(event)}
                />
                <button type="submit" className="btn btn-primary btn-block hide-lg">Add Your Sticky!</button>
                <small id="note" className="form-text text-muted hide-sm">Just hit enter when you're done!</small>
            </div>
        </form>
    )
}

StickyForm.propTypes = {
    postSticky: PropTypes.func.isRequired,
}

export default connect(
    null,
    {
        postSticky
    }
)(StickyForm);