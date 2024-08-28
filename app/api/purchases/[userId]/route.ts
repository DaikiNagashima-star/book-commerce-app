import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


// Check history purchases
export async function GET(reqeust: Request, {params}: {params: {userId : string}}){
    const userId = params.userId;

    try{
        const purchases = await prisma.purchase.findMany({
            where : {userId : userId},
        });

        return NextResponse.json(purchases);
    } catch(err){
        return NextResponse.json(err);
    }
}