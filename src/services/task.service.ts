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

export const getTasks = async(userId: number)=>{
    return prisma.task.findMany({
        where:{
            userId
        }
    })
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


export const deleteTask = async(taskId: number, userId: number)=>{
    const task = await prisma.task.deleteMany({
        where:{
           id:  taskId,
            userId
        }
    })

    return task
}

