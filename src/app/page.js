import { Button } from "@/components/ui/button";
import Link from "next/link";
import Navbar from "./CustomComponents/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Navbar />

      <div className="flex flex-col-reverse md:flex-row items-center justify-between max-w-[90%] md:max-w-[80%] mx-auto">
        <div className="w-full md:max-w-[60%] ">
          <h1 className="text-2xl md:text-6xl font-bold tracking-wide text-left mt-[16%] leading-[25px] md:leading-[60px]">
            Play Quizzes that are Fun and Challenging...
          </h1>
          <p className="text-left mx-auto mt-5 text-muted-foreground text-xs md:text-xl ">
            Dive into a world of engaging quizzes that will test your knowledge
            and keep you entertained.
          </p>
          <Link href={"/type"}>
            <Button className="flex w-full md:w-auto items-center active:scale-[0.95] transition duration-300 ease justify-center md:justify-start mt-5 rounded-[5px] py-2 px-6 md:px-10 md:py-6">
              Start Playing !
            </Button>
          </Link>
        </div>
        <div>
          <Image src="/quiz.png" alt="Quiz logo" className="mt-[40px] md:mt-[100px] w-[120px] h-[120px] md:w-[350px] md:h-[350px]" width={350} height={300}/>
        </div>
      </div>
    </>
  );
}
