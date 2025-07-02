import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { Victim } from "@/modules/victims/entities/victim.entity";
import { Interview } from "@/modules/interview/entities/interview.entity";

@Entity('victims_interview')
export class VictimInterview {
  @PrimaryColumn()
  victim_id!: string;

  @PrimaryColumn()
  interview_id!: string;

  @Column({ type: 'boolean', default: false })
  is_deleted!: boolean;

  @ManyToOne(() => Victim, (victim) => victim.victimInterviews)
  @JoinColumn({ name: 'victim_id' })
  victim!: Victim;

  @ManyToOne(() => Interview, (interview) => interview.victimInterviews)
  @JoinColumn({ name: 'interview_id' })
  interview!: Interview;
}