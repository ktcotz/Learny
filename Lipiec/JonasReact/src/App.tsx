import { useEffect, useReducer } from "react";
import Header from "./advanced/quiz/components/Header";
import { Main } from "./popcorn/layout/Main";
import {
  Action,
  AppStatus,
  QuizDataLoading,
  QuizGame,
  State,
} from "./advanced/quiz/reducer/types";
import Loader from "./advanced/quiz/components/Loader";
import Error from "./advanced/quiz/components/Error";
import { StartScreen } from "./advanced/quiz/layout/StartScreen";
import { QuestionScreen } from "./advanced/quiz/layout/QuestionScreen";
import { NextButton } from "./advanced/quiz/components/NextButton";
import { Progress } from "./advanced/quiz/components/Progress";

const quizReducer = (state: State, action: Action) => {
  switch (action.type) {
    case QuizDataLoading.RECEIVED:
      return { ...state, status: AppStatus.READY, questions: action.payload };
    case QuizDataLoading.LOADING:
      return { ...state, status: AppStatus.LOADING };
    case QuizDataLoading.ERROR:
      return { ...state, status: AppStatus.ERROR };
    case QuizGame.ACTIVE:
      return { ...state, status: AppStatus.ACTIVE };
    case QuizGame.ANSWER: {
      const currentQuestion = state.questions[state.index];

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === currentQuestion.correctOption
            ? state.points + currentQuestion.points
            : state.points,
      };
    }

    case QuizGame.NEXT_QUESTION:
      return { ...state, index: state.index + 1, answer: null };

    default:
      return state;
  }
};

const initialState: State = {
  questions: [],
  status: AppStatus.LOADING,
  index: 0,
  answer: null,
  points: 0,
};

export const App = () => {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: QuizDataLoading.LOADING });

        const res = await fetch("http://localhost:8080/questions");
        const data = await res.json();

        dispatch({ type: QuizDataLoading.RECEIVED, payload: data });
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
        {state.status === AppStatus.LOADING && <Loader />}
        {state.status === AppStatus.ERROR && <Error />}
        {state.status === AppStatus.READY && (
          <StartScreen questions={state.questions} dispatch={dispatch} />
        )}
        {state.status === AppStatus.ACTIVE && (
          <>
            <Progress
              questions={state.questions}
              currentQuestion={state.index}
              points={state.points}
            />
            <QuestionScreen
              question={state.questions[state.index]}
              dispatch={dispatch}
              answer={state.answer}
            />
            <NextButton dispatch={dispatch} answer={state.answer} />
          </>
        )}
      </Main>
    </div>
  );
};
