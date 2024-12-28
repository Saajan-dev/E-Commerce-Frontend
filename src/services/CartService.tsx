import http from "./Interceptors";

export const getAllCartData = (page = 1, size = 10) => {
  return http.get(`/cart/cart-list?page=${page}&size=${size}`);
};

export const addProductToCart = ({
  is_cart,
  quantity,
  product_id,
  cart_id,
  actionType,
}: any) => {
  return http.post(`/cart/update-cart`, {
    product_id,
    is_cart,
    quantity,
    cart_id,
    actionType,
  });
};

export const removeCartData = (cartID: string, quantity: number) => {
  return http.delete(
    `/cart/delete-cart?cart_id=${cartID}&quantity=${quantity}`
  );
};

export const orderProduct = (data: any) => {
  return http.post(`/order/`, data);
};

export const getAllOrderProduct = () => {
  return http.get(`/order/get-all-order`);
};
