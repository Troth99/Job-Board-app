import rateLimit from 'express-rate-limit';



export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10,                  //max 10 attempts per IP
    message: { message: 'Too many attempts, please try again after 15 minutes.' },
    standardHeaders: true,
    legacyHeaders: false,
})

export const generalLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 100,                  //max 100 requests per IP 
    message: { message: 'Too many requests, please try again after an hour.' },
    standardHeaders: true,
    legacyHeaders: false,
})

export const forgotPasswordLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5,                    // max 5 forgot-password attempts per IP
    message: { message: 'Too many password reset attempts, please try again after an hour.' },
    standardHeaders: true,
    legacyHeaders: false,
})