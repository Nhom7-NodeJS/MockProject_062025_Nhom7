import { Arrest } from "@/modules/arrests/entities/arrest.entity";
import { CaseResult } from "@/modules/case_results/entities/case_result.entity";
import { Case } from "@/modules/cases/entities/case.entity";
import { CaseEvidence } from "@/modules/cases_evidences/entities/case_evidence.entity";
import { CaseUser } from "@/modules/cases_users/entities/case_user.entity";
import { DigitalInvest } from "@/modules/digital_invests/entities/digital_invest.entity";
import { Event } from "@/modules/events/entities/event.entity";
import { Evidence } from "@/modules/evidences/entities/evidence.entity";
import { EvidenceSuspect } from "@/modules/evidences_suspects/entities/evidence_suspect.entity";
import { FinancialInvest } from "@/modules/financial_invests/entities/financial_invest.entities";
import { ForensicInvest } from "@/modules/forensic_invests/entities/forensic_invest.entity";
import { Holiday } from "@/modules/holidays/entities/holiday.entity";
import { Indictment } from "@/modules/indictments/entities/indictment.entity";
import { Inmate } from "@/modules/inmates/entities/inmate.entity";
import { Interview } from "@/modules/interviews/entities/interview.entity";
import { InvestigationPlan } from "@/modules/investigation_plans/entities/investigation_plan.entity";
import { MeasureSurvey } from "@/modules/measure_surveys/entities/measure_survey.entity";
import { Permission } from "@/modules/permissions/entities/permission.entity";
import { PermissionRole } from "@/modules/permissions_roles/entities/permission_role.entity";
import { PhysicalInvest } from "@/modules/physical_invests/entities/physical_invest.entity";
import { Prosecution } from "@/modules/prosecutions/entities/prosecution.entity";
import { ProsecutionUser } from "@/modules/prosecutions_users/entities/prosecution_user.entity";
import { Question } from "@/modules/questions/entity/question.entity";
import { RecordInfo } from "@/modules/records_infos/entities/record_info.entity";
import { Report } from "@/modules/reports/entities/report.entity";
import { ReportVictim } from "@/modules/reports_victims/entities/report_victim.entity";
import { ReportWitness } from "@/modules/reports_witnesses/entities/report_witness.entity";
import { Role } from "@/modules/roles/entities/role.entity";
import { Sentence } from "@/modules/sentences/entities/sentence.entity";
import { Suspect } from "@/modules/suspects/entities/suspect.entity";
import { Timeline } from "@/modules/timelines/entities/timeline.entity";
import { User } from "@/modules/users/entities/user.entity";
import { Victim } from "@/modules/victims/entities/victim.entity";
import { VictimInterview } from "@/modules/victims_interviews/entities/victim_interview.entity";
import { WarrantResult } from "@/modules/warrant_results/entities/warrant_result.entity";
import { Warrant } from "@/modules/warrants/entities/warrant.entity";
import { Witness } from "@/modules/witnesses/entities/witness.entity";
import { WitnessInterview } from "@/modules/witnesses_interviews/entities/witness_interview.entity";

export const entities = [
  Arrest,
  CaseResult,
  Case,
  CaseEvidence,
  CaseUser,
  DigitalInvest,
  Event, // No relation
  Evidence,
  EvidenceSuspect,
  FinancialInvest,
  ForensicInvest,
  Indictment,
  Inmate, // No relation
  Interview,
  InvestigationPlan,
  MeasureSurvey,
  Permission,
  PermissionRole,
  PhysicalInvest,
  Prosecution,
  ProsecutionUser,
  Question,
  RecordInfo,
  Report,
  ReportVictim,
  ReportWitness,
  Role,
  Sentence,
  Suspect,
  Timeline,
  User,
  Victim,
  VictimInterview,
  WarrantResult,
  Warrant,
  Witness,
  WitnessInterview,
  Holiday,
];
