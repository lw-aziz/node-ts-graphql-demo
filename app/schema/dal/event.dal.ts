import { AbstractDataTypeConstructor, Identifier, Includeable } from "sequelize";
import Event, { EventInput, EventOutput } from "../models/Event.model";
import { UpdateEventDTO } from "../dto/event.dto";
import Invitation from "../models/Invitation.model";
import User from "../models/User.model";

export class EventDAL {
    static async createEvent(userData: EventInput): Promise<Event> {
        const event = await Event.create(userData);
        return event;
    }

    static async getEventsByUser(userId: string, include?: Includeable | Includeable[]): Promise<Event[] | []> {
        const events = await Event.findAll({ where: { userId }, include });
        return events;
    }

    static async getById(eventId: Identifier): Promise<Event | null> {
        try {
            const event = await Event.findByPk(eventId, {
                include: [
                    {
                        model: Invitation,
                        as: "invitations",
                        include: [
                            {
                                model: User,
                                as: "invitedToUser",
                            }
                        ]
                    }

                ]
            });
            return event;
        } catch (error) {
            throw error;
        }
    }

    static async deleteById(eventId: Identifier): Promise<boolean> {
        try {
            const event = await Event.findByPk(eventId);

            if (!event) {
                throw new Error('Event not found');
            }

            await event.destroy();
            return true;

        } catch (error) {
            throw error;
        }
    }

    static async updateById(eventId: Identifier, payload: UpdateEventDTO): Promise<Event> {
        try {
            const event = await Event.findByPk(eventId);
            if (!event) throw new Error('Event not found');
            await event.update(payload);
            return event;
        } catch (error) {
            throw error;
        }
    }
}