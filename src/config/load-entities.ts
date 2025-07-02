import { Arrest } from "@/modules/arrests/entities/arrest.entity";
import { CaseResult } from "@/modules/case_result/entities/case_result.entity";
import { Case } from "@/modules/cases/entities/case.entity";
import { CaseEvidence } from "@/modules/cases_evidences/entities/case_evidence.entity";
import { DigitalInvert } from "@/modules/digital_inverts/entities/digital_invert.entity";
import { Event } from "@/modules/event/entities/event.entity";
import { Evidence } from "@/modules/evidences/entities/evidence.entity";
import { FinancialInvest } from "@/modules/financial_invest/entities/financial_invest.entities";
import { ForensicInvest } from "@/modules/forensic_invest/entities/forensic_invest.entity";
import { Indictment } from "@/modules/indictments/entities/indictment.entity";
import { Inmate } from "@/modules/inmate/entities/inmate.entity";
import { Interview } from "@/modules/interview/entities/interview.entity";
import { InvestigationPlan } from "@/modules/investigation_plans/entities/investigation_plan.entity";
import { MeasureSurvey } from "@/modules/measure_surveys/entities/measure_survey.entity";
import { Permission } from "@/modules/permission/entities/permission.entity";
import { PhysicalInvest } from "@/modules/physical_invest/entities/physical_invest.entity";
import { Prosecution } from "@/modules/prosecutions/entities/prosecution.entity";
import { ProsecutionSuspect } from "@/modules/prosecutions_suspects/entities/prosecution_suspect.entity";
import { Question } from "@/modules/questions/entity/question.entity";
import { RecordInfor } from "@/modules/record_infors/entities/record_infor.entity";
import { Report } from "@/modules/reports/entities/report.entity";
import { ReportSuspect } from "@/modules/reports_suspects/entities/report_suspect.entity";
import { ReportVictim } from "@/modules/reports_victims/entities/report_victim.entity";
import { Role } from "@/modules/roles/entities/role.entity";
import { RolePermission } from "@/modules/roles_permissions/entities/role_permission.entity";
import { Sentence } from "@/modules/sentences/entities/sentence.entity";
import { Suspect } from "@/modules/suspects/entities/suspect.entity";
import { SuspectEvidence } from "@/modules/suspects_evidences/entities/suspect_evidence.entity";
import { Timeline } from "@/modules/timeline/entities/timeline.entity";
import { User } from "@/modules/users/entities/user.entity";
import { UserCase } from "@/modules/users_cases/entities/user_case.entity";
import { Victim } from "@/modules/victims/entities/victim.entity";
import { VictimInterview } from "@/modules/victims_interview/entities/victim_interview.entity";
import { Warrant } from "@/modules/warrant/entities/warrant.entity";
import { WarrantEvidence } from "@/modules/warrant_evidences/entities/warrant_evidence.entity";
import { WarrantResult } from "@/modules/warrant_result/entities/warrant_result.entity";
import { Witness } from "@/modules/witness/entities/witness.entity";
import { WitnessInterview } from "@/modules/witness_interview/entities/witness_interview.entity";

export const entities = [
  User,
  Arrest,
  CaseResult,
  Case,
  CaseEvidence,
  DigitalInvert,
  Event,
  Evidence,
  FinancialInvest,
  ForensicInvest,
  Indictment,
  Inmate,
  Interview,
  InvestigationPlan,
  MeasureSurvey,
  Permission,
  PhysicalInvest,
  Prosecution,
  ProsecutionSuspect,
  Question,
  RecordInfor,
  Report,
  ReportSuspect,
  ReportVictim,
  Role,
  RolePermission,
  Sentence,
  Suspect,
  SuspectEvidence,
  Timeline,
  UserCase,
  Victim,
  VictimInterview,
  Warrant,
  WarrantEvidence,
  WarrantResult,
  Witness,
  WitnessInterview
];
