import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { PrismaGetInstance } from "@/lib/prisma-pg";

interface RegisterProps{
    email: string;
    password: string;
    repeatPassword: string;
}

export async function POST(request: Request){
    const body = (await request.json()) as RegisterProps

    const {email, password, repeatPassword} = body

    if(!email || !password || !repeatPassword){
        return NextResponse.json(
            {error: "missing required fields"},
            {status: 400}
        )
    }

    const emailReg = new RegExp(
        "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
      );

    if(!emailReg.test(email)){
        return NextResponse.json(
            {error: "invalid email"},
            {status: 400}
        )
    }

    if(password.length < 8 || password !== repeatPassword){
        return NextResponse.json(
            {error: "invalid password"},
            {status: 400}
        )
    }

    const hash = bcrypt.hashSync(password, 12);

    const prisma = PrismaGetInstance();

    const user = await prisma.user.create({
      data: {
        email,
        password: hash,
      },
    });
   
}