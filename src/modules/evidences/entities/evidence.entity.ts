import { Case } from "@/modules/case/entities/case.entity";
import { CasesEvidences } from "@/modules/cases_evidences/entities/cases_evidences.entity";
import { EvidencesSuspects } from "@/modules/evidences_suspects/entities/evidences_suspects.entity";
import { ForensicInvest } from "@/modules/forensic_invest/entities/forensic_invest.entity";
import { MeasureSurvey } from "@/modules/measure_survey/entities/measure_survey.entity";
import { PhysicalInvest } from "@/modules/physical_invest/entities/physical_invest.entity";
import { RecordInfo } from "@/modules/record_infor/entities/record_infor.entity";
import { Report } from "@/modules/reports/entities/report.entity";
import { User } from "@/modules/users/entities/user.entity";
import { Warrant } from "@/modules/warrant/entities/warrant.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from "typeorm";

@Entity("evidences")
export class Evidence {
  @PrimaryColumn()
  evidence_id!: string;

  @Column()
  description!: string;

  @Column({ type: "timestamp" })
  collected_at!: Date;

  @Column()
  current_location!: string;

  @Column()
  attach_file!: string;

  @Column()
  status!: string;

  @Column({ type: "boolean", default: false })
  is_deleted!: boolean;

  @OneToOne(
    () => PhysicalInvest,
    (physicalInvest: PhysicalInvest) => physicalInvest.evidence
  )
  physicalInvest?: PhysicalInvest;

  @OneToMany(() => RecordInfo, (recordInfo) => recordInfo.evidence)
  record_infos!: RecordInfo[];

  @OneToMany(() => MeasureSurvey, (measureSurvey) => measureSurvey.evidence)
  measure_surveys!: MeasureSurvey[];

  @ManyToOne(() => Case, (case_) => case_.evidences)
  @JoinColumn({ name: "case_id" })
  case!: Case;

  @ManyToOne(() => User, (user) => user.evidences)
  @JoinColumn({ name: "user_id" })
  user!: User;

  @OneToMany(() => CasesEvidences, (casesEvidences) => casesEvidences.evidence)
  cases_evidences!: CasesEvidences[];

  @ManyToOne(() => Report, (report) => report.evidences)
  @JoinColumn({ name: "report_id" })
  report!: Report;

  @OneToMany(
    () => EvidencesSuspects,
    (evidencesSuspects) => evidencesSuspects.evidence
  )
  evidences_suspects!: EvidencesSuspects[];

  @ManyToOne(() => Warrant, (warrant) => warrant.evidences)
  @JoinColumn({ name: "warrant_id" })
  warrant!: Warrant;
}
