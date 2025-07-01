import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("interview")
export class Interview {
  @PrimaryGeneratedColumn()
  interview_id!: number;

  @Column()
  investigation_plan_id!: number;

  @Column()
  interviewer_id!: number;

  @Column()
  interviewee_id!: number;

  @Column()
  type_interviewee!: string;

  @Column()
  location!: string;

  @Column({ nullable: true })
  attached_file!: string;

  @Column()
  start_time!: Date;

  @Column()
  end_time!: Date;

  @Column({ default: false })
  is_deleted!: boolean;
}
