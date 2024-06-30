export type PackingItemData = {
  id: number;
  description: string;
  quantity: number;
  packed: boolean;
};

type PackingProps = {
  onDeleteItem: (id: number) => void;
  onUpdateItem: (id: number, updateObject: Partial<PackingItemData>) => void;
};

export const PackingItem = ({
  id,
  description,
  quantity,
  packed,
  onDeleteItem,
  onUpdateItem,
}: PackingItemData & PackingProps) => {
  const updateItem = () => {
    onUpdateItem(id, { packed: !packed });
  };

  return (
    <li>
      <input type="checkbox" checked={packed} onChange={updateItem} />
      <span style={packed ? { textDecoration: "line-through" } : {}}>
        {quantity} {description}
      </span>
      <button onClick={() => onDeleteItem(id)}>❌</button>
    </li>
  );
};
