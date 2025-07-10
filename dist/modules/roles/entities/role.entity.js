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
exports.Role = void 0;
const typeorm_1 = require("typeorm");
const permission_role_entity_1 = require("@/modules/permissions_roles/entities/permission_role.entity");
const user_entity_1 = require("@/modules/users/entities/user.entity");
const role_enum_1 = require("@/modules/roles/enums/role.enum");
let Role = class Role {
    role_id;
    description;
    is_deleted;
    // OneToMany
    users;
    permissionRoles;
};
exports.Role = Role;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Role.prototype, "role_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: role_enum_1.UserRole }),
    __metadata("design:type", String)
], Role.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], Role.prototype, "is_deleted", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_entity_1.User, (user) => user.role),
    __metadata("design:type", Array)
], Role.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => permission_role_entity_1.PermissionRole, (permissionRole) => permissionRole.role),
    __metadata("design:type", Array)
], Role.prototype, "permissionRoles", void 0);
exports.Role = Role = __decorate([
    (0, typeorm_1.Entity)("roles")
], Role);
