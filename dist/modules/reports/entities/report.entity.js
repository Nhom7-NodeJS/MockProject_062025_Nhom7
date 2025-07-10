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
exports.Report = void 0;
const typeorm_1 = require("typeorm");
const case_entity_1 = require("@/modules/cases/entities/case.entity");
const evidence_entity_1 = require("@/modules/evidences/entities/evidence.entity");
const report_victim_entity_1 = require("@/modules/reports_victims/entities/report_victim.entity");
const report_witness_entity_1 = require("@/modules/reports_witnesses/entities/report_witness.entity");
const suspect_entity_1 = require("@/modules/suspects/entities/suspect.entity");
const user_entity_1 = require("@/modules/users/entities/user.entity");
const report_enum_1 = require("@/modules/reports/enums/report.enum");
let Report = class Report {
    report_id;
    crime_type;
    severity;
    incident_date;
    description;
    case_location;
    reported_at;
    reporter_location;
    reporter_fullname;
    reporter_email;
    reporter_phone_number;
    is_deleted;
    status;
    reporter_incident_relationship;
    // OneToMany
    evidences;
    reportVictims;
    reportWitnesses;
    suspects;
    // ManyToOne
    case;
    user;
};
exports.Report = Report;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Report.prototype, "report_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: report_enum_1.CrimeType }),
    __metadata("design:type", String)
], Report.prototype, "crime_type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: report_enum_1.SeverityLevel,
    }),
    __metadata("design:type", String)
], Report.prototype, "severity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp" }),
    __metadata("design:type", Date)
], Report.prototype, "incident_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Report.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Report.prototype, "case_location", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp" }),
    __metadata("design:type", Date)
], Report.prototype, "reported_at", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Report.prototype, "reporter_location", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Report.prototype, "reporter_fullname", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Report.prototype, "reporter_email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Report.prototype, "reporter_phone_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], Report.prototype, "is_deleted", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: report_enum_1.ReportStatus }),
    __metadata("design:type", String)
], Report.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: report_enum_1.ReporterIncidentRelationship }),
    __metadata("design:type", String)
], Report.prototype, "reporter_incident_relationship", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => evidence_entity_1.Evidence, (evidence) => evidence.report),
    __metadata("design:type", Array)
], Report.prototype, "evidences", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => report_victim_entity_1.ReportVictim, (reportVictim) => reportVictim.report),
    __metadata("design:type", Array)
], Report.prototype, "reportVictims", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => report_witness_entity_1.ReportWitness, (reportWitness) => reportWitness.report),
    __metadata("design:type", Array)
], Report.prototype, "reportWitnesses", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => suspect_entity_1.Suspect, (suspect) => suspect.report),
    __metadata("design:type", Array)
], Report.prototype, "suspects", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => case_entity_1.Case, (case_) => case_.reports),
    (0, typeorm_1.JoinColumn)({ name: "case_id" }),
    __metadata("design:type", case_entity_1.Case)
], Report.prototype, "case", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.reports),
    (0, typeorm_1.JoinColumn)({ name: "user_id" }),
    __metadata("design:type", user_entity_1.User)
], Report.prototype, "user", void 0);
exports.Report = Report = __decorate([
    (0, typeorm_1.Entity)("reports")
], Report);
