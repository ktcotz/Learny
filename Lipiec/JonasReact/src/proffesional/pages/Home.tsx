import CreateUser from "../features/user/CreateUser";
import { useBoundStore } from "../store/store";
import { Button } from "../ui/Button";

function Home() {
  const name = useBoundStore((state) => state.name);

  return (
    <div className="my-10 sm:my-16 text-center px-4">
      <h1 className="text-xl font-semibold mb-8 md:text-3xl">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {name === "" ? (
        <CreateUser />
      ) : (
        <Button modifier="primary" to="/menu">
          Continue ordering, {name}
        </Button>
      )}
    </div>
  );
}

export default Home;
