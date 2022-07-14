import { AxiosResponse } from "axios";
import { getBaseAPIUrl } from "../../../config";
import axiosInstance from "../../../services/api";
import {
  SendAnswersData,
  TestFlowData,
} from "../slices/test-flow.slice";

export type TestFlow = {
  id?: string;
  test_id: number;
  status: string;
};
export type Question = {
  id?: number;
  question: string;
  title: string;
  level: number;
  test_id?: number;
  is_multiselect: boolean;
};

export type Answer = {
  id?: number;
  answer: string;
  question_id?: number;
  is_correct: boolean;
};

export type SessionQuestion = {
  question_id: number;
  is_answered: boolean;
  question: string;
};

export type TestResults = {
  sessionAnswers: { answer_id: number; is_correct: boolean }[];
  sessionQuestions: SessionQuestion[];
  testId: number;
};

// const getBaseUrlQuestions = (sessionId: number) =>
//     `${getBaseAPIUrl()}/sessions/${sessionId}`;

const getBaseSessionUrl = () => `${getBaseAPIUrl()}/sessions`;

export const startTestSessionAPI = async (
  data: TestFlowData
): Promise<AxiosResponse> => {
  return axiosInstance.post<TestFlow>(getBaseSessionUrl(), data);
};

export const getNextQuestionAPI = async (
  sessionId: string
): Promise<AxiosResponse> => {
  return axiosInstance.get<Question>(
    getBaseSessionUrl() + `/${sessionId}/next-question`
  );
};

export const getTestReportAPI = async (
  sessionId: string
): Promise<AxiosResponse<TestResults>> => {
  return axiosInstance.get<TestResults>(getBaseSessionUrl() + `/${sessionId}`);
};

const getBaseUrlAnswers = (testId: number, questionId: number) =>
  `${getBaseAPIUrl()}/tests/${testId}/questions/${questionId}/answers/`;
const getBaseUrlQuestions = (testId: number) =>
  `${getBaseAPIUrl()}/tests/${testId}/questions`;

export const getAnswersAPI = async (
  testId: number,
  questionId: number
): Promise<AxiosResponse> => {
  return axiosInstance.get<Answer[]>(getBaseUrlAnswers(testId, questionId));
};

export const getQuestionsAPI = async (
  testId: number
): Promise<AxiosResponse> => {
  return axiosInstance.get<Question[]>(getBaseUrlQuestions(testId));
};

export const sendAnswersAPI = async ({
  sessionId,
  ...data
}: SendAnswersData): Promise<AxiosResponse> => {
  return axiosInstance.post<TestFlow>(
    getBaseSessionUrl() + `/${sessionId}`,
    data
  );
};

// export const getLikesAPI = async ({ source }: LikeData): Promise<AxiosResponse<LikeCountData>> => {
//   return axiosInstance.get<LikeCountData>(getBaseUrl(), { params: { source } });
// };
