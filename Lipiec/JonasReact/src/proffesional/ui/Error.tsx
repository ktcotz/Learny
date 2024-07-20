import { useNavigate, useRouteError } from "react-router-dom";
import { LinkButton } from "./Link";

function NotFound() {
  const navigate = useNavigate();
  const error = useRouteError();

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error!.data}</p>

      <LinkButton to="-1">&larr; Back to menu</LinkButton>
    </div>
  );
}

export default NotFound;
