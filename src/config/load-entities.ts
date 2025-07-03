// import entity to use in config-database file

import { Arrest } from "@/modules/arrests/entities/arrest.entity";
import { Case } from "@/modules/cases/entities/case.entity";
import { CasesEvidences } from "@/modules/cases_evidences/entities/cases_evidences.entity";
import { CaseResult } from "@/modules/cases_results/entities/case_result.entity";
import { DigitalInvert } from "@/modules/digitals_invests/entities/digital_invest.entity";
import { Evidence } from "@/modules/evidences/entities/evidence.entity";
import { EvidencesSuspects } from "@/modules/evidences_suspects/entities/evidences_suspects.entity";
import { FinancialInvest } from "@/modules/financials_invests/entities/financial_invest.entities";
import { ForensicInvest } from "@/modules/forensics_invests/entities/forensic_invest.entity";
import { Indictment } from "@/modules/indictments/entities/indictment.entity";
import { Interview } from "@/modules/interviews/entities/interview.entity";
import { InvestigationPlan } from "@/modules/investigations_plans/entities/investigation_plan.entity";
import { MeasureSurvey } from "@/modules/measures_surveys/entities/measure_survey.entity";
import { Permission } from "@/modules/permissions/entities/permission.entity";
import { RolesPermissions } from "@/modules/permissions_roles/entities/permission_role.entity";
import { PhysicalInvest } from "@/modules/physicals_invests/entities/physical_invest.entity";
import { Prosecution } from "@/modules/prosecutions/entities/prosecution.entity";
import { ProsecutionsUsers } from "@/modules/prosecutions_users/entities/prosecutions_users.entity";
import { Question } from "@/modules/questions/entity/question.entity";
import { RecordInfo } from "@/modules/records_infors/entities/record_infor.entity";
import { Report } from "@/modules/reports/entities/report.entity";
import { ReportsVictims } from "@/modules/reports_victims/entities/reports_victims.entity";
import { ReportsWitnesses } from "@/modules/reports_witnesses/entities/reports_witnesses.entity";
import { Role } from "@/modules/roles/entities/role.entity";
import { Sentence } from "@/modules/sentences/entities/sentence.entity";
import { Suspect } from "@/modules/suspects/entities/suspect.entity";
import { Timeline } from "@/modules/timelines/entities/timeline.entity";
import { User } from "@/modules/users/entities/user.entity";
import { UsersCases } from "@/modules/users_cases/entities/user_case.entity";
import { Victim } from "@/modules/victims/entities/victim.entity";
import { VictimInterview } from "@/modules/victims_interviews/entities/victim_interview.entity";
import { Warrant } from "@/modules/warrants/entities/warrant.entity";
import { WarrantResult } from "@/modules/warrants_results/entities/warrant_result.entity";
import { Witness } from "@/modules/witnesses/entities/witness.entity";
import { WitnessesInterviews } from "@/modules/witnesses_interviews/entities/witnesses_interviews.entity";

export const entities = [
  Arrest,
  Case,
  CaseResult,
  CasesEvidences,
  DigitalInvert,
  Evidence,
  EvidencesSuspects,
  FinancialInvest,
  ForensicInvest,
  Indictment,
  Interview,
  InvestigationPlan,
  MeasureSurvey,
  Permission,
  RolesPermissions,
  PhysicalInvest,
  Prosecution,
  Question,
  RecordInfo,
  Report,
  ReportsVictims,
  Role,
  Sentence,
  Suspect,
  Timeline,
  UsersCases,
  User,
  VictimInterview,
  Victim,
  Warrant,
  WarrantResult,
  Witness,
  WitnessesInterviews,
  ReportsWitnesses,
  ProsecutionsUsers,
];
