import AiQuiz from "@/models/AIQuiz";
import { NextResponse } from "next/server";


export async function POST(req, res) {
  try {
    const { similarityPercentage,topic, quizId, userAnswers,answerTime } = await req.json();
    const quizUpdate = await AiQuiz.findByIdAndUpdate(quizId, {
      similarityPercentage: similarityPercentage,
      userAnswers: userAnswers,
      topic,
      timeTaken: answerTime
    });
    return NextResponse.json(quizUpdate);
  } catch (error) {
    console.log(error)
    return NextResponse.json({ msg: "Error while submitting quiz..." },{status:500});
  }
}
