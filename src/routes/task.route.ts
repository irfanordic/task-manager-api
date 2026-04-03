import {create, list, update, remove } from "../controllers/task.controller";
import { Router }  from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { asyncHandler } from "../utils/asyncHandler";
import { authorize } from '../middleware/role.middleware';

const router = Router()

router.post('/', authMiddleware, asyncHandler(create))
router.get('/', authMiddleware,authorize("ADMIN"), asyncHandler(list))
router.put('/:id', authMiddleware,  asyncHandler(update))
router.delete('/:id', authMiddleware, authorize("ADMIN"), asyncHandler(remove))

export default router