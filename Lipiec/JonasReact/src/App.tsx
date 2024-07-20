import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./proffesional/pages/Home";
import Menu, { loader as menuLoader } from "./proffesional/features/menu/Menu";
import Cart from "./proffesional/features/cart/Cart";
import CreateOrder from "./proffesional/features/order/CreateOrder";
import Order from "./proffesional/features/order/Order";
import { AppLayout } from "./proffesional/ui/AppLayout";
import NotFound from "./proffesional/ui/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
      },
      {
        path: "/order/:id",
        element: <Order />,
      },
    ],
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};
