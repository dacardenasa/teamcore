import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { DropdownComponent } from "@/src/components/Dropdown";
import { QuestionsMapped } from "../adapters/apiToQuestions";
import { AnswersForm } from "../useSurvey";

import uuid from "react-native-uuid";

type _SurveyFormProps = {
  questions: QuestionsMapped[];
  answers: AnswersForm[];
  handleChangeAnswer: (questionId: string, answerId: string) => void;
};

const _SurveyForm = ({
  answers,
  questions,
  handleChangeAnswer
}: _SurveyFormProps) => (
  <View style={styles.container}>
    {questions?.map((question, index) => {
      const answer = answers.find(
        (answerId) => answerId.question_id === question.question_id
      );
      return (
        <View key={uuid.v4().toString()}>
          <Text>{`${index + 1} - ${question.question}`}</Text>
          <DropdownComponent
            questionId={question.question_id}
            value={answer?.answer_id ?? null}
            data={question.answers}
            handleChangeAnswer={handleChangeAnswer}
          />
        </View>
      );
    })}
  </View>
);

export const SurveyForm = React.memo(_SurveyForm);

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    width: "100%",
    height: "100%",
    marginTop: 16
  }
});
