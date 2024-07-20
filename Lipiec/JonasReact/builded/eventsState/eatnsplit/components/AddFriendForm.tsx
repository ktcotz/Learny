import { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "./Button";
import { FriendData } from "./Friend";

type AddFriendFormProps = {
  onAddFriend: (friend: FriendData) => void;
};

export const AddFriendForm = ({ onAddFriend }: AddFriendFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    image: "https://i.pravatar.cc/48u=",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!formData.name) return;

    const newFriend = {
      ...formData,
      id: Math.random(),
      balance: 0,
    };

    onAddFriend(newFriend);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [target.name]: target.value,
    }));
  };

  return (
    <form action="#" className="form-add-friend" onSubmit={handleSubmit}>
      <label htmlFor="name">Friend name 🔱</label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />

      <label htmlFor="url">Image URL 🔱</label>
      <input
        type="text"
        id="url"
        name="image"
        value={formData.image}
        onChange={handleChange}
      />

      <Button>Add</Button>
    </form>
  );
};
