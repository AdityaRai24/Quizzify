import Connection from "@/lib/Connection";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req, res) {
  try {
    await Connection();
    const inputs = await req.json();
    const response = await User.findOne({ email: inputs.email });
    if (response) {
      return NextResponse.json({ msg: "User Already Exists" },{status: 500});
    } else {
      const newPass = await bcrypt.hash(inputs.password, 10);
      const create = await User.create({
        username: inputs.username,
        email: inputs.email,
        password: newPass,
        loginType: "credentials",
      });
      return NextResponse.json({ msg: "Account created successfully", create });
    }
  } catch (error) {
    throw new Error("something went wrong from route")
  }
}
