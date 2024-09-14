import { PrismaClient } from "@prisma/client";
import { FastifyReply,FastifyRequest } from "fastify";

const prisma = new PrismaClient()


interface UserParams {
    id: string;  
    order_id: string;
}

interface RequestBody {
    user_id: number;
    item_id: number;
}

export const getAllUsersOrders = async (request:FastifyRequest,reply:FastifyReply) => {
    try {
        const data = await prisma.users.findMany({
            include : {
                order : {
                    include : { 
                        item : true
                    }
                }
            }
        })

        return data
    }

    catch(error) {
        reply.status(500).send("Error Fetching Data")
    }
}

export const getUserOrdersbyId = async (request:FastifyRequest<{Params:UserParams}>,reply:FastifyReply) => {
    const userId = parseInt(request.params.id ,10)


    if (isNaN(userId)) {
        return reply.status(400).send('Invalid User ID');
    }



    try {
        const selected_user_orders = await prisma.users.findUnique({
            where : {
                id : userId
            },
            include : {
                order : {
                    include : { 
                        item : true
                    }
                }
            }
            
        })

        if (!selected_user_orders) {
            return reply.status(404).send('User not found');
        }

        return selected_user_orders
    }

    catch (error) {
        reply.status(500).send("Error Fetching Data")
    }
}

export const getUserSingleOrder = async (request:FastifyRequest<{Params:UserParams}>,reply:FastifyReply) => {
    const userId = parseInt(request.params.id ,10)
    const orderId = parseInt(request.params.order_id ,10)


    if (isNaN(userId)) {
        return reply.status(400).send('Invalid ID');
    }


    if (isNaN(orderId)) {
        return reply.status(400).send('Invalid Order ID');
    }

    try {
        const selected_user_orders = await prisma.users.findUnique({
            where : {
                id : userId
            },
            include : {
                order : {
                    where : {
                        id : orderId
                    },

                    include : {
                        item : true
                    } 
                }
            }
            
        })

        if (!selected_user_orders) {
            return reply.status(404).send('User not found');
        }

        return selected_user_orders
    }

    catch (error) {
        reply.status(500).send("Error Fetching Data")
    }
}

export const createUserOrder = async (request: FastifyRequest<{ Body: RequestBody }>, reply: FastifyReply) => {
    const userId = parseInt(request.body.user_id.toString(), 10);
    const itemId = parseInt(request.body.item_id.toString(), 10);

    if (isNaN(userId)) {
        return reply.status(400).send('Invalid user ID');
    }

    if (isNaN(itemId)) {
        return reply.status(400).send('Invalid item ID');
    }

    try {
        const user = await prisma.users.findUnique({
            where: { id: userId }
        });

        const item = await prisma.items.findUnique({
            where: { id: itemId }
        });

        if (!user) {
            return reply.status(404).send(`User with id ${userId} is not found`);
        }

        if (!item) {
            return reply.status(404).send(`Item with id ${itemId} is not found`);
        }

        const newOrder = await prisma.orders.create({
            data: {
                user_id: userId,
                item_id: itemId
            }
        });

        return reply.status(201).send({ message: "Successfully created new order", orderData: newOrder });
    } catch (error) {
        return reply.status(500).send("Error creating new order");
    }
};

export const updateUserOrder = async (request: FastifyRequest<{ Body: RequestBody, Params: UserParams }>, reply: FastifyReply) => {
    const userId = parseInt(request.params.id, 10);
    const orderId = parseInt(request.params.order_id, 10);
    const itemId = parseInt(request.body.item_id.toString(), 10);

    if (isNaN(userId)) {
        return reply.status(400).send('Invalid user ID');
    }

    if (isNaN(orderId)) {
        return reply.status(400).send('Invalid order ID');
    }

    if (isNaN(itemId)) {
        return reply.status(400).send('Invalid item ID');
    }

    try {

        const user = await prisma.users.findUnique({
            where: { id: userId }
        });

        if (!user) {
            return reply.status(404).send(`User with id ${userId} is not found`);
        }

  
        const item = await prisma.items.findUnique({
            where: { id: itemId }
        });

        if (!item) {
            return reply.status(404).send(`Item with id ${itemId} is not found`);
        }


        const order = await prisma.orders.findUnique({
            where: { id: orderId }
        });

        if (!order || order.user_id !== userId) {
            return reply.status(404).send(`Order with id ${orderId} not found for user ${userId}`);
        }


        const updatedOrder = await prisma.orders.update({
            where: { id: orderId },
            data: { item_id: itemId }
        });

        return reply.status(200).send({ message: "Successfully updated order", orderData: updatedOrder });
    } catch (error) {
        return reply.status(500).send("Error updating order");
    }
};


export const deleteUserOrder = async (request: FastifyRequest<{ Params: UserParams }>, reply: FastifyReply) => {
    const userId = parseInt(request.params.id, 10);
    const orderId = parseInt(request.params.order_id, 10);

    if (isNaN(userId)) {
        return reply.status(400).send('Invalid user ID');
    }

    if (isNaN(orderId)) {
        return reply.status(400).send('Invalid order ID');
    }

    try {

        const user = await prisma.users.findUnique({
            where: { id: userId }
        });

        if (!user) {
            return reply.status(404).send(`User with id ${userId} not found`);
        }


        const order = await prisma.orders.findUnique({
            where: { id: orderId }
        });

        if (!order || order.user_id !== userId) {
            return reply.status(404).send(`Order with id ${orderId} not found for user ${userId}`);
        }

 
        await prisma.orders.delete({
            where: { id: orderId }
        });

        return reply.status(200).send({ message: "Successfully deleted order" });
    } catch (error) {
        return reply.status(500).send("Error deleting order");
    }
};
