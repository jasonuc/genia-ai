"use client"

import axios from 'axios'
import { Image } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import Heading from "@/components/Heading";
import { amountOptions, formSchema, resolutionOptions } from "./constants";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Empty from '@/components/Empty';
import Loader from '@/components/Loader';
import { cn } from '@/lib/utils';
import UserAvatar from '@/components/UserAvatar';
import BotAvatar from '@/components/BotAvatar';

export default function ImagePage() {

    const router = useRouter()
    const [ images, setImages ] = useState<string[]>([])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
            amount: "1",
            resolution: "512x512"
        }
    })

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setImages([])
            // const response = await axios.post("/api/image", values)
            // const urls = response.data.map((image: { url: string }) => image.url)
            // setImages(urls)
            
            // form.reset()
            console.log(values)
        } catch (error) {
            console.log(error)
            // TODO: Open Pro Modal
        } finally {
            router.refresh()
        }
    }

    return (
        <div>
            <Heading title="Image Generation"
                description="Turn your prompts into an image"
                icon={Image}
                iconColor="text-pink-700"
                bgColor="bg-pink-700/10" />

            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form} >
                        <form onSubmit={form.handleSubmit(onSubmit)}
                            className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2">
                            <FormField name="prompt"
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-6">
                                        <FormControl className="m-0 p-0">
                                            <Input className="border-0 outline-none focus-visible:ring-0" disabled={isLoading}
                                                placeholder="An image of a horse as a head chef in a kitchen." {...field} />
                                        </FormControl>
                                    </FormItem>
                                )} />
                            
                            <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem className='col-span-12 lg:col-span-2'>
                                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            { amountOptions.map((amount, i) => (
                                                <SelectItem key={i} value={amount.value}>{amount.label}</SelectItem>
                                            )) }
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                             />
                            
                            <FormField
                            control={form.control}
                            name="resolution"
                            render={({ field }) => (
                                <FormItem className='col-span-12 lg:col-span-2'>
                                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            { resolutionOptions.map((amount, i) => (
                                                <SelectItem key={i} value={amount.value}>{amount.label}</SelectItem>
                                            )) }
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                             />

                            <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
                                Generate
                            </Button>
                        </form>
                    </Form>
                </div>

                <div className="space-y-4 mt-4">
                    { isLoading && (
                        <div className='p-20'>
                            <Loader />
                        </div>
                    )}
                    { images.length === 0 && !isLoading && (
                        <Empty label='No images generated' />
                    ) }
                    
                    <div>
                        Images would be rendered here
                    </div>
                </div>

            </div>
        </div>
    )
}