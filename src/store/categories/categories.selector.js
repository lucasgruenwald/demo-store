import { createSelector } from "reselect";

const selectCategoryReducer = (state) => state.categories;

// pure function, memoized, reruns only if input does not pass triple equality

export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
)

export const selectCategoriesMap = createSelector(
  [selectCategories], 
  (categories) => categories.reduce(
    (acc, {title, items}) => {
      acc[title.toLowerCase()] = items;
      return acc
    },{})
);