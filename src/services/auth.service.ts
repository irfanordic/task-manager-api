import prisma from "../config/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AppError from "../utils/AppError";



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
        throw new AppError("user already Exists", 400)
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
        throw new AppError("Invalid username or email", 401)
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
        throw new AppError("invalid password", 401)
    }

    const token = jwt.sign({userId : user.id, role: user.role},
         process.env.JWT_SECRET as string,
          {expiresIn : "1d"})

    return  {token , user}
}