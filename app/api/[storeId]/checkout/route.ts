import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import axios from "axios";

const TELEGRAM_API_URL = 'https://api.telegram.org/'

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
  const { productIds, message, messenger, phone, name } = request;

  if (!productIds || productIds.length === 0) {
    return new NextResponse("Product ids are required", { status: 400 });
  }

  try {
    
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

    const products = await prismadb.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
    });


    const productNames = products.map((product) => product.name).join(", ")
    
    
    const successUrl = `cart?success=1`
    const successMessage = `
      You've got an order from ${name} \n
      phone number: ${phone},\n
      messenger: ${messenger},\n
      products: ${productNames}
    `;
    
     const telegramResponse = await axios.get(
       `${TELEGRAM_API_URL}bot${process.env.TEELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${process.env.TELEGRAM_CHAT_ID}&text=${successMessage}`
     );

    
    return NextResponse.json({ url: successUrl, order }, {
      headers: corsHeaders
    });
  } catch (error) {
    console.log("[ORDER_CREATE", error);
    return NextResponse.json({ url: 'cart?cancelled=1' }, { status: 406 });
  }
  };