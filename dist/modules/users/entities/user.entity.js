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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const evidence_entity_1 = require("@/modules/evidences/entities/evidence.entity");
const interview_entity_1 = require("@/modules/interviews/entities/interview.entity");
const investigation_plan_entity_1 = require("@/modules/investigation_plans/entities/investigation_plan.entity");
const prosecution_entity_1 = require("@/modules/prosecutions/entities/prosecution.entity");
const prosecution_user_entity_1 = require("@/modules/prosecutions_users/entities/prosecution_user.entity");
const question_entity_1 = require("@/modules/questions/entity/question.entity");
const report_entity_1 = require("@/modules/reports/entities/report.entity");
const role_entity_1 = require("@/modules/roles/entities/role.entity");
const case_user_entity_1 = require("@/modules/cases_users/entities/case_user.entity");
const user_enum_1 = require("@/modules/users/enums/user.enum");
let User = class User {
    username;
    password_hash;
    fullname;
    avatar_url;
    phone_number;
    dob;
    date_attended;
    status;
    create_at;
    is_deleted;
    refresh_token;
    // OneToMany
    caseUsers;
    evidences;
    investigationPlans;
    interviews;
    prosecutions;
    prosecutionUsers;
    questions;
    reports;
    // ManyToOne
    role;
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password_hash", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "fullname", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "avatar_url", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "phone_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp" }),
    __metadata("design:type", Date)
], User.prototype, "dob", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp" }),
    __metadata("design:type", Date)
], User.prototype, "date_attended", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: user_enum_1.UserStatus }),
    __metadata("design:type", String)
], User.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp" }),
    __metadata("design:type", Date)
], User.prototype, "create_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "is_deleted", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "refresh_token", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => case_user_entity_1.CaseUser, (caseUser) => caseUser.user),
    __metadata("design:type", Array)
], User.prototype, "caseUsers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => evidence_entity_1.Evidence, (evidence) => evidence.user),
    __metadata("design:type", Array)
], User.prototype, "evidences", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => investigation_plan_entity_1.InvestigationPlan, (investigationPlan) => investigationPlan.createdOfficer),
    __metadata("design:type", Array)
], User.prototype, "investigationPlans", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => interview_entity_1.Interview, (interview) => interview.interviewer),
    __metadata("design:type", Array)
], User.prototype, "interviews", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => prosecution_entity_1.Prosecution, (prosecution) => prosecution.user),
    __metadata("design:type", Array)
], User.prototype, "prosecutions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => prosecution_user_entity_1.ProsecutionUser, (prosecutionUser) => prosecutionUser.user),
    __metadata("design:type", Array)
], User.prototype, "prosecutionUsers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => question_entity_1.Question, (question) => question.user),
    __metadata("design:type", Array)
], User.prototype, "questions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => report_entity_1.Report, (report) => report.user),
    __metadata("design:type", Array)
], User.prototype, "reports", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => role_entity_1.Role, (role) => role.users),
    (0, typeorm_1.JoinColumn)({ name: "role_id" }),
    __metadata("design:type", role_entity_1.Role)
], User.prototype, "role", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)("users")
], User);
