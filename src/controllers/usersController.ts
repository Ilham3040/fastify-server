import { PrismaClient } from "@prisma/client";
import { FastifyReply,FastifyRequest } from "fastify";




const prisma = new PrismaClient()

interface UserParams {
    id: string;  // ID is received as a string from the URL
}

interface RequestBody {
    name : string;
}


export const getAllUsers = async (request:FastifyRequest,reply:FastifyReply) => {
    try {
        const users = await prisma.users.findMany()
        return users 
    }
    catch (error) {
        reply.status(500).send("Error Fetching Data")
    }
}

export const getUserbyId = async (request:FastifyRequest<{Params:UserParams}>,reply:FastifyReply) => {
    const userId = parseInt(request.params.id ,10)

    if (isNaN(userId)) {
        return reply.status(400).send('Invalid ID');
      }
    try {
        const selected_user = await prisma.users.findUnique({
            where : {
                id : userId
            }
        })

        if (!selected_user) {
            return reply.status(404).send('User not found');
        }

        return selected_user
    }

    catch (error) {
        reply.status(500).send("Error Fetching Data")
    }
}


export const createUser = async (request:FastifyRequest<{Body:RequestBody}>,reply:FastifyReply) => {
    const username = request.body.name
    

    if (!username || username.trim() === '') {
        return reply.status(400).send('Username is Empty')
    }

    try {
        const newUser = await prisma.users.create({
            data : {name:username}
        })

        return reply.status(201).send({message : "Sucessfully created new user" , userdata: newUser})
    }

    catch (error) {
        reply.status(500).send("Error Creating New User")
    }
}


export const updateUser = async (request: FastifyRequest<{Body:RequestBody,Params:UserParams}>,reply:FastifyReply) => {
    const username = request.body.name
    const userId = parseInt(request.params.id ,10)

    if (isNaN(userId)) {
        return reply.status(400).send('Invalid ID');
    }

    if (!username || username.trim() === '') {
        return reply.status(400).send('Username is Empty')
    }

    try {
        const updatedUser = await prisma.users.update({
            data : {
                name : username
            },
            where : {
                id : userId
            }
        })

        return reply.status(200).send({message : "Sucessfully updated user data" , userdata: updatedUser})

    }

    catch (error) {
        reply.status(500).send("Error Updating User Data")
    }
}


export const deleteUser = async (request: FastifyRequest<{Params:UserParams}>,reply:FastifyReply) => {
    const userId = parseInt(request.params.id ,10)

    if (isNaN(userId)) {
        return reply.status(400).send('Invalid ID');
    }

    try {
        const deletedUser = await prisma.users.delete({
            where : {
                id : userId
            }
        })

        return reply.status(200).send({message : "Sucessfully deleted user data" , userdata: deletedUser})

    }

    catch (error) {
        reply.status(500).send("Error Deleting User Data")
    }
}
