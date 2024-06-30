import { Button } from "./Button";
import { FriendData } from "./Friend";

type SplitBillFormProps = {
  friend: FriendData;
};

export const SplitBillForm = ({ friend }: SplitBillFormProps) => {
  console.log(friend);
  return (
    <form action="#" className="form-split-bill">
      <h2>Split bill with {friend.name}</h2>

      <label htmlFor="bill">Bill value 🔱</label>
      <input type="text" id="bill" />

      <label htmlFor="you">Your expense 🔱</label>
      <input type="text" id="you" />

      <label htmlFor="friend">{friend.name} expense 🔱</label>
      <input type="text" id="friend" disabled />

      <label htmlFor="pay">Who is paying the bill 🔱</label>
      <select name="pay" id="pay">
        <option value="user">You</option>
        <option value="friend">{friend.name}</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
};
