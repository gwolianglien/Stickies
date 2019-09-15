import React, { useState } from 'react';
import { connect } from 'react-redux';

const Sticky = (props) => {

    /* expected:
    props.update: update func
    props.remove: remove func
    props.details: current sticky details
    */
    const updateSticky = props.update;
    const removeSticky = props.remove;
    let {
        _id,
        note,
        status,
        date
    } = props.details;

    const [defaultState, setValues] = useState({
        status: status,
        showUpdateButton: false,
    });

    let show = defaultState.showUpdateButton ? null : 'hide';

    const handleChange = event => setValues({
        [event.target.id]: event.target.value,
        showUpdateButton: true,
    });
    
    const handleUpdate = async event => {
        event.preventDefault();
        var updates = {
            _id,
            status: defaultState.status,
        }
        updateSticky(updates);
        hideUpdateButton();
    }

    const handleRemove = async event => {
        event.preventDefault();
        removeSticky({_id});
    }

    const hideUpdateButton = () => setValues({
        showUpdateButton: false,
    })

    return (
        <div key={`${_id}`} className="card border-primary">
            <div className="card-body">
                <div className="card-header" data-toggle="collapse" data-target={`#remove-${_id}`} aria-expanded="false" aria-controls={`remove-${_id}`}>
                    <span>{note}</span>
                </div>
                {
                    date ?
                        <small id="note" className="form-text text-muted">Added on: {date.substring(0,10)}</small>
                        :
                        null
                }
                <form id={`${_id}`} onSubmit={event => handleUpdate(event)}>
                    <div className="form-group">
                        <select className="form-control form-control-sm" id="status" onChange={event => handleChange(event)} value={defaultState.status}>
                            <option>{status}</option>
                            <option value="Not Started">Haven't Started</option>
                            <option value="Stuck">Stuck</option>
                            <option value="Behind">Behind</option>
                            <option value="Almost">Almost Done</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>
                </form>
                <button form={`${_id}`} type="button" className={`btn btn-primary btn-block ${show}`} onClick={event => handleUpdate(event)}>
                    Update
                </button>

                <button type="button" className="btn btn-danger btn-block collapse" id={`remove-${_id}`} onClick={event => handleRemove(event)}>
                    Remove
                </button>
            </div>
        </div>
    )
}

export default connect()(Sticky);
