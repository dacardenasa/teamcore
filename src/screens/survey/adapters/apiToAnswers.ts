import { Question } from "../services/survey";

export const apiToAnswers = (questions: Question[]) => {
  if (!questions.length) return [];
  return questions.map((question) => ({
    question_id: question.question_id,
    answer_id: null
  }));
};
