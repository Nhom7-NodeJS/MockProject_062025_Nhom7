import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";

import { Case } from "@/modules/cases/entities/case.entity";
import { ReportVictim } from "@/modules/reports_victims/entities/report_victim.entity";
import { VictimInterview } from "@/modules/victims_interviews/entities/victim_interview.entity";
import { Gender } from "@/modules/users/enums/user.enum";

@Entity("victims")
export class Victim {
  @PrimaryColumn()
  victim_id!: string;

  @Column({ nullable: true })
  fullname?: string;

  @Column({ nullable: true })
  contact?: string;

  @Column({ nullable: true })
  national?: string;

  @Column({ type: "enum", enum: Gender, default: Gender.UNKNOWN })
  gender!: Gender;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  injuries?: string;

  @Column({ nullable: true })
  status?: string;

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
