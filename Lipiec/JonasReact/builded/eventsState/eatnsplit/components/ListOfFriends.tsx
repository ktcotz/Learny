import { Friend, FriendData } from "./Friend";

type ListOfFriendsProps = {
  friends: FriendData[];
  selectedFriendID: number | null;
  onSelectFriend: (id: number) => void;
};

export const ListOfFriends = ({
  friends,
  onSelectFriend,
  selectedFriendID,
}: ListOfFriendsProps) => {
  return (
    <ul>
      {friends.map((item) => (
        <Friend
          {...item}
          key={item.id}
          onSelectFriend={onSelectFriend}
          selectedFriendID={selectedFriendID}
        />
      ))}
    </ul>
  );
};
