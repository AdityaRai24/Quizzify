import mongoose from "mongoose";

const QuestionSchema = mongoose.Schema({
    ques:{
        type:String,
        required:true,
    },
    option1:{
        type:String,
        required:true,
    },
    option2:{
        type:String,
        required:true,
    },
    option3:{
        type:String,
        required:true,
    },
    option4:{
        type:String,
        required:true,
    },
    category:{
        type:String
    },
    correctOption:{
        type: Number,
        required:true
    },
})

const Question = mongoose.models.Question || mongoose.model("Question",QuestionSchema);
export default Question;