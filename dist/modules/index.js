"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//import userRouter from "@/routes/user.routes";
const user_route_1 = __importDefault(require("@/modules/users/user.route"));
const router = express_1.default.Router();
const API_V1 = "/api/v1";
router.use(`${API_V1}/users`, user_route_1.default);
exports.default = router;
