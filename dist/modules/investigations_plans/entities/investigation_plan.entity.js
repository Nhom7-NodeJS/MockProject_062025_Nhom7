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
exports.InvestigationPlan = void 0;
const case_entity_1 = require("@/modules/cases/entities/case.entity");
const interview_entity_1 = require("@/modules/interviews/entities/interview.entity");
const user_entity_1 = require("@/modules/users/entities/user.entity");
const typeorm_1 = require("typeorm");
let InvestigationPlan = class InvestigationPlan {
    investigation_plan_id; // PK
    deadline_date;
    result;
    status;
    create_at;
    plan_content;
    is_deleted;
    case;
    created_officer_id;
    interviews;
};
exports.InvestigationPlan = InvestigationPlan;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: "varchar" }),
    __metadata("design:type", String)
], InvestigationPlan.prototype, "investigation_plan_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp" }),
    __metadata("design:type", Date)
], InvestigationPlan.prototype, "deadline_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], InvestigationPlan.prototype, "result", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], InvestigationPlan.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], InvestigationPlan.prototype, "create_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], InvestigationPlan.prototype, "plan_content", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_deleted", default: false }),
    __metadata("design:type", Boolean)
], InvestigationPlan.prototype, "is_deleted", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => case_entity_1.Case, (case_) => case_.investigationPlans),
    (0, typeorm_1.JoinColumn)({ name: "case_id" }),
    __metadata("design:type", case_entity_1.Case)
], InvestigationPlan.prototype, "case", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.investigationPlans),
    (0, typeorm_1.JoinColumn)({ name: "user_id" }),
    __metadata("design:type", user_entity_1.User)
], InvestigationPlan.prototype, "created_officer_id", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => interview_entity_1.Interview, (interview) => interview.investigationPlan),
    __metadata("design:type", Array)
], InvestigationPlan.prototype, "interviews", void 0);
exports.InvestigationPlan = InvestigationPlan = __decorate([
    (0, typeorm_1.Entity)("investigations_plans")
], InvestigationPlan);
