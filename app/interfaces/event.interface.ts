import InvitationInterface from "./invitation.interface";

export default interface EventInterface {
    id: string;
    title: string;
    description: string;
    eventDate: Date;
    userId: string;
    createdAt: Date;
    updatedAt?: Date
    deletedAt?: Date,
    invitations: InvitationInterface[] | []
}