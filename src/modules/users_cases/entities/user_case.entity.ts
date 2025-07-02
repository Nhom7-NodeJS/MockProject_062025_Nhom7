import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "@/modules/users/entities/user.entity";
import { Case } from "@/modules/cases/entities/case.entity";

@Entity('users_cases')
export class UserCase {
  @PrimaryColumn()
  user_id!: string;

  @PrimaryColumn()
  case_id!: string;

  @Column()
  responsible!: string;

  @Column({ type: 'boolean', default: false })
  is_deleted!: boolean;

  @ManyToOne(() => User, (user) => user.userCases)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne(() => Case, (case_) => case_.userCases)
  @JoinColumn({ name: 'case_id' })
  case!: Case;
}