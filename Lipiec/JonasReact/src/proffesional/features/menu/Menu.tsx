import { useLoaderData } from "react-router";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem, { Pizza } from "./MenuItem";

function Menu() {
  const data = useLoaderData() as Pizza[];

  return (
    <ul>
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
