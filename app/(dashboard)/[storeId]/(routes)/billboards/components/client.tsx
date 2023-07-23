"use client"

import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { DataTable } from "@/components/ui/dataTable"
import { ApiList } from "@/components/ui/apiList"

import { BillboardColumn, columns } from "./columns"

interface BillboardsClientProps {
    data: BillboardColumn[]
}

export const BillboardsClient: React.FC<BillboardsClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  const description = `Manage billboards for your store \n (In demo version available only 1 billboard)`
      

  return (
    <>
      <div className="flex items-center justify-between ">
        <Heading
          title={`Billboards (${data.length})`}
          description={description}
          />
        <Button
          className="sm:ml-3"
          disabled={data.length >= 1}
          onClick={() => router.push(`/${params.storeId}/billboards/new`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="label" columns={columns} data={data} />
      <Heading title="API" description="API calls for Billboards" />
      <Separator />
      <ApiList entityName="billboards" entityIdName="billboardId"/>
    </>
  );
};