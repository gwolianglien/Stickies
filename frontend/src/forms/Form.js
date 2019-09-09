import React, { useState } from 'react';

const Form = () => {

    const [defaultForm, setValues] = useState({
        sticky: '',
    });

    const handleChange = event => setValues({
        ...defaultForm,
        [event.target.name]: event.target.value, 
    });

    const handleSubmit = async event => {
        event.preventDefault();
        alert(defaultForm.sticky);
        // Do stuff
    }

    return (
        <form onSubmit={event=>handleSubmit(event)}>
            <div className="form-group">
                <label for="sticky">Add a Sticky!</label>
                <input type="text" 
                    className="form-control" 
                    id="sticky"
                    name="sticky"
                    placeholder="" 
                    value={defaultForm.sticky}
                    onChange={event => handleChange(event)}
                />
                <small id="sticky" className="form-text text-muted">Just hit enter when you're done!</small>
            </div>
        </form>
    )
}

export default Form;