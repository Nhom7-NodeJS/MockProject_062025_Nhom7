"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.entities = void 0;
const arrest_entity_1 = require("@/modules/arrests/entities/arrest.entity");
const case_result_entity_1 = require("@/modules/case_results/entities/case_result.entity");
const case_entity_1 = require("@/modules/cases/entities/case.entity");
const case_evidence_entity_1 = require("@/modules/cases_evidences/entities/case_evidence.entity");
const case_user_entity_1 = require("@/modules/cases_users/entities/case_user.entity");
const digital_invest_entity_1 = require("@/modules/digital_invests/entities/digital_invest.entity");
const event_entity_1 = require("@/modules/events/entities/event.entity");
const evidence_entity_1 = require("@/modules/evidences/entities/evidence.entity");
const evidence_suspect_entity_1 = require("@/modules/evidences_suspects/entities/evidence_suspect.entity");
const financial_invest_entities_1 = require("@/modules/financial_invests/entities/financial_invest.entities");
const forensic_invest_entity_1 = require("@/modules/forensic_invests/entities/forensic_invest.entity");
const holiday_entity_1 = require("@/modules/holidays/entities/holiday.entity");
const indictment_entity_1 = require("@/modules/indictments/entities/indictment.entity");
const inmate_entity_1 = require("@/modules/inmates/entities/inmate.entity");
const interview_entity_1 = require("@/modules/interviews/entities/interview.entity");
const investigation_plan_entity_1 = require("@/modules/investigation_plans/entities/investigation_plan.entity");
const measure_survey_entity_1 = require("@/modules/measure_surveys/entities/measure_survey.entity");
const permission_entity_1 = require("@/modules/permissions/entities/permission.entity");
const permission_role_entity_1 = require("@/modules/permissions_roles/entities/permission_role.entity");
const physical_invest_entity_1 = require("@/modules/physical_invests/entities/physical_invest.entity");
const prosecution_entity_1 = require("@/modules/prosecutions/entities/prosecution.entity");
const prosecution_user_entity_1 = require("@/modules/prosecutions_users/entities/prosecution_user.entity");
const question_entity_1 = require("@/modules/questions/entity/question.entity");
const record_info_entity_1 = require("@/modules/records_infos/entities/record_info.entity");
const report_entity_1 = require("@/modules/reports/entities/report.entity");
const report_victim_entity_1 = require("@/modules/reports_victims/entities/report_victim.entity");
const report_witness_entity_1 = require("@/modules/reports_witnesses/entities/report_witness.entity");
const role_entity_1 = require("@/modules/roles/entities/role.entity");
const sentence_entity_1 = require("@/modules/sentences/entities/sentence.entity");
const suspect_entity_1 = require("@/modules/suspects/entities/suspect.entity");
const timeline_entity_1 = require("@/modules/timelines/entities/timeline.entity");
const user_entity_1 = require("@/modules/users/entities/user.entity");
const victim_entity_1 = require("@/modules/victims/entities/victim.entity");
const victim_interview_entity_1 = require("@/modules/victims_interviews/entities/victim_interview.entity");
const warrant_result_entity_1 = require("@/modules/warrant_results/entities/warrant_result.entity");
const warrant_entity_1 = require("@/modules/warrants/entities/warrant.entity");
const witness_entity_1 = require("@/modules/witnesses/entities/witness.entity");
const witness_interview_entity_1 = require("@/modules/witnesses_interviews/entities/witness_interview.entity");
exports.entities = [
    arrest_entity_1.Arrest,
    case_result_entity_1.CaseResult,
    case_entity_1.Case,
    case_evidence_entity_1.CaseEvidence,
    case_user_entity_1.CaseUser,
    digital_invest_entity_1.DigitalInvest,
    event_entity_1.Event, // No relation
    evidence_entity_1.Evidence,
    evidence_suspect_entity_1.EvidenceSuspect,
    financial_invest_entities_1.FinancialInvest,
    forensic_invest_entity_1.ForensicInvest,
    indictment_entity_1.Indictment,
    inmate_entity_1.Inmate, // No relation
    interview_entity_1.Interview,
    investigation_plan_entity_1.InvestigationPlan,
    measure_survey_entity_1.MeasureSurvey,
    permission_entity_1.Permission,
    permission_role_entity_1.PermissionRole,
    physical_invest_entity_1.PhysicalInvest,
    prosecution_entity_1.Prosecution,
    prosecution_user_entity_1.ProsecutionUser,
    question_entity_1.Question,
    record_info_entity_1.RecordInfo,
    report_entity_1.Report,
    report_victim_entity_1.ReportVictim,
    report_witness_entity_1.ReportWitness,
    role_entity_1.Role,
    sentence_entity_1.Sentence,
    suspect_entity_1.Suspect,
    timeline_entity_1.Timeline,
    user_entity_1.User,
    victim_entity_1.Victim,
    victim_interview_entity_1.VictimInterview,
    warrant_result_entity_1.WarrantResult,
    warrant_entity_1.Warrant,
    witness_entity_1.Witness,
    witness_interview_entity_1.WitnessInterview,
    holiday_entity_1.Holiday,
];
exports.default = exports.entities;
