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
exports.WarrantResult = void 0;
const typeorm_1 = require("typeorm");
const warrant_entity_1 = require("@/modules/warrants/entities/warrant.entity");
let WarrantResult = class WarrantResult {
    warrant_result_id;
    police_response;
    location;
    notes;
    time_active;
    is_deleted;
    // ManyToOne
    warrant;
};
exports.WarrantResult = WarrantResult;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], WarrantResult.prototype, "warrant_result_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WarrantResult.prototype, "police_response", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WarrantResult.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WarrantResult.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp" }),
    __metadata("design:type", Date)
], WarrantResult.prototype, "time_active", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], WarrantResult.prototype, "is_deleted", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => warrant_entity_1.Warrant, (warrant) => warrant.warrantResults),
    (0, typeorm_1.JoinColumn)({ name: "warrant_id" }),
    __metadata("design:type", warrant_entity_1.Warrant)
], WarrantResult.prototype, "warrant", void 0);
exports.WarrantResult = WarrantResult = __decorate([
    (0, typeorm_1.Entity)("warrant_results")
], WarrantResult);
