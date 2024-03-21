import mongoose from "mongoose";

const quizSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question"
    }],
    score: {
        type: Number
    },
    correctAnswers: [{
        type: Number
    }], 
    timeTaken:[{
        type:Number,
      }],
    userAnswers: [{
        type: Number
    }]
}, { timestamps: true });

const MCQQuiz = mongoose.models.MCQQuiz || mongoose.model("MCQQuiz", quizSchema);
export default MCQQuiz;
