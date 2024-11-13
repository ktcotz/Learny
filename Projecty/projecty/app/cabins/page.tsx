import Counter from "@/app/_components/Counter";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Cabins",
};

export default async function Cabins() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");

  const data = await res.json();

  console.log(data);

  return (
    <div>
      <h1>Cabins!</h1>
      <ul>
        {data.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      <Counter users={data} />
    </div>
  );
}
