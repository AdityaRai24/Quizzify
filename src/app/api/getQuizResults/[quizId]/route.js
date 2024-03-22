import MCQQuiz from "@/models/MCQQuiz"
import { NextResponse } from "next/server"

export const runtime = "edge";

export async function GET(req,{params}){
    try {
        const quizId = params.quizId
        const response = await MCQQuiz.findById(quizId).populate("questions")
        return NextResponse.json(response)
    } catch (error) {
        return NextResponse.json(error,{status:500})
        
    }
}