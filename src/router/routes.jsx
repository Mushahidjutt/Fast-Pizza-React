import { createBrowserRouter, Navigate } from "react-router-dom";
import MenuPage from "../pages/Menu/MenuPage";
import MainPage from "../pages/MainPage";




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
