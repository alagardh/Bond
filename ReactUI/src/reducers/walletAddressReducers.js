export const walletAddressReducers = (state = { walletAddress: [] }, action) => {
    
    switch (action.type) {
        
        case "ADD_ADDRESS":
            return { walletAddress: action.payload };
        case "REMOVE_ADDRESS":
            return { walletAddress: action.payload };
        default:
            return state;
    }
}