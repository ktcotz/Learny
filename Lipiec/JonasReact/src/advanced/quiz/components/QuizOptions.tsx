import { Action, QuizGame } from "../reducer/types";

type QuizOptionsProps = {
  options: string[];
  dispatch: React.Dispatch<Action>;
  answer: number | null;
};

export const QuizOptions = ({
  options,
  dispatch,
  answer,
}: QuizOptionsProps) => {
  return (
    <div className="options">
      {options.map((option, i) => {
        return (
          <button
            className={`btn btn-option ${i === answer ? "answer" : ""}`}
            key={option}
            onClick={() => dispatch({ type: QuizGame.ANSWER, payload: i })}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};
