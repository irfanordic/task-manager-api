import prisma from "../config/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


interface SignupInput{
    name: string
    email: string 
    password: string
}

export const signupUser = async({name, email, password}: SignupInput) => {
    const existingUser = await prisma.user.findUnique({
        where: {email}
    })

    if (existingUser){
        throw new Error("user already Exists")
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data:  {name,
              email,
              password: hashedPassword
             }
    })

    return user
}

export const loginUser = async(email:string, password:string)=>{
    const user =  await prisma.user.findUnique({
        where:{email}
    })

    if(!user){
        throw new Error("invalid usernamme or email")
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
        throw new Error("invalid password")
    }

    const token = jwt.sign({userId : user.id}, process.env.JWT_SECRET as string, {expiresIn : "1d"})

    return  {token , user}
}