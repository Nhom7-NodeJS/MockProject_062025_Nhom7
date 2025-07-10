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
exports.CaseUser = void 0;
const typeorm_1 = require("typeorm");
const case_entity_1 = require("@/modules/cases/entities/case.entity");
const user_entity_1 = require("@/modules/users/entities/user.entity");
let CaseUser = class CaseUser {
    case_id;
    user_id;
    is_deleted;
    notes;
    assigned_at;
    // ManyToOne
    case;
    user;
};
exports.CaseUser = CaseUser;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], CaseUser.prototype, "case_id", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], CaseUser.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], CaseUser.prototype, "is_deleted", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], CaseUser.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp" }),
    __metadata("design:type", Date)
], CaseUser.prototype, "assigned_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => case_entity_1.Case, (case_) => case_.caseUsers),
    (0, typeorm_1.JoinColumn)({ name: "case_id" }),
    __metadata("design:type", case_entity_1.Case)
], CaseUser.prototype, "case", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.caseUsers),
    (0, typeorm_1.JoinColumn)({ name: "user_id" }),
    __metadata("design:type", user_entity_1.User)
], CaseUser.prototype, "user", void 0);
exports.CaseUser = CaseUser = __decorate([
    (0, typeorm_1.Entity)("cases_users")
], CaseUser);
