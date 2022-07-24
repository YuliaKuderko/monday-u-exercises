
const initialState = {
    visibleState: "allVisible"
};

const itemsViewReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;

        case "DONE_VISIBLE":
            return {...state, visibleState: "doneVisible"};

        case "ACTIVE_VISIBLE":
            return {...state, visibleState: "activeVisible"};

        case "ALL_VISIBLE":
            return {...state, visibleState: "allVisible"};
    }
};
export default itemsViewReducer;