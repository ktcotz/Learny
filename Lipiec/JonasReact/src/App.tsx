import { useState } from "react";
import { ListOfFriends } from "./eventsState/eatnsplit/components/ListOfFriends";
import { AddFriendForm } from "./eventsState/eatnsplit/components/AddFriendForm";
import { Button } from "./eventsState/eatnsplit/components/Button";
import { SplitBillForm } from "./eventsState/eatnsplit/components/SplitBillForm";
import { FriendData } from "./eventsState/eatnsplit/components/Friend";

export const App = () => {
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriendID, setSelectedFriendID] = useState<number | null>(null);
  const [showAddFriendForm, setShowAddFriendForm] = useState(false);

  const addFriend = (friend: FriendData) => {
    setFriends((prevFriends) => [...prevFriends, friend]);
    setShowAddFriendForm(false);
  };

  const selectFriend = (id: number) => {
    setSelectedFriendID(id === selectedFriendID ? null : id);
  };

  return (
    <div className="app">
      <div className="sidebar">
        <ListOfFriends
          friends={friends}
          selectedFriendID={selectedFriendID}
          onSelectFriend={selectFriend}
        />
        {showAddFriendForm && <AddFriendForm onAddFriend={addFriend} />}
        <Button onClick={() => setShowAddFriendForm((prev) => !prev)}>
          {showAddFriendForm ? "Close" : "Add Friend"}
        </Button>
      </div>
      {selectedFriendID && (
        <SplitBillForm
          friend={friends.filter((friend) => friend.id === selectedFriendID)[0]}
        />
      )}
    </div>
  );
};

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];
