import { QueryResolvers } from "../../../generated/graphql";
import UserMapper from "../user.mapper";

export const getUserDetail: QueryResolvers["getUserDetail"] = async (_, { id }, { req: { user: authUser } }) => {
    try {
        return UserMapper.toUser(authUser);
    } catch (error) {
        throw error;
    }
}
