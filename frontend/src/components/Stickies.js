import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Sticky = (props) => {

    const {
        id,
        note,
        status,
        date
    } = props.card;

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

    const handleSubmit = event => {
        event.preventDefault();
        
        // Send submit clause
        handleId(id);
    }

    const handleId = (id) => { console.log(id); }

    return (
        <div className="card border-primary">
            <div className="card-body">
                <span>{note}</span>
                <small id="note" className="form-text text-muted">Added on: {date}</small>

                <div className="row">
                    <div className="col-sm-3">
                        Status:
                    </div>
                    <div className="col-sm-9">
                        <form onSubmit={event => handleSubmit(event)}>
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
    
                <button type="submit" className={`btn btn-primary btn-block ${show}`}>
                    Update
                </button>
             
            </div>
        </div>
    )
}

const Stickies = ({ stickies }) => {
    return (
        <div className="container-fluid row card-columns d-flex flex-wrap">
            {stickies.map((sticky) => {
                return (
                    <div key={sticky.id} className="col-md-4">
                        <Sticky card={sticky} />
                    </div>
                )
            })}
        </div>
    )
}

Stickies.propTypes = {
    stickies: PropTypes.array
}

const mapStateToProps = state => (
    { 
        stickies: state.profile.stickies 
    }
);

export default connect(
    mapStateToProps
)(Stickies);
