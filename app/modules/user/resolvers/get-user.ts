import { QueryResolvers, UserData } from "../../../generated/graphql";
import User from "../../../schema/models/User.model";
import UserMapper from "../user.mapper";

export const getUserDetail: QueryResolvers["getUserDetail"] = async (_, { id }) => {
    try {

        //get the user that contains the specified ID.
        const user = await User.findByPk(id);
        if (!user) {
            throw new Error("User not found");
        }

        return UserMapper.toUser(user);
    } catch (error) {
        throw error;
    }
}
