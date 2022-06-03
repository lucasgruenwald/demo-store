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
import { CATEGORIES_ACTION_TYPES, Category } from "./categories.types";

import { CategoryAction } from "./categories.action";

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

export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action = {} as CategoryAction): CategoriesState => {

  switch(action.type){
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
      return { ...state, isLoading: true };
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
      return { ...state, categories: action.payload, isLoading: false };
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILURE:
      return { ...state, error: action.payload, isLoading: false };
    default:
      return state;
  }

}