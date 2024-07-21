import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { UserSlice, userSlice } from "./slices/userSlice";
import { CartSlice, cartSlice } from "./slices/cartSlice";

export const useBoundStore = create<
  UserSlice & CartSlice,
  [["zustand/devtools", never], ["zustand/persist", UserSlice & CartSlice]]
>(
  devtools(
    persist(
      (...a) => ({
        ...userSlice(...a),
        ...cartSlice(...a),
      }),
      { name: "Global" }
    )
  )
);
