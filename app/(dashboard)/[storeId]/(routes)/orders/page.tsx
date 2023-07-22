import prismadb from "@/lib/prismadb";
import { format } from "date-fns"

import { OrdersClient } from "./components/client";
import { OrderColumn } from "./components/columns";
import { formatter } from "@/lib/utils";


const Orders = async ({
  params
}: {
  params: { storeId: string }
}) => {
  const orders = await prismadb.order.findMany({
    where: {
      storeId: params.storeId
    }, 
    include: {
      orderItems: {
        include: {
          product: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  const formattedOrders: OrderColumn[] = orders.map((item) => ({
    id: item.id,
    phone: item.phone,
    messenger: item.messenger,
    message: item.message,
    products: item.orderItems.map((orderItem) => orderItem.product.name).join(', '),
    productIds: item.orderItems.map(orderItem => orderItem.product.id),
    totalPrice: formatter.format(item.orderItems.reduce((acc, rec) => {
      return acc + Number(rec.product.price)
    }, 0)),
    isPaid: item.isPaid,
    createdAt: format(item.createdAt, "MMMM do, yyyy")
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6 sm:p-6 ">
        <OrdersClient data={formattedOrders} />
      </div>
    </div>
  );
}

export default Orders;