import { PackingItemData } from "./PackingItem";

type StatsProps = {
  items: PackingItemData[];
};

export const Stats = ({ items }: StatsProps) => {
  const allItems = items.length;

  const packed = items.filter((item) => item.packed).length;

  const percentage = Math.round(packed / allItems) * 100;

  return (
    <footer className="stats">
      <em>
        ❤️ You have {allItems} items on your list, and you already packed{" "}
        {packed} ({percentage}%)
      </em>
    </footer>
  );
};
