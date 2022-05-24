import { createAction } from '../../utils/reducer/reducer.utils';

import CATEGORIES_ACTION_TYPES from './categories.types';

import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';

export const fetchCategoriesStart = () => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess = (catArray) =>
  createAction(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
    catArray
  );

export const fetchCategoriesFailed = (error) => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);
