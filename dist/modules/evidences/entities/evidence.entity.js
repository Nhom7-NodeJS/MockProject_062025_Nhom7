"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Evidence = void 0;
const typeorm_1 = require("typeorm");
const case_entity_1 = require("@/modules/cases/entities/case.entity");
const case_evidence_entity_1 = require("@/modules/cases_evidences/entities/case_evidence.entity");
const evidence_suspect_entity_1 = require("@/modules/evidences_suspects/entities/evidence_suspect.entity");
const forensic_invest_entity_1 = require("@/modules/forensic_invests/entities/forensic_invest.entity");
const measure_survey_entity_1 = require("@/modules/measure_surveys/entities/measure_survey.entity");
const physical_invest_entity_1 = require("@/modules/physical_invests/entities/physical_invest.entity");
const record_info_entity_1 = require("@/modules/records_infos/entities/record_info.entity");
const report_entity_1 = require("@/modules/reports/entities/report.entity");
const user_entity_1 = require("@/modules/users/entities/user.entity");
const warrant_entity_1 = require("@/modules/warrants/entities/warrant.entity");
const financial_invest_entities_1 = require("@/modules/financial_invests/entities/financial_invest.entities");
const digital_invest_entity_1 = require("@/modules/digital_invests/entities/digital_invest.entity");
const evidence_enum_1 = require("@/modules/evidences/enums/evidence.enum");
let Evidence = class Evidence {
    evidence_id;
    description;
    collected_at;
    current_location;
    attach_file;
    status;
    is_deleted;
    evidence_type;
    // OneToOne
    digitalInvest;
    financialInvest;
    forensicInvest;
    physicalInvest;
    // OneToMany
    caseEvidences;
    evidenceSuspects;
    measureSurveys;
    recordInfos;
    // ManyToOne
    case;
    report;
    user;
    warrant;
};
exports.Evidence = Evidence;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Evidence.prototype, "evidence_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Evidence.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp" }),
    __metadata("design:type", Date)
], Evidence.prototype, "collected_at", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Evidence.prototype, "current_location", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Evidence.prototype, "attach_file", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Evidence.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], Evidence.prototype, "is_deleted", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: evidence_enum_1.EvidenceType }),
    __metadata("design:type", String)
], Evidence.prototype, "evidence_type", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => digital_invest_entity_1.DigitalInvest, (digitalInvest) => digitalInvest.evidence),
    __metadata("design:type", digital_invest_entity_1.DigitalInvest)
], Evidence.prototype, "digitalInvest", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => financial_invest_entities_1.FinancialInvest, (financialInvest) => financialInvest.evidence),
    __metadata("design:type", financial_invest_entities_1.FinancialInvest)
], Evidence.prototype, "financialInvest", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => forensic_invest_entity_1.ForensicInvest, (forensicInvest) => forensicInvest.evidence),
    __metadata("design:type", forensic_invest_entity_1.ForensicInvest)
], Evidence.prototype, "forensicInvest", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => physical_invest_entity_1.PhysicalInvest, (physicalInvest) => physicalInvest.evidence),
    __metadata("design:type", physical_invest_entity_1.PhysicalInvest)
], Evidence.prototype, "physicalInvest", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => case_evidence_entity_1.CaseEvidence, (caseEvidence) => caseEvidence.evidence),
    __metadata("design:type", Array)
], Evidence.prototype, "caseEvidences", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => evidence_suspect_entity_1.EvidenceSuspect, (evidenceSuspect) => evidenceSuspect.evidence),
    __metadata("design:type", Array)
], Evidence.prototype, "evidenceSuspects", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => measure_survey_entity_1.MeasureSurvey, (measureSurvey) => measureSurvey.evidence),
    __metadata("design:type", Array)
], Evidence.prototype, "measureSurveys", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => record_info_entity_1.RecordInfo, (recordInfo) => recordInfo.evidence),
    __metadata("design:type", Array)
], Evidence.prototype, "recordInfos", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => case_entity_1.Case, (case_) => case_.evidences),
    (0, typeorm_1.JoinColumn)({ name: "case_id" }),
    __metadata("design:type", case_entity_1.Case)
], Evidence.prototype, "case", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => report_entity_1.Report, (report) => report.evidences),
    (0, typeorm_1.JoinColumn)({ name: "report_id" }),
    __metadata("design:type", report_entity_1.Report)
], Evidence.prototype, "report", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.evidences),
    (0, typeorm_1.JoinColumn)({ name: "user_id" }),
    __metadata("design:type", user_entity_1.User)
], Evidence.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => warrant_entity_1.Warrant, (warrant) => warrant.evidences),
    (0, typeorm_1.JoinColumn)({ name: "warrant_id" }),
    __metadata("design:type", warrant_entity_1.Warrant)
], Evidence.prototype, "warrant", void 0);
exports.Evidence = Evidence = __decorate([
    (0, typeorm_1.Entity)("evidences")
], Evidence);
