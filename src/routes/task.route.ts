import {create, list, update, remove } from "../controllers/task.controller";
import { Router }  from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { removeAllListeners } from "node:cluster";

const router = Router()

router.post('/', authMiddleware, create)
router.get('/', authMiddleware, list)
router.put('/:id', authMiddleware,  update)
router.delete('/:id', authMiddleware, remove)

export default router