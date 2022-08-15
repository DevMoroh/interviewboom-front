import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FetchError } from "../../../interfaces/types";
import { errorAPIHandler } from "../../../utils/handleErrors";
import {
  Answer,
  getAnswersAPI,
  getNextQuestionAPI,
  getQuestionsAPI,
  getTestReportAPI,
  Question,
  sendAnswersAPI,
  startTestSessionAPI,
  TestFlow,
  TestResults,
} from "../services/test-flow.service";

export type TestFlowData = {
  testId: number;
};

export type SendAnswersData = {
  questionId: number;
  answerIds: number[];
  sessionId: string;
};

export const startTestSession = createAsyncThunk<
  TestFlow,
  TestFlowData,
  { rejectValue: FetchError }
>("getTestFlow", async (dataTest, { rejectWithValue }) => {
  try {
    const { data } = await startTestSessionAPI(dataTest);
    return data;
  } catch (error) {
    return rejectWithValue(errorAPIHandler(error));
  }
});

export const getNextQuestion = createAsyncThunk<
  { question: Question; count: number; countAnswered: number; test_id: number },
  string,
  { rejectValue: FetchError }
>("get/next-question", async (sessionId, { rejectWithValue }) => {
  try {
    const { data } = await getNextQuestionAPI(sessionId);
    return data;
  } catch (error) {
    return rejectWithValue(errorAPIHandler(error));
  }
});

export const getTestReport = createAsyncThunk<
  TestResults,
  string,
  { rejectValue: FetchError }
>("get/results", async (sessionId, { rejectWithValue }) => {
  try {
    const { data } = await getTestReportAPI(sessionId);
    return data;
  } catch (error) {
    return rejectWithValue(errorAPIHandler(error));
  }
});

export const sendAnswers = createAsyncThunk<
  TestFlow,
  SendAnswersData,
  { rejectValue: FetchError }
>("post/answers", async (dataSession, { rejectWithValue }) => {
  try {
    const { data } = await sendAnswersAPI(dataSession);
    return data;
  } catch (error) {
    return rejectWithValue(errorAPIHandler(error));
  }
});

export const getQuestions = createAsyncThunk<
  Question[],
  number,
  { rejectValue: FetchError }
>("get/questions", async (testId, { rejectWithValue }) => {
  try {
    const { data } = await getQuestionsAPI(testId);
    return data;
  } catch (error) {
    return rejectWithValue(errorAPIHandler(error));
  }
});

export const getAnswers = createAsyncThunk<
  Answer[],
  { testId: number; questionId: number },
  { rejectValue: FetchError }
>("get/answers", async ({ testId, questionId }, { rejectWithValue }) => {
  try {
    const { data } = await getAnswersAPI(testId, questionId);
    return data;
  } catch (error) {
    return rejectWithValue(errorAPIHandler(error));
  }
});

const initialState: {
  isError: boolean;
  errorMessages: string[];
  loading: boolean;
} = {
  isError: false,
  errorMessages: [],
  loading: false,
};

const testFlowSlice = createSlice({
  name: "testFlowCRUD",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => {
          return action.type.endsWith("/pending");
        },
        (state, action) => {
          state.loading = true;
        }
      )
      .addMatcher(
        (action) =>
          action.type.endsWith("/fulfilled") ||
          action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          if (
            action.type.endsWith("/rejected") &&
            Array.isArray(action.payload)
          ) {
            state.errorMessages = action.payload;
          }
        }
      )
      .addDefaultCase((state, action) => {
        state.loading = false;
      });
  },
});

const { reducer } = testFlowSlice;
export { reducer as testFlowReducer };
