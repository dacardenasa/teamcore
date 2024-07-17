import { useMutation } from "@tanstack/react-query";
import React, { useMemo, useState } from "react";
import { AnswersBody, surveyAPI } from "./services/survey";
import { apiToAnswers } from "./adapters/apiToAnswers";
import { apiToQuestions, QuestionsMapped } from "./adapters/apiToQuestions";
import Toast from "react-native-toast-message";
import { Alert } from "react-native";
import { useRefetchOnFocus } from "@/src/hooks/useRefetchOnFocus";
import { useNavigation } from "@react-navigation/native";
import { HomeProps } from "@/src/interfaces";

export type AnswersForm = {
  question_id: string;
  answer_id: string | null;
};

export const useSurvey = () => {
  const navigation = useNavigation<HomeProps["navigation"]>();
  const [answers, setAnswers] = useState<AnswersForm[]>([]);
  const [questions, setQuestions] = useState<QuestionsMapped[] | null>(null);

  const {
    isPending,
    error,
    mutate: fetchSurveyQuestions
  } = useMutation({
    mutationFn: surveyAPI.fetchQuestions,
    onSuccess: ({ data }) => {
      const answersMapped = apiToAnswers(data);
      const questionsMapped = apiToQuestions(data);
      setQuestions(questionsMapped);
      setAnswers(answersMapped);
    }
  });

  const { isPending: isPendingSendAnswers, mutate: sendSurveyAnswers } =
    useMutation({
      mutationFn: (answers: AnswersBody) => surveyAPI.sendAnswers(answers),
      onSuccess: () => {
        Toast.show({ type: "success", text1: "Answers sent successfully" });
        Alert.alert("Survey", "do you wish to send another survey?", [
          {
            text: "Cancel",
            onPress: () => navigation.navigate("Finish"),
            style: "cancel"
          },
          {
            text: "OK",
            onPress: () =>
              setAnswers((prev) =>
                prev.map((answ) => ({ ...answ, answer_id: null }))
              )
          }
        ]);
      },
      onError: (error) => {
        Toast.show({
          type: "error",
          text1: "Error saving answers!"
        });
        console.info({ error });
      }
    });

  const handleChangeAnswer = (questionId: string, answerId: string) => {
    setAnswers((prevAnswers) =>
      prevAnswers.map((answer) =>
        answer.question_id === questionId
          ? { ...answer, answer_id: answerId }
          : answer
      )
    );
  };

  const handleSubmitAnswers = () => {
    const currentDate = new Date().toISOString();
    sendSurveyAnswers({ date: currentDate, data: answers });
  };

  const isButtonDisabled = useMemo(
    () => answers.every((answer) => !answer.answer_id),
    [answers]
  );

  useRefetchOnFocus(fetchSurveyQuestions, false, true);

  return {
    error,
    isPending,
    isPendingSendAnswers,
    questions,
    answers,
    isButtonDisabled,
    handleChangeAnswer,
    handleSubmitAnswers
  };
};
