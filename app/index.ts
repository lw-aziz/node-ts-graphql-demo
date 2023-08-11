import { ApolloServer, } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { expressMiddleware } from '@apollo/server/express4';
import Resolvers from './Resolvers';
import bodyParser from 'body-parser';
import Schema from './Schema';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import sequelizeConnection from './schema/config';
import express from 'express'
import http from 'http';
import cors from 'cors'

interface GraphQlContext {
  token?: string;
}

/**
 * Starts the GraphQL server with Express
 */
async function startServer() {

  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer<GraphQlContext>({
    typeDefs: Schema,
    resolvers: Resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();

  // Specify the path where we'd like to mount our server
  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
    }),
  );

  // Modified server startup
  await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000/`);
}

sequelizeConnection.sync().then(async () => {
  startServer();
});