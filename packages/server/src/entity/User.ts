import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "./Profile";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  username: string;

  @OneToMany(() => Profile, profile => profile.user)
  profiles: Promise<Profile[]>;

  public constructor(username: string) {
    this.username = username;
  }
}
