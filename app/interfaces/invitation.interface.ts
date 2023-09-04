import { InvitationStatus } from "../generated/graphql";

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
    status: InvitationStatus;
    createdAt: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    invitedToUser?: InvitedToUserInterface
}