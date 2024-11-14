import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account",
};

export default function Account() {
  return (
    <h2 className="font-semibold text-2xl text-accent-400 mb-7">
      Welcome, Kamil!
    </h2>
  );
}
