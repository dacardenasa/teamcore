import { Question } from "../services/survey";

export type QuestionsMapped = {
  question_id: string;
  question: string;
  answers: { label: string; value: string }[];
};

export const apiToQuestions = (questions: Question[]): QuestionsMapped[] => {
  if (!questions.length) return [];
  return questions.map((question) => ({
    question_id: question.question_id,
    question: question.question,
    answers: question.answers.map((answer) => ({
      label: answer.answer,
      value: answer.answer_id
    }))
  }));
};
