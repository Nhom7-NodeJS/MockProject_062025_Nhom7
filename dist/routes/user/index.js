"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("@/modules/users/user.controller"));
const handle_error_1 = require("@/utils/handle-error");
const validate_middleware_1 = require("@/middlewares/validate.middleware");
const create_user_schema_1 = require("@/modules/users/schemas/create-user-schema");
const router = express_1.default.Router();
router.get("/", (0, handle_error_1.asyncHandle)(user_controller_1.default.getAll));
router.post("/", (0, validate_middleware_1.validateBody)(create_user_schema_1.CreateUserSchema), (0, handle_error_1.asyncHandle)(user_controller_1.default.create));
router.get("/:id", (0, handle_error_1.asyncHandle)(user_controller_1.default.getById));
exports.default = router;
