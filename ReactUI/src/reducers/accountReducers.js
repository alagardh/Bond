export const accountReducer = (state = { account: [] }, action) => {
    
    switch (action.type) {
        
        case "ADD_ACCOUNT":
            return { account: action.payload };
        case "REMOVE_ACCOUNT":
            return { account: action.payload };
        default:
            return state;
    }
}