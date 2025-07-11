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
exports.Sentence = void 0;
const typeorm_1 = require("typeorm");
const case_result_entity_1 = require("@/modules/case_results/entities/case_result.entity");
let Sentence = class Sentence {
    sentence_id;
    sentence_type;
    duration;
    condition;
    sentencing_date;
    is_deleted;
    // ManyToOne
    caseResult;
};
exports.Sentence = Sentence;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Sentence.prototype, "sentence_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Sentence.prototype, "sentence_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Sentence.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Sentence.prototype, "condition", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp" }),
    __metadata("design:type", Date)
], Sentence.prototype, "sentencing_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], Sentence.prototype, "is_deleted", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => case_result_entity_1.CaseResult, (caseResult) => caseResult.sentences),
    (0, typeorm_1.JoinColumn)({ name: "case_result_id" }),
    __metadata("design:type", case_result_entity_1.CaseResult)
], Sentence.prototype, "caseResult", void 0);
exports.Sentence = Sentence = __decorate([
    (0, typeorm_1.Entity)("sentences")
], Sentence);
