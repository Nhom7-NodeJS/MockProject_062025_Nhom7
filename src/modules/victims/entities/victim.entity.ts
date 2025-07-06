import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";

import { Case } from "@/modules/cases/entities/case.entity";
import { ReportVictim } from "@/modules/reports_victims/entities/report_victim.entity";
import { VictimInterview } from "@/modules/victims_interviews/entities/victim_interview.entity";

@Entity("victims")
export class Victim {
  @PrimaryColumn()
  victim_id!: string;

  @Column({ nullable: true })
  fullname?: string;

  @Column()
  contact!: string;

  @Column({ nullable: true })
  national?: string;

  @Column({ nullable: true })
  gender?: string;

  @Column({ nullable: true })
  description?: string;

  @Column()
  injuries!: string;

  @Column()
  status!: string;

  @Column({ type: "boolean", default: false })
  is_deleted!: boolean;

  // OneToMany
  @OneToMany(() => ReportVictim, (reportVictim) => reportVictim.victim)
  reportVictims!: ReportVictim[];

  @OneToMany(() => VictimInterview, (victimInterview) => victimInterview.victim)
  victimInterviews!: VictimInterview[];

  // ManyToOne
  @ManyToOne(() => Case, (case_) => case_.victims)
  @JoinColumn({ name: "case_id" })
  case!: Case;
}
