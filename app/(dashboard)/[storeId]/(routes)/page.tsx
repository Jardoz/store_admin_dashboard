import prismadb from "@/lib/prismadb";

interface DashboardPageProps {
  params: Store;
}

type Store = {
    storeId: string
}



const DashboardPage: React.FC<DashboardPageProps> = async ({
    params
}) => {
    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId
        }
    })

  return (
    <div>DashboardPage for store -- {store?.name}</div>
  )
}

export default DashboardPage