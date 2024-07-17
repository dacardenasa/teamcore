import { teamcoreAPI } from "@/src/utils/api/config";

export type Survey = {
  date: string;
  data: Question[];
};

export type Question = {
  question_id: string;
  question: string;
  answers: Answer[];
};

export type Answer = {
  answer_id: string;
  answer: string;
};

export type AnswerPayload = {
  question_id: string;
  answer_id: string | null;
};

export type AnswersBody = {
  date: string;
  data: AnswerPayload[];
};

export const surveyAPI = {
  fetchQuestions: async (): Promise<Survey> => {
    const { data } = await teamcoreAPI.get("/questions");
    return data;
  },
  sendAnswers: async (answer: AnswersBody) => {
    const response = await teamcoreAPI.post("/answer", { ...answer });
    return response;
  }
};
