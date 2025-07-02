import { Entity, PrimaryColumn, Column, CreateDateColumn, OneToMany } from "typeorm";
import { CaseResult } from "@/modules/case_result/entities/case_result.entity";
import { Warrant } from "@/modules/warrant/entities/warrant.entity";
import { Report } from "@/modules/reports/entities/report.entity";
import { Victim } from "@/modules/victims/entities/victim.entity";
import { Suspect } from "@/modules/suspects/entities/suspect.entity";
import { Witness } from "@/modules/witness/entities/witness.entity";
import { InvestigationPlan } from "@/modules/investigation_plans/entities/investigation_plan.entity";
import { Evidence } from "@/modules/evidences/entities/evidence.entity";
import { Arrest } from "@/modules/arrests/entities/arrest.entity";
import { Prosecution } from "@/modules/prosecutions/entities/prosecution.entity";
import { Sentence } from "@/modules/sentences/entities/sentence.entity";
import { UserCase } from "@/modules/users_cases/entities/user_case.entity";
import { CaseEvidence } from "@/modules/cases_evidences/entities/case_evidence.entity";

@Entity("cases")
export class Case {
  @PrimaryColumn()
  case_id!: string;

  @Column()
  case_number!: number;

  @Column()
  type_case!: string;

  @Column()
  severity!: string;

  @Column()
  status!: string;

  @Column()
  summary!: string;

  @CreateDateColumn()
  create_at!: Date;

  @Column({ type: 'boolean', default: false })
  is_deleted!: boolean;

  @OneToMany(() => CaseResult, (caseResult) => caseResult.case)
  caseResults?: CaseResult[];

  @OneToMany(() => Warrant, (warrant) => warrant.case)
  warrants?: Warrant[];

  @OneToMany(() => Report, (report) => report.case)
  reports?: Report[];

  @OneToMany(() => Victim, (victim) => victim.case)
  victims?: Victim[];

  @OneToMany(() => Suspect, (suspect) => suspect.case)
  suspects?: Suspect[];

  @OneToMany(() => Witness, (witness) => witness.case)
  witnesses?: Witness[];

  @OneToMany(() => InvestigationPlan, (investigationPlan) => investigationPlan.case)
  investigationPlans?: InvestigationPlan[];

  @OneToMany(() => Evidence, (evidence) => evidence.case)
  evidences?: Evidence[];

  @OneToMany(() => Arrest, (arrest) => arrest.case)
  arrests?: Arrest[];

  @OneToMany(() => Prosecution, (prosecution) => prosecution.case)
  prosecutions?: Prosecution[];

  @OneToMany(() => Sentence, (sentence) => sentence.case)
  sentences?: Sentence[];

  @OneToMany(() => UserCase, (userCase) => userCase.case)
  userCases?: UserCase[];

  @OneToMany(() => CaseEvidence, (caseEvidence) => caseEvidence.case)
  caseEvidences?: CaseEvidence[];
}
