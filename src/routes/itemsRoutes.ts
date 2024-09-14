import { FastifyInstance } from 'fastify';
import { getAllItems,getItembyId,createItem,updateItem,deleteItem } from '../controllers/itemsController';

async function itemRoutes(fastify: FastifyInstance) {
  fastify.get('/items', getAllItems);
  fastify.post('/items', createItem);
  fastify.get('/item/:id', getItembyId);
  fastify.put('/item/:id',updateItem)
  fastify.patch('/item/:id',updateItem)
  fastify.delete('/item/:id',deleteItem)
}

export default itemRoutes;