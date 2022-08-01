import { AnyAction } from 'redux';
import { UserData } from '../../utils/firebase/firebase.utils';
import {
  signInFailure, 
  signUpFailure, 
  signOutFailure, 
  signOutSuccess,
  signInSuccess
} from './user.action'

export type UserState = {
  readonly currentUser: UserData | null;
  readonly isLoading: boolean;
  readonly error: Error | null;
}

const USER_INITIAL_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null
}

export const userReducer = (state = USER_INITIAL_STATE, action: AnyAction) => {

  if (signInSuccess.match(action)){
    return { ...state, currentUser: action.payload };
  } else if (signOutSuccess.match(action)){
    return { ...state, currentUser: null }
  }

  if (signInFailure.match(action) || signUpFailure.match(action) || signOutFailure.match(action)){
    return { ...state, error: action.payload };
  }


  return state;
};