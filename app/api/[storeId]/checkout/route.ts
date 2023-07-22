import Stripe from "stripe";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const request = await req.json();
  const { productIds, message, messenger, phone } = request;
  // { productAmount, phone, telegram/viber, customMessage, address? }

  if (!productIds || productIds.length === 0) {
    return new NextResponse("Product ids are required", { status: 400 });
  }

  try {
    console.log(request);
    
    
    const order = await prismadb.order.create({
      data: {
        storeId: params.storeId,
        isPaid: false,
        phone,
        message,
        messenger,
        orderItems: {
          create: productIds.map((productId: string) => ({
            product: {
              connect: {
                id: productId
              }
            }
          }))
        }
      }
    });
    
    
    const successUrl = `cart?success=1`
    
    
    
    return NextResponse.json({ url: successUrl, order }, {
      headers: corsHeaders
    });
  } catch (error) {
    console.log("[ORDER_CREATE", error);
    return NextResponse.json({ url: 'cart?cancelled=1' }, { status: 406 });
  }
  };