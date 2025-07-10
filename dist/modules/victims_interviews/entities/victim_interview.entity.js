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
exports.VictimInterview = void 0;
const typeorm_1 = require("typeorm");
const interview_entity_1 = require("@/modules/interviews/entities/interview.entity");
const victim_entity_1 = require("@/modules/victims/entities/victim.entity");
let VictimInterview = class VictimInterview {
    victim_id;
    interview_id;
    is_deleted;
    // ManyToOne
    victim;
    interview;
};
exports.VictimInterview = VictimInterview;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], VictimInterview.prototype, "victim_id", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], VictimInterview.prototype, "interview_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], VictimInterview.prototype, "is_deleted", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => victim_entity_1.Victim, (victim) => victim.victimInterviews),
    (0, typeorm_1.JoinColumn)({ name: "victim_id" }),
    __metadata("design:type", victim_entity_1.Victim)
], VictimInterview.prototype, "victim", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => interview_entity_1.Interview, (interview) => interview.victimInterviews),
    (0, typeorm_1.JoinColumn)({ name: "interview_id" }),
    __metadata("design:type", interview_entity_1.Interview)
], VictimInterview.prototype, "interview", void 0);
exports.VictimInterview = VictimInterview = __decorate([
    (0, typeorm_1.Entity)("victims_interviews")
], VictimInterview);
