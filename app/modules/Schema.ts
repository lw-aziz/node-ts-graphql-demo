import { makeExecutableSchema } from '@graphql-tools/schema';
import {resolvers, typeDefs} from './'

export const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});