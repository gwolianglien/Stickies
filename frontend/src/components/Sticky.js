import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Sticky = (props) => {

    const updateSticky = props.update;
    const deleteSticky = props.delete;
    const {
        _id,
        note,
        status,
        date
    } = props.current;

    const [defaultState, setValues] = useState({
        status: status,
        showUpdateButton: false,
    });

    let show = defaultState.showUpdateButton ? null : 'hide';

    const handleChange = event => {
        setValues({
            [event.target.id]: event.target.value,
            showUpdateButton: true,
        });
    }

    const handleUpdate = event => {
        event.preventDefault();
        var updatedSticky = {
            _id: _id,
            note: note,
            status: defaultState.status,
            date: date,
        }
        updateSticky(updatedSticky);
    }

    const handleDelete = sticky => {
        deleteSticky(sticky)
    }

    const cleanDate = date => date.substring(0,10);

    return (
        <div key={`${_id}`} className="col-md-4">
            <div className="card border-primary">
                <div className="card-body">
                    <div className="card-header" data-toggle="collapse" href={`#collapse-${_id}`} aria-expanded="false" aria-controls={`collapse-${_id}`}>
                        <span>{note}</span>
                    </div>
                    <small id="note" className="form-text text-muted">Added / Updated: {cleanDate(date)}</small>
                    <div className="row">
                        <div className="col-sm-12">
                            <form>
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
                        </div>
                    </div>
                    <button type="submit" className={`btn btn-primary btn-block ${show}`} onClick={event => handleUpdate(event)}>
                        Update
                    </button>
                    <div className="collapse" id={`collapse-${_id}`} >
                        <button type="submit" className="btn btn-danger btn-block" onClick={() => handleDelete(props.current)}>Remove</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

Sticky.propTypes = {
    props: PropTypes.object,
}

export default connect()(Sticky);
