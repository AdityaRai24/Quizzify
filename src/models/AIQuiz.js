import mongoose from "mongoose";

const QuestionAnswerSchema = mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
});

const AiQuizSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    topic:{
      type:String,
      required:true
    },
    questionsAndAnswers: {
      type: [QuestionAnswerSchema],
      default: [],
      required: true,
    },
    userAnswers:[{
      type:String
    }],
    timeTaken:[{
      type:Number,
    }],
    similarityPercentage:{
      type:String,
    }
  },
  { timestamps: true }
);

const AiQuiz = mongoose.models.AiQuiz || mongoose.model("AiQuiz", AiQuizSchema);
export default AiQuiz;
