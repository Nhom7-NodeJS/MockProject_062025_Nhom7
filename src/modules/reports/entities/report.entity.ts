import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Case } from "@/modules/cases/entities/case.entity";
import { Evidence } from "@/modules/evidences/entities/evidence.entity";
import { ReportVictim } from "@/modules/reports_victims/entities/report_victim.entity";
import { ReportWitness } from "@/modules/reports_witnesses/entities/report_witness.entity";
import { Suspect } from "@/modules/suspects/entities/suspect.entity";
import { User } from "@/modules/users/entities/user.entity";
import {
  CrimeType,
  ReporterIncidentRelationship,
  ReportStatus,
  SeverityLevel,
} from "@/modules/reports/enums/report.enum";

@Entity("reports")
export class Report {
  @PrimaryGeneratedColumn()
  report_id!: number;

  @Column({ type: "enum", enum: CrimeType })
  crime_type!: CrimeType;

  @Column({ type: "enum", enum: SeverityLevel })
  severity!: SeverityLevel;

  @Column({ type: "timestamp" })
  incident_date!: Date;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  detail_address?: string;

  @Column({ type: "timestamp" })
  reported_at!: Date;

  @Column({ nullable: true })
  reporter_address?: string;

  @Column()
  reporter_fullname!: string;

  @Column()
  reporter_email!: string;

  @Column()
  reporter_phone_number!: string;

  @Column({ type: "boolean", default: false })
  is_deleted!: boolean;

  @Column({ type: "enum", enum: ReportStatus, default:ReportStatus.PENDING })
  status!: ReportStatus;

  @Column({ type: "enum", enum: ReporterIncidentRelationship })
  reporter_incident_relationship!: ReporterIncidentRelationship;

  // OneToMany
  @OneToMany(() => Evidence, (evidence) => evidence.report)
  evidences!: Evidence[];

  @OneToMany(() => ReportVictim, (reportVictim) => reportVictim.report)
  reportVictims!: ReportVictim[];

  @OneToMany(() => ReportWitness, (reportWitness) => reportWitness.report)
  reportWitnesses!: ReportWitness[];

  @OneToMany(() => Suspect, (suspect) => suspect.report)
  suspects!: Suspect[];

  // ManyToOne
  @ManyToOne(() => Case, (case_) => case_.reports)
  @JoinColumn({ name: "case_id" })
  case!: Case;

  @ManyToOne(() => User, (user) => user.reports)
  @JoinColumn({ name: "user_id" })
  user!: User;
}
