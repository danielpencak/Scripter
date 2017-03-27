/* eslint-disable max-len, arrow-parens, no-unused-vars, operator-linebreak */
import React from 'react';
import Validation from 'react-validation';
import validator from 'validator';

Object.assign(Validation.rules, {
  required: {
    rule: value => value.toString().trim(),
    hint: () => <span className="form-error is-visible">Required</span>
  },

  email: {
    rule: value => validator.isEmail(value),
    hint: value => <span className="form-error is-visible">This is not an Email.</span>
  },

  passwordLength: {
    rule: value => validator.isLength(value, { min: 8 }),
    hint: () => (
        <span className="form-error is-visible">
            Password must be at least 8 characters in length.
        </span>
    )
  },

  password: {
    rule: (value, components) => {
      const password = components.signupPassword.state;
      const passwordConfirm = components.signupConfirmPassword.state;
      const isBothUsed = password
          && passwordConfirm
          && password.isUsed
          && passwordConfirm.isUsed;
      const isBothChanged = isBothUsed && password.isChanged && passwordConfirm.isChanged;

      if (!isBothUsed || !isBothChanged) {
        return true;
      }

      return password.value === passwordConfirm.value;
    },
    hint: () => <span className="form-error is-visible">Passwords must match.</span>
  }
});
