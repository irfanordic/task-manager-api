import { z } from 'zod'

export const signupSchema = z.object({
    name: z.string().min(3, "name must be atleast 3 characters long"),
    email: z.string().email("invalid email"),
    password: z.string().min(6, "password must be atleast 6 charcters long")
})

export const loginSchema = z.object({
    email: z.string().email("invalid email"),
    password: z.string().min(6)
})