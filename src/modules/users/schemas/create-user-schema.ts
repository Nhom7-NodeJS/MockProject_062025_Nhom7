import Joi from "joi";
import { CreateUserDto } from "@/modules/users/dto/user.dto";

export const CreateUserSchema = Joi.object<CreateUserDto>({
  name: Joi.string().required().messages({
    "string.base": "Name must be a string",
    "string.empty": "Name must be not empty",
    "any.required": "Name is required",
  }),
  email: Joi.string().email().required().messages({
    "string.base": "Email must be a string",
    "string.empty": "Email is required",
    "string.email": "Invalid email",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.base": "Password must be a string",
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters",
    "any.required": "Password is required",
  }),
});
