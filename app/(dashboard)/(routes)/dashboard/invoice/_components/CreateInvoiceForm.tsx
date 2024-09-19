"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Printer, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useEffect, useRef, useState } from "react";
import { Separator } from "@/components/ui/separator";
import moment from "moment";

const formSchema = z.object({
    customerName: z.string().min(2, { message: "Customer Name must be at least 2 characters." }),
    customerEmail: z.string().email({ message: "Enter a valid email address." }),
    customerAddress: z.string().min(2, { message: "Customer Address must be at least 2 characters." }),
    customerPhone: z.string().min(2, { message: "Customer Phone must be at least 2 characters." }),
    accountId: z.string().min(2, { message: "Account ID must be at least 2 characters." }),
    paymentMethod: z.string().min(2, { message: "Payment Method must be at least 2 characters." }),
    products: z.array(
        z.object({
            productName: z.string().min(2, { message: "Product Name must be at least 2 characters." }),
            quantity: z.coerce.number().min(1, { message: "Quantity must be at least 1." }),
            price: z.coerce.number().min(0.01, { message: "Price must be at least $0.01." }),
        })
    ),
    tax: z.coerce.number(),
    discount: z.coerce.number(),
    send: z.boolean(),
});

const calculateTotal = (items: { quantity: number, price: number }[]) => {
    // Iterate over each item to calculate total quantity per item
    const quantities = items.map(item => item.quantity * item.price);

    // Calculate the final total quantity by summing up all the individual quantities
    const totalQuantity = quantities.reduce((acc, amount) => acc + amount, 0);

    return totalQuantity;
};


