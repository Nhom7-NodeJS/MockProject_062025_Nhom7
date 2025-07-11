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
exports.Holiday = void 0;
const holiday_enum_1 = require("@/modules/holidays/enums/holiday.enum");
const typeorm_1 = require("typeorm");
let Holiday = class Holiday {
    holiday_id;
    holiday_name;
    type_of_holiday;
    date_of_holiday;
    note;
    is_deleted;
};
exports.Holiday = Holiday;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Holiday.prototype, "holiday_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Holiday.prototype, "holiday_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: holiday_enum_1.TypeOfHoliday }),
    __metadata("design:type", String)
], Holiday.prototype, "type_of_holiday", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp" }),
    __metadata("design:type", Date)
], Holiday.prototype, "date_of_holiday", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Holiday.prototype, "note", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], Holiday.prototype, "is_deleted", void 0);
exports.Holiday = Holiday = __decorate([
    (0, typeorm_1.Entity)("holidays")
], Holiday);
