import React from "react";
import Navbar from "../CustomComponents/Navbar";
import Category from "../CustomComponents/Category";
import McqQuizForm from "../CustomComponents/forms/McqQuizForm";

const McqPage = ({ searchParams }) => {
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center max-w-[85%] mx-auto h-[80vh] ">
        <div className="w-[55%]">
          <h1 className="text-6xl font-bold tracking-wide leading-[70px]">
            Choose a Category you would like to play Quiz on.
          </h1>
          <p className="text-muted-foreground text-md">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
            laboriosam cumque numquam animi! Modi nostrum obcaecati expedita
            autem, rerum odit?
          </p>
         <McqQuizForm searchParams={searchParams}/>
        </div>
        <Category />
      </div>
    </>
  );
};

export default McqPage;
