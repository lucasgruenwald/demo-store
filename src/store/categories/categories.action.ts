// import { createAction } from '../../utils/reducer/reducer.utils';

// import CATEGORIES_ACTION_TYPES from './categories.types';


// export const fetchCategoriesStart = () => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

// export const fetchCategoriesSuccess = (catArray) =>
//   createAction(
//     CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
//     catArray
//   );

// export const fetchCategoriesFailure = (error) => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILURE, error);

import { CATEGORIES_ACTION_TYPES, Category } from './categories.types';

import { createAction, Action, ActionWithPayload, withMatcher } from "../../utils/reducer/reducer.utils";

export type FetchCategoriesStart = Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>

export type FetchCategoriesSuccess = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, Category[]>

export type FetchCategoriesFailure = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILURE, Error>


export const fetchCategoriesStart = withMatcher((): FetchCategoriesStart => 
createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START)) 
  

export const fetchCategoriesSuccess = withMatcher((catArray: Category[]): FetchCategoriesSuccess =>
  createAction(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
    catArray
  )
);

export const fetchCategoriesFailure = withMatcher((error: Error): FetchCategoriesFailure => 
  createAction(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILURE,
    error
  )
);