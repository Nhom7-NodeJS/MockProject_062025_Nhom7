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
exports.Witness = void 0;
const typeorm_1 = require("typeorm");
const case_entity_1 = require("@/modules/cases/entities/case.entity");
const report_witness_entity_1 = require("@/modules/reports_witnesses/entities/report_witness.entity");
const witness_interview_entity_1 = require("@/modules/witnesses_interviews/entities/witness_interview.entity");
let Witness = class Witness {
    witness_id;
    fullname;
    contact;
    national;
    gender;
    statement;
    is_deleted;
    // OneToMany
    witnessInterviews;
    reportWitnesses;
    // ManyToOne
    case;
};
exports.Witness = Witness;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Witness.prototype, "witness_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Witness.prototype, "fullname", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Witness.prototype, "contact", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Witness.prototype, "national", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Witness.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Witness.prototype, "statement", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], Witness.prototype, "is_deleted", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => witness_interview_entity_1.WitnessInterview, (witnessInterview) => witnessInterview.witness),
    __metadata("design:type", Array)
], Witness.prototype, "witnessInterviews", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => report_witness_entity_1.ReportWitness, (reportWitness) => reportWitness.witness),
    __metadata("design:type", Array)
], Witness.prototype, "reportWitnesses", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => case_entity_1.Case, (case_) => case_.witnesses),
    (0, typeorm_1.JoinColumn)({ name: "case_id" }),
    __metadata("design:type", case_entity_1.Case)
], Witness.prototype, "case", void 0);
exports.Witness = Witness = __decorate([
    (0, typeorm_1.Entity)("witnesses")
], Witness);
