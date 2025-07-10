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
exports.ForensicInvest = void 0;
const evidence_entity_1 = require("@/modules/evidences/entities/evidence.entity");
const typeorm_1 = require("typeorm");
let ForensicInvest = class ForensicInvest {
    evidence_id;
    lab_name;
    report;
    received_at;
    is_deleted;
    evidence;
};
exports.ForensicInvest = ForensicInvest;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], ForensicInvest.prototype, "evidence_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ForensicInvest.prototype, "lab_name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ForensicInvest.prototype, "report", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp" }),
    __metadata("design:type", Date)
], ForensicInvest.prototype, "received_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], ForensicInvest.prototype, "is_deleted", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => evidence_entity_1.Evidence),
    (0, typeorm_1.JoinColumn)({ name: "evidence_id" }),
    __metadata("design:type", evidence_entity_1.Evidence)
], ForensicInvest.prototype, "evidence", void 0);
exports.ForensicInvest = ForensicInvest = __decorate([
    (0, typeorm_1.Entity)("forensics_invests")
], ForensicInvest);
