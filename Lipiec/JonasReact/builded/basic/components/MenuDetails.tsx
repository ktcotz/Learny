import { Pizza, PizzaProps } from "./Pizza";

type MenuDetailsProps = {
  pizzas: PizzaProps[];
};

export const MenuDetails = ({ pizzas }: MenuDetailsProps) => {
  return (
    <>
      <p>
        Authentic Italian cuisine. 6 creative dishes to choose from. All from
        our stone oven, all organic, all delicious.
      </p>
      <ul className="pizzas">
        {pizzas.map((pizza) => {
          return <Pizza {...pizza} key={pizza.name} />;
        })}
      </ul>
    </>
  );
};
