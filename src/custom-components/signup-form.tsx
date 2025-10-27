"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardDescription, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormLabel, FormField, FormItem, FormMessage } from "@/components/ui/form"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { MotionButton } from "./custom-button"
import { MellowInput } from "./mellow-input"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import Image from "next/image"
const formSchema = z
  .object({
    email: z.email("Please enter a valid email"),
    password: z.string().min(8, "Password should be at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm Password should be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

type SignupVal = z.infer<typeof formSchema>

export function SignupPage() {
  const router = useRouter();

  const form = useForm<SignupVal>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = async (values: SignupVal) => {
    await authClient.signUp.email(
        {
            name: values.email,
            email: values.email,
            password: values.password,
            callbackURL: "/"
        },
        {
            onSuccess: ()=>{
                router.push('/')
            },
            onError: (ctx)=>{
                toast(ctx.error.message)
            }
        }
    )
  }

  const isPending = form.formState.isSubmitting

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <Card className="w-full max-w-md bg-neutral-900 border border-neutral-800 shadow-[0_0_15px_rgba(52,211,153,0.1)]">
        <CardHeader className="text-center">
          <CardTitle className="text-gray-200 text-xl flex items-center justify-center gap-2">
            Flowseidon
            <Image src="/logo.svg" alt="logo" width={24} height={24} />
          </CardTitle>
          <CardDescription className="text-neutral-400">Join the Flow!</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-6">

                <div className="grid gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-neutral-500">Email</FormLabel>
                        <FormControl>
                          <MellowInput
                            type="email"
                            placeholder="sid@example.com"
                            error={!!form.formState.errors.email}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400/70 text-xs mt-1.5" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-neutral-500">Password</FormLabel>
                        <FormControl>
                          <MellowInput
                            type="password"
                            placeholder="* * * * * * * *"
                            error={!!form.formState.errors.password}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400/70 text-xs mt-1.5" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-neutral-500">Confirm Password</FormLabel>
                        <FormControl>
                          <MellowInput
                            type="password"
                            placeholder="Re-enter password"
                            error={!!form.formState.errors.confirmPassword}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400/70 text-xs mt-1.5" />
                      </FormItem>
                    )}
                  />

                  <MotionButton type="submit" disabled={isPending}>
                    Sign Up
                  </MotionButton>
                </div>

                <div className="flex items-center gap-2">
                  <hr className="flex-1 border-neutral-500" />
                  <span className="text-cyan-700">or</span>
                  <hr className="flex-1 border-neutral-500" />
                </div>

                <div className="flex flex-row gap-1">
                  <MotionButton type="button">
                    <Image alt='github' src="/github.svg" width={20} height={20}/>
                    with GitHub
                  </MotionButton>
                  <MotionButton type="button">
                    <Image alt='google' src="/google.svg" width={20} height={20}/>
                    with Google
                  </MotionButton>
                </div>

                <div className="text-center text-sm text-neutral-400">
                  Already have an account?{" "}
                  <Link href="/login" className="underline text-cyan-700 hover:text-cyan-500">
                    Login
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}