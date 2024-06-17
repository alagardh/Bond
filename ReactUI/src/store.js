import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import { walletAddressReducers } from "./reducers/walletAddressReducers";
import { contractAddressReducers } from "./reducers/contractAddressReducers";
import { accountReducer } from "./reducers/accountReducers";
import { dollarValueReducer } from "./reducers/dollarValueReducer";

const reducer = combineReducers({
    WalletAddress: walletAddressReducers,
    ContractAddress: contractAddressReducers,
    Account: accountReducer,
    DollarValue: dollarValueReducer
});

const initialState = {};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;