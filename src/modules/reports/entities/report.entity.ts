import { Case } from "@/modules/case/entities/case.entity";
import { Evidence } from "@/modules/evidences/entities/evidence.entity";
import { ReportsVictims } from "@/modules/reports_victims/entities/reports_victims.entity";
import { Suspect } from "@/modules/suspect/entities/suspect.entity";
import { User } from "@/modules/users/entities/user.entity";
import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";

@Entity("reports")
export class Report {
  @PrimaryColumn()
  report_id!: string;

  @Column()
  type_report!: string;

  @Column()
  severity!: string;

  @Column({ type: "timestamp" })
  incident_date!: Date;

  @Column({ nullable: true })
  description?: string;

  @Column()
  case_location!: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  reported_at!: Date;

  @Column()
  reporter_location!: string;

  @Column()
  reporter_fullname!: string;

  @Column()
  reporter_email!: string;

  @Column({ nullable: true })
  reporter_phone_number?: string;

  @Column({ type: "boolean", default: false })
  is_deleted!: boolean;

  @Column()
  status!: string;

  @ManyToOne(() => User, (user) => user.reports)
  @JoinColumn({ name: "user_id" })
  user!: User;

  @ManyToOne(() => Case, (case_) => case_.reports)
  @JoinColumn({ name: "case_id" })
  case!: Case;

  @OneToMany(() => Evidence, (evidence) => evidence.report)
  evidences!: Evidence[];

  @OneToMany(() => Suspect, (suspect) => suspect.report)
  suspects!: Suspect[];

  @OneToMany(() => ReportsVictims, (reportsVictims) => reportsVictims.report)
  reports_victims!: ReportsVictims[];
}
