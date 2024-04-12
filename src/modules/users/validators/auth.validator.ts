import Joi from "joi";
import { validateObjectId } from "../../../helpers/mongo";
import { GenderEnum } from "../models/user.model";

// const signupSchemaValidation = Joi.object({
//   username: Joi.string().alphanum().min(3).max(30).required(),
//   email: Joi.string().email().lowercase().required(),
//   dateOfBirth: Joi.date().max("now").required(),
//   gender: Joi.string()
//     .valid(...Object.values(GenderEnum))
//     .required(),
//   mobileNumber: Joi.number().required(),
//   otp: Joi.string().length(6).pattern(/^\d+$/).required(),
//   password: Joi.string()
//     .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z0-9]{3,30}$"))
//     .required(),
// });

const signupSchemaValidation = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string()
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z0-9]{3,30}$"))
    .required(),
});

const loginSchemaValidation = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().required(),
});

const getUserSignupOtpValidation = Joi.object({
  email: Joi.string().email().lowercase().required(),
});

const getForgetPasswordOtpValidation = Joi.object({
  email: Joi.string().email().lowercase().required(),
});

const verifyOtpForUserSignupValidation = Joi.object({
  email: Joi.string().email().lowercase().required(),
  otp: Joi.string().length(6).pattern(/^\d+$/).required(),
});

const verifyForgetPasswordOtpValidation = Joi.object({
  email: Joi.string().email().lowercase().required(),
  otp: Joi.string().length(6).pattern(/^\d+$/).required(),
});

const changePasswordValidation = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().required(),
});

const updateUserProfileValidation = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).optional(),
  email: Joi.string().email().lowercase().optional(),
  password: Joi.string()
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z0-9]{3,30}$"))
    .optional(),
  dateOfBirth: Joi.date().max("now").optional(),
  gender: Joi.string()
    .valid(...Object.values(GenderEnum))
    .optional(),
  mobileNumber: Joi.number().optional(),
});

export {
  signupSchemaValidation,
  loginSchemaValidation,
  getUserSignupOtpValidation,
  verifyOtpForUserSignupValidation,
  getForgetPasswordOtpValidation,
  verifyForgetPasswordOtpValidation,
  changePasswordValidation,
  updateUserProfileValidation,
};
