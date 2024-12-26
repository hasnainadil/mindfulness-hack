import { z } from "zod";
import { GenderTypes } from "../types/usetypes";

const RegisterSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().min(3),
    age: z.number().int().positive(),
    gender: z.enum([GenderTypes.MALE, GenderTypes.FEMALE, GenderTypes.OTHER])
})

const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})

type LoginDto = z.infer<typeof LoginSchema>;
type RegisterDto = z.infer<typeof RegisterSchema>;

export { RegisterSchema, LoginSchema, LoginDto, RegisterDto };