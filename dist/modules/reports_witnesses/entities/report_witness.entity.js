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
exports.ReportWitness = void 0;
const typeorm_1 = require("typeorm");
const report_entity_1 = require("@/modules/reports/entities/report.entity");
const witness_entity_1 = require("@/modules/witnesses/entities/witness.entity");
let ReportWitness = class ReportWitness {
    report_id;
    witness_id;
    is_deleted;
    // ManyToOne
    report;
    witness;
};
exports.ReportWitness = ReportWitness;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], ReportWitness.prototype, "report_id", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], ReportWitness.prototype, "witness_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], ReportWitness.prototype, "is_deleted", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => report_entity_1.Report, (report) => report.reportWitnesses),
    (0, typeorm_1.JoinColumn)({ name: "report_id" }),
    __metadata("design:type", report_entity_1.Report)
], ReportWitness.prototype, "report", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => witness_entity_1.Witness, (witness) => witness.reportWitnesses),
    (0, typeorm_1.JoinColumn)({ name: "witness_id" }),
    __metadata("design:type", witness_entity_1.Witness)
], ReportWitness.prototype, "witness", void 0);
exports.ReportWitness = ReportWitness = __decorate([
    (0, typeorm_1.Entity)("reports_witnesses")
], ReportWitness);
