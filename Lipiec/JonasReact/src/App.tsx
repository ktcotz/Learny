import { useEffect, useReducer } from "react";
import Header from "./advanced/quiz/components/Header";
import { Main } from "./popcorn/layout/Main";
import {
  Action,
  AppStatus,
  QuizDataLoading,
  State,
} from "./advanced/quiz/reducer/types";

const quizReducer = (state: State, action: Action) => {
  switch (action.type) {
    case QuizDataLoading.LOADING:
      return { ...state, status: AppStatus.READY, questions: action.payload };
    case QuizDataLoading.ERROR:
      return { ...state, status: AppStatus.ERROR };
    default:
      return state;
  }
};

const initialState: State = {
  questions: [],
  status: AppStatus.LOADING,
};

export const App = () => {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8080/questions");
        const data = await res.json();

        dispatch({ type: QuizDataLoading.LOADING, payload: data });
      } catch (err) {
        if (err instanceof Error) {
          dispatch({ type: QuizDataLoading.ERROR });
        }
      }
    };
    fetchData();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {state.status === AppStatus.LOADING && "Loading screen!"}
        <p>1/15</p>
        <p>Question?</p>
      </Main>
    </div>
  );
};
