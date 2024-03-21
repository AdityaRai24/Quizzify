"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { redirect, useRouter } from "next/navigation";

const SignupPage = () => {

  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const [inputs, setInputs] = useState(initialValues);
  const router = useRouter();

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
       `${process.env.NEXT_PUBLIC_API_URL}/api/createUser`,
        inputs
      );
      let data = {};
      data.username = response.data.create.username;
      data.email = response.data.create.email;
      data.password = response.data.create.username;
      data.fromSignup = true;
      const res = await signIn("credentials", { ...data, redirect: false });
      if (res?.ok) {
        toast.success("Account created Successfully");
        router.push("/");
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await signIn("google",{callbackUrl:'/'});
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center w-full  h-[100vh] ">
      <div className="w-[30%]">
        <h1 className="text-4xl tracking-wide font-bold text-center mb-1">Create an account</h1>
        <p className="text-muted-foreground text-sm text-center">
          Enter the credentials below to create account.
        </p>
        <div className="flex flex-col gap-3 mt-5 ">
          <Input
            type="text"
            name="username"
            value={inputs.username}
            onChange={(e) => handleChange(e)}
            placeholder="Enter Username"
            className="h-[40px] rounded-[5px]"
          />
          <Input
            type="email"
            name="email"
            value={inputs.email}
            onChange={(e) => handleChange(e)}
            placeholder="Enter Email"
            className="h-[40px] rounded-[5px]"
          />
          <Input
            type="password"
            name="password"
            value={inputs.password}
            onChange={(e) => handleChange(e)}
            placeholder="Enter Password"
            className="h-[40px] rounded-[5px]"
          />
          <Button
            className="rounded-[5px] h-[40px]"
            onClick={() => handleSubmit()}
          >
            Sign Up
          </Button>
        </div>
        <p className="text-center text-sm text-muted-foreground tracking-wide my-3">
          {" "}
          OR CONTINUE WITH
        </p>
        <Button
          onClick={() => handleLogin()}
          className="rounded-[5px] h-[40px] flex items-center justify-center w-full"
          variant="outline"
        >
          <Image src={"/google.svg"} alt="google svg" width={15} height={15} className="mr-2" />
          <h1>Google</h1>
        </Button>
        <p className="text-center text-sm mt-2 text-muted-foreground">
          Already have an account ?{" "}
          <Link href={"/login"} className="underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
