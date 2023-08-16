import { Resolvers } from '../../generated/graphql';
import { getUserDetail } from './resolvers/get-user';
import { userLogin } from './resolvers/login';
import { userSignUp } from './resolvers/signup';
export const resolvers: Resolvers = {
    Query: {
        getUserDetail,
    },
     Mutation: {
         userSignUp,
         userSignIn: userLogin,
     }
};
