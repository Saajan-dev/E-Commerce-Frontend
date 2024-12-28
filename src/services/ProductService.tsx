import http from "./Interceptors";

export const getAllProductLists = ({
  page = 1,
  size = 10,
}: {
  page: number;
  size: number;
}) => {
  return http.get(`/product/products?page=${page}&size=${size}`);
};

export const getProductByID = ({
  page = 1,
  size = 10,
  productID,
}: {
  page: number;
  size: number;
  productID: string;
}) => {
  return http.get(
    `/product/products?page=${page}&size=${size}&product_id=${productID}`
  );
};

export const createWishlistService = (
  product_id: string,
  is_wishlist: boolean
) => {
  return http.post(`/wishlist/update-wishlist`, {
    product_id,
    is_wishlist,
  });
};

export const getAllWishListsData = (page = 1, size = 1) => {
  return http.get(`/wishlist/get-list?page=${page}&size=${size}`);
};

export const removeWishlistService = (
  product_id: string,
  wishlist_id: string,
  is_wishlist: boolean
) => {
  return http.post(`/wishlist/update-wishlist`, {
    product_id,
    wishlist_id,
    is_wishlist,
  });
};

export const getAllChatBotMessages = () => {
  return http.get(`/chatbot/get-all-messages`);
};

export const deleteAllChatBotMessages = () => {
  return http.delete(`/chatbot/delete-all-messages`);
};
