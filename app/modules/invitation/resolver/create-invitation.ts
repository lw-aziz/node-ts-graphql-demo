import { InvitationStatus, MutationResolvers } from "../../../generated/graphql";
import { EventDAL } from "../../../schema/dal/event.dal";
import { InvitationDAL } from "../../../schema/dal/invitation.dal";
import { UserDAL } from "../../../schema/dal/user.dal";
import { InvitationInput } from "../../../schema/models/Invitation.model";
import InvitationMapper from "../invitation.mapper";

export const createInvitation: MutationResolvers["createInvitation"] = async (_, { data }, ctx) => {
    try {
        const { email, eventId } = data;
        const { user: authUser } = ctx.req;

        const event = await EventDAL.getById(eventId);
        if (!event) throw new Error("Event not found");

        // create/retrieve invited user from email
        const invitedUser = await UserDAL.findOrCreateUserByEmail(email);

        // validate user can't invite himself
        if (invitedUser.id === authUser.id) throw new Error("You can't invite yourself");

        // check if invitation already exists
        const existingInvitation = await InvitationDAL.getInvitationByEventIdUserId(eventId, invitedUser.id);
        if (existingInvitation) throw new Error("Invitation already exists");

        const invitationsInputData: InvitationInput = {
            eventId,
            invitedBy: authUser.id,
            status: InvitationStatus.Pending,
            invitedTo: invitedUser.id
        }

        const invitation = await InvitationDAL.createInvitation(invitationsInputData);
        return InvitationMapper.toInvitation(invitation);
    } catch (error) {
        throw error;
    }
}