import {ADD_POINT, CHANGE_RADIUS, SET_POINTS} from "../action/actions";

const initialState = {
    points: [],
    radius: null
};

export const pointsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POINT:
            return {...state, points: [...state.points, action.value]};
        case CHANGE_RADIUS:
            return {...state, radius: action.value};
        case SET_POINTS:
            return {points: [...action.value]};
        default:
            return state;
    }
};

export default pointsReducer;
