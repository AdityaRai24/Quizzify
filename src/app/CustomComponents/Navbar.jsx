import Link from "next/link";
import React, { Suspense } from "react";
import UserNav from "./UserNav";

const Navbar = () => {
  return (
    <div className="border border-muted-background">
      <div className="flex items-center py-5 justify-between w-[80%] mx-auto">
        <Link
          href={"/"}
          className="text-3xl text-primary font-bold tracking-wider cursor-pointer"
        >
          Quizzify
        </Link>
        <div className="flex items-center justify-center gap-5">
          <h1>Home</h1>
          <h1>About</h1>
          <h1>Play</h1>
          <h1>Contact</h1>
        </div>
        <Suspense fallback={<p>Loading weather...</p>}>
          <UserNav />
        </Suspense>
      </div>
    </div>
  );
};

export default Navbar;
