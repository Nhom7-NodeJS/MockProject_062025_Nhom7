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
exports.ReportVictim = void 0;
const typeorm_1 = require("typeorm");
const report_entity_1 = require("@/modules/reports/entities/report.entity");
const victim_entity_1 = require("@/modules/victims/entities/victim.entity");
let ReportVictim = class ReportVictim {
    report_id;
    victim_id;
    is_deleted;
    // ManyToOne
    report;
    victim;
};
exports.ReportVictim = ReportVictim;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], ReportVictim.prototype, "report_id", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], ReportVictim.prototype, "victim_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], ReportVictim.prototype, "is_deleted", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => report_entity_1.Report, (report) => report.reportVictims),
    (0, typeorm_1.JoinColumn)({ name: 'report_id' }),
    __metadata("design:type", report_entity_1.Report)
], ReportVictim.prototype, "report", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => victim_entity_1.Victim, (victim) => victim.reportVictims),
    (0, typeorm_1.JoinColumn)({ name: 'victim_id' }),
    __metadata("design:type", victim_entity_1.Victim)
], ReportVictim.prototype, "victim", void 0);
exports.ReportVictim = ReportVictim = __decorate([
    (0, typeorm_1.Entity)('reports_victims')
], ReportVictim);
