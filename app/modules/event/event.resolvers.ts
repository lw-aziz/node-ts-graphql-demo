import { Resolvers } from '../../generated/graphql';
import { createEvent } from './resolvers/create-event';
export const resolvers: Resolvers = {
    Mutation: {
        createEvent,
    }
};
