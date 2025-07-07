import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";

import { Arrest } from "@/modules/arrests/entities/arrest.entity";
import { CaseEvidence } from "@/modules/cases_evidences/entities/case_evidence.entity";
import { CaseResult } from "@/modules/case_results/entities/case_result.entity";
import { Evidence } from "@/modules/evidences/entities/evidence.entity";
import { InvestigationPlan } from "@/modules/investigation_plans/entities/investigation_plan.entity";
import { Prosecution } from "@/modules/prosecutions/entities/prosecution.entity";
import { Report } from "@/modules/reports/entities/report.entity";
import { CaseUser } from "@/modules/cases_users/entities/case_user.entity";
import { Victim } from "@/modules/victims/entities/victim.entity";
import { Warrant } from "@/modules/warrants/entities/warrant.entity";
import { Witness } from "@/modules/witnesses/entities/witness.entity";

@Entity("cases")
export class Case {
  [x: string]: any;
  @PrimaryColumn()
  case_id!: string;

  @Column()
  case_name!: string;

  @Column()
  type_case!: string;

  @Column()
  severity!: string;

  @Column()
  status!: string;

  @Column({ nullable: true })
  summary?: string;

  @Column({ type: "timestamp" })
  create_at!: Date;

  @Column({ type: "boolean", default: false })
  is_deleted!: boolean;

  // OneToMany
  @OneToMany(() => Arrest, (arrest) => arrest.case)
  arrests!: Arrest[];

  @OneToMany(() => CaseEvidence, (caseEvidence) => caseEvidence.case)
  caseEvidences!: CaseEvidence[];

  @OneToMany(() => CaseResult, (caseResult) => caseResult.case)
  caseResults!: CaseResult[];

  @OneToMany(() => CaseUser, (caseUser) => caseUser.case)
  caseUsers!: CaseUser[];

  @OneToMany(() => Evidence, (evidence) => evidence.case)
  evidences!: Evidence[];

  @OneToMany(() => InvestigationPlan, (investigationPlan) => investigationPlan.case)
  investigationPlans!: InvestigationPlan[];

  @OneToMany(() => Prosecution, (prosecution) => prosecution.case)
  prosecutions!: Prosecution[];

  @OneToMany(() => Report, (report) => report.case)
  reports!: Report[];

  @OneToMany(() => Victim, (victim) => victim.case)
  victims!: Victim[];

  @OneToMany(() => Warrant, (warrant) => warrant.case)
  warrants!: Warrant[];

  @OneToMany(() => Witness, (witness) => witness.case)
  witnesses!: Witness[];
}
