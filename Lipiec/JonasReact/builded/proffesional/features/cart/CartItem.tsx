import { useBoundStore } from "../../store/store";
import { Button } from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";

export type CartData = {
  addIngredients?: string[];
  name?: string;
  totalPrice: number;
  unitPrice: number;
  pizzaId: string;
  quantity: number;
  removeIngredients?: string[];
};

function CartItem({ item }) {
  const deleteItem = useBoundStore((state) => state.deleteItem);

  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <Button modifier="small" onClick={() => deleteItem(pizzaId)}>
          Delete
        </Button>
      </div>
    </li>
  );
}

export default CartItem;