const CreateInvoiceForm = ({ accounts }) => {
    const invoiceRef = useRef(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            customerName: "",
            customerEmail: "",
            customerAddress: "",
            customerPhone: "",
            accountId: "",
            paymentMethod: "",
            products: [],
            tax: 0,
            discount: 0,
            send: false
        },
    });

    const { fields, append, remove } = useFieldArray({
        name: "products",
        control: form.control,
    });

    const customerName = form.watch("customerName");
    const customerPhone = form.watch("customerPhone");
    const customerAddress = form.watch("customerAddress")
    const products = form.watch("products");
    const tax = form.watch("tax");
    const discount = form.watch("discount");

    const calculateSubTotal = calculateTotal(products) ?? 0;

    const grandTotal = calculateSubTotal + (Number(tax)) - (Number(discount));

    const handlePrint = () => {
        if (invoiceRef.current) {
            const printContents = invoiceRef.current.innerHTML;
            const originalContents = document.body.innerHTML;

            document.body.innerHTML = printContents;
            window.print();
            document.body.innerHTML = originalContents;
            window.location.reload()
        } else {
            console.error("Invoice reference is not set.");
        }
    };

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    return (
        <Card>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        {/* Customer Details */}
                        <div className="grid grid-cols-2 gap-6 py-6">
                            {/* Customer form fields */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Customer Details</CardTitle>
                                </CardHeader>
                                <CardContent className="grid grid-cols-2 gap-4 py-4">
                                    <FormField
                                        control={form.control}
                                        name="customerName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Customer Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Eg. John Doe" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="customerAddress"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Customer Address</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Eg. Suame, kumasi." {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="customerEmail"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Customer Email</FormLabel>
                                                <FormControl>
                                                    <Input type="email" placeholder="Eg. johndoe@mail.com" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="customerPhone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Customer Phone</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Eg. +23345678901" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                            </Card>
                            {/* Payment Details */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Payment Details</CardTitle>
                                </CardHeader>
                                <CardContent className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="accountId"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Account</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select Account" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {accounts.map(account => (
                                                            <SelectItem key={account._id} value={account._id}>{account.accountName}</SelectItem>
                                                        ))}
        
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="paymentMethod"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Payment Method</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select payment method" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="cash">Cash</SelectItem>
                                                        <SelectItem value="momo">Momo</SelectItem>
                                                        <SelectItem value="bank">Bank</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                            </Card>
                        </div>
                        {/* Product Details */}
                        <div className="max-w-3xl mx-auto">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Product Details</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-5">
                                    {fields.map((field, index) => (
                                        <div key={field.id} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center">
                                            <FormField
                                                control={form.control}
                                                name={`products.${index}.productName`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className={cn(index !== 0 && "sr-only")}>
                                                            Product Name
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Enter Product" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name={`products.${index}.quantity`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className={cn(index !== 0 && "sr-only")}>
                                                            Quantity
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input type="number" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <div className="flex gap-2 items-center">
                                                <FormField
                                                    control={form.control}
                                                    name={`products.${index}.price`}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className={cn(index !== 0 && "sr-only")}>
                                                                Price
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Input type="number" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="icon"
                                                    onClick={() => remove(index)}
                                                >
                                                    <X className="w-4 h-4" />
                                                </Button>


                                            </div>
                                        </div>
                                    ))}
                                    <Button type="button" variant="outline" onClick={() => append({ productName: "", quantity: 1, price: 0 })} className="">
                                        Add Product
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                        {/* Tax and Discount */}
                        <div className="max-w-3xl mx-auto">
                            <div className="grid grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="tax"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Tax</FormLabel>
                                            <FormControl>
                                                <Input type="number" placeholder="Enter Tax Amount" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="discount"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Discount</FormLabel>
                                            <FormControl>
                                                <Input type="number" placeholder="Enter Discount Amount" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        {/* Subtotal and Grand Total */}
                        <div className="max-w-3xl mx-auto">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <Label>Subtotal</Label>
                                    <div className="text-lg font-semibold">${calculateSubTotal.toFixed(2)}</div>
                                </div>
                                <div>
                                    <Label>Grand Total</Label>
                                    <div className="text-lg font-semibold">${grandTotal.toFixed(2)}</div>
                                </div>
                            </div>
                        </div>
                        {/* Send invoice checkbox */}
                        <div className="max-w-3xl mx-auto">
                            <FormField
                                control={form.control}
                                name="send"
                                render={({ field }) => (
                                    <FormItem className="flex items-center space-x-2">
                                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                        <FormLabel>Send Invoice to customer Email</FormLabel>
                                    </FormItem>
                                )}
                            />
                        </div>
                        {/* Submit */}
                        <div className="flex justify-end">
                            <div className="flex gap-4">
                                <Button type="button" onClick={handlePrint} variant="outline" className="">
                                    <Printer className="h-4 w-4 mr-2" />Print Invoice
                                </Button>
                                <Button type="submit" variant="default" className="">
                                    <Printer className="h-4 w-4 mr-2" /> Print and Save Invoice
                                </Button>
                            </div>
                        </div>

                    </form>
                </Form>
                <div className="hidden">
                    <div ref={invoiceRef}>
                        <div className="max-w-[800px] mx-auto py-6">
                            <div className="text-center py-3">
                                <h1 className="text-3xl font-extrabold text-pink-600">GENUINE SERVICE CENTER</h1>
                                <h3 className="font-bold text-pink-500">MOTOR VEHICLE ELECTRICAL AND MECHANICAL WORKSHOP</h3>
                                <p className="text-pink-400">Specialist on: Audi, Opel,Golf, Mercedes Benz, Toyota, etc</p>
                                <p className="text-pink-400">P. O . Box 8869 Kumasi. Tel: 0244-489015</p>
                                <p className="text-pink-400">Location: Near Matess View Gyinyase high school road.</p>
                            </div>
                            <Separator />
                            <div className="flex justify-between items-center py-4">
                                <div>
                                    <p className="font-bold">BILL TO:</p>
                                    <p>Customer Name: {customerName}</p>
                                    {/* <p>Customer Phone: {customerPhone}</p> */}
                                    <p>Customer Address: {customerAddress}</p>
                                </div>
                                <div>
                                    <p className="font-bold">INVOICE INFO:</p>
                                    <p>Invoice No:{ }</p>
                                    <p>Date: {moment(new Date()).format("Do MMMM YYYY")}</p>
                                </div>
                            </div>
                            <Separator />
                            <div>
                                <table className="w-full border-collapse border border-gray-400">
                                    <thead>
                                        <tr >
                                            <th className="border border-gray-400 px-4 py-2">Item</th>
                                            <th className="border border-gray-400 px-4 py-2">Quantity</th>
                                            <th className="border border-gray-400 px-4 py-2">Unit Price</th>
                                            <th className="border border-gray-400 px-4 py-2">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map((product, index) => (
                                            <tr key={index}>
                                                <td className="border border-gray-400 px-4 py-2">{product.productName}</td>
                                                <td className="border border-gray-400 px-4 py-2">{product.quantity}</td>
                                                <td className="border border-gray-400 px-4 py-2">{product.price}</td>

                                                <td className="border border-gray-400 px-4 py-2">
                                                    {product.quantity * product.price}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <Separator />
                            <div className="flex justify-end items-center">
                                <div className="space-y-3 py-3">
                                    <p>Subtotal: Gh{calculateSubTotal.toFixed(2)}</p>
                                    <p>Discount: Gh{(discount).toFixed(2)}</p>
                                    <p>Tax (10%): Gh{(tax).toFixed(2)}</p>
                                    <p className="font-bold">Grand Total: ${(grandTotal).toFixed(2)}</p>
                                </div>
                            </div>
                            <Separator />
                            <div className="text-center">
                                <p>Thank you for your business!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default CreateInvoiceForm;
