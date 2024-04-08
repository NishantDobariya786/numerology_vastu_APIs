import Joi from "joi";
import { validateObjectId } from "../../../helpers/mongo";

const signupSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string()
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z0-9]{3,30}$"))
    .required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().lowercase(),
  password: Joi.string().required(),
}).xor("username", "email");

const userProfileValidation = Joi.object({
  userId: Joi.string().custom(validateObjectId, "MongoDB ObjectId").required(),
});
export { signupSchema, loginSchema, userProfileValidation };
