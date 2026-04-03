import prisma from '../config/prisma';
export const createTask = async(title: string, userId: number)=>{
    const task = await prisma.task.create({
        data:{
            title,
            userId
        }
    })

    return task
}

export const getTasks = async(userId: number, page: number, limit: number, status?: string ,role?: string)=>{

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
    return {
        tasks,
        total,
        page,
        limit
    }
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
    return task 
}


export const deleteTask = async(taskId: number, userId: number, role: string)=>{

     if(role==="ADMIN"){
        return await prisma.task.delete({
          where:{ id: taskId }
        })
     }


   return await prisma.task.deleteMany({
        where:{
           id:  taskId,
            userId
        }
    })

    
}

