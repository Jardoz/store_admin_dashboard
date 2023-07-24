"use client";

import React, { useState } from "react";
import * as s from "zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";

import { useStoreModal } from "@/hooks/useStoreModal";
import { Modal } from "@/components/ui/modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

const formSchema = s.object({
  name: s.string().min(1),
});


export const StoreModal = () => {

  const storeModal = useStoreModal();

  const [loading, setLoading] = useState(false);

  const form = useForm<s.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: s.infer<typeof formSchema>) => {
    try {
        setLoading(true)

        const response = await axios.post('/api/stores', values)
        storeModal.addStore()

        window.location.assign(`/${response.data.id}`)
        
    } catch (error) {
        toast.error("Something went wrong🤷🏾");
    } finally {
        setLoading(false)
    }
  };

  return (
    <Modal
      title="Create Store"
      description="Add a new store to manage products and categories"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          {storeModal.count === 0 ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="E-Commerce"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="pt-6 space-x-2 flex items-center justify-end">
                  <Button
                    disabled={loading}
                    variant="outline"
                    onClick={storeModal.onClose}
                  >
                    Cancel
                  </Button>
                  <Button disabled={loading} type="submit">
                    Continue
                  </Button>
                </div>
              </form>
            </Form>
          ) : (
            <div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="store_count"
                  onCheckedChange={storeModal.onClose}
                />
                <Label htmlFor="store_count">
                  In demo version available only one store per user.
                </Label>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
