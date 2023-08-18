import { DataType } from "sequelize-typescript";
import { InvitationStatus } from "../../generated/graphql";

export type CreateInvitationDTO = {
    eventId: string;
    email: string,
    status: InvitationStatus,
    invitedBy: typeof DataType.UUID,
    invitedTo: typeof DataType.UUID
}

export type UpdateInvitationDTO = Omit<CreateInvitationDTO, 'email' | 'eventId' | 'invitedBy' | 'invitedTo'>;