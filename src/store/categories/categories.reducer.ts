// import { CATEGORIES_ACTION_TYPES } from "./categories.types";

// export const CATEGORIES_INITIAL_STATE = {
//   categories: [],
//   isLoading: false,
//   error: null
// }

// export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action = {}) => {
//   const { type, payload } = action;

//   switch(type){
//     case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
//       return { ...state, isLoading: true };
//     case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
//       return { ...state, categories: payload, isLoading: false };
//     case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILURE:
//       return { ...state, error: payload, isLoading: false };
//     default:
//       return state;
//   }

// }
import { AnyAction } from "redux";
import { Category } from "./categories.types";

import { fetchCategoriesStart, fetchCategoriesSuccess, fetchCategoriesFailure } from "./categories.action";

export type CategoriesState = {
  readonly categories: Category[];
  readonly isLoading: boolean;
  readonly error: Error | null;
}

export const CATEGORIES_INITIAL_STATE: CategoriesState = {
  categories: [],
  isLoading: false,
  error: null
}

export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action: AnyAction): CategoriesState => {

  if (fetchCategoriesStart.match(action)){
    return { ...state, isLoading: true };
  }

  if (fetchCategoriesSuccess.match(action)){
    return { ...state, categories: action.payload, isLoading: false };
  }

  if (fetchCategoriesFailure.match(action)){
    return { ...state, error: action.payload, isLoading: false };
  }

  return state;

  // not type safe:
  // switch(action.type){
  //   case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
  //     return { ...state, isLoading: true };
  //   case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
  //     return { ...state, categories: action.payload, isLoading: false };
  //   case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILURE:
  //     return { ...state, error: action.payload, isLoading: false };
  //   default:
  //     return state;
  // }
}