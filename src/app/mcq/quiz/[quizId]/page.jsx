import Navbar from "@/app/CustomComponents/Navbar";
import PlayMcqQuiz from "@/app/CustomComponents/play/PlayMcqQuiz";
import axios from "axios";
import React from "react";

const McqQuizPage = async ({ params }) => {
  const quizId = params.quizId;

  const response = await axios.get(
    `http://localhost:3000/api/getQuizDetails/${quizId}`
  );
  const data = response.data

  return (
    <div>
      <Navbar />
      <PlayMcqQuiz data={data}/>
    </div>
  );
};

export default McqQuizPage;
