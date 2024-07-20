import { QuestionData } from "../components/Question";
import { QuizOptions } from "../components/QuizOptions";
import { Action } from "../reducer/types";

type QuestionScreenProps = {
  question: QuestionData;
  dispatch: React.Dispatch<Action>;
  answer: number | null;
};

export const QuestionScreen = ({
  question,
  dispatch,
  answer,
}: QuestionScreenProps) => {
  return (
    <div>
      <h4>{question.question}</h4>

      <QuizOptions question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
};
