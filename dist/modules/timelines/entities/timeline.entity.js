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
exports.Timeline = void 0;
const typeorm_1 = require("typeorm");
const case_result_entity_1 = require("@/modules/case_results/entities/case_result.entity");
let Timeline = class Timeline {
    timeline_id;
    start_time;
    end_time;
    attached_file;
    notes;
    activity;
    is_deleted;
    // ManyToOne
    caseResult;
};
exports.Timeline = Timeline;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Timeline.prototype, "timeline_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Timeline.prototype, "start_time", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Timeline.prototype, "end_time", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], Timeline.prototype, "attached_file", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Timeline.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Timeline.prototype, "activity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Timeline.prototype, "is_deleted", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => case_result_entity_1.CaseResult, (caseResult) => caseResult.timelines),
    (0, typeorm_1.JoinColumn)({ name: 'case_result_id' }),
    __metadata("design:type", case_result_entity_1.CaseResult)
], Timeline.prototype, "caseResult", void 0);
exports.Timeline = Timeline = __decorate([
    (0, typeorm_1.Entity)('timelines')
], Timeline);
