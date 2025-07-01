// src/modules/forensic_tasks/entities/forensic-task.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";

@Entity("forensic_task")
export class ForensicTask {
  @PrimaryGeneratedColumn("uuid")
  task_id: string;

  @Column()
  task_name: string;

  @Column()
  deadline: Date;

  @Column()
  case_name: string;

  @Column()
  status: string; // Waiting | Executing | Completed

  @Column()
  content: string;

  @Column()
  evidence_id: string;

  @Column({ nullable: true })
  evidence_file: string;

  @Column()
  evidence_description: string;
}
