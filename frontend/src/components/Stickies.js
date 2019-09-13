import React, { useState } from 'react';

const Sticky = (props) => {

    const [defaultState, setValues] = useState({
        status: props.card.status,
        showUpdateButton: false,
    });

    const {
        id,
        note,
        status,
        date
    } = props.card;

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

const Stickies = () => {

    const myStickes = [
        {
            id: '1',
            note: 'hello, world',
            status: 'incomplete',
            date: 'date'
        },
        {
            id: '2',
            note: 'hello, world',
            status: 'incomplete',
            date: 'date'
        },
        {
            id: '3',
            note: 'hello, world',
            status: 'incomplete',
            date: 'date'
        },
        {
            id: '4',
            note: 'hello, world',
            status: 'incomplete',
            date: 'date'
        },
        {
            id: '5',
            note: 'hello, world',
            status: 'incomplete',
            date: 'date'
        },
    ];

    return (
        <div className="container-fluid row card-columns d-flex flex-wrap">
            {
                myStickes.map((sticky) => {
                    return (
                        <div key={sticky.id} className="col-md-4">
                            <Sticky card={sticky} />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Stickies;
