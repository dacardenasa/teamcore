import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { SurveyForm } from "./components/surveyForm";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Loader } from "@/src/components";
import { HomeProps } from "@/src/interfaces";
import { useSurvey } from "./useSurvey";

export const Survey = ({ navigation }: HomeProps) => {
  const {
    error,
    isPending,
    isPendingSendAnswers,
    questions,
    answers,
    isButtonDisabled,
    handleChangeAnswer,
    handleSubmitAnswers
  } = useSurvey();

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "red" }}>{error.message}</Text>
      </View>
    );
  }

  if (isPending) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#003670" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isPendingSendAnswers ? <Loader /> : null}
      <ScrollView>
        <Text style={styles.welcomeLabel}>Welcome to teamcore</Text>
        <SurveyForm
          questions={questions ?? []}
          answers={answers}
          handleChangeAnswer={handleChangeAnswer}
        />
      </ScrollView>
      <View
        style={{ width: "100%", position: "absolute", bottom: 32, left: 16 }}
      >
        <Button
          title="Send Answers"
          handlePress={handleSubmitAnswers}
          type="primary"
          disabled={isButtonDisabled}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    padding: 16,
    position: "relative"
  },
  welcomeLabel: { textAlign: "center", fontSize: 24, color: "#003670" }
});
