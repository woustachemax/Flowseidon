"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardDescription, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormLabel, FormField, FormItem, FormMessage } from "@/components/ui/form"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { cn } from "@/lib/utils"
import { MotionButton } from "./custom-button"
import { MellowInput } from "./mellow-input"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"
import Image from "next/image"

const formSchema = z.object({
  email: z.email("Please enter a valid email"),
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
    await authClient.signIn.email({
      email: values.email,
      password: values.password,
      callbackURL: "/"
    },{
        onSuccess: ()=>router.push('/'),
        onError: (ctx)=>{toast.error(ctx.error.message)}
    })
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
          <CardDescription className="text-neutral-400">Login to Continue</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                <div className="flex flex-col gap-4">
                  <MotionButton type="button">
                    <Image alt='github' src="/github.svg"
                    width={20} height={20}/>
                    Login with GitHub</MotionButton>
                  <MotionButton type="button">
                    <Image alt='google' src="/google.svg"
                    width={20} height={20}/>Login with Google</MotionButton>
                </div>

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

                  <MotionButton type="submit" disabled={isPending}>
                    Login
                  </MotionButton>
                </div>

                <div className="text-center text-sm text-neutral-400">
                  Don't have an account?{" "}
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