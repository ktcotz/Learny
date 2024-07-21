import { FormEvent, useState } from "react";
import { Button } from "../../ui/Button";
import { useBoundStore } from "../../store/store";
import { useNavigate } from "react-router";

function CreateUser() {
  const updateName = useBoundStore((state) => state.updateName);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    updateName(username);
    setUsername("");
    navigate("/menu");
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-4 text-sm text-stone-600 md:text-base">
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input w-72 mb-8"
      />

      {username !== "" && (
        <div>
          <Button>Start ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
