import { NextFunction, Request, Response} from 'express';

export const errorHandler =(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) =>{
    console.error(err.message)

    if(err.issues){
        return res.status(400).json({
            success: false,
            message: err.issues[0].message
        })
    }
    const statusCode = err.statusCode || 500

    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error'
    })
}