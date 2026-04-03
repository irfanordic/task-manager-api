import { Request, Response} from "express";
import { getTasks, createTask, updateTask, deleteTask } from "../services/task.service";


export const create = async(req: Request, res: Response)=>{
  const {title} =  req.body
 const userId = (req as any).user.userId
 const task = await createTask(title, userId)
 res.json(task)
}

export const list = async(req: Request, res: Response)=>{
    const user = (req as any).user
    const page = parseInt(req.query.page as string)|| 1
    const limit = parseInt(req.query.limit as string)|| 5
    const status = req.query.status as string

    const tasks = await getTasks(user.userId, page, limit, status? status : undefined, user.role)
    res.json(tasks)
}

export const update = async(req:Request, res: Response)=>{
   

    const {title, completed}= req.body
    const taskId = Number(req.params.id)
    const userId = (req as any).user.userId

    const task  =  await updateTask(taskId, title, completed, userId)
    res.json(task)
}


export const remove = async(req:Request, res: Response)=>{
    const taskId = Number(req.params.id)
    const user = (req as any).user

    const task  = await deleteTask(taskId, user.userId, user.role)
    res.json(task)
}