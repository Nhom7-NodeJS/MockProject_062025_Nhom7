import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, OneToMany } from "typeorm";
import { User } from "@/modules/users/entities/user.entity";
import { InvestigationPlan } from "@/modules/investigation_plans/entities/investigation_plan.entity";
import { Question } from "@/modules/questions/entity/question.entity";
import { WitnessInterview } from "@/modules/witness_interview/entities/witness_interview.entity";
import { VictimInterview } from "@/modules/victims_interview/entities/victim_interview.entity";

@Entity("interviews")
export class Interview {
  @PrimaryColumn()
  interview_id!: string;

  @Column()
  investigation_plan_id!: string;

  @Column()
  interviewer_id!: string;

  @Column()
  interviewee_id!: string;

  @Column()
  type_interviewee!: string;

  @Column()
  location!: string;

  @Column()
  attached_file!: string;

  @Column({ type: 'timestamp' })
  start_time!: Date;

  @Column({ type: 'timestamp' })
  end_time!: Date;

  @Column({ type: 'boolean', default: false })
  is_deleted!: boolean;

  @ManyToOne(() => User, (user) => user.interviews)
  @JoinColumn({ name: 'interviewer_id' })
  interviewer!: User;

  @ManyToOne(() => InvestigationPlan, (investigationPlan) => investigationPlan.interviews)
  @JoinColumn({ name: 'investigation_plan_id' })
  investigationPlan?: InvestigationPlan;

  @OneToMany(() => Question, (question) => question.interview)
  questions?: Question[];

  @OneToMany(() => WitnessInterview, (witnessInterview) => witnessInterview.interview)
  witnessInterviews?: WitnessInterview[];

  @OneToMany(() => VictimInterview, (victimInterview) => victimInterview.interview)
  victimInterviews?: VictimInterview[];
}