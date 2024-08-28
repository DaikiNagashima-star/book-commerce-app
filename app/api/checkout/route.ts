import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  try {
    // リクエストの JSON データを取得
    const { title, price, bookId, userId } = await request.json();
    console.log("Received data:", { title, price }); // デバッグ用

    // Stripe セッションを作成
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      metadata : {
        bookId : bookId
      },
      client_reference_id: userId,
      line_items: [
        {
          price_data: {
            currency: "CAD", // 通貨コードを確認
            product_data: {
              name: title,
            },
            unit_amount: Math.round(price * 100),          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:3000/book/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:3000`,
    });

    // セッションの URL を返す
    console.log("Stripe session created:", session.url);
    return NextResponse.json({ checkout_url: session.url });
  } catch (err: any) {
    console.error("Error creating Stripe session:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
