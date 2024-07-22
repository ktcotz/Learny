import { StateCreator } from "zustand";

export type UserSlice = {
  name: string;
  updateName: (name: string) => void;
};

export const userSlice: StateCreator<UserSlice, [], [], UserSlice> = (set) => ({
  name: "",
  updateName: (name) =>
    set(() => ({
      name,
    })),
});
