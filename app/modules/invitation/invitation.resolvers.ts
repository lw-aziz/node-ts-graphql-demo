import { Resolvers } from "../../generated/graphql";
import { createInvitation } from "./resolver/create.invitation";
import { acceptInvitation } from "./resolver/accept.invitation";
import { rejectInvitation } from "./resolver/reject.invitation";

export const resolvers: Resolvers = {
    Mutation: {
        createInvitation,
        acceptInvitation,
        rejectInvitation,
    }
}