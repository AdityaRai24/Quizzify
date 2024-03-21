"use client";

import { createQuiz } from "@/lib/actions";
import { QuizCreation } from "../submitButtons";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const McqQuizForm = ({ searchParams }) => {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <form
      action={async () => {
        const userId = session?.user.id;
        if (!userId) {
          toast.error("Login To Create Quiz !!");
          return;
        }
        const response = await createQuiz(searchParams, userId);
        if (response?.error || !response?.quizId) {
          toast.error(response?.error || "Error while creating quiz");
        } else {
          router.push(`/mcq/quiz/${response.quizId}`);
          setTimeout(() => {
            toast.success("Quiz Created Successfully");
          }, 1000);
        }
      }}
    >
      <QuizCreation />
    </form>
  );
};

export default McqQuizForm;
