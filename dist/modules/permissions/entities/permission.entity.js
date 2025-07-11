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
exports.Permission = void 0;
const typeorm_1 = require("typeorm");
const permission_role_entity_1 = require("@/modules/permissions_roles/entities/permission_role.entity");
let Permission = class Permission {
    permission_id;
    description;
    is_deleted;
    // OneToMany
    permissionRoles;
};
exports.Permission = Permission;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Permission.prototype, "permission_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Permission.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], Permission.prototype, "is_deleted", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => permission_role_entity_1.PermissionRole, (permissionRole) => permissionRole.permission),
    __metadata("design:type", Array)
], Permission.prototype, "permissionRoles", void 0);
exports.Permission = Permission = __decorate([
    (0, typeorm_1.Entity)("permissions")
], Permission);
