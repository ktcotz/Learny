import { Link } from "react-router-dom";
import { useBoundStore } from "../../store/store";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  const cart = useBoundStore((state) => state.cart);

  const totalQuantity = cart.reduce((acc, next) => (acc += next.quantity), 0);
  const totalPrice = cart.reduce((acc, next) => (acc += next.totalPrice), 0);

  if (!totalQuantity) return null;

  return (
    <div className="flex items-center justify-between bg-stone-800 text-stone-200 uppercase text-sm p-4 sm:px-6 md:text-base">
      <p className="text-stone-300 font-semibold space-x-4 sm:space-x-6">
        <span>{totalQuantity} pizzas</span>
        <span>{formatCurrency(totalPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
