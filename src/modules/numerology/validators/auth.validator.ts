import Joi from "joi";

const numeroValidation = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).optional(),
  email: Joi.string().email().lowercase().optional(),
  password: Joi.string()
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z0-9]{3,30}$"))
    .optional(),
  dateOfBirth: Joi.date().max("now").optional(),
  mobileNumber: Joi.string().optional(),
});

export { numeroValidation };
