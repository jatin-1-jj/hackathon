const {z} = require('zod')

const userNameValidation = z
    .string()
    .min(2,"username must be at least 3 character")
    .max(20,"username must be at max 20 character")
    .regex(/^[a-zA-Z0-9_]+$/,"username must not contain special character")


const signUpSchema  = z.object({
    username:userNameValidation,
    email:z.string().email({message:"invalid email address"}),
    password:z.string().min(6,{message:"password must contain at least 6 character"})
})

module.exports={signUpSchema,userNameValidation}