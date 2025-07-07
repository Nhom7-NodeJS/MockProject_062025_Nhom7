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
exports.Suspect = void 0;
const typeorm_1 = require("typeorm");
const arrest_entity_1 = require("@/modules/arrests/entities/arrest.entity");
const evidence_suspect_entity_1 = require("@/modules/evidences_suspects/entities/evidence_suspect.entity");
const report_entity_1 = require("@/modules/reports/entities/report.entity");
let Suspect = class Suspect {
    suspect_id;
    fullname;
    national;
    gender;
    dob;
    identification;
    phone_number;
    description;
    address;
    catch_time;
    notes;
    status;
    mugshot_url;
    fingerprints_hash;
    health_status;
    // OneToMany
    arrests;
    evidenceSuspects;
    // ManyToOne
    report;
};
exports.Suspect = Suspect;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Suspect.prototype, "suspect_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Suspect.prototype, "fullname", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Suspect.prototype, "national", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Suspect.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp" }),
    __metadata("design:type", Date)
], Suspect.prototype, "dob", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Suspect.prototype, "identification", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Suspect.prototype, "phone_number", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Suspect.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Suspect.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp" }),
    __metadata("design:type", Date)
], Suspect.prototype, "catch_time", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Suspect.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Suspect.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Suspect.prototype, "mugshot_url", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Suspect.prototype, "fingerprints_hash", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Suspect.prototype, "health_status", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => arrest_entity_1.Arrest, (arrest) => arrest.suspect),
    __metadata("design:type", Array)
], Suspect.prototype, "arrests", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => evidence_suspect_entity_1.EvidenceSuspect, (evidenceSuspect) => evidenceSuspect.suspect),
    __metadata("design:type", Array)
], Suspect.prototype, "evidenceSuspects", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => report_entity_1.Report, (report) => report.suspects),
    (0, typeorm_1.JoinColumn)({ name: "report_id" }),
    __metadata("design:type", report_entity_1.Report)
], Suspect.prototype, "report", void 0);
exports.Suspect = Suspect = __decorate([
    (0, typeorm_1.Entity)("suspects")
], Suspect);
