import { ApolloServer, } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import Resolvers from './Resolvers';
import Schema from './Schema';
import sequelizeConnection from './schema/config';


async function startServer() {

  const server = new ApolloServer({
    typeDefs: Schema,
    resolvers: Resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
}

sequelizeConnection.sync().then(async () => {
  startServer();
});