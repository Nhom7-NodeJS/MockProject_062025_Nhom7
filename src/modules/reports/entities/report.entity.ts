import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { User } from "@/modules/users/entities/user.entity";
import { Case } from "@/modules/cases/entities/case.entity";
import { Evidence } from "@/modules/evidences/entities/evidence.entity";
import { ReportSuspect } from "@/modules/reports_suspects/entities/report_suspect.entity";
import { ReportVictim } from "@/modules/reports_victims/entities/report_victim.entity";

@Entity('reports')
export class Report {
  @PrimaryColumn()
  report_id!: string;

  @Column()
  case_id!: string

  @Column()
  username!: string

  @Column()
  type_report!: string

  @Column({ nullable: true })
  description?: string
  
  @Column()
  case_location!:string
  
  @Column({ type: 'timestamp' })
  reported_at!: Date
  
  @Column()
  reporter_location!: string
  
  @Column()
  reporter_fullname!: string

  @Column()
  reporter_email!: string;
  
  @Column({ nullable: true })
  reporter_phonenumber?: string

  @Column({ nullable: true })
  office_approve_id?: string

  @Column({ type: 'boolean', default: false })
  is_deleted!: boolean

  @ManyToOne(() => User, (user) => user.reports)
  @JoinColumn({ name: 'username' })
  user!: User;

  @ManyToOne(() => Case, (case_) => case_.reports)
  @JoinColumn({ name: 'case_id' })
  case!: Case;

  @OneToMany(() => Evidence, (evidence) => evidence.report)
  evidences!: Evidence[];

  @OneToMany(() => ReportSuspect, (reportSuspect) => reportSuspect.report)
  reportSuspects!: ReportSuspect[];

  @OneToMany(() => ReportVictim, (reportVictim) => reportVictim.report)
  reportVictims!: ReportVictim[];
}
