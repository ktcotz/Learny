import { Outlet, useNavigation } from "react-router";
import CartOverview from "../features/cart/CartOverview";
import { Header } from "./Header";
import Loader from "../../../builded/advanced/quiz/components/Loader";

export const AppLayout = () => {
  const navigation = useNavigation();

  const isLoading = navigation.state === "loading";

  return (
    <div className="layout">
      {isLoading && <Loader />}

      <Header />
      <main>
        <Outlet />
      </main>

      <CartOverview />
    </div>
  );
};
