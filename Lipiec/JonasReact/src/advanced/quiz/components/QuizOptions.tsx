import { Action, QuizGame } from "../reducer/types";
import { QuestionData } from "./Question";

type QuizOptionsProps = {
  question: QuestionData;
  dispatch: React.Dispatch<Action>;
  answer: number | null;
};

export const QuizOptions = ({
  question,
  dispatch,
  answer,
}: QuizOptionsProps) => {
  return (
    <div className="options">
      {question.options.map((option, i) => {
        return (
          <button
            className={`btn btn-option ${i === answer ? "answer" : ""} ${
              answer !== null
                ? i === question.correctOption
                  ? "correct"
                  : "wrong"
                : ""
            }`}
            key={option}
            disabled={answer !== null}
            onClick={() => dispatch({ type: QuizGame.ANSWER, payload: i })}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};
