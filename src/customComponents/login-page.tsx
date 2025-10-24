"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardDescription, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormLabel, FormField, FormItem } from "@/components/ui/form"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { MotionButton } from "./custom-button"

const formSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password should be at least 8 characters"),
})

type LoginVal = z.infer<typeof formSchema>

export function LoginPage() {
  const router = useRouter()
  const form = useForm<LoginVal>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (values: LoginVal) => {
    console.log(values)
  }

  const isPending = form.formState.isSubmitting

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <Card className="w-full max-w-md bg-neutral-900 border border-neutral-800 shadow-[0_0_15px_rgba(52,211,153,0.1)]">
        <CardHeader className="text-center">
          <CardTitle className="text-neutral-100 text-xl">Welcome back to Flowseidon!</CardTitle>
          <CardDescription className="text-neutral-400">Login to Continue</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                <div className="flex flex-col gap-4">
                  <MotionButton type="button">Continue with GitHub</MotionButton>
                  <MotionButton type="button">Continue with Google</MotionButton>
                </div>

                <div className="grid gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-neutral-300">Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="sid@example.com"
                            {...field}
                            className={cn(
                                "bg-black text-neutral-200 border border-neutral-800 rounded-md",
                                "focus:border-emerald-500 focus:ring-0 hover:border-emerald-500",
                                "!ring-0 !ring-offset-0 !focus:ring-0 !focus-visible:ring-0",
                                "hover:!border-emerald-500 focus:!border-emerald-500",
                                "transition-colors duration-200 placeholder:text-neutral-500"
                            )}
                            />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-neutral-300">Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="* * * * * * * *"
                            {...field}
                            className={cn(
                                "bg-black text-neutral-200 border border-neutral-800 rounded-md",
                                "focus:border-emerald-500 focus:ring-0 hover:border-emerald-500",
                                "!ring-0 !ring-offset-0 !focus:ring-0 !focus-visible:ring-0",
                                "hover:!border-emerald-500 focus:!border-emerald-500",
                                "transition-colors duration-200 placeholder:text-neutral-500"
                            )}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <MotionButton type="submit" disabled={isPending}>
                    Login
                  </MotionButton>
                </div>

                <div className="text-center text-sm text-neutral-400">
                  Don’t have an account?{" "}
                  <Link href="/signup" className="underline text-emerald-400 hover:text-emerald-300">
                    Signup
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
