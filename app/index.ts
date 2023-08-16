import { ApolloServer, } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import bodyParser from 'body-parser';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express'
import http from 'http';
import cors from 'cors'
import sequelizeConnection from './schema/config';
import { schema } from './modules/Schema';
import { configData } from './config/config';
//import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled';

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
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    csrfPrevention: true,
    formatError: error => {
      // remove the internal sequelize error message
      // leave only the important validation error
      const message = error.message
        .replace('SequelizeValidationError: ', '')
        .replace('Validation error: ', '');

      return {
        ...error,
        message,
      };
    },
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
  await new Promise<void>((resolve) => httpServer.listen({ port: configData.API_PORT }, resolve));
  console.log(`🚀 Server ready at http://localhost:${configData.API_PORT}/`);
}

sequelizeConnection.sync().then(async () => {
  startServer();
});