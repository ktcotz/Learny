import { QuestionData } from "./Question";

type ProgressProps = {
  questions: QuestionData[];
  currentQuestion: number;
  points: number;
};

export const Progress = ({
  questions,
  currentQuestion,
  points,
}: ProgressProps) => {
  const allPoints = questions.reduce(
    (acc, question) => (acc += question.points),
    0
  );
  return (
    <header className="progress">
      <progress max={questions.length} value={currentQuestion + 1} />

      <p>
        Question <strong>{currentQuestion + 1}</strong> / {questions.length}
      </p>
      <p>
        <strong>{points}</strong> / {allPoints}
      </p>
    </header>
  );
};
