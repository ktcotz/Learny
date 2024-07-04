import { QuestionData } from "../components/Question";
import { Action, QuizGame } from "../reducer/types";

type StartScreenProps = {
  questions: QuestionData[];
  dispatch: React.Dispatch<Action>;
};

export const StartScreen = ({ questions, dispatch }: StartScreenProps) => {
  const questionsLength = questions.length;

  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{questionsLength} questions to test your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: QuizGame.ACTIVE })}
      >
        Let's start
      </button>
    </div>
  );
};
