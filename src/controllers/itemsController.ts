import { PrismaClient } from "@prisma/client";
import { FastifyReply,FastifyRequest } from "fastify";
import { request } from "http";



const prisma = new PrismaClient()

interface ItemParams {
    id: string;  // ID is received as a string from the URL
}

interface RequestBody {
    name : string;
}


export const getAllItems = async (request:FastifyRequest,reply:FastifyReply) => {
    try {
        const items = await prisma.items.findMany()
        return items 
    }
    catch (error) {
        reply.status(500).send("Error Fetching Data")
    }
}

export const getItembyId = async (request:FastifyRequest<{Params:ItemParams}>,reply:FastifyReply) => {
    const itemId = parseInt(request.params.id ,10)

    if (isNaN(itemId)) {
        return reply.status(400).send('Invalid ID');
      }
    try {
        const selected_item = await prisma.items.findUnique({
            where : {
                id : itemId
            }
        })

        if (!selected_item) {
            return reply.status(404).send('Item not found');
        }

        return selected_item
    }

    catch (error) {
        reply.status(500).send("Error Fetching Data")
    }
}


export const createItem = async (request:FastifyRequest<{Body:RequestBody}>,reply:FastifyReply) => {
    const itemname = request.body.name

    if (!itemname || itemname.trim() === '') {
        return reply.status(400).send('Item name is Empty')
    }

    try {
        const newItem = await prisma.items.create({
            data : {name:itemname}
        })

        return reply.status(201).send({message : "Sucessfully created new item" , itemdata: newItem})
    }

    catch (error) {
        reply.status(500).send("Error Creating New User")
    }
}


export const updateItem = async (request: FastifyRequest<{Body:RequestBody,Params:ItemParams}>,reply:FastifyReply) => {
    const itemname = request.body.name
    const itemId = parseInt(request.params.id ,10)

    if (isNaN(itemId)) {
        return reply.status(400).send('Invalid ID');
    }

    if (!itemname || itemname.trim() === '') {
        return reply.status(400).send('Item name is Empty')
    }

    try {
        const updatedItem = await prisma.items.update({
            data : {
                name : itemname
            },
            where : {
                id : itemId
            }
        })

        return reply.status(200).send({message : "Sucessfully updated item data" , itemdata: updatedItem})

    }

    catch (error) {
        reply.status(500).send("Error Updating Item Data")
    }
}


export const deleteItem = async (request: FastifyRequest<{Params:ItemParams}>,reply:FastifyReply) => {
    const itemId = parseInt(request.params.id ,10)

    if (isNaN(itemId)) {
        return reply.status(400).send('Invalid ID');
    }

    try {
        const deletedItems = await prisma.items.delete({
            where : {
                id : itemId
            }
        })

        return reply.status(200).send({message : "Sucessfully deleted item data" , itemdata: deletedItems})

    }

    catch (error) {
        reply.status(500).send("Error Deleting Item Data")
    }
}
