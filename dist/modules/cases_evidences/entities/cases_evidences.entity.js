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
exports.CasesEvidences = void 0;
const case_entity_1 = require("@/modules/cases/entities/case.entity");
const evidence_entity_1 = require("@/modules/evidences/entities/evidence.entity");
const typeorm_1 = require("typeorm");
let CasesEvidences = class CasesEvidences {
    case_id;
    evidence_id;
    case;
    evidence;
    is_deleted;
};
exports.CasesEvidences = CasesEvidences;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], CasesEvidences.prototype, "case_id", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], CasesEvidences.prototype, "evidence_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => case_entity_1.Case, (case_) => case_.cases_evidences),
    (0, typeorm_1.JoinColumn)({ name: "case_id" }),
    __metadata("design:type", case_entity_1.Case)
], CasesEvidences.prototype, "case", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => evidence_entity_1.Evidence, (evidence) => evidence.cases_evidences),
    (0, typeorm_1.JoinColumn)({ name: "evidence_id" }),
    __metadata("design:type", evidence_entity_1.Evidence)
], CasesEvidences.prototype, "evidence", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], CasesEvidences.prototype, "is_deleted", void 0);
exports.CasesEvidences = CasesEvidences = __decorate([
    (0, typeorm_1.Entity)("cases_evidences")
], CasesEvidences);
