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
exports.Arrest = void 0;
const typeorm_1 = require("typeorm");
const case_entity_1 = require("@/modules/cases/entities/case.entity");
const suspect_entity_1 = require("@/modules/suspects/entities/suspect.entity");
let Arrest = class Arrest {
    case_id;
    suspect_id;
    suspect_miranda_signature;
    arrest_start_time;
    arrest_end_time;
    is_deleted;
    // ManyToOne
    case;
    suspect;
};
exports.Arrest = Arrest;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Arrest.prototype, "case_id", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Arrest.prototype, "suspect_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Arrest.prototype, "suspect_miranda_signature", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp" }),
    __metadata("design:type", Date)
], Arrest.prototype, "arrest_start_time", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], Arrest.prototype, "arrest_end_time", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], Arrest.prototype, "is_deleted", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => case_entity_1.Case, (case_) => case_.arrests),
    (0, typeorm_1.JoinColumn)({ name: "case_id" }),
    __metadata("design:type", case_entity_1.Case)
], Arrest.prototype, "case", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => suspect_entity_1.Suspect, (suspect) => suspect.arrests),
    (0, typeorm_1.JoinColumn)({ name: "suspect_id" }),
    __metadata("design:type", suspect_entity_1.Suspect)
], Arrest.prototype, "suspect", void 0);
exports.Arrest = Arrest = __decorate([
    (0, typeorm_1.Entity)("arrests")
], Arrest);
