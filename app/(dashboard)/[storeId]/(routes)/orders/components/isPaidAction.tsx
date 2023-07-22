import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

import { AlertModal } from "@/components/modals/alertModal";
import { Checkbox } from "@/components/ui/checkbox";

import { OrderColumn } from "./columns";

interface IsPaidActionProps {
  data: OrderColumn;
}

export const IsPaidAction: React.FC<IsPaidActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const params = useParams();

  const onSubmit = async () => {
    const products = {
      productIds: data.productIds,
      orderId: data.id,
    };
    try {
      setLoading(true);
      await axios.patch(`/api/${params.storeId}/products`, products);

      router.refresh();
      toast.success(`✨✨ Products for this order archived ✨✨`);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/products/${params.productId}`);
      router.refresh();
      router.push(`/${params.storeId}/products`);
      toast.success(`🔥 Product deleted 🔥`);
    } catch (error) {
      toast.error(
        "Make sure you removed all dependencies using this product first."
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <Checkbox
        checked={data.isPaid}
        //@ts-ignore
        onCheckedChange={onSubmit}
      />
    </>
  );
}; 
