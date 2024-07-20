/* eslint-disable react-refresh/only-export-components */
// Test ID: IIDSAT

import { LoaderFunction, useLoaderData } from "react-router";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "./../../utils/helpers";
import { CartData } from "../cart/CartItem";

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

  console.log(orderLoader);

  const { status, priority, priorityPrice, orderPrice, estimatedDelivery } =
    orderLoader;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div>
      <div>
        <h2>Status</h2>

        <div>
          {priority && <span>Priority</span>}
          <span>{status} order</span>
        </div>
      </div>

      <div>
        <p>
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p>(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>

      <div>
        <p>Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p>Price priority: {formatCurrency(priorityPrice)}</p>}
        <p>To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
      </div>
    </div>
  );
}

export type OrderParams = {
  params: {
    id: string;
  };
};

export const loader: LoaderFunction = async ({
  params: { id },
}: OrderParams) => {
  const order = await getOrder(id);

  return order;
};

export default Order;
