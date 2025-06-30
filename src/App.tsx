import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./Pages/MainLayout";
import Home from "./Pages/Home";
import Products from "./Pages/Products";
import Details from "./Pages/Details";
import AddProduct from "./Pages/AddProduct";
const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/products",
          element: <Products />,
        },
        {
          path: "/product/:id",
          element: <Details />,
        },
        {
          path: "/addproduct",
          element: <AddProduct />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
