import { useLoaderData } from "react-router";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem, { Pizza } from "./MenuItem";

function Menu() {
  const data = useLoaderData() as Pizza[];

  return (
    <ul className="divide-y divide-stone-200 px-2">
      {data?.map((pizza: Pizza) => (
        <MenuItem {...pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

export const loader = async () => {
  const menu = await getMenu();
  return menu;
};

export default Menu;
