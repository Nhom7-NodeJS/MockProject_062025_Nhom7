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
exports.ProsecutionsUsers = void 0;
const prosecution_entity_1 = require("@/modules/prosecutions/entities/prosecution.entity");
const user_entity_1 = require("@/modules/users/entities/user.entity");
const typeorm_1 = require("typeorm");
let ProsecutionsUsers = class ProsecutionsUsers {
    user_id;
    prosecution_id;
    prosecution;
    user;
    is_deleted;
};
exports.ProsecutionsUsers = ProsecutionsUsers;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], ProsecutionsUsers.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], ProsecutionsUsers.prototype, "prosecution_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => prosecution_entity_1.Prosecution, (prosecution) => prosecution.prosecutions_users),
    (0, typeorm_1.JoinColumn)({ name: "prosecution_id" }),
    __metadata("design:type", prosecution_entity_1.Prosecution)
], ProsecutionsUsers.prototype, "prosecution", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.prosecutions_users),
    (0, typeorm_1.JoinColumn)({ name: "user_id" }),
    __metadata("design:type", user_entity_1.User)
], ProsecutionsUsers.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], ProsecutionsUsers.prototype, "is_deleted", void 0);
exports.ProsecutionsUsers = ProsecutionsUsers = __decorate([
    (0, typeorm_1.Entity)("prosecutions_users")
], ProsecutionsUsers);
