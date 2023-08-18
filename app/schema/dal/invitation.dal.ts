import Invitation, { InvitationInput, InvitationOutput } from "../models/Invitation.model";
import { InvitationStatus } from "../../generated/graphql";

export class InvitationDAL {
    static async createInvitation(invitationData: InvitationInput): Promise<Invitation> {
        try {
            const invitation = await Invitation.create(invitationData);
            return invitation;
        } catch (error) {
            throw error;
        }
    }

    static async getInvitationsByUser(userId: string): Promise<Invitation[] | []> {
        const invitations = await Invitation.findAll({ where: { invitedTo: userId } });
        return invitations;
    }

    static async getById(InvitationId: string): Promise<Invitation | null> {
        try {
            const invitation = await Invitation.findByPk(InvitationId);
            return invitation;
        } catch (error) {
            return null;
        }
    }

    static async deleteById(InvitationId: string): Promise<boolean> {
        try {
            const invitation = await Invitation.findByPk(InvitationId);

            if (!invitation) throw new Error('Invitation not found');

            await invitation.destroy();
            return true;

        } catch (error) {
            throw error;
        }
    }

    static async updateStatusById(InvitationId: string, status: InvitationStatus): Promise<Invitation> {
        try {
            const invitation = await Invitation.findByPk(InvitationId);

            if (!invitation) throw new Error('Invitation not found');

            await invitation.update({
                status
            });
            return invitation;
        } catch (error) {
            throw error;
        }
    }

    static async getInvitationByEventIdUserId(eventId: string, userId: string): Promise<Invitation | null> {
        try {

            const invitation = await Invitation.findOne({
                where: { eventId, invitedTo: userId }
            });
            return invitation;
        } catch (error) {
            throw error;
        }
    }
}