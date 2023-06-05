"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { getCart } from "@/lib/cart";
import { useToast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";
import { CreateOrderRequest } from "@/types";

export const shippingFormSchema = z.object({
  name: z.string().nonempty({
    message: "Please enter your name.",
  }),
  phoneNumber: z.string().nonempty({
    message: "Please enter your phone number.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  address: z.string().nonempty({
    message: "Please enter your address.",
  }),
});

interface ShippingInfoFormProps {
  checkout: (orderInfo: CreateOrderRequest) => Promise<void>;
}

export function ShippingInfoForm({ checkout }: ShippingInfoFormProps) {
  const form = useForm<z.infer<typeof shippingFormSchema>>({
    resolver: zodResolver(shippingFormSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      email: "",
      address: "",
    },
  });

  const { toast } = useToast();

  function onSubmit(values: z.infer<typeof shippingFormSchema>) {
    const cart = getCart()
    if (cart.items.length < 1) {
      return toast({
        variant: "destructive",
        title: "Uh oh! Your cart is empty",
        description: "Add some items to your cart before checking out.",
      })
    }
    checkout({
      shippingInfo: values,
      cart
    })
  }

  return (
    <Form {...form}>
      <h1 className="text-3xl font-bold mb-3">Shipping Info</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-6 sm:grid-col-1 gap-3">
          <div className="col-span-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-3">
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone number</FormLabel>
                  <FormControl>
                    <Input placeholder="Phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button type="submit" className="w-full">Checkout</Button>
      </form>
    </Form>
  );
}
