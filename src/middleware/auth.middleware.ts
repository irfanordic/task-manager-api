import { Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) =>{
    const authHeader = req.headers.authorization

    if(!authHeader){
        return res.status(401).json({
            error: "Authorization header missing"
        })
    }

    const token  = authHeader.split(" ")[1]

    try{
        const decoded = jwt.verify(token as string,
             process.env.JWT_SECRET as string)

        ;(req as any).user = decoded

            console.log("Token:", token)


             next() 
    }catch(error){
        res.status(401).json({
            message: "Invalid token"
        })
    }
}