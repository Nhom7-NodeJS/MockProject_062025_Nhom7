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
exports.Prosecution = void 0;
const typeorm_1 = require("typeorm");
const case_entity_1 = require("@/modules/cases/entities/case.entity");
const indictment_entity_1 = require("@/modules/indictments/entities/indictment.entity");
const prosecution_user_entity_1 = require("@/modules/prosecutions_users/entities/prosecution_user.entity");
const user_entity_1 = require("@/modules/users/entities/user.entity");
let Prosecution = class Prosecution {
    prosecution_id;
    decision;
    decision_date;
    reason;
    is_deleted;
    // OneToMany
    indictments;
    prosecutionUsers;
    // ManyToOne
    case;
    user;
};
exports.Prosecution = Prosecution;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Prosecution.prototype, "prosecution_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Prosecution.prototype, "decision", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp" }),
    __metadata("design:type", Date)
], Prosecution.prototype, "decision_date", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Prosecution.prototype, "reason", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], Prosecution.prototype, "is_deleted", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => indictment_entity_1.Indictment, (indictment) => indictment.prosecution),
    __metadata("design:type", Array)
], Prosecution.prototype, "indictments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => prosecution_user_entity_1.ProsecutionUser, (prosecutionUser) => prosecutionUser.prosecution),
    __metadata("design:type", Array)
], Prosecution.prototype, "prosecutionUsers", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => case_entity_1.Case, (case_) => case_.prosecutions),
    (0, typeorm_1.JoinColumn)({ name: "case_id" }),
    __metadata("design:type", case_entity_1.Case)
], Prosecution.prototype, "case", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.prosecutions),
    (0, typeorm_1.JoinColumn)({ name: "user_id" }),
    __metadata("design:type", user_entity_1.User)
], Prosecution.prototype, "user", void 0);
exports.Prosecution = Prosecution = __decorate([
    (0, typeorm_1.Entity)("prosecutions")
], Prosecution);
