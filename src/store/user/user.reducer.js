import USER_ACTION_TYPES from './user.types';

const USER_INITIAL_STATE = {
  currentUser: null
}

export const userReducer = (state = USER_INITIAL_STATE, action = {}) => {
  const {type, payload} = action;

  switch(type){
      case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
        return {...state, currentUser: payload};
      case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
        return { ...state, currentUser: null };
      case USER_ACTION_TYPES.SIGN_IN_FAILURE:
      case USER_ACTION_TYPES.SIGN_OUT_FAILURE:
      case USER_ACTION_TYPES.SIGN_UP_FAILURE:
        return {...state, error: payload};
      default:
        return state;
  }
};