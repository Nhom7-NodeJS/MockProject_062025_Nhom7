import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { User } from "@/modules/users/entities/user.entity";
import { InvestigationPlan } from "@/modules/investigation_plan/entities/investigation_plan.entity";
import { Question } from "@/modules/question/entity/question.entity";
import { WitnessesInterviews } from "@/modules/witnesses_interviews/entities/witnesses_interviews.entity";
import { VictimInterview } from "@/modules/victim_interview/entities/victim_interview.entity";

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

  @Column({ type: "timestamp" })
  start_time!: Date;

  @Column({ type: "timestamp" })
  end_time!: Date;

  @Column({ type: "boolean", default: false })
  is_deleted!: boolean;

  @ManyToOne(() => User, (user) => user.interviews, { onDelete: "CASCADE" })
  @JoinColumn({ name: "interviewer_id" })
  interviewer!: User;

  @ManyToOne(
    () => InvestigationPlan,
    (investigationPlan) => investigationPlan.interviews
  )
  @JoinColumn({ name: "investigation_plan_id" })
  investigationPlan?: InvestigationPlan;

  @OneToMany(() => Question, (question) => question.interview)
  questions!: Question[];

  @OneToMany(
    () => WitnessesInterviews,
    (witnessesInterviews) => witnessesInterviews.interview
  )
  witnesses_interviews!: WitnessesInterviews[];

  @OneToMany(
    () => VictimInterview,
    (victimInterview) => victimInterview.interview
  )
  victims_interviews!: VictimInterview[];
}
