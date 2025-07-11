import { 
  Entity, 
  Column, 
  ManyToOne, 
  JoinColumn,
  PrimaryColumn, 
} from "typeorm";

import { CaseUser } from "@/modules/cases_users/entities/case_user.entity";
import { TaskStatus } from "../enums/task.enum";

@Entity('tasks')
export class Task {
  @PrimaryColumn()
  task_id!: string;

  @Column()
  task_name!: string;

  @Column({ type: 'text', nullable: true })
  content?: string;

  @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.WAITING_EXECUTING })
  status!: TaskStatus;

  @Column({ type: 'timestamp' })
  start_date!: Date;

  @Column({ type: 'timestamp', nullable: true })
  due_date?: Date;

  @Column({ type: 'timestamp', nullable: true })
  completed_at?: Date;

  @Column({ type: 'boolean', default: false })
  is_deleted!: boolean;

  @Column()
  case_id!: string;

  @Column()
  username!: string;

  // ManyToOne
  @ManyToOne(() => CaseUser, caseUser => caseUser.tasks)
  @JoinColumn([
    { name: 'case_id', referencedColumnName: 'case_id' },
    { name: 'username', referencedColumnName: 'username' },
  ])
  caseUser!: CaseUser;
}
