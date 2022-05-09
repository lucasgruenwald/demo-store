export const selectCategoriesMap = (state) => {
  console.log(state)
  const categoriesMap = state.categories.categories.reduce(
    (acc, {title, items}) => {
      acc[title.toLowerCase()] = items;
      return acc
    },
    {}
  );
  return categoriesMap;
}