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
  ERROR = "data/error",
}

export type LoadingAction = {
  type: QuizDataLoading.LOADING;
  payload: QuestionData[];
};

export type LoadingErrorAction = {
  type: QuizDataLoading.ERROR;
};

export type Action = LoadingAction | LoadingErrorAction;

export type State = {
  questions: QuestionData[];
  status: AppStatus;
};
