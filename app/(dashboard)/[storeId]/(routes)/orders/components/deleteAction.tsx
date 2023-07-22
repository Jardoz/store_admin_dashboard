import { useState } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

import { AlertModal } from "@/components/modals/alertModal";

import { OrderColumn } from "./columns";
import { Button } from "@/components/ui/button";

interface DeleteActionProps {
  data: OrderColumn;
}

export const DeleteAction: React.FC<DeleteActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const params = useParams();

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/orders/${data.id}`);
      router.refresh();
      router.push(`/${params.storeId}/orders`);
      toast.success(`🔥 Order deleted 🔥`);
    } catch (error) {
      toast.error(
        " Something went wrong "
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
      <Button
        disabled={loading}
        variant="destructive"
        size="sm"
        onClick={() => setOpen(true)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </>
  );
}; 
