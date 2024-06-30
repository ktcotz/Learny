import { Balance } from "./Balance";
import { Button } from "./Button";

export type FriendData = {
  id: number;
  name: string;
  image: string;
  balance: number;
};

type FriendProps = {
  selectedFriendID: number | null;
  onSelectFriend: (id: number) => void;
};

export const Friend = ({
  id,
  name,
  image,
  balance,
  onSelectFriend,
  selectedFriendID,
}: FriendData & FriendProps) => {
  return (
    <li className={selectedFriendID === id ? "selected" : ""}>
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <Balance balance={balance} name={name} />

      <Button onClick={() => onSelectFriend(id)}>
        {selectedFriendID === id ? "Close" : "Select"}
      </Button>
    </li>
  );
};
