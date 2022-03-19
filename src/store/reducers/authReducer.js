import {LOG_IN, LOG_OUT} from "../action/actions";

const initialState = {
    login: null,
    password: null,
    isLoggedIn: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_IN:
            return {...state, login: action.value.login, password: action.value.password, isLoggedIn: true};
        case LOG_OUT:
            return {...state, login: null, password: null, isLoggedIn: false};
        default:
            return state;
    }
};

export default authReducer;
