import { QuestionData } from "../components/Question";

export enum AppStatus {
  LOADING = "loading",
  ERROR = "error",
  ACTIVE = "active",
  FINISHED = "finished",
  READY = "ready",
}

export enum QuizDataLoading {
  LOADING = "data/loading",
  RECEIVED = "data/received",
  ERROR = "data/error",
}

export enum QuizGame {
  ACTIVE = "quiz/active",
  ANSWER = "quiz/answer",
}

export type LoadingQuiz = {
  type: QuizDataLoading.LOADING;
};

export type ReceivedDataAction = {
  type: QuizDataLoading.RECEIVED;
  payload: QuestionData[];
};

export type LoadingErrorAction = {
  type: QuizDataLoading.ERROR;
};

export type QuizActive = {
  type: QuizGame.ACTIVE;
};

export type QuizAnswer = {
  type: QuizGame.ANSWER;
  payload: number;
};

export type Action =
  | ReceivedDataAction
  | LoadingErrorAction
  | LoadingQuiz
  | QuizActive
  | QuizAnswer;

export type State = {
  questions: QuestionData[];
  status: AppStatus;
  index: number;
  answer: number | null;
};
