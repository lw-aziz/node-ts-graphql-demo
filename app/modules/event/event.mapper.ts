import EventInterface from "../../interfaces/event.interface";
import { EventOutput } from "../../schema/models/Event.model";
import InvitationMapper from "../invitation/invitation.mapper";

export class EventMapper {
    public static toEvent(eventData: EventOutput): EventInterface {
        return {
            id: eventData.id,
            title: eventData.title,
            description: eventData.description,
            eventDate: eventData.eventDate,
            userId: eventData.userId,
            createdAt: eventData.createdAt,
            invitations: InvitationMapper.toInvitations(eventData.invitations)
        }
    }

    public static toEvents(eventsData: EventOutput[]): EventInterface[] {
        return eventsData?.map(event => this.toEvent(event))
    }
}