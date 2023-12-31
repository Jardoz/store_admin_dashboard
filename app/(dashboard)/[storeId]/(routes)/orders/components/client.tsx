"use client"

import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { DataTable } from "@/components/ui/dataTable"

import { OrderColumn, columns } from "./columns"

interface OrdersClientProps {
    data: OrderColumn[]
}

export const OrdersClient: React.FC<OrdersClientProps> = ({ data }) => {

  return (
    <>
        <Heading
          title={`Orders (${data.length})`}
          description="Manage orders for your store"
        />
      <Separator />
      <DataTable searchKey="products" columns={columns} data={data} />
    </>
  );
};