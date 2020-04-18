
const initialState = {
    id:''
}

const carReducer = (State = initialState, action) => {
    if (action.type === 'CAR') {
        return {
            id: action.id
        }
    }
    return State;
}

export default carReducer;
