import { ChangeEvent, FormEvent, useState } from "react";
import { PackingItemData } from "./PackingItem";

type FormProps = {
  onAddItem: (item: PackingItemData) => void;
};

export const Form = ({ onAddItem }: FormProps) => {
  const [formData, setFormData] = useState({
    description: "",
    quantity: 1,
  });

  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault();

    if (!formData.description) return;

    onAddItem({ id: Math.random(), ...formData, packed: false });

    setFormData({
      description: "",
      quantity: 1,
    });
  };

  const handleChange = (
    ev: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = ev.target;

    setFormData((prevData) => ({
      ...prevData,
      [target.name]: target.value,
    }));
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 🧓 trip</h3>
      <select
        name="quantity"
        id="quantity"
        value={formData.quantity}
        onChange={handleChange}
      >
        {Array.from({ length: 20 }, (_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={formData.description}
        name="description"
        onChange={handleChange}
      />
      <button>Add</button>
    </form>
  );
};
