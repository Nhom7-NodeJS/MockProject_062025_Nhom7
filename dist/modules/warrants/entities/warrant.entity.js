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
exports.Warrant = void 0;
const typeorm_1 = require("typeorm");
const case_entity_1 = require("@/modules/cases/entities/case.entity");
const evidence_entity_1 = require("@/modules/evidences/entities/evidence.entity");
const warrant_result_entity_1 = require("@/modules/warrant_results/entities/warrant_result.entity");
const financial_invest_enum_1 = require("@/modules/financial_invests/enums/financial_invest.enum");
let Warrant = class Warrant {
    warrant_id;
    warrant_name;
    attached_file;
    time_publish;
    is_deleted;
    deadline;
    status;
    // OneToMany
    evidences;
    warrantResults;
    // ManyToOne
    case;
};
exports.Warrant = Warrant;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Warrant.prototype, "warrant_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Warrant.prototype, "warrant_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "json", nullable: true }),
    __metadata("design:type", Array)
], Warrant.prototype, "attached_file", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp" }),
    __metadata("design:type", Date)
], Warrant.prototype, "time_publish", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], Warrant.prototype, "is_deleted", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp" }),
    __metadata("design:type", Date)
], Warrant.prototype, "deadline", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: financial_invest_enum_1.WarrantStatus,
        default: financial_invest_enum_1.WarrantStatus.WAITING_EXECUTING,
    }),
    __metadata("design:type", String)
], Warrant.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => evidence_entity_1.Evidence, (evidence) => evidence.warrant),
    __metadata("design:type", Array)
], Warrant.prototype, "evidences", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => warrant_result_entity_1.WarrantResult, (warrantResult) => warrantResult.warrant),
    __metadata("design:type", Array)
], Warrant.prototype, "warrantResults", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => case_entity_1.Case, (case_) => case_.warrants),
    (0, typeorm_1.JoinColumn)({ name: "case_id" }),
    __metadata("design:type", case_entity_1.Case)
], Warrant.prototype, "case", void 0);
exports.Warrant = Warrant = __decorate([
    (0, typeorm_1.Entity)("warrants")
], Warrant);
