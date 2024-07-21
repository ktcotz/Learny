/* eslint-disable react-refresh/only-export-components */
// Test ID: IIDSAT

import { LoaderFunction, Params, useLoaderData } from "react-router";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "./../../utils/helpers";
import { CartData } from "../cart/CartItem";
import OrderItem from "./OrderItem";

export type OrderData = {
  customer: string;
  status: string;
  priority: boolean;
  id: string;
  estimatedDelivery: string;
  orderPrice: number;
  priorityPrice: number;
  cart: CartData[];
};

function Order() {
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff

  const orderLoader = useLoaderData() as OrderData;

  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    cart,
    estimatedDelivery,
  } = orderLoader;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="py-6 px-4 space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-2 6">
        <h2 className="text-xl font-semibold">Order #{id} status</h2>

        <div className="space-x-2">
          {priority && (
            <span className="rounded-full py-1 px-3 bg-red-500 text-sm uppercase font-semibold text-red-50 tracking-wide">
              Priority
            </span>
          )}
          <span className="rounded-full py-1 px-3 bg-green-500 text-sm uppercase font-semibold text-green-50 tracking-wide">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-2 bg-stone-200 py-5 px-6">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="divide-stone-200 divide-y border-b border-t">
        {cart.map((item) => (
          <OrderItem item={item} key={item.pizzaId} />
        ))}
      </ul>

      <div className="space-y-2 bg-stone-200 py-5 px-6">
        <p className="text-sm font-medium text-stone-600">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm font-medium text-stone-600">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
    </div>
  );
}

export type OrderParams = {
  params: Params<"id">;
};

export const loader: LoaderFunction = async ({ params }: OrderParams) => {
  const order = await getOrder(params.id);

  return order;
};

export default Order;
