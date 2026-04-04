import prisma from '../config/prisma';
import redis from '../config/redis';
import logger from '../utils/logger';
export const createTask = async(title: string, userId: number)=>{
    const task = await prisma.task.create({
        data:{
            title,
            userId
        }
    })
  await redis.flushall()

  logger.info("task created for userId: " + userId)
   
    return task
}

export const getTasks = async(userId: number, page: number, limit: number, status?: string ,role?: string)=>{

    const cacheKey = `tasks:${userId}:${page}:${limit}:${status}:${role}`
    const cached = await redis.get(cacheKey)

    if (cached){
        return JSON.parse(cached)
    }

    const where : any = {}

    if(role !== "ADMIN"){
       where.userId = userId
    }

    const skip = (page - 1 ) * limit
   
    if (status){
        where.completed = status === 'completed'
    }

    const tasks = await prisma.task.findMany({
        where,
        skip,
        take:limit,
        orderBy:{
        createdAt: 'desc'
    }    })

    const total = await prisma.task.count({ where })

    const result = {
          tasks,
        total,
        page,
        limit
    }
    logger.info(`Tasks retrieved for userId: ${userId} `)
    await redis.setex(cacheKey, 3600, JSON.stringify(result))
    return result
}

export const updateTask = async(
    taskId: number,
    title: string,
    completed: boolean,
    userId: number 
)=>{
    const task = await prisma.task.updateMany({
        where:{
            id: taskId,
            userId
        },
        data:{
            title,
            completed
        }

    })

    await redis.flushall()
    return task 
    logger.info(`Task updated: taskId ${taskId} by userId: ${userId}`)
}


export const deleteTask = async(taskId: number, userId: number, role: string)=>{

     if(role==="ADMIN"){
        return await prisma.task.delete({
          where:{ id: taskId }
        })
     }

     await redis.flushall()


   return await prisma.task.deleteMany({
        where:{
           id:  taskId,
            userId
        }
    })
logger.info(`Task deleted: taskId ${taskId} by userId: ${userId}`)
    
}

