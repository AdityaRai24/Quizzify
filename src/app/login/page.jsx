"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const LoginPage = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const [inputs, setInputs] = useState(initialValues);
  const router = useRouter()

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const loginData = {
        password: inputs.password,
        email: inputs.email,
        callbackUrl: "/",
        redirect: false,
      };
      const response = await signIn("credentials", loginData);
      if (response?.ok) {
        toast.success("Logged in Successfully");
        router.push("/");
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await signIn("google",{callbackUrl:'/'});
      if (response?.ok) {
        toast.success("Login Successful");
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="flex items-center justify-center w-full  h-[100vh] ">
      <div className="w-[30%]">
        <h1 className="text-4xl tracking-wide mb-1 font-bold text-center">
          Login to your Account
        </h1>
        <p className="text-muted-foreground text-sm text-center">
          Enter the credentials below to login.
        </p>
        <div className="flex flex-col gap-3 mt-5 ">
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
            Login
          </Button>
        </div>
        <p className="text-center text-sm text-muted-foreground tracking-wide my-3">
          {" "}
          OR CONTINUE WITH
        </p>
        <Button
          className="rounded-[5px] h-[40px] flex items-center justify-center w-full"
          variant="outline"
          onClick={() => handleLogin()}
        >
          <Image src={"/google.svg"} alt="google svg" width={15} height={15} className="mr-2" />
          <h1>Google</h1>
        </Button>
        <p className="text-center text-sm mt-2 text-muted-foreground">
          Dont have an account ?{" "}
          <Link href={"/signup"} className="underline">
            Signup here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
