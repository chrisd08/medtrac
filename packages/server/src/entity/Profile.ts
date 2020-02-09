import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Profile {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => User, user => user.profiles, { onDelete: "CASCADE" })
  user: Promise<User>;

  public constructor(name: string) {
    this.name = name;
  }
}
