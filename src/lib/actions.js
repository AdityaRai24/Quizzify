"use server";

import MCQQuiz from "@/models/MCQQuiz";
import Question from "@/models/Question";
import { redirect } from "next/navigation";

export async function createQuiz(searchParams, userId) {
  try {
    const category = searchParams.category;
    const allQuestions = await Question.find({ category: category });
    const shuffledQuestions = await allQuestions.sort(
      () => Math.random() - 0.5
    );
    const randomQuestions = shuffledQuestions.slice(0, 5);
    const quesIds = randomQuestions.map((item) => item._id);
    const correctAnswers = randomQuestions.map((item) => item.correctOption);
    const createQuiz = await MCQQuiz.create({
      userId: userId,
      questions: quesIds,
      correctAnswers: correctAnswers,
    });
    const quizId = createQuiz._id.toString()
    return {quizId}
  } catch (error) {
    console.log(error);
    return { error: "Error while generating Quiz.." };
  }
}
