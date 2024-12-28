import { RouteObject } from "react-router-dom";
import { HomePrivateRoute } from "./privateRoute";
import Navbar from "../views/home/Navbar";
import HomePage from "../views/home/HomePage";
import Products from "../views/home/products/Products";
import Category from "../views/home/Category";
import AddToCart from "../views/home/AddToCart";
import Wishlists from "../views/home/Wishlists";
import ProductDetails from "../views/home/products/ProductDetails";
import OrderHistory from "../views/home/OrderHistory";

export const HomeRouter: RouteObject[] = [
  {
    path: "/home-page",
    element: <HomePrivateRoute />,
    children: [
      {
        element: <Navbar />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: "products",
            element: <Products />,
          },
          {
            path: "productDetails/:id",
            element: <ProductDetails />,
          },
          {
            path: "category",
            element: <Category />,
          },
          {
            path: "addtocart",
            element: <AddToCart />,
          },
          {
            path: "wishlists",
            element: <Wishlists />,
          },
          {
            path: "order-history",
            element: <OrderHistory />,
          },
        ],
      },
    ],
  },
];
