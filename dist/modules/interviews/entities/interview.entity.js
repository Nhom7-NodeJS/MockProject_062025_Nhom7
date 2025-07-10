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
exports.Interview = void 0;
const typeorm_1 = require("typeorm");
const investigation_plan_entity_1 = require("@/modules/investigation_plans/entities/investigation_plan.entity");
const question_entity_1 = require("@/modules/questions/entity/question.entity");
const user_entity_1 = require("@/modules/users/entities/user.entity");
const victim_interview_entity_1 = require("@/modules/victims_interviews/entities/victim_interview.entity");
const witness_interview_entity_1 = require("@/modules/witnesses_interviews/entities/witness_interview.entity");
let Interview = class Interview {
    interview_id;
    type_interviewee;
    location;
    attached_file;
    start_time;
    end_time;
    is_deleted;
    // OneToMany
    questions;
    victimInterviews;
    witnessInterviews;
    // ManyToOne
    investigationPlan;
    interviewer;
};
exports.Interview = Interview;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Interview.prototype, "interview_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Interview.prototype, "type_interviewee", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Interview.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "json" }),
    __metadata("design:type", Array)
], Interview.prototype, "attached_file", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Interview.prototype, "start_time", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Interview.prototype, "end_time", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Interview.prototype, "is_deleted", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => question_entity_1.Question, (question) => question.interview),
    __metadata("design:type", Array)
], Interview.prototype, "questions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => victim_interview_entity_1.VictimInterview, (victimInterview) => victimInterview.interview),
    __metadata("design:type", Array)
], Interview.prototype, "victimInterviews", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => witness_interview_entity_1.WitnessInterview, (witnessInterview) => witnessInterview.interview),
    __metadata("design:type", Array)
], Interview.prototype, "witnessInterviews", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => investigation_plan_entity_1.InvestigationPlan, (investigationPlan) => investigationPlan.interviews),
    (0, typeorm_1.JoinColumn)({ name: 'investigation_plan_id' }),
    __metadata("design:type", investigation_plan_entity_1.InvestigationPlan)
], Interview.prototype, "investigationPlan", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.interviews),
    (0, typeorm_1.JoinColumn)({ name: 'interviewer_id' }),
    __metadata("design:type", user_entity_1.User)
], Interview.prototype, "interviewer", void 0);
exports.Interview = Interview = __decorate([
    (0, typeorm_1.Entity)("interviews")
], Interview);
