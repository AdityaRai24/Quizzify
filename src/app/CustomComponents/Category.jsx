"use client";
import { Card } from "@/components/ui/card";
import axios from "axios";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

const Category = () => {
  const [category, setCategory] = useState("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const handleClick = (categoryName) => {
    setCategory(categoryName);
    router.push(pathname + "?" + createQueryString("category", categoryName));
  };


  return (
    <div className="flex w-[45%] gap-[20px] items-center justify-center flex-wrap">
      <Card
        onClick={() => handleClick("Entertainment")}
        className={` ${
          category === "Entertainment" ? "border border-white scale-[1.05]" : ""
        } flex cursor-pointer hover:border hover:border-white hover:scale-[1.05] transition duration-300 ease w-[45%] p-10 items-center justify-center flex-col`}
      >
        <Image
          src={"/entertainment.svg"}
          alt="Entertainment"
          className="w-[120px] h-[120px]"
          width={200}
          height={200}
        />
        <h1 className="text-2xl font-medium pt-3 tracking-wider">
          Entertainment
        </h1>
      </Card>
      <Card
        onClick={() => handleClick("History")}
        className={` ${
          category === "History" ? "border border-white scale-[1.05]" : ""
        } flex cursor-pointer hover:border hover:border-white hover:scale-[1.05] transition duration-300 ease w-[45%] p-10 items-center justify-center flex-col`}
      >
        <Image
          src={"/history.svg"}
          className="w-[120px] h-[120px]"
          alt="History"
          width={200}
          height={200}
        />
        <h1 className="text-2xl font-medium pt-3 tracking-wider">History</h1>
      </Card>
      <Card
        onClick={() => handleClick("Science")}
        className={` ${
          category === "Science" ? "border border-white scale-[1.05]" : ""
        } flex cursor-pointer hover:border hover:border-white hover:scale-[1.05] transition duration-300 ease w-[45%] p-10 items-center justify-center flex-col`}
      >
        <Image
          src={"/science.svg"}
          alt="Science"
          className="w-[120px] h-[120px]"
          width={200}
          height={200}
        />
        <h1 className="text-2xl font-medium pt-3 tracking-wider">Science</h1>
      </Card>
      <Card
        onClick={() => handleClick("Sports")}
        className={` ${
          category === "Sports" ? "border border-white scale-[1.05]" : ""
        } flex cursor-pointer hover:border hover:border-white hover:scale-[1.05] transition duration-300 ease  w-[45%] p-10 items-center justify-center flex-col`}
      >
        <Image
          src={"/sports.svg"}
          alt="Sports"
          className="w-[120px] h-[120px]"
          width={200}
          height={200}
        />
        <h1 className="text-2xl font-medium pt-3 tracking-wider">Sports</h1>
      </Card>
    </div>
  );
};

export default Category;
