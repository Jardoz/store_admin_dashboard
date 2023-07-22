"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IsPaidAction } from "./isPaidAction";
import { DeleteAction } from "./deleteAction";

export type OrderColumn = {
  id: string;
  phone: string;
  messenger: string;
  message: string;
  totalPrice: string;
  products: string;
  productIds: string[],
  isPaid: boolean;
  createdAt: string;
};

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "messenger",
    header: "Messenger",
  },
  {
    accessorKey: "totalPrice",
    header: "Total price",
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
    cell: ({ row }) => <IsPaidAction data={row.original} />,
  },
  {
    accessorKey: "message",
    header: "Notes",
  },
  {
    accessorKey: "deleteAction",
    header: "Delete",
    cell: ({ row }) => <DeleteAction data={row.original} />,
  },
];
