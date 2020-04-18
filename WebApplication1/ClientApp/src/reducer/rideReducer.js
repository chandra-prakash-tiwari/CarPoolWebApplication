const initialState = {
    from: '',
    to: '',
    date: '',
    time:''
}


const rideReducer = (State = initialState, action) => {
    if (action.type === 'RIDES') {
        return State;
    }
    return State;
}

export default rideReducer;
