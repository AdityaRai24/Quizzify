import Navbar from "@/app/CustomComponents/Navbar";
import PlayAiQuiz from "@/app/CustomComponents/play/PlayAiQuiz";
import axios from "axios";
import React from "react";

const page = async ({ params }) => {
  const quizId = params.quizId;

  const response = await axios.get(
    `${process.env.API_URL}/api/getAiQuizDetails/${quizId}`
  );
  const data = response.data;
  return (
    <>
      <Navbar />
      <PlayAiQuiz createdAt={data.createdAt} userId={data.userId} quizId={quizId} topic={data.topic} questionsAndAnswers={data.questionsAndAnswers}/>
    </>
  );
};

export default page;
