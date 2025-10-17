"use client"
import {zodResolver} from '@hookform/resolvers/zod'
import { Card, CardDescription, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormLabel, FormField, FormItem, FormMessage } from '@/components/ui/form'
import Image from 'next/image'
import Link from 'next/link'
import {useForm} from 'react-hook-form'
import { useRouter } from 'next/router' 
import {email, z} from 'zod'
import { Button } from '@/components/ui/button'
import {toast} from 'sonner'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

const formSchema = z.object({
    email: z.email("Please enter a valid email"),
    password: z.string().min(8, "Password should be at least 8 characters")
})

type loginVal = z.infer<typeof formSchema>

export function login(){
    const router = useRouter()

    const form = useForm
}