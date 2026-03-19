import { Request, Response} from "express";
import { getTasks, createTask, updateTask, deleteTask } from "../services/task.service";


export const create = async(req: Request, res: Response)=>{
  const {title} =  req.body
 const userId = (req as any).user.userId
 const task = await createTask(title, userId)
 res.json(task)
}

export const list = async(req: Request, res: Response)=>{
    const userId = (req as any).user.userId

    const tasks = await getTasks(userId)
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
    const userId = (req as any).user.userId

    const task  = await deleteTask(taskId, userId)
    res.json(task)
}