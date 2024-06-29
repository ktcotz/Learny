import { Pizza, PizzaProps } from "./Pizza";

type MenuDetailsProps = {
  pizzas: PizzaProps[];
};

export const MenuDetails = ({ pizzas }: MenuDetailsProps) => {
  return (
    <>
      <ul className="pizzas">
        {pizzas.map((pizza) => {
          return <Pizza {...pizza} key={pizza.name} />;
        })}
      </ul>
    </>
  );
};
