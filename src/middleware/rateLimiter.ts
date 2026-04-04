import rateLimit from "express-rate-limit";

export const Limiter = rateLimit({
    windowMs: 1* 60* 1000,
    max: 10,
    message:{
        success: false,
        message: "Too many requests, please try again later."}
})