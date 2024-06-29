import { Footer } from "./basic/components/Footer";
import { Header } from "./basic/components/Header";
import { Menu } from "./basic/components/Menu";

export const App = () => {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
};
