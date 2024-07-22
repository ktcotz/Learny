import { useBoundStore } from "../../store/store";
import { Button } from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";

export type Pizza = {
  id: number;
  name: string;
  unitPrice: number;
  imageUrl: string;
  ingredients: string[];
  soldOut: boolean;
};

function MenuItem({
  id,
  name,
  unitPrice,
  imageUrl,
  ingredients,
  soldOut,
}: Pizza) {
  const addItem = useBoundStore((state) => state.addItem);
  const cart = useBoundStore((state) => state.cart);

  const handleAddToCart = () => {
    const item = {
      pizzaId: String(id),
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };

    console.log(cart);
    addItem(item);
  };

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex flex-col flex-grow">
        <p className="font-medium">{name}</p>
        <p className="text-sm italic text-stone-500 capitalize">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto text-sm flex items-center justify-between">
          {!soldOut ? (
            <p>{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="uppercase font-medium text-stone-500">Sold out</p>
          )}

          {!soldOut ? (
            <Button modifier="small" onClick={handleAddToCart}>
              Add to cart
            </Button>
          ) : null}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
