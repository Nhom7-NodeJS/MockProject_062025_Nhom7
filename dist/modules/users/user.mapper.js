"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toUserResponseDto = void 0;
// Map user entity to user response dto
const toUserResponseDto = (user) => {
    const { id, name, email } = user;
    return { id, name, email };
};
exports.toUserResponseDto = toUserResponseDto;
