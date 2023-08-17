import { MutationResolvers } from "../../../generated/graphql";
import { EventDAL } from "../../../schema/dal/event.dal";
import { EventMapper } from "../event.mapper";

export const createEvent: MutationResolvers["createEvent"] = async (_, { data }, ctx) => {
    try {

        const { title, eventDate, description } = data;
        const { user: authUser } = ctx.req;

        const event = await EventDAL.createEvent({
            eventDate, title, userId: authUser.id, description
        });
        return EventMapper.toEvent(event);
    } catch (error) {
        throw error
    }
}