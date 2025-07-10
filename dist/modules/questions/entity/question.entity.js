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
exports.Question = void 0;
const typeorm_1 = require("typeorm");
const interview_entity_1 = require("@/modules/interviews/entities/interview.entity");
const user_entity_1 = require("@/modules/users/entities/user.entity");
let Question = class Question {
    question_id;
    content;
    answer;
    reliability;
    is_deleted;
    // ManyToOne
    interview;
    user;
};
exports.Question = Question;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Question.prototype, "question_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Question.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Question.prototype, "answer", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Question.prototype, "reliability", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], Question.prototype, "is_deleted", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => interview_entity_1.Interview, (interview) => interview.questions),
    (0, typeorm_1.JoinColumn)({ name: "interview_id" }),
    __metadata("design:type", interview_entity_1.Interview)
], Question.prototype, "interview", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.questions),
    (0, typeorm_1.JoinColumn)({ name: "user_id" }),
    __metadata("design:type", user_entity_1.User)
], Question.prototype, "user", void 0);
exports.Question = Question = __decorate([
    (0, typeorm_1.Entity)("questions")
], Question);
