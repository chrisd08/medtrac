import { Resolvers } from "../../@types/schema";
import { Profile, User } from "../../entity";

export const resolvers: Resolvers = {
  Query: {
    me: async (_, __, { user }) => {
      const { sub: username } = user;
      let currentUser = await User.findOne({ where: { username } });
      if (currentUser) {
        return currentUser;
      }
      currentUser = User.create({ username });
      const profile = Profile.create({
        name: "test",
      });
      await profile.save();
      (await currentUser.profiles).push(profile);
      await currentUser.save();
      return currentUser;
    },
  },
};
