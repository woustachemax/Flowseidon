"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import {
  Card,
  CardDescription,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormLabel,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { z } from "zod"
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
    defaultValues: { email: "", password: "" },
  })

  const onSubmit = async (values: LoginVal) => {
    await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
        callbackURL: "/",
      },
      {
        onSuccess: () => router.push("/"),
        onError: (ctx) => {
          toast(ctx.error.message)
        },
      }
    )
  }

  const isPending = form.formState.isSubmitting

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black transition-colors duration-300">
      <Card className="w-full max-w-md 
        bg-neutral-100 dark:bg-neutral-900 
        border border-neutral-300 dark:border-neutral-800
        shadow-[0_0_15px_rgba(52,211,153,0.1)]">
        <CardHeader className="text-center">
          <CardTitle className="text-neutral-800 dark:text-neutral-100 text-xl flex items-center justify-center gap-2">
            Flowseidon
            <Image src="/logo.svg" alt="logo" width={24} height={24} />
          </CardTitle>
          <CardDescription className="text-neutral-600 dark:text-neutral-400">
            Login to Continue
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-neutral-600 dark:text-neutral-400">
                        Email
                      </FormLabel>
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
                      <FormLabel className="text-neutral-600 dark:text-neutral-400">
                        Password
                      </FormLabel>
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

                <div className="flex items-center gap-2">
                  <hr className="flex-1 border-neutral-400 dark:border-neutral-600" />
                  <span className="text-cyan-700 dark:text-cyan-500">or</span>
                  <hr className="flex-1 border-neutral-400 dark:border-neutral-600" />
                </div>

                <div className="flex flex-row gap-1">
                  <MotionButton type="button">
                    <Image alt="github" src="/github.svg" width={20} height={20} />
                    with GitHub
                  </MotionButton>
                  <MotionButton type="button">
                    <Image alt="google" src="/google.svg" width={20} height={20} />
                    with Google
                  </MotionButton>
                </div>

                <div className="text-center text-sm text-neutral-600 dark:text-neutral-400">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/signup"
                    className="underline text-cyan-700 dark:text-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400"
                  >
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
