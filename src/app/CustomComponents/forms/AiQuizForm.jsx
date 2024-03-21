"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { LoaderIcon } from "react-hot-toast";

export function AiQuizForm() {
  const [topic, setTopic] = useState("");
  const [selectedAmount, setSelectedAmount] = useState("5");
  const [loading, setLoading] = useState(false);

  const { data: session } = useSession();
  const router = useRouter();

  const createAiQuiz = async () => {
    try {
      setLoading(true);
      if (!session) {
        setLoading(false)
        toast.error("Login to create Quiz !!");
        return;
      }
      const response = await axios.post(
        `${process.env.API_URL}/api/generateAiQuiz`,
        { topic, selectedAmount, userId: session?.user?.id }
      );
      const data = JSON.parse(response.data.text);
        const quizId = response.data.quizId
      if (Array.isArray(data)) {
        if (data.length === 5 || data.length === 10) {
          router.push(`/ai/quiz/${quizId}`);
          toast.success("Quiz Created Successfully");
          setLoading(false);
        }
      } else {
        setLoading(false);
        toast.error("Couldn't create quiz");
        return;
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
      toast.error("Error while creating quiz")
      return;
    }
  };


  return (
    <div className="flex items-center justify-center w-[35%] mx-auto mt-[100px]">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Create Quiz</CardTitle>
          <CardDescription>
            Fill the details to create your Quiz..
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="topic">Topic</Label>
                  <Input
                    name="topic"
                    onChange={(e) => setTopic(e.target.value)}
                    value={topic}
                    id="topic"
                    required
                    className="rounded-[5px] h-[45px]"
                    placeholder="Enter the topic you would like to be quizzed upon.."
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="amount">Number of Questions</Label>
                  <div className="flex items-center justify-start ">
                    <div
                      onClick={() => setSelectedAmount("5")}
                      className={` ${
                        selectedAmount === "5" ? "bg-[white] !text-[#000]" : ""
                      } px-10 cursor-pointer border border-muted rounded-l-[5px]  py-2 text-white`}
                    >
                      5
                    </div>
                    <div
                      onClick={() => setSelectedAmount("10")}
                      className={` ${
                        selectedAmount === "10" ? "bg-[white] !text-[#000]" : ""
                      } px-10 cursor-pointer border border-muted rounded-r-[5px] py-2 text-white`}
                    >
                      10
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            disabled={loading}
            onClick={() => createAiQuiz()}
            className="disabled:bg-muted-foreground rounded-[5px] h-[40px] w-full py-2"
          >
            {loading ? (
              <>
                <LoaderIcon className="w-[50px] mr-[10px]" /> Creating Quiz ...
              </>
            ) : (
              "Create Quiz"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
