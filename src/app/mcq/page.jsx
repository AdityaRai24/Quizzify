import React from "react";
import Navbar from "../CustomComponents/Navbar";
import Category from "../CustomComponents/Category";
import McqQuizForm from "../CustomComponents/forms/McqQuizForm";

const McqPage = ({ searchParams }) => {
  return (
    <>
      <Navbar />
      <div className="flex mt-8 md:flex-row flex-col items-center justify-center max-w-[85%] mx-auto ">
        <div className="w-full md:w-[55%]">
          <h1 className="text-2xl md:text-6xl font-bold tracking-wide md:leading-[70px]">
            Choose a Category you would like to play Quiz on..
          </h1>
          <p className="text-muted-foreground text-xs mt-2 md:text-xl">
            Choose a category among these and start playing Quiz now !!
          </p>
         <McqQuizForm searchParams={searchParams}/>
        </div>
        <Category />
      </div>
    </>
  );
};

export default McqPage;
