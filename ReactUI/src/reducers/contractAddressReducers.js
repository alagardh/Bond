export const contractAddressReducers = (state = { contractAddress: [] }, action) => {
    
    switch (action.type) {
        
        case "ADD_CONTRACT_ADDRESS":
            return { contractAddress: action.payload };
        case "REMOVE_ADDRESS":
            return { contractAddress: action.payload };
        default:
            return state;
    }
}