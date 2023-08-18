import { InvitationData } from "../../generated/graphql";
import Invitation from "../../schema/models/Invitation.model";

export default class InvitationMapper {
    static toInvitation(invitation: Invitation): InvitationData {
        return {
            id: invitation.id,
            eventId: invitation.eventId,
            invitedBy: invitation.invitedBy,
            invitedTo: invitation.invitedTo,
            createdAt: invitation.createdAt,
            status: invitation.status
        }
    }
}