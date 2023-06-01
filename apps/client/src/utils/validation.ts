import { RegisterOptions, ValidationRule } from 'react-hook-form';

type Rules = Omit<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;

type Pattern = 'email' | 'gstin' | 'ifsc' | 'accountNo';

const patterns: Record<Pattern, ValidationRule<RegExp>> = {
  email: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Invalid Email',
  },
  gstin: {
    value: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
    message: 'Invalid GSTIN',
  },
  ifsc: {
    value: /^[A-Za-z]{4}0[a-zA-Z0-9]{6}$/,
    message: 'Invalid IFSC code',
  },
  accountNo: {
    value: /^\d{9,18}$/,
    message: 'Invalid Account No',
  },
};
class Validation {
  rules: Rules = {};

  build() {
    return this.rules;
  }

  required(value?: boolean): Validation {
    this.rules.required = {
      value: value === undefined ? true : value,
      message: 'Required',
    };
    return this;
  }

  minLength(value: number): Validation {
    this.rules.minLength = {
      value,
      message: `Minimum ${value} Charecters`,
    };
    return this;
  }

  maxLength(value: number): Validation {
    this.rules.maxLength = {
      value,
      message: `Maximum ${value} Charecters`,
    };
    return this;
  }

  pattern(key: Pattern): Validation {
    this.rules.pattern = patterns[key];
    return this;
  }

  min(value: number): Validation {
    this.rules.min = {
      value,
      message: `Should be greater than ${value - 1}`,
    };
    return this;
  }

  max(value: number): Validation {
    this.rules.max = {
      value,
      message: `Should be less than ${value + 1}`,
    };
    return this;
  }

  // not chainable
  password(): Rules {
    return this.minLength(5).maxLength(16).build();
  }

  firstName(): Rules {
    return this.required().minLength(3).maxLength(100).build();
  }

  lastName(): Rules {
    return this.maxLength(100).build();
  }
}

function validation(): Validation {
  return new Validation();
}

export default validation;
