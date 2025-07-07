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
exports.Victim = void 0;
const typeorm_1 = require("typeorm");
const case_entity_1 = require("@/modules/cases/entities/case.entity");
const report_victim_entity_1 = require("@/modules/reports_victims/entities/report_victim.entity");
const victim_interview_entity_1 = require("@/modules/victims_interviews/entities/victim_interview.entity");
let Victim = class Victim {
    victim_id;
    fullname;
    contact;
    national;
    gender;
    description;
    injuries;
    status;
    is_deleted;
    // OneToMany
    reportVictims;
    victimInterviews;
    // ManyToOne
    case;
};
exports.Victim = Victim;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Victim.prototype, "victim_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Victim.prototype, "fullname", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Victim.prototype, "contact", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Victim.prototype, "national", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Victim.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Victim.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Victim.prototype, "injuries", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Victim.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], Victim.prototype, "is_deleted", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => report_victim_entity_1.ReportVictim, (reportVictim) => reportVictim.victim),
    __metadata("design:type", Array)
], Victim.prototype, "reportVictims", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => victim_interview_entity_1.VictimInterview, (victimInterview) => victimInterview.victim),
    __metadata("design:type", Array)
], Victim.prototype, "victimInterviews", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => case_entity_1.Case, (case_) => case_.victims),
    (0, typeorm_1.JoinColumn)({ name: "case_id" }),
    __metadata("design:type", case_entity_1.Case)
], Victim.prototype, "case", void 0);
exports.Victim = Victim = __decorate([
    (0, typeorm_1.Entity)("victims")
], Victim);
