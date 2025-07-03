import { Arrest } from "@/modules/arrest/entities/arrest.entity";
import { Case } from "@/modules/case/entities/case.entity";
import { CaseResult } from "@/modules/case_result/entities/case_result.entity";
import { CasesEvidences } from "@/modules/cases_evidences/entities/cases_evidences.entity";
import { DigitalInvert } from "@/modules/digital_invest/entities/digital_invest.entity";
import { Evidence } from "@/modules/evidences/entities/evidence.entity";
import { EvidencesSuspects } from "@/modules/evidences_suspects/entities/evidences_suspects.entity";
import { FinancialInvest } from "@/modules/financial_invest/entities/financial_invest.entities";
import { ForensicInvest } from "@/modules/forensic_invest/entities/forensic_invest.entity";
import { Indictment } from "@/modules/indictments/entities/indictment.entity";
import { Interview } from "@/modules/interview/entities/interview.entity";
import { InvestigationPlan } from "@/modules/investigation_plan/entities/investigation_plan.entity";
import { MeasureSurvey } from "@/modules/measure_survey/entities/measure_survey.entity";
import { Permission } from "@/modules/permission/entities/permission.entity";
import { RolesPermissions } from "@/modules/permission_role/entities/permission_role.entity";
import { PhysicalInvest } from "@/modules/physical_invest/entities/physical_invest.entity";
import { Prosecution } from "@/modules/prosecution/entities/prosecution.entity";
import { Question } from "@/modules/question/entity/question.entity";
import { RecordInfo } from "@/modules/record_infor/entities/record_infor.entity";
import { Report } from "@/modules/reports/entities/report.entity";
import { ReportsVictims } from "@/modules/reports_victims/entities/reports_victims.entity";
import { Role } from "@/modules/roles/entities/role.entity";
import { Sentence } from "@/modules/sentence/entities/sentence.entity";
import { Suspect } from "@/modules/suspect/entities/suspect.entity";
import { Timeline } from "@/modules/timeline/entities/timeline.entity";
import { UsersCases } from "@/modules/user_case/entities/user_case.entity";
import { User } from "@/modules/users/entities/user.entity";
import { VictimInterview } from "@/modules/victim_interview/entities/victim_interview.entity";
import { Victim } from "@/modules/victims/entities/victim.entity";
import { Warrant } from "@/modules/warrant/entities/warrant.entity";
import { WarrantResult } from "@/modules/warrant_result/entities/warrant_result.entity";
import { Witness } from "@/modules/witness/entities/witness.entity";
import { WitnessesInterviews } from "@/modules/witnesses_interviews/entities/witnesses_interviews.entity";

// import entity to use in config-database file
// export const entities = [User, Arrest, Case, CaseResult];

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
];
