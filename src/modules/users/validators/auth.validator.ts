import Joi from "joi";
import { GenderEnum, LanguageEnum } from "../models/user.model";

const signupSchemaValidation = Joi.object({
  username: Joi.string()
    .pattern(/^[A-Za-z\s]+$/)
    .messages({
      "string.pattern.base": "Full name should only contain letters and spaces",
    }),
  email: Joi.string().email().lowercase().required(),
  dateOfBirth: Joi.date().max("now").required(),
  gender: Joi.string()
    .valid(...Object.values(GenderEnum))
    .required(),
  mobileNumber: Joi.string().required(),
  countryCode: Joi.string().required(),
  language: Joi.string()
    .valid(...Object.values(LanguageEnum))
    .required(),
  password: Joi.string()
    .pattern(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{3,30}$"
      )
    )
    .required(),
});

const loginSchemaValidation = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().required(),
});

const changePasswordValidation = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string()
    .pattern(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{3,30}$"
      )
    )
    .required(),
});

const changeEmailValidation = Joi.object({
  email: Joi.string().email().lowercase().required(),
});

const updateUserProfileValidation = Joi.object({
  oldPassword: Joi.string().when("newPassword", {
    is: Joi.exist(),
    then: Joi.string().required(),
    otherwise: Joi.string().optional(),
  }),
  language: Joi.string()
    .valid(...Object.values(LanguageEnum))
    .optional(),
  newPassword: Joi.string().optional(),
  mobileNumber: Joi.string().optional(),
  countryCode: Joi.string().optional(),
});

const verifyContactUsValidation = Joi.object({
  username: Joi.string()
    .pattern(/^[A-Za-z\s]+$/)
    .messages({
      "string.pattern.base": "Full name should only contain letters and spaces",
    }),
  email: Joi.string().email().lowercase().required(),
  subject: Joi.string().required(),
  message: Joi.string().required(),
});

export {
  signupSchemaValidation,
  loginSchemaValidation,
  changePasswordValidation,
  updateUserProfileValidation,
  changeEmailValidation,
  verifyContactUsValidation,
};
