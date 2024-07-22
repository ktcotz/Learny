import { LinkButton } from "../../ui/Link";
import { Button } from "../../ui/Button";
import CartItem from "./CartItem";
import { useBoundStore } from "../../store/store";
import EmptyCart from "./EmptyCart";

function Cart() {
  const name = useBoundStore((state) => state.name);
  const cart = useBoundStore((state) => state.cart);
  const clearCart = useBoundStore((state) => state.clearCart);

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Your cart, {name}</h2>

      <ul className="mt-3 divide-y divide-stone-200 border-b border-stone-200">
        {cart.map((cartItem) => (
          <CartItem key={cartItem.pizzaId} item={cartItem} />
        ))}
      </ul>

      <div className="mt-6 space-x-2">
        <Button to="/order/new">Order Pizzas</Button>
        <Button modifier="secondary" onClick={clearCart}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
