import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import AiQuiz from "@/models/AIQuiz";


export async function POST(req, res) {
  try {
    const { topic, selectedAmount, userId } = await req.json();
    const amount = selectedAmount;
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    console.log(topic);
    const format = `
    [
      {
        "question": "___ team won the cricket world cup 2023.",
        "answer": " Australia"
      },
      {
        "question": "The ___ is used to set the width of an element in CSS.",
        "answer": "vw"
      },
      {
        "question": "___ CSS property is used to set the background color of an element",
        "answer": "19"
      },
      {
        "question": "Virat Kohli holds the record for the most number of runs in an ipl season that is ___.",
        "answer": "973"
      },
    ]
    `;
    const prompt = `Generate ${amount} fill in the blanks question on the topic ${topic}.
    Give the output in the following format ${format}.This format is just example...dont use this in any questions. The difficulty of all the questions should be hard
    If the topic is gibberish or you dont understand it dont create quiz on any other topic...
    Use just three continous underscores that is ___ for blanks..All questions must have atleast one and maximum also only one such blank.
    `;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    const questionsAndAnswers = JSON.parse(text);
    const create = await AiQuiz.create({
      userId: userId,
      topic: topic,
      questionsAndAnswers: questionsAndAnswers,
    });
    return NextResponse.json({ text, quizId: create._id });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
