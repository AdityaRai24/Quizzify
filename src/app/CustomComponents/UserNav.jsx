"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { ChevronDownIcon } from "@radix-ui/react-icons"
import { signOut, useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"

const UserNav = () => {
  const { data: session } = useSession();

  return (
    <div className="flex items-center justify-center gap-3">
    {!session ? (
      <>
        <Link href="/login">
          <Button
            className="py-5 px-6 rounded-[10px] active:scale-[0.94] transition duration-300 ease"
            variant="outline"
          >
            Login
          </Button>
        </Link>
        <Link href={"/signup"}>
          <Button className="py-5 px-6 rounded-[10px] active:scale-[0.94] transition duration-300 ease">
            Signup
          </Button>
        </Link>
      </>
    ) : (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="flex items-center gap-2 ">
              <Image
                src={
                  session?.user?.picture
                    ? session?.user?.picture
                    : "/Default_pfp.png"
                }
                className="rounded-full"
                width={40}
                height={40}
                alt="Profile picture"
              />
              <p>{session?.user?.username}</p>
              <ChevronDownIcon />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="p-2 border border-muted cursor-pointer px-5" onClick={() => signOut()}>
              Logout
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    )}
  </div>
  )
}

export default UserNav