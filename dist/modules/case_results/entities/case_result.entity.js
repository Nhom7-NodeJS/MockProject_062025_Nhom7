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
exports.CaseResult = void 0;
const typeorm_1 = require("typeorm");
const case_entity_1 = require("@/modules/cases/entities/case.entity");
const sentence_entity_1 = require("@/modules/sentences/entities/sentence.entity");
const timeline_entity_1 = require("@/modules/timelines/entities/timeline.entity");
let CaseResult = class CaseResult {
    case_result_id;
    report_time;
    report_analyst;
    summary;
    identify_motive;
    status;
    is_deleted;
    // OneToMany
    sentences;
    timelines;
    // ManyToOne
    case;
};
exports.CaseResult = CaseResult;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], CaseResult.prototype, "case_result_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp" }),
    __metadata("design:type", Date)
], CaseResult.prototype, "report_time", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CaseResult.prototype, "report_analyst", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CaseResult.prototype, "summary", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CaseResult.prototype, "identify_motive", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CaseResult.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false, type: "boolean" }),
    __metadata("design:type", Boolean)
], CaseResult.prototype, "is_deleted", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => sentence_entity_1.Sentence, (sentence) => sentence.caseResult),
    __metadata("design:type", Array)
], CaseResult.prototype, "sentences", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => timeline_entity_1.Timeline, (timeline) => timeline.caseResult),
    __metadata("design:type", Array)
], CaseResult.prototype, "timelines", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => case_entity_1.Case, (case_) => case_.caseResults),
    (0, typeorm_1.JoinColumn)({ name: "case_id" }),
    __metadata("design:type", case_entity_1.Case)
], CaseResult.prototype, "case", void 0);
exports.CaseResult = CaseResult = __decorate([
    (0, typeorm_1.Entity)("case_results")
], CaseResult);
