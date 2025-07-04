import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

import { Prosecution } from "@/modules/prosecutions/entities/prosecution.entity";
import { User } from "@/modules/users/entities/user.entity";

@Entity("prosecutions_users")
export class ProsecutionUser {
  @PrimaryColumn()
  prosecution_id!: string;

  @PrimaryColumn()
  user_id!: string;

  @Column({ type: "boolean", default: false })
  is_deleted!: boolean;

  // ManyToOne
  @ManyToOne(() => Prosecution, (prosecution) => prosecution.prosecutionUsers)
  @JoinColumn({ name: "prosecution_id" })
  prosecution!: Prosecution;

  @ManyToOne(() => User, (user) => user.prosecutionUsers)
  @JoinColumn({ name: "user_id" })
  user!: User;
}
