import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";

import { InvestigationPlan } from "@/modules/investigation_plans/entities/investigation_plan.entity";
import { Question } from "@/modules/questions/entity/question.entity";
import { User } from "@/modules/users/entities/user.entity";
import { VictimInterview } from "@/modules/victims_interviews/entities/victim_interview.entity";
import { WitnessInterview } from "@/modules/witnesses_interviews/entities/witness_interview.entity";

@Entity("interviews")
export class Interview {
  @PrimaryColumn()
  interview_id!: string;

  @Column()
  type_interviewee!: string;

  @Column()
  location!: string;

  @Column({ type: "json" })
  attached_file!: string[];

  @CreateDateColumn()
  start_time!: Date;

  @Column({ type: 'timestamp' })
  end_time!: Date;

  @Column({ type: 'boolean', default: false })
  is_deleted!: boolean;

  // OneToMany
  @OneToMany(() => Question, (question) => question.interview)
  questions?: Question[];

  @OneToMany(() => VictimInterview, (victimInterview) => victimInterview.interview)
  victimInterviews?: VictimInterview[];

  @OneToMany(() => WitnessInterview, (witnessInterview) => witnessInterview.interview)
  witnessInterviews?: WitnessInterview[];

  // ManyToOne
  @ManyToOne(() => InvestigationPlan, (investigationPlan) => investigationPlan.interviews)
  @JoinColumn({ name: 'investigation_plan_id' })
  investigationPlan?: InvestigationPlan;

  @ManyToOne(() => User, (user) => user.interviews)
  @JoinColumn({ name: 'interviewer_id' })
  interviewer!: User;
}