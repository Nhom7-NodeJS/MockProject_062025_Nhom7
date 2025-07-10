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
exports.WitnessesInterviews = void 0;
const interview_entity_1 = require("@/modules/interviews/entities/interview.entity");
const witness_entity_1 = require("@/modules/witnesses/entities/witness.entity");
const typeorm_1 = require("typeorm");
let WitnessesInterviews = class WitnessesInterviews {
    interview_id;
    witness_id;
    witness;
    interview;
    is_deleted;
};
exports.WitnessesInterviews = WitnessesInterviews;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], WitnessesInterviews.prototype, "interview_id", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], WitnessesInterviews.prototype, "witness_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => witness_entity_1.Witness, (witness) => witness.witnesses_interviews),
    (0, typeorm_1.JoinColumn)({ name: "witness_id" }),
    __metadata("design:type", witness_entity_1.Witness)
], WitnessesInterviews.prototype, "witness", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => interview_entity_1.Interview, (interview) => interview.witnesses_interviews),
    (0, typeorm_1.JoinColumn)({ name: "interview_id" }),
    __metadata("design:type", interview_entity_1.Interview)
], WitnessesInterviews.prototype, "interview", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], WitnessesInterviews.prototype, "is_deleted", void 0);
exports.WitnessesInterviews = WitnessesInterviews = __decorate([
    (0, typeorm_1.Entity)("witnesses_interviews")
], WitnessesInterviews);
