import { QueryResolvers } from "../../../generated/graphql";
import { EventDAL } from "../../../schema/dal/event.dal";
import { EventMapper } from "../event.mapper";

export const getEvents: QueryResolvers["getEvents"] = async (_, args, ctx) => {
    try {
        const { user: authUser } = ctx.req;
        const events = await EventDAL.getEventsByUser(authUser.id);
        return EventMapper.toEvents(events);
    } catch (error) {
        throw error;
    }
}