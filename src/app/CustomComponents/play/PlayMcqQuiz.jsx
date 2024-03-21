"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { TimerIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { LoaderIcon } from "react-hot-toast";

const PlayMcqQuiz = ({ data }) => {
  const [questionNo, setQuestionNo] = useState(1);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [answerTime, setAnswerTime] = useState([0, 0, 0, 0, 0]);
  const [timer, setTimer] = useState(0);

  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      if (!loading) {
        setTimer((prevTimer) => prevTimer + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [loading]);

  const handlePrev = () => {
    if (questionNo === 1) {
      console.log("this is the start of the quiz");
    } else {
      setQuestionNo(questionNo - 1);
    }
  };

  function calculateScore() {
    const correctAnswers = data?.correctAnswers;
    let score = 0;
    if (!answers.every(Number.isInteger)) {
      toast.error("Please answers all the questions..");
      return;
    }
    for (let i = 0; i < correctAnswers?.length; i++) {
      if (correctAnswers[i] === answers[i]) {
        score += 20;
      }
    }
    return score;
  }

  const submitQuiz = async (score) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/submitQuiz`,
        {
          score: score,
          quizId: data?._id,
          userAnswers: answers,
          timeTaken: answerTime,
        }
      );
      router.push(`/results/${data?._id}`);
      toast.success("Quiz Submitted Successfully");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.msg);
    }
  };

  const handleNext = () => {
    if (questionNo === data?.questions?.length) {
      setAnswerTime((prevAnswerTime) => {
        const updatedAnswerTime = [...prevAnswerTime];
        updatedAnswerTime[questionNo - 1] = timer;
        return updatedAnswerTime;
      });
      const score = calculateScore();
      submitQuiz(score);
    } else {
      setAnswerTime((prevAnswerTime) => {
        const updatedAnswerTime = [...prevAnswerTime];
        updatedAnswerTime[questionNo - 1] = timer;
        return updatedAnswerTime;
      });
      setQuestionNo(questionNo + 1);
    }
  };

  const handleAnswer = (optionNo) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[questionNo - 1] = optionNo;
      return updatedAnswers;
    });
  };

  function formatTime(seconds) {
    if (seconds < 60) {
      return `${seconds}s`;
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}m ${remainingSeconds}s`;
    } else {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = seconds % 60;
      if (minutes === 0 && remainingSeconds === 0) {
        return `${hours}h`;
      } else if (minutes === 0) {
        return `${hours}h ${remainingSeconds}s`;
      } else if (remainingSeconds === 0) {
        return `${hours}h ${minutes}m`;
      } else {
        return `${hours}h ${minutes}m ${remainingSeconds}s`;
      }
    }
  }

  return (
    <>
      <div className="flex items-center justify-center h-[90vh]">
        <Card className="max-w-[60%]">
          <CardHeader className="flex items-center justify-between">
            <div className="flex justify-between w-full items-stretch">
              <h1 className="bg-[white] py-2 px-5 text-black inline-block rounded-[5px] ">
                Question {questionNo} / {data?.questions?.length}
              </h1>
              <div className="bg-[white] flex items-center justify-center gap-2 rounded-[5px] py-2 text-black px-5">
                <TimerIcon />
                {formatTime(timer)}
              </div>
            </div>
            <h1 className="pt-4 font-bold text-3xl tracking-wide">
              {data?.questions[questionNo - 1]?.ques}
            </h1>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-start justify-center gap-[10px]">
              <div
                onClick={() => handleAnswer(1)}
                className={` ${
                  answers[questionNo - 1] === 1
                    ? "border border-white"
                    : " border border-muted"
                } cursor-pointer active:scale-[0.99] hover:border-white transition duration-300 ease w-full py-4 px-5 rounded-[10px]`}
              >
                {data?.questions[questionNo - 1]?.option1}
              </div>
              <div
                onClick={() => handleAnswer(2)}
                className={` ${
                  answers[questionNo - 1] === 2
                    ? "border border-white"
                    : "border border-muted"
                }  cursor-pointer active:scale-[0.99] hover:border-white transition duration-300 ease w-full py-4 px-5 rounded-[10px]`}
              >
                {data?.questions[questionNo - 1]?.option2}
              </div>
              <div
                onClick={() => handleAnswer(3)}
                className={` ${
                  answers[questionNo - 1] === 3
                    ? "border border-white"
                    : "border border-muted"
                } cursor-pointer active:scale-[0.99] hover:border-white transition duration-300 ease w-full py-4 px-5 rounded-[10px]`}
              >
                {data?.questions[questionNo - 1]?.option3}
              </div>
              <div
                onClick={() => handleAnswer(4)}
                className={` ${
                  answers[questionNo - 1] === 4
                    ? "border border-white"
                    : "border border-muted"
                }  cursor-pointer active:scale-[0.99] hover:border-white transition duration-300 ease w-full py-4 px-5 rounded-[10px]`}
              >
                {data?.questions[questionNo - 1]?.option4}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-between mb-5">
            <button
              disabled={questionNo === 1 ? true : false}
              onClick={() => handlePrev()}
              className={`bg-[white] disabled:bg-muted disabled:cursor-default disabled:scale-[1] cursor-pointer active:scale-[0.97] transition duration-300 ease w-[120px] text-center text-md tracking-wide font-medium py-2 px-5 text-black inline-block rounded-[5px] `}
            >
              Previous
            </button>

            {!loading ? (
              <>
                {questionNo === data?.questions?.length ? (
                  <h1
                    onClick={() => handleNext()}
                    className="bg-[white] cursor-pointer active:scale-[0.97] transition duration-300 ease w-[120px] text-center text-md tracking-wide font-medium py-2 px-5 text-black inline-block rounded-[5px] "
                  >
                    Submit
                  </h1>
                ) : (
                  <h1
                    onClick={() => handleNext()}
                    className="bg-[white] cursor-pointer active:scale-[0.97] transition duration-300 ease w-[120px] text-center text-md tracking-wide font-medium py-2 px-5 text-black inline-block rounded-[5px] "
                  >
                    Next
                  </h1>
                )}
              </>
            ) : (
              <>
                <button
                  disabled={true}
                  className="bg-[white] flex items-center justify-center gap-2 disabled:bg-muted disabled:cursor-default disabled:scale-[1] cursor-pointer active:scale-[0.97] transition duration-300 ease text-center text-md tracking-wide font-medium py-2 px-5 text-black rounded-[5px] "
                >
                  <LoaderIcon className="w-[50px] mr-[10px]" />
                  <p>Submitting Quiz...</p>
                </button>
              </>
            )}
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default PlayMcqQuiz;
