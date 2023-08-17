import { InvitationStatus } from "../schema/models/Invitation.model";

export interface InvitedToUserInterface {
    id: string;
    name: string;
    email: string;
}
export default interface InvitationInterface {
    id: string;
    eventId: string;
    invitedBy: string;
    invitedTo: string;
    status: string | InvitationStatus;
    createdAt: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    invitedToUser?: InvitedToUserInterface
}