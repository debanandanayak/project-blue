'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2Icon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import z from 'zod'
import { loginSchema } from './auth.schema'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useFormStatus } from 'react-dom'
import { useRouter } from 'next/navigation'
export default function SignupForm() {
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })
    const router = useRouter()
    async function onSubmit(values: z.infer<typeof loginSchema>) {
        console.log("clicked")
        await new Promise((resolve)=>setTimeout(resolve,200))
        console.log(values)
        router.replace("/")
    }
    
    return <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
                <div className="grid gap-3">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="m@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="grid gap-3">
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex items-center">
                                    <FormLabel>Password</FormLabel>
                                </div>

                                <FormControl>
                                    <Input type="password" placeholder="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button type="submit" disabled={form.formState.isSubmitting} className="w-full">
                    {form.formState.isSubmitting ? <>Verifying<Loader2Icon className='animate-spin' /></> : "Sign up"}
                </Button>
            </div>
        </form>
    </Form>
}

function LoginButton() {
    const {pending} = useFormStatus()
    return <Button type="submit" className="w-full">
        {pending ? <Loader2Icon className='animate-spin' /> : "Login"}
    </Button>
}