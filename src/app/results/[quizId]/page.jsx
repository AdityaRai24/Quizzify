import Navbar from "@/app/CustomComponents/Navbar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TimerIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { differenceInSeconds } from "date-fns";
import Image from "next/image";
import React from "react";

const McqResult = async ({ params }) => {
  const quizId = params.quizId;

  const response = await axios.get(
    `http://localhost:3000/api/getQuizResults/${quizId}`
  );
  const data = response.data;

  console.log(data);

  let imageUrl;
  if (data?.score === 100) {
    imageUrl = "/gifs/80_100.gif";
  } else if (data?.score === 80) {
    imageUrl = "/gifs/60_80.gif";
  } else if (data?.score === 60) {
    imageUrl = "/gifs/40_60.gif";
  } else if (data?.score === 40) {
    imageUrl = "/gifs/20_40.gif";
  } else {
    imageUrl = "/gifs/0_20.gif";
  }

  const final = differenceInSeconds(data?.updatedAt, data?.createdAt);
  const lastTime = final - data?.timeTaken[3];

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
      <Navbar />
      <div className="flex items-center justify-center w-[80%] mt-[60px] mx-auto">
        <div className="w-full">
          <h1 className="text-4xl font-bold tracking-wide">Summary</h1>
          <div className="flex items-stretch justify-between space-x-10">
            <Card className="my-5 p-10 w-[50%] mx-auto">
              <Image
                src={imageUrl}
                className="mx-auto"
                width={200}
                height={200}
              />
              <h1 className="text-4xl max-w-[75%] pt-5 mx-auto font-bold tracking-wide leading-[40px] text-center">
                Total Points : {data?.score}
              </h1>
              <p className="text-muted-foreground text-sm text-center ">
                Your {data?.score / 20} out of 5 answers were correct
              </p>
            </Card>
            <Card className="my-5 flex items-center gap-0 justify-center flex-col w-[50%]">
              <TimerIcon className="w-[200px] h-[200px]" />
              <div className="flex flex-col items-center justify-center">
                <h1 className="text-4xl pt-5 mx-auto font-bold tracking-wide text-center">
                  Time Taken : {formatTime(final)}
                </h1>
                <p className="text-muted-foreground text-sm text-center">
                  You took a total of {formatTime(final)} to complete the
                  quiz...
                </p>
              </div>
            </Card>
          </div>
          <div>
            <div className="flex items-start justify-center flex-col mb-[50px] gap-[20px]">
              {data?.questions?.map((item, index) => {
                return (
                  <div
                    className="border flex items-center justify-between border-muted p-5 w-full rounded-[10px]
                   hover:border hover:border-muted-foreground hover:bg-muted cursor-pointer transition duration-300 ease"
                  >
                    <div className="w-[85%] ">
                      <h1 className="text-xl font-medium traking-wide">
                        {item?.ques}
                      </h1>
                      <h1 className="text-muted-foreground text-md">
                        Correct Answer :{" "}
                        {`${item?.[`option${data?.correctAnswers[index]}`]}`}
                      </h1>
                      <h1 className="text-muted-foreground text-md">
                        Your Answer:{" "}
                        {`${item?.[`option${data?.userAnswers[index]}`]}`}
                      </h1>
                    </div>
                    <div className="flex items-center justify-center w-[15%] flex-col">
                      <p className="text-muted-foreground">Time Taken</p>
                      {index === data.questions.length - 1 ? (
                        <p className="text-3xl font-bold ">{lastTime}</p>
                      ) : (
                        <p className="text-3xl font-bold ">
                          {data?.timeTaken[index - 1]
                            ? formatTime(
                                data?.timeTaken[index] -
                                  data?.timeTaken[index - 1]
                              )
                            : formatTime(data?.timeTaken[index])}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default McqResult;
