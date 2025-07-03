import { Prosecution } from "@/modules/prosecutions/entities/prosecution.entity";
import { User } from "@/modules/users/entities/user.entity";
import { Entity, PrimaryColumn, ManyToOne, Column, JoinColumn } from "typeorm";

@Entity("prosecutions_users")
export class ProsecutionsUsers {
  @PrimaryColumn()
  user_id!: string;

  @PrimaryColumn()
  prosecution_id!: string;

  @ManyToOne(() => Prosecution, (prosecution) => prosecution.prosecutions_users)
  @JoinColumn({ name: "prosecution_id" })
  prosecution!: Prosecution;

  @ManyToOne(() => User, (user) => user.prosecutions_users)
  @JoinColumn({ name: "user_id" })
  user!: User;

  @Column({ type: "boolean", default: false })
  is_deleted!: boolean;
}
