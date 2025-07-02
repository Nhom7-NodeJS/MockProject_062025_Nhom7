import { Arrest } from "@/modules/arrest/entities/arrest.entity";
import { CaseResult } from "@/modules/case_result/entities/case_result.entity";
import { CasesEvidences } from "@/modules/cases_evidences/entities/cases_evidences.entity";
import { Evidence } from "@/modules/evidences/entities/evidence.entity";
import { InvestigationPlan } from "@/modules/investigation_plan/entities/investigation_plan.entity";
import { Prosecution } from "@/modules/prosecution/entities/prosecution.entity";
import { Report } from "@/modules/reports/entities/report.entity";
import { Sentence } from "@/modules/sentence/entities/sentence.entity";
import { Suspect } from "@/modules/suspect/entities/suspect.entity";
import { UsersCases } from "@/modules/user_case/entities/user_case.entity";
import { Victim } from "@/modules/victims/entities/victim.entity";
import { Warrant } from "@/modules/warrant/entities/warrant.entity";
import { Witness } from "@/modules/witness/entities/witness.entity";
import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";

@Entity("case")
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

  @Column()
  create_at!: Date;

  @Column({ type: "boolean", default: false })
  is_deleted!: boolean;

  @OneToMany(() => CaseResult, (caseResult) => caseResult.case)
  case_results!: CaseResult[];

  @OneToMany(() => Warrant, (warrant) => warrant.case)
  warrants!: Warrant[];

  @OneToMany(() => Report, (report) => report.case)
  reports!: Report[];

  @OneToMany(() => Victim, (victim) => victim.case)
  victims!: Victim[];

  @OneToMany(() => Suspect, (suspect) => suspect.case)
  suspects!: Suspect[];

  @OneToMany(() => Witness, (witness) => witness.case)
  witnesses!: Witness[];

  @OneToMany(
    () => InvestigationPlan,
    (investigationPlan) => investigationPlan.case
  )
  investigation_plans!: InvestigationPlan[];

  @OneToMany(() => Evidence, (evidence) => evidence)
  evidences!: Evidence[];

  @OneToMany(() => Arrest, (arrest) => arrest.case)
  arrests!: Arrest[];

  @OneToMany(() => Prosecution, (prosecution) => prosecution.case)
  prosecutions!: Prosecution[];

  @OneToMany(() => Sentence, (sentence) => sentence.case)
  sentences!: Sentence[];

  @OneToMany(() => UsersCases, (usersCases) => usersCases.case)
  users_cases!: UsersCases[];

  @OneToMany(() => CasesEvidences, (casesEvidences) => casesEvidences.case)
  cases_evidences!: CasesEvidences[];
}
