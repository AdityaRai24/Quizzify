import AiQuiz from "@/models/AIQuiz";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const quizId = params.quizId;
    const response = await AiQuiz.findById(quizId);
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
