// import { createSelector } from "reselect";

// const selectCategoryReducer = (state) => state.categories;

// // pure function, memoized, reruns only if input does not pass triple equality

// export const selectCategories = createSelector(
//   [selectCategoryReducer],
//   (categoriesSlice) => categoriesSlice.categories
// )

// export const selectCategoriesMap = createSelector(
//   [selectCategories], 
//   (categories) => categories.reduce(
//     (acc, {title, items}) => {
//       acc[title.toLowerCase()] = items;
//       return acc
//     },{})
// );

// export const selectCategoriesIsLoading = createSelector(
//   [selectCategoryReducer],
//   (categoriesSlice) => categoriesSlice.isLoading
// );
import { createSelector } from "reselect";

import { CategoriesState } from "./categories.reducer";
import { CategoryMap } from "./categories.types";


const selectCategoryReducer = (state): CategoriesState => state.categories;


export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
)

export const selectCategoriesMap = createSelector(
  [selectCategories], 
  (categories): CategoryMap => 
    categories.reduce((acc, {title, items}) => {
      acc[title.toLowerCase()] = items;
      return acc
    },{} as CategoryMap)
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
);
