import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from "typeorm";

import { Case } from "@/modules/cases/entities/case.entity";
import { CaseEvidence } from "@/modules/cases_evidences/entities/case_evidence.entity";
import { EvidenceSuspect } from "@/modules/evidences_suspects/entities/evidence_suspect.entity";
import { ForensicInvest } from "@/modules/forensic_invests/entities/forensic_invest.entity";
import { MeasureSurvey } from "@/modules/measure_surveys/entities/measure_survey.entity";
import { PhysicalInvest } from "@/modules/physical_invests/entities/physical_invest.entity";
import { RecordInfo } from "@/modules/records_infos/entities/record_info.entity";
import { Report } from "@/modules/reports/entities/report.entity";
import { User } from "@/modules/users/entities/user.entity";
import { Warrant } from "@/modules/warrants/entities/warrant.entity";
import { FinancialInvest } from "@/modules/financial_invests/entities/financial_invest.entity";
import { DigitalInvest } from "@/modules/digital_invests/entities/digital_invest.entity";
import { EvidenceType } from "@/modules/evidences/enums/evidence.enum";

@Entity("evidences")
export class Evidence {
  @PrimaryColumn()
  evidence_id!: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ type: "timestamp", nullable: true })
  collected_at?: Date;

  @Column({ nullable: true })
  current_location?: string;

  @Column({ nullable: true })
  attach_file?: string;

  @Column({ nullable: true })
  status?: string;

  @Column({ type: "boolean", default: false })
  is_deleted!: boolean;

  @Column({ type: "enum", enum: EvidenceType })
  evidence_type!: EvidenceType;

  // OneToOne
  @OneToOne(
    () => DigitalInvest,
    (digitalInvest: DigitalInvest) => digitalInvest.evidence
  )
  digitalInvest?: DigitalInvest;

  @OneToOne(
    () => FinancialInvest,
    (financialInvest: FinancialInvest) => financialInvest.evidence
  )
  financialInvest?: FinancialInvest;

  @OneToOne(
    () => ForensicInvest,
    (forensicInvest: ForensicInvest) => forensicInvest.evidence
  )
  forensicInvest?: ForensicInvest;

  @OneToOne(
    () => PhysicalInvest,
    (physicalInvest: PhysicalInvest) => physicalInvest.evidence
  )
  physicalInvest?: PhysicalInvest;

  // OneToMany
  @OneToMany(() => CaseEvidence, (caseEvidence) => caseEvidence.evidence)
  caseEvidences!: CaseEvidence[];

  @OneToMany(
    () => EvidenceSuspect,
    (evidenceSuspect) => evidenceSuspect.evidence
  )
  evidenceSuspects!: EvidenceSuspect[];

  @OneToMany(() => MeasureSurvey, (measureSurvey) => measureSurvey.evidence)
  measureSurveys!: MeasureSurvey[];

  @OneToMany(() => RecordInfo, (recordInfo) => recordInfo.evidence)
  recordInfos!: RecordInfo[];

  // ManyToOne
  @ManyToOne(() => Case, (case_) => case_.evidences)
  @JoinColumn({ name: "case_id" })
  case!: Case;

  @ManyToOne(() => Report, (report) => report.evidences)
  @JoinColumn({ name: "report_id" })
  report!: Report;

  @ManyToOne(() => User, (user) => user.evidences)
  @JoinColumn({ name: "user_id" })
  user!: User;

  @ManyToOne(() => Warrant, (warrant) => warrant.evidences)
  @JoinColumn({ name: "warrant_id" })
  warrant!: Warrant;
}
