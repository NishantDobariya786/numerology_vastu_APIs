import Joi from "joi";

const getUserSignupOtpValidation = Joi.object({
  email: Joi.string().email().lowercase().required(),
});

const getForgetPasswordOtpValidation = Joi.object({
  email: Joi.string().email().lowercase().required(),
});

const getChangeEmailOtpValidation = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().required(),
});

const verifyOtpForUserSignupValidation = Joi.object({
  email: Joi.string().email().lowercase().required(),
  otp: Joi.string().length(4).pattern(/^\d+$/).required(),
});

const verifyForgetPasswordOtpValidation = Joi.object({
  email: Joi.string().email().lowercase().required(),
  otp: Joi.string().length(4).pattern(/^\d+$/).required(),
});

const verifyChangeEmailOtpValidation = Joi.object({
  email: Joi.string().email().lowercase().required(),
  otp: Joi.string().length(4).pattern(/^\d+$/).required(),
});

const verifyContactUsValidation = Joi.object({
  email: Joi.string().email().lowercase().required(),
  otp: Joi.string().length(4).pattern(/^\d+$/).required(),
});

export {
  getUserSignupOtpValidation,
  verifyOtpForUserSignupValidation,
  getForgetPasswordOtpValidation,
  verifyForgetPasswordOtpValidation,
  getChangeEmailOtpValidation,
  verifyChangeEmailOtpValidation,
  verifyContactUsValidation,
};
