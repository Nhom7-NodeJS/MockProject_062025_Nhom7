"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("@/modules/users/user.controller"));
const handle_error_1 = require("@/utils/handle-error");
const UserRouter = express_1.default.Router();
UserRouter.get("/", (0, handle_error_1.asyncHandle)(user_controller_1.default.getAll));
exports.default = UserRouter;
