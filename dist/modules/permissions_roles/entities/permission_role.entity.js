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
exports.PermissionRole = void 0;
const typeorm_1 = require("typeorm");
const permission_entity_1 = require("@/modules/permissions/entities/permission.entity");
const role_entity_1 = require("@/modules/roles/entities/role.entity");
let PermissionRole = class PermissionRole {
    role_id;
    permission_id;
    is_deleted;
    // ManyToOne
    permission;
    role;
};
exports.PermissionRole = PermissionRole;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], PermissionRole.prototype, "role_id", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], PermissionRole.prototype, "permission_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], PermissionRole.prototype, "is_deleted", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => permission_entity_1.Permission, (permission) => permission.permissionRoles),
    (0, typeorm_1.JoinColumn)({ name: "permission_id" }),
    __metadata("design:type", permission_entity_1.Permission)
], PermissionRole.prototype, "permission", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => role_entity_1.Role, (role) => role.permissionRoles),
    (0, typeorm_1.JoinColumn)({ name: "role_id" }),
    __metadata("design:type", role_entity_1.Role)
], PermissionRole.prototype, "role", void 0);
exports.PermissionRole = PermissionRole = __decorate([
    (0, typeorm_1.Entity)("permissions_roles")
], PermissionRole);
