import { FastifyInstance } from "fastify";
import { createUserOrder, deleteUserOrder, getAllUsersOrders, getUserOrdersbyId, getUserSingleOrder, updateUserOrder } from "../controllers/userOrdersController";

async function userOrdersRoutes(fastify:FastifyInstance) {
    fastify.get("/users/orders",getAllUsersOrders)
    fastify.get("/user/:id/orders",getUserOrdersbyId)
    fastify.get("/user/:id/order/:order_id",getUserSingleOrder)
    fastify.post("/user/order", createUserOrder)
    fastify.put("/user/:id/order/:order_id",updateUserOrder)
    fastify.patch("/user/:id/order/:order_id",updateUserOrder)
    fastify.delete("/user/:id/order/:order_id",deleteUserOrder)
    
}

export default userOrdersRoutes