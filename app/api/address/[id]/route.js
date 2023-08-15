//todo 1.address API endpoint

//prisma - to be able to get all of our information from the superbass database 1st app-libs-prisma.js set up prisma to access info
import prisma from "@/app/libs/Prisma";
import { NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

//todo to access endpoint GET
export async function GET() {
    const supabase = createServerComponentClient({ cookies })

    try {
        //get current logged in user 
        const { data: { user } } = await supabase.auth.getUser()

        //if user we're going to throw an error
        if (!user) throw Error()

        const res = await prisma.addresses.findFirst({
            where: { user_id: user?.id }
        })

        await prisma.$disconnect();
        return NextResponse.json(res);
    } catch (error) {

        console.log(error);
        await prisma.$disconnect();
        return new NextResponse('Something went wrong', { status: 400 });
    }
}