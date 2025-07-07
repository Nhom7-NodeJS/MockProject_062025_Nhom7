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
exports.FinancialInvest = void 0;
const typeorm_1 = require("typeorm");
const evidence_entity_1 = require("@/modules/evidences/entities/evidence.entity");
let FinancialInvest = class FinancialInvest {
    evidence_id;
    summary;
    is_deleted;
    // OneToOne
    evidence;
};
exports.FinancialInvest = FinancialInvest;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], FinancialInvest.prototype, "evidence_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], FinancialInvest.prototype, "summary", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], FinancialInvest.prototype, "is_deleted", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => evidence_entity_1.Evidence, (evidence) => evidence.financialInvest),
    (0, typeorm_1.JoinColumn)({ name: "evidence_id" }),
    __metadata("design:type", evidence_entity_1.Evidence)
], FinancialInvest.prototype, "evidence", void 0);
exports.FinancialInvest = FinancialInvest = __decorate([
    (0, typeorm_1.Entity)("financial_invests")
], FinancialInvest);
