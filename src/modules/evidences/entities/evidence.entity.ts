import { Column, Entity, OneToMany, OneToOne, PrimaryColumn, JoinColumn, ManyToOne } from "typeorm";
import { PhysicalInvest } from "@/modules/physical_invest/entities/physical_invest.entity";
import { FinancialInvest } from "@/modules/financial_invest/entities/financial_invest.entities";
import { RecordInfor } from "@/modules/record_infors/entities/record_infor.entity";
import { MeasureSurvey } from "@/modules/measure_surveys/entities/measure_survey.entity";
import { DigitalInvert } from "@/modules/digital_inverts/entities/digital_invert.entity";
import { Case } from "@/modules/cases/entities/case.entity";
import { User } from "@/modules/users/entities/user.entity";
import { ForensicInvest } from "@/modules/forensic_invest/entities/forensic_invest.entity";
import { CaseEvidence } from "@/modules/cases_evidences/entities/case_evidence.entity";
import { Report } from "@/modules/reports/entities/report.entity";
import { SuspectEvidence } from "@/modules/suspects_evidences/entities/suspect_evidence.entity";
import { WarrantEvidence } from "@/modules/warrant_evidences/entities/warrant_evidence.entity";

@Entity("evidences")
export class Evidence {
  @PrimaryColumn()
  evidence_id!: string;

  @Column()
  case_id!: string;

  @Column()
  measure_survey_id!: string;

  @Column()
  warrant_result_id!: string;

  @Column()
  report_id!: string;

  @Column()
  collected_by!: string;

  @Column()
  description!: string;

  @Column()
  collect_at!: Date;

  @Column()
  current_location!: string;

  @Column()
  attach_file!: string;

  @Column()
  status!: string;

  @Column({ type: "boolean", default: false })
  is_deleted!: boolean;

  @OneToOne(() => PhysicalInvest, (physicalInvest) => physicalInvest.evidence)
  physicalInvest?: PhysicalInvest;

  @OneToOne(() => FinancialInvest, (financialInvest) => financialInvest.evidence)
  financialInvest?: FinancialInvest;

  @OneToMany(() => RecordInfor, (recordInfor) => recordInfor.evidence)
  recordInfors?: RecordInfor[];

  @OneToOne(() => ForensicInvest, (forensicInvest) => forensicInvest.evidence)
  forensicInvest?: ForensicInvest;

  @ManyToOne(() => MeasureSurvey, (measureSurvey) => measureSurvey.evidences)
  @JoinColumn({ name: 'measure_survey_id' })
  measureSurvey!: MeasureSurvey;

  @OneToOne(() => DigitalInvert, (digitalInvert) => digitalInvert.evidence)
  @JoinColumn({ name: 'digital_invert_id' })
  digitalInvert?: DigitalInvert;

  @ManyToOne(() => Case, (case_) => case_.evidences)
  @JoinColumn({ name: 'case_id' })
  case!: Case;

  @ManyToOne(() => User, (user) => user.collectedEvidences)
  @JoinColumn({ name: 'collected_by' })
  collectedBy!: User;

  @OneToMany(() => CaseEvidence, (caseEvidence) => caseEvidence.evidence)
  caseEvidences?: CaseEvidence[];

  @ManyToOne(() => Report, (report) => report.evidences)
  @JoinColumn({ name: 'report_id' })
  report!: Report;

  @OneToMany(() => SuspectEvidence, (suspectEvidence) => suspectEvidence.evidence)
  suspectEvidences?: SuspectEvidence[];

  @OneToMany(() => WarrantEvidence, (warrantEvidence) => warrantEvidence.evidence)
  warrantEvidences?: WarrantEvidence[];
}
