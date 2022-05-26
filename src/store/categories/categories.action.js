import { createAction } from '../../utils/reducer/reducer.utils';

import CATEGORIES_ACTION_TYPES from './categories.types';


export const fetchCategoriesStart = () => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess = (catArray) =>
  createAction(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
    catArray
  );

export const fetchCategoriesFailure = (error) => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILURE, error);
