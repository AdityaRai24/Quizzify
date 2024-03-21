"use client"
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { TimerIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { LoaderIcon } from "react-hot-toast";
import { compareTwoStrings } from "string-similarity";

const PlayAiQuiz = ({
  userId,
  quizId,
  topic,
  questionsAndAnswers,
  createdAt,
}) => {
  let emptyArray = Array.from(
    { length: questionsAndAnswers?.length },
    () => ""
  );
  const [questionNo, setQuestionNo] = useState(1);
  const [answers, setAnswers] = useState(emptyArray);
  const [answerTime, setAnswerTime] = useState(emptyArray);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      if (!loading) {
        setTimer((prevTimer) => prevTimer + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [loading]);

  if (!session?.user.id) {
    toast.error("Login to play Quiz");
    redirect("/");
  }

  const handlePrev = () => {
    if (questionNo === 1) {
      console.log("This is the start of the quiz");
    } else {
      setQuestionNo(questionNo - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const correctAnswers = questionsAndAnswers.map((item) => item.answer);
      let totalSimilarity = correctAnswers.reduce((total, item, index) => {
        let similarity = compareTwoStrings(item, answers[index]);
        return total + similarity;
      }, 0);

      totalSimilarity = (totalSimilarity / questionsAndAnswers.length) * 100;
      let roundedNumber = totalSimilarity.toFixed(2);
      const response = await axios.post(
        `http://localhost:3000/api/submitAiQuiz`,
        {
          quizId,
          similarityPercentage: roundedNumber,
          userAnswers: answers,
          topic,
          answerTime: answerTime,
        }
      );
      if (response) {
        router.push(`/results/aiquiz/${response.data._id}`);
        toast.success("Quiz Submitted Successfully !!");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

  const handleNext = async () => {
    if (questionNo === questionsAndAnswers?.length) {
      // Update answerTime before submitting the quiz
      setAnswerTime((prevAnswerTime) => {
        const updatedAnswerTime = [...prevAnswerTime];
        updatedAnswerTime[questionNo - 1] = timer;
        return updatedAnswerTime;
      });
      handleSubmit();
    } else {
      // Update answerTime for the current question
      setAnswerTime((prevAnswerTime) => {
        const updatedAnswerTime = [...prevAnswerTime];
        updatedAnswerTime[questionNo - 1] = timer;
        return updatedAnswerTime;
      });
      setQuestionNo(questionNo + 1);
    }
  };

  const handleInputChange = (e) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionNo - 1] = e.target.value;
    setAnswers(updatedAnswers);
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
      <div className="flex items-center justify-center min-w-[50%] max-w-[50%] mx-auto h-[90vh]">
        <Card className="w-full">
          <CardHeader>
            <div>
            <div className="flex justify-between w-full items-stretch">
            <h1 className="bg-[white] font-medium py-2 px-5 text-black inline-block rounded-[5px] ">
                Question {questionNo} / {questionsAndAnswers?.length}
              </h1>
              <div className="bg-[white] flex items-center justify-center gap-2 rounded-[5px] py-2 text-black px-5">
                <TimerIcon />
                {formatTime(timer)}
              </div>
            </div>
              <h1 className="pt-4 font-medium leading-[50px] text-3xl tracking-wide">
                {questionsAndAnswers[questionNo - 1]?.question
                  .split("___")
                  .map((part, index) => (
                    <React.Fragment key={index}>
                      {part}
                      {index !==
                        questionsAndAnswers[questionNo - 1]?.question.split(
                          "___"
                        ).length -
                          1 && (
                        <input
                          type="text"
                          value={answers[questionNo - 1]}
                          onChange={(e) => handleInputChange(e)}
                          className="bg-black rounded-md font-medium text-[white] max-h-[40px] py-[2px] px-2 w-[200px] border border-muted focus:muted-foreground"
                        />
                      )}
                    </React.Fragment>
                  ))}
              </h1>
            </div>
          </CardHeader>
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
                {questionNo === questionsAndAnswers?.length ? (
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
export default PlayAiQuiz;
