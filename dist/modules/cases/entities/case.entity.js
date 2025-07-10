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
exports.Case = void 0;
const typeorm_1 = require("typeorm");
const arrest_entity_1 = require("@/modules/arrests/entities/arrest.entity");
const case_evidence_entity_1 = require("@/modules/cases_evidences/entities/case_evidence.entity");
const case_result_entity_1 = require("@/modules/case_results/entities/case_result.entity");
const evidence_entity_1 = require("@/modules/evidences/entities/evidence.entity");
const investigation_plan_entity_1 = require("@/modules/investigation_plans/entities/investigation_plan.entity");
const prosecution_entity_1 = require("@/modules/prosecutions/entities/prosecution.entity");
const report_entity_1 = require("@/modules/reports/entities/report.entity");
const case_user_entity_1 = require("@/modules/cases_users/entities/case_user.entity");
const victim_entity_1 = require("@/modules/victims/entities/victim.entity");
const warrant_entity_1 = require("@/modules/warrants/entities/warrant.entity");
const witness_entity_1 = require("@/modules/witnesses/entities/witness.entity");
let Case = class Case {
    case_id;
    case_name;
    type_case;
    severity;
    status;
    summary;
    create_at;
    is_deleted;
    // OneToMany
    arrests;
    caseEvidences;
    caseResults;
    caseUsers;
    evidences;
    investigationPlans;
    prosecutions;
    reports;
    victims;
    warrants;
    witnesses;
};
exports.Case = Case;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Case.prototype, "case_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Case.prototype, "case_name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Case.prototype, "type_case", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Case.prototype, "severity", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Case.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Case.prototype, "summary", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp" }),
    __metadata("design:type", Date)
], Case.prototype, "create_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], Case.prototype, "is_deleted", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => arrest_entity_1.Arrest, (arrest) => arrest.case),
    __metadata("design:type", Array)
], Case.prototype, "arrests", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => case_evidence_entity_1.CaseEvidence, (caseEvidence) => caseEvidence.case),
    __metadata("design:type", Array)
], Case.prototype, "caseEvidences", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => case_result_entity_1.CaseResult, (caseResult) => caseResult.case),
    __metadata("design:type", Array)
], Case.prototype, "caseResults", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => case_user_entity_1.CaseUser, (caseUser) => caseUser.case),
    __metadata("design:type", Array)
], Case.prototype, "caseUsers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => evidence_entity_1.Evidence, (evidence) => evidence.case),
    __metadata("design:type", Array)
], Case.prototype, "evidences", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => investigation_plan_entity_1.InvestigationPlan, (investigationPlan) => investigationPlan.case),
    __metadata("design:type", Array)
], Case.prototype, "investigationPlans", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => prosecution_entity_1.Prosecution, (prosecution) => prosecution.case),
    __metadata("design:type", Array)
], Case.prototype, "prosecutions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => report_entity_1.Report, (report) => report.case),
    __metadata("design:type", Array)
], Case.prototype, "reports", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => victim_entity_1.Victim, (victim) => victim.case),
    __metadata("design:type", Array)
], Case.prototype, "victims", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => warrant_entity_1.Warrant, (warrant) => warrant.case),
    __metadata("design:type", Array)
], Case.prototype, "warrants", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => witness_entity_1.Witness, (witness) => witness.case),
    __metadata("design:type", Array)
], Case.prototype, "witnesses", void 0);
exports.Case = Case = __decorate([
    (0, typeorm_1.Entity)("cases")
], Case);
