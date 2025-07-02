import { Interview } from "@/modules/interview/entities/interview.entity";
import { Victim } from "@/modules/victims/entities/victim.entity";
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm";

@Entity("victim_interview")
export class VictimInterview {
  @PrimaryColumn()
  victim_id!: string;

  @PrimaryColumn()
  interview_id!: string;

  @ManyToOne(() => Victim, (victim) => victim.victims_interviews)
  @JoinColumn({ name: "victim_id" })
  victim!: Victim;

  @ManyToOne(() => Interview, (interview) => interview.victims_interviews)
  @JoinColumn({ name: "interview_id" })
  interview!: Interview;

  @Column({ type: "boolean", default: false })
  is_deleted!: boolean;
}
