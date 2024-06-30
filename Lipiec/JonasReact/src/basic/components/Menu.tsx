import { pizzaData } from "../data";
import { MenuDetails } from "./MenuDetails";

export const Menu = () => {
  const pizzas = pizzaData;

  return (
    <main className="menu">
      <h2>Our menu</h2>
      {pizzas.length > 0 ? (
        <MenuDetails pizzas={pizzas} />
      ) : (
        <p>We're still working on our menu. Please come back later :)</p>
      )}
    </main>
  );
};
