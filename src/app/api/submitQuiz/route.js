import MCQQuiz from "@/models/MCQQuiz";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const { score, quizId, userAnswers, timeTaken } = await req.json();
    const quizUpdate = await MCQQuiz.findByIdAndUpdate(quizId, {
      score: score,
      userAnswers: userAnswers,
      timeTaken,
    });
    return NextResponse.json(score);
  } catch (error) {
    return NextResponse.json({ msg: "Error while submitting quiz..." });
  }
}
