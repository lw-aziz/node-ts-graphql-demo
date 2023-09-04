import { QueryResolvers } from "../../../generated/graphql";
import { EventDAL } from "../../../schema/dal/event.dal";
import Invitation from "../../../schema/models/Invitation.model";
import { EventMapper } from "../event.mapper";

export const getEvents: QueryResolvers["getEvents"] = async (_, args, ctx) => {
    try {
        const authUser = ctx.req?.user;
        const events = await EventDAL.getEventsByUser(authUser?.id, {
            model: Invitation
        });
        return EventMapper.toEvents(events);
    } catch (error) {
        throw error;
    }
}