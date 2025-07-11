import { Entity, Column, JoinColumn, ManyToOne, PrimaryColumn, OneToMany } from "typeorm";

import { Case } from "@/modules/cases/entities/case.entity";
import { User } from "@/modules/users/entities/user.entity";
import { Task } from "@/modules/tasks/entities/task.entity";

@Entity("cases_users")
export class CaseUser {
  @PrimaryColumn()
  case_id!: string;

  @PrimaryColumn()
  username!: string;

  @Column({ type: 'text', nullable: true })

  notes?: string;

  @Column({ type: "timestamp" })
  assigned_at!: Date;

  @Column({ type: "boolean", default: false })
  is_deleted!: boolean;

  // OneToMany
  @OneToMany(() => Task, (task) => task.caseUser)
  tasks!: Task[];

  // ManyToOne
  @ManyToOne(() => Case, (case_) => case_.caseUsers)
  @JoinColumn({ name: "case_id" })
  case!: Case;

  @ManyToOne(() => User, (user) => user.caseUsers)
  @JoinColumn({ name: "username" })
  user!: User;
}
