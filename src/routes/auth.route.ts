import { Router } from "express";
import { signup, login } from "../controllers/auth.controller";
import { validate } from "../middleware/validate.middleware";
import { signupSchema, loginSchema } from "../validators/auth.validator"
import  { asyncHandler } from "../utils/asyncHandler";
const router = Router();

router.post('/signup',validate(signupSchema), asyncHandler(signup))
router.post('/login',validate(loginSchema), asyncHandler(login))

export default router;