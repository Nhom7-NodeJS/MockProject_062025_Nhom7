import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

import { Interview } from "@/modules/interviews/entities/interview.entity";
import { Victim } from "@/modules/victims/entities/victim.entity";

@Entity("victims_interviews")
export class VictimInterview {
  @PrimaryColumn()
  victim_id!: string;

  @PrimaryColumn()
  interview_id!: string;

  @Column({ type: "boolean", default: false })
  is_deleted!: boolean;

  // ManyToOne
  @ManyToOne(() => Victim, (victim) => victim.victimInterviews)
  @JoinColumn({ name: "victim_id" })
  victim!: Victim;

  @ManyToOne(() => Interview, (interview) => interview.victimInterviews)
  @JoinColumn({ name: "interview_id" })
  interview!: Interview;
}
