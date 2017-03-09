'use strict';

const Joi = require('joi');

module.exports.post = {
  body: {
    firstName: Joi.string()
      .label('First Name')
      .trim()
      .required(),
    lastName: Joi.string()
      .label('Last Name')
      .trim()
      .required(),
    email: Joi.string()
      .label('Email')
      .email()
      .trim()
      .required(),
    password: Joi.string()
      .label('Password')
      .trim()
      .min(8)
      .required()
  }
}
