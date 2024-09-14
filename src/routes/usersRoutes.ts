import { FastifyInstance } from 'fastify';
import { getAllUsers,getUserbyId,createUser,updateUser,deleteUser } from '../controllers/usersController';

async function userRoutes(fastify: FastifyInstance) {
  fastify.get('/users', getAllUsers);
  fastify.post('/users', createUser);
  fastify.get('/user/:id', getUserbyId);
  fastify.put('/user/:id',updateUser)
  fastify.patch('/user/:id',updateUser)
  fastify.delete('/user/:id',deleteUser)
}

export default userRoutes;