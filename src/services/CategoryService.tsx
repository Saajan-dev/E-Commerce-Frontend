import http from "./Interceptors";

export const getAllCategoryLists = () => {
  return http.get(`/category/category-list`);
};
