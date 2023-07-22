import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: {params: { orderId: string }}
    ) {
        try {
            if(!params.orderId) {
                return new NextResponse("Product id is required", { status: 400 })
            }

            const order = await prismadb.order.findUnique({
                where: {
                    id: params.orderId,
                }
            })

            return NextResponse.json(order)
        } catch (error) {
            console.log('[ORDER_GET', error);
            return new NextResponse("Internal error", { status: 500 })
        }
}

export async function DELETE(
    req: Request,
    { params }: {params: { storeId: string, orderId: string }}
    ) {
        try {
            const { userId } = auth()

            if(!userId) {
                new NextResponse('Unauthenticated', { status: 401 })
            }

            if(!params.orderId) {
                return new NextResponse("Order id is required", { status: 400 })
            }

            const storeByUserId = await prismadb.store.findFirst({
                where: {
                    id: params.storeId,
                    //@ts-ignore
                    userId
                }
            })


            if (!storeByUserId) {
                return new NextResponse("Unauthorized", { status: 403 })
            }

            await prismadb.order.update({
                where: {
                    id: params.orderId,
                },
                data: {
                    orderItems: {
                        deleteMany: {}
                    }
                }
            })

             const order = await prismadb.order.delete({
               where: {
                 id: params.orderId,
               }
             });

            return NextResponse.json(order)
        } catch (error) {
            console.log('[ORDER_DELETE', error);
            return new NextResponse("Internal error", { status: 500 })
        }
}