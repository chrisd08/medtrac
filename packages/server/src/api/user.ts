import { DataSource, DataSourceConfig } from "apollo-datasource";
import { Context, DataSourceRepos } from "../@types";
import { User } from "../entity";

export class UserAPI extends DataSource {
  context!: Context;
  repos: DataSourceRepos;

  constructor(repos: DataSourceRepos) {
    super();
    this.repos = repos;
  }

  /**
   * Apollo init function, called by apollo when setup
   * @param config used by apollo internally
   */
  initialize(config: DataSourceConfig<Context>): void {
    this.context = config.context;
  }

  /**
   * Get the user based on username
   * @param username username to search for
   */
  async getUser(username: string): Promise<User> {
    const { userRepo } = this.repos;
    const currentUser = await userRepo.findOne({ where: { username } });
    if (currentUser) {
      return currentUser;
    }
    return this.createUser(username);
  }

  /**
   * Create a new user
   * @param username username for the new user
   */
  async createUser(username: string): Promise<User> {
    const { userRepo, profileRepo } = this.repos;
    const user = userRepo.create({ username });
    const profile = profileRepo.create({ name: "default" });
    await profileRepo.save(profile);
    (await user.profiles).push(profile);
    await userRepo.save(user);
    return user;
  }
}
