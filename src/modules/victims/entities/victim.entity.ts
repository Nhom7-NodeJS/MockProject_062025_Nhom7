import { Column, Entity, PrimaryColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Case } from "@/modules/cases/entities/case.entity";
import { ReportVictim } from "@/modules/reports_victims/entities/report_victim.entity";
import { VictimInterview } from "@/modules/victims_interview/entities/victim_interview.entity";

@Entity("victims")
export class Victim {
  @PrimaryColumn()
  victim_id!: string;

  @Column()
  case_id!: string;

  @Column()
  fullname!: string;

  @Column()
  contact!: string;

  @Column()
  injuries!: string;

  @Column()
  status!: string;

  @Column({ type: "boolean", default: false })
  is_deleted!: boolean;

  @ManyToOne(() => Case, (case_) => case_.victims)
  @JoinColumn({ name: 'case_id' })
  case!: Case;

  @OneToMany(() => ReportVictim, (reportVictim) => reportVictim.victim)
  reportVictims!: ReportVictim[];

  @OneToMany(() => VictimInterview, (victimInterview) => victimInterview.victim)
  victimInterviews!: VictimInterview[];
}
