import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";


export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const orders = await prismadb.order.findMany({
      where: {
        storeId: params.storeId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    console.log(orders);
    

    return NextResponse.json(orders);
  } catch (error) {
    console.log("[PRODUCTS_GET]: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      new NextResponse("Unauthenticated", { status: 401 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        //@ts-ignore
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

   const orders = await prismadb.order.deleteMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.log("[ORDERS_DELETE", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

