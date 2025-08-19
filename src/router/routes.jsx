import { createBrowserRouter, Navigate } from "react-router-dom";
import MenuPage from "../pages/Menu/MenuPage";
import MainPage from "../pages/MainPage";
import Cart from "../pages/Cart";
import Order from "../pages/order";

export const routes = createBrowserRouter([
  
  {
    path: "/menupage",
    element: <MenuPage />,
  },

  {
    path: "/mainpage",
    element: <MainPage/>,
  },


  {
    path: "/cart",
    element: <Cart/>,
  },

   {
    path: "/order",
    element: <Order/>,
  },
  
  {
    path: "/home",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
    ],
  },
  {
    path: "*",
    element: <div>Page not found</div>,
  },
]);
