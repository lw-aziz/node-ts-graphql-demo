import people from "./dataset"; //get all of the available data from our database.
import User from "./schema/models/User.model";
const Resolvers = {
    Query: {
        getAllEvent: () => Event, //if the user runs the getAllEvent command
        //if the user runs the getPerson command:
        getUser: async (_: any, args: any) => {
            console.log(args);
            const user = await User.findByPk(args.id);
            //get the object that contains the specified ID.
            return user;
        },
    },
};
export default Resolvers;