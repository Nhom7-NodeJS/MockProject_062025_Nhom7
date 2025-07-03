import { Arrest } from "@/modules/arrests/entities/arrest.entity";
import { CasesEvidences } from "@/modules/cases_evidences/entities/cases_evidences.entity";
import { CaseResult } from "@/modules/cases_results/entities/case_result.entity";
import { Evidence } from "@/modules/evidences/entities/evidence.entity";
import { InvestigationPlan } from "@/modules/investigations_plans/entities/investigation_plan.entity";
import { Prosecution } from "@/modules/prosecutions/entities/prosecution.entity";
import { Report } from "@/modules/reports/entities/report.entity";
import { UsersCases } from "@/modules/users_cases/entities/user_case.entity";
import { Victim } from "@/modules/victims/entities/victim.entity";
import { Warrant } from "@/modules/warrants/entities/warrant.entity";
import { Witness } from "@/modules/witnesses/entities/witness.entity";
import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";

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

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
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

  @OneToMany(() => Witness, (witness) => witness.case)
  witnesses!: Witness[];

  @OneToMany(
    () => InvestigationPlan,
    (investigationPlan) => investigationPlan.case
  )
  investigation_plans!: InvestigationPlan[];

  @OneToMany(() => Evidence, (evidence) => evidence.case)
  evidences!: Evidence[];

  @OneToMany(() => Arrest, (arrest) => arrest.case)
  arrests!: Arrest[];

  @OneToMany(() => Prosecution, (prosecution) => prosecution.case)
  prosecutions!: Prosecution[];

  @OneToMany(() => UsersCases, (usersCases) => usersCases.case)
  users_cases!: UsersCases[];

  @OneToMany(() => CasesEvidences, (casesEvidences) => casesEvidences.case)
  cases_evidences!: CasesEvidences[];
}
