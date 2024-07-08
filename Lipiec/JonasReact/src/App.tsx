import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./advanced/spa/pages/home/Homepage";
import Pricing from "./advanced/spa/pages/rest/Pricing";
import Product from "./advanced/spa/pages/rest/Product";
import PageNotFound from "./advanced/spa/pages/PageNotFound";
import { AppLayout } from "./advanced/spa/layout/AppLayout";
import Login from "./advanced/spa/pages/login/Login";
import { CityList } from "./advanced/spa/components/cities/CityList";
import { CityContextProvider } from "./advanced/spa/components/cities/context/CityContext";
import { CountriesList } from "./advanced/spa/components/countries/CountriesList";
import City from "./advanced/spa/components/cities/city/City";
import Form from "./advanced/spa/components/form/Form";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
    errorElement: <PageNotFound />,
  },
  {
    path: "/pricing",
    element: <Pricing />,
  },
  {
    path: "/product",
    element: <Product />,
  },
  {
    path: "/app",
    element: (
      <CityContextProvider>
        <AppLayout />
      </CityContextProvider>
    ),
    children: [
      {
        path: "",
        element: <CityList />,
      },
      {
        path: "cities",
        element: <CityList />,
      },
      {
        path: "cities/:id",
        element: <City />,
      },
      {
        path: "countries",
        element: <CountriesList />,
      },
      {
        path: "form",
        element: <Form />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};
