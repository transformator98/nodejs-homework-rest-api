const Joi = require('joi');
const { HttpCode } = require('../../../helpers/constants');
// const phoneVal = Joi.extend(require('joi-phone-number'));

const schemaRegistrationUser = Joi.object({
  name: Joi.string().alphanum().min(2).max(30).optional(),
  email: Joi.string()
    .required()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    }),
  // phone: phoneVal
  //   .string()
  //   .required()
  //   .phoneNumber({ defaultCountry: 'BE', format: 'national' }),
  password: Joi.string().min(5).max(30).required(),
  subscription: Joi.string().optional(),
});

const schemaLoginUser = Joi.object({
  // token: [Joi.string(), Joi.number()],
  email: Joi.string()
    .required()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    }),
  // phone: phoneVal
  //   .string()
  //   .optional()
  //   .phoneNumber({ defaultCountry: 'BE', format: 'national' }),
  password: Joi.string().min(7).max(30).required(),
}).min(1);

const validate = (schema, obj, next) => {
  const { error } = schema.validate(obj);

  if (error) {
    const [{ message }] = error.details;
    return next({
      status: HttpCode.BAD_REQUEST,
      message,
      data: 'Bad request',
    });
  }
  next();
};
module.exports.registrationUser = (req, res, next) => {
  return validate(schemaRegistrationUser, req.body, next);
};
module.exports.loginUser = (req, res, next) => {
  return validate(schemaLoginUser, req.body, next);
};
module.exports.validateUploadAvatar = (req, res, next) => {
  if (!req.file) {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: 'error',
      code: HttpCode.BAD_REQUEST,
      data: 'Bad request',
      message: 'Field of avatar with file not found',
    });
  }
  next();
};
