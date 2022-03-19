import {ADD_POINT, SET_POINTS, LOG_IN, LOG_OUT, CHANGE_RADIUS} from "./actions";

export const addPointAction = (value) => {
    return {type: ADD_POINT, value: value};
};

export const setPointsAction = (value) => {
    return {type: SET_POINTS, value: value};
};

export const changeRadiusAction = (value) => {
    return {type: CHANGE_RADIUS, value: value};
};

export const logInAction = (value) => {
    return {type: LOG_IN, value: value};
};

export const logOutAction = () => {
    return {type: LOG_OUT};
};