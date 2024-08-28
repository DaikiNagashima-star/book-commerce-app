import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// Restore history of check out
export async function POST(request : Request){
    
    const {sessionId} = await request.json();
    console.log("Received sessionId:", sessionId);
    
    try{

        const session = await stripe.checkout.sessions.retrieve(sessionId);
        console.log("Stripe session retrieved:", session);

        const bookId = session.metadata?.bookId;
        const userId = session.client_reference_id!;    

        const existingPurchase = await prisma.purchase.findFirst({
            where: {
                userId: session.client_reference_id!,
                bookId: session.metadata?.bookId,
            }    
        })

        console.log("ExistingPurchase retrieved:", session);

        if(!existingPurchase){
            const purchase = await prisma.purchase.create({
                data : {
                    userId: session.client_reference_id!,
                    bookId: session.metadata?.bookId!,
                }
            })
            
            return NextResponse.json({purchase})
        } else {
            return NextResponse.json({message: "Purchase already recorded"})
        }
    }catch(err){
        return NextResponse.json(err);
    }
}