import {create, list, update, remove } from "../controllers/task.controller";
import { Router }  from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router()

router.post('/', authMiddleware, asyncHandler(create))
router.get('/', authMiddleware, asyncHandler(list))
router.put('/:id', authMiddleware,  asyncHandler(update))
router.delete('/:id', authMiddleware, asyncHandler(remove))

export default router