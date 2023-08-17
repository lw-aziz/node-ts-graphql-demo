import EventInterface from "../../interfaces/event.interface";
import { EventOutput } from "../../schema/models/Event.model";

export class EventMapper {
    public static toEvent(eventData: EventOutput): EventInterface {
        return {
            id: eventData.id,
            title: eventData.title,
            description: eventData.description,
            eventDate: eventData.eventDate,
            userId: eventData.userId,
            createdAt: eventData.createdAt
        }
    }

    public static toEvents(eventsData: EventOutput[]): EventInterface[] {
        return eventsData?.map(event => this.toEvent(event))
    }
}