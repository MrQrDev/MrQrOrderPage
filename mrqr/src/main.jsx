import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import StorePage from "./pages/StorePage.jsx";
import MenuOptionPage from "./pages/MenuOptionPage.jsx";
import CartOrderPage from "./pages/CartOrderPage.jsx";
import OrderPage from "./pages/OrderPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/:storeId",
        element: <StorePage />,
      },
      {
        path: "/:storeId/:stock_id",
        element: <MenuOptionPage />,
      },
      {
        path: "/:storeId/:tableNumber/cart",
        element: <CartOrderPage />,
      },
      {
        path: "/:storeId/:tableNumber/order",
        element: <OrderPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
