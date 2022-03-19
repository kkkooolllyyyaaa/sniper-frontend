import {combineReducers} from "redux";

import authReducer from "./authReducer";
import pointsReducer from "./pointsReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    points: pointsReducer,
})

export default rootReducer