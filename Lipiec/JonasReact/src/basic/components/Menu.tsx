import { pizzaData } from "../data";
import { MenuDetails } from "./MenuDetails";

export const Menu = () => {
  const pizzas = pizzaData;

  return (
    <div className="menu">
      <h2>Our menu</h2>

      <MenuDetails pizzas={pizzas} />
    </div>
  );
};
