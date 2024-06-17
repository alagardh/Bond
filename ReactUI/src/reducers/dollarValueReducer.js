export const dollarValueReducer = (state = { dollarValue: [] }, action) => {
    
    switch (action.type) {
        
        case "ADD_DOLLAR_VALUE":
            return { dollarValue: action.payload };
        case "REMOVE_DOLLAR_VALUE":
            return { dollarValue: action.payload };
        default:
            return state;
    }
}