import { Resolvers } from "../../generated/graphql";
import { createInvitation } from "./resolver/create-invitation";

export const resolvers: Resolvers = {
    Mutation: {
        createInvitation,
    }
}