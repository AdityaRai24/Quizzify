"use client";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

export function QuizCreation() {
    const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button
          disabled
          type="submit"
          className="my-5 px-20 py-6 rounded-[5px]"
        >
          Creating Quiz..
        </Button>
      ) : (
        <Button type="submit" className="my-5 px-6 md:w-auto w-full md:px-20 py-2 md:py-6 rounded-[5px]">
          Start Quiz
        </Button>
      )}
    </>
  );
}
