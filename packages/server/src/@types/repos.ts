import { Repository } from "typeorm";
import { Profile, User } from "../entity";

export interface DataSourceRepos {
  userRepo?: Partial<Repository<User>>;
  profileRepo?: Partial<Repository<Profile>>;
}
