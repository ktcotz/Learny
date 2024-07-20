import { PackingItem, PackingItemData } from "./PackingItem";

type PackingListProps = {
  items: PackingItemData[];
  onDeleteItem: (id: number) => void;
  onUpdateItem: (id: number, updateObject: Partial<PackingItemData>) => void;
};

export const PackingList = ({
  items,
  onDeleteItem,
  onUpdateItem,
}: PackingListProps) => {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <PackingItem
            {...item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onUpdateItem={onUpdateItem}
          />
        ))}
      </ul>
    </div>
  );
};
