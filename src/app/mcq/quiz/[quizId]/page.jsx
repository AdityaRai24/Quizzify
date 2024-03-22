import Navbar from "@/app/CustomComponents/Navbar";
import PlayMcqQuiz from "@/app/CustomComponents/play/PlayMcqQuiz";
import axios from "axios";
import React from "react";

const page = async ({ params }) => {
  const quizId = params.quizId;

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/getQuizDetails/${quizId}`
  );
  const data = response.data
    console.log(data)

  return (
    <div>
      <Navbar />
      <PlayMcqQuiz data={data}/>
    </div>
  );
};

export default page;
