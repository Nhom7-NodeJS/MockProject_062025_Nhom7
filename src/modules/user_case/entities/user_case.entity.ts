import { Case } from "@/modules/case/entities/case.entity";
import { User } from "@/modules/users/entities/user.entity";
import { Entity, PrimaryColumn, ManyToOne, Column, JoinColumn } from "typeorm";

@Entity("users_cases")
export class UsersCases {
  @PrimaryColumn()
  user_id!: string;

  @PrimaryColumn()
  case_id!: string;

  @ManyToOne(() => Case, (case1) => case1.users_cases)
  @JoinColumn({ name: "case_id" })
  case!: Case;

  @ManyToOne(() => User, (user) => user.users_cases)
  @JoinColumn({ name: "user_id" })
  user!: User;

  @Column({ type: "boolean", default: false })
  is_deleted!: boolean;
}
