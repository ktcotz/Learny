import { Action, QuizGame } from "../reducer/types";

type NextButtonProps = {
  dispatch: React.Dispatch<Action>;
  answer: number | null;
};

export const NextButton = ({ dispatch, answer }: NextButtonProps) => {
  if (!answer) return null;

  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: QuizGame.NEXT_QUESTION })}
    >
      Next
    </button>
  );
};
