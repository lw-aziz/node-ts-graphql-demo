import { Resolvers } from '../../generated/graphql';
import { createEvent } from './resolvers/create-event';
import { getEvents } from './resolvers/get-events';
export const resolvers: Resolvers = {
    Mutation: {
        createEvent,
    },
    Query: {
        getEvents,
    }
};
