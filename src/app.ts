import Fastify from 'fastify';
import userRoutes from './routes/usersRoutes';
import fastifyMultipart from '@fastify/multipart';
import fastifyCors from '@fastify/cors';
import fastifyFormbody from '@fastify/formbody';
import itemRoutes from './routes/itemsRoutes';
import userOrdersRoutes from './routes/usersOrdersController';

const fastify = Fastify({ logger: true });



fastify.register(fastifyMultipart)

fastify.register(fastifyFormbody)

fastify.register(fastifyCors, {
    origin: '*', // You can set specific origins or keep it open
  });




fastify.get('/api/hello', async (request, reply) => {
  return { message: 'hello world' };
});




fastify.register(userRoutes,{prefix: '/api'});

fastify.register(itemRoutes,{prefix:'/api'})

fastify.register(userOrdersRoutes,{prefix: '/api'})




const start = async () => {
  try {
    await fastify.listen({ port: 3030 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
