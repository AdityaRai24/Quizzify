import { Button } from "@/components/ui/button";
import Link from "next/link";
import Navbar from "./CustomComponents/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Navbar />

      <div className="flex items-center justify-between max-w-[80%] mx-auto">
        <div className="max-w-[60%] ">
          <h1 className="text-6xl font-bold tracking-wide text-left mt-[16%] leading-[60px]">
            Play Quizzes that are Fun and Challenging...
          </h1>
          <p className="text-left mx-auto mt-5 text-muted-foreground text-xl ">
            Dive into a world of engaging quizzes that will test your knowledge
            and keep you entertained.
          </p>
          <Link href={"/type"}>
            <Button className="flex items-center active:scale-[0.95] transition duration-300 ease justify-start mt-5 rounded-[5px] px-10 py-6">
              Start Playing !
            </Button>
          </Link>
        </div>
        <div>
          <Image src="/quiz.png" className="mt-[100px]" width={350} height={300}/>
        </div>
      </div>
    </>
  );
}
