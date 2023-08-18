import { InvitationStatus, MutationResolvers } from "../../../generated/graphql";
import { InvitationDAL } from "../../../schema/dal/invitation.dal";
import Event from "../../../schema/models/Event.model";

export const rejectInvitation: MutationResolvers["acceptInvitation"] = async (_, { invitationId }, ctx) => {
    try {
        const { user: authUser } = ctx.req;

        const invitation = await InvitationDAL.getById(invitationId, {
            model: Event
        });
        if (!invitation) throw new Error("Invitation not found");

        // check the user has the permission to accept this invitation
        if (invitation.invitedTo !== authUser.id) throw new Error("You can't accept this invitation");
        // Status is only change is status is in pending
        if (invitation.status !== InvitationStatus.Pending) throw new Error(`Invitation status is already ${invitation.status}`);

        const event = invitation.event;
        // check the event date is in the future
        if (new Date(event.eventDate) < new Date()) throw new Error("Event is already passed");

        invitation.status = InvitationStatus.Rejected;
        await invitation.save();

        return {
            message: "Event rejected successfully",
            status: InvitationStatus.Rejected
        }
    } catch (error) {
        throw error;
    }
}