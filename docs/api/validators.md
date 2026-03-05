# Validators API

Keira provides an extensible validation system for form inputs with support for custom validators.

## Import

```typescript
import { ValidatorNotNull } from 'keira/validator';
// or
import ValidatorBase from 'keira/validator/base';
```

## ValidatorBase Class

The base class for all validators.

### Class Definition

```typescript
export default class ValidatorBase {
  error_message: string;
  
  constructor(error_message: string);
  is_valid(value: unknown, extra?: unknown): Promise<boolean>;
  get_error(): Promise<string>;
}
```

### Constructor

```typescript
constructor(error_message: string)
```

**Parameters:**
- `error_message: string` - The error message to display when validation fails

### Methods

#### is_valid(value: unknown, extra?: unknown): Promise<boolean>

Validates the given value. Override this method in subclasses.

**Parameters:**
- `value: unknown` - The value to validate
- `extra?: unknown` - Additional context for validation

**Returns:** `Promise<boolean>` - True if valid, false otherwise

**Default Implementation:**
```typescript
is_valid(value: unknown, extra?: unknown): Promise<boolean> {
  return Promise.reject('Method isValid not implemented!');
}
```

#### get_error(): Promise<string>

Returns the error message.

**Returns:** `Promise<string>` - The error message

---

## Built-in Validators

### ValidatorNotNull

Validates that a value is not null, undefined, or empty string.

```typescript
import { ValidatorNotNull } from 'keira/validator';

const validator = new ValidatorNotNull('This field is required');

// Test values
await validator.is_valid(null);      // false
await validator.is_valid(undefined); // false
await validator.is_valid('');        // false
await validator.is_valid('hello');   // true
await validator.is_valid(0);         // true (0 is valid)
await validator.is_valid(false);     // true (false is valid)
```

---

## Creating Custom Validators

### Basic Custom Validator

```typescript
import ValidatorBase from 'keira/validator/base';

class EmailValidator extends ValidatorBase {
  constructor() {
    super('Invalid email format');
  }
  
  override is_valid(value: unknown, _extra?: unknown): Promise<boolean> {
    if (typeof value !== 'string') {
      return Promise.resolve(false);
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(value);
    
    return Promise.resolve(isValid);
  }
}

// Usage
import { InputText } from 'keira/input/text';

const emailInput = new InputText('email');
emailInput.add_validator(new EmailValidator());
```

### Validator with Parameters

```typescript
import ValidatorBase from 'keira/validator/base';

class MinLengthValidator extends ValidatorBase {
  private minLength: number;
  
  constructor(minLength: number, message?: string) {
    super(message || `Minimum length is ${minLength} characters`);
    this.minLength = minLength;
  }
  
  override is_valid(value: unknown, _extra?: unknown): Promise<boolean> {
    if (typeof value !== 'string') {
      return Promise.resolve(false);
    }
    
    return Promise.resolve(value.length >= this.minLength);
  }
}

// Usage
const passwordInput = new InputText('password');
passwordInput.add_validator(new MinLengthValidator(8, 'Password must be at least 8 characters'));
```

### MaxLengthValidator

```typescript
import ValidatorBase from 'keira/validator/base';

class MaxLengthValidator extends ValidatorBase {
  private maxLength: number;
  
  constructor(maxLength: number, message?: string) {
    super(message || `Maximum length is ${maxLength} characters`);
    this.maxLength = maxLength;
  }
  
  override is_valid(value: unknown, _extra?: unknown): Promise<boolean> {
    if (typeof value !== 'string') {
      return Promise.resolve(value === null || value === undefined);
    }
    
    return Promise.resolve(value.length <= this.maxLength);
  }
}
```

### RangeValidator (for numbers)

```typescript
import ValidatorBase from 'keira/validator/base';

class RangeValidator extends ValidatorBase {
  private min: number;
  private max: number;
  
  constructor(min: number, max: number, message?: string) {
    super(message || `Value must be between ${min} and ${max}`);
    this.min = min;
    this.max = max;
  }
  
  override is_valid(value: unknown, _extra?: unknown): Promise<boolean> {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    
    if (typeof num !== 'number' || isNaN(num)) {
      return Promise.resolve(false);
    }
    
    return Promise.resolve(num >= this.min && num <= this.max);
  }
}

// Usage
const ageInput = new InputText('age');
ageInput.add_validator(new RangeValidator(18, 100, 'Age must be between 18 and 100'));
```

### PatternValidator (Regex)

```typescript
import ValidatorBase from 'keira/validator/base';

class PatternValidator extends ValidatorBase {
  private pattern: RegExp;
  
  constructor(pattern: RegExp, message: string) {
    super(message);
    this.pattern = pattern;
  }
  
  override is_valid(value: unknown, _extra?: unknown): Promise<boolean> {
    if (typeof value !== 'string') {
      return Promise.resolve(false);
    }
    
    return Promise.resolve(this.pattern.test(value));
  }
}

// Usage
const phoneInput = new InputText('phone');
phoneInput.add_validator(
  new PatternValidator(/^\d{3}-\d{3}-\d{4}$/, 'Phone must be in format 123-456-7890')
);
```

### CustomMessageValidator (Dynamic messages)

```typescript
import ValidatorBase from 'keira/validator/base';

class CustomMessageValidator extends ValidatorBase {
  private validatorFn: (value: unknown) => { valid: boolean; message?: string };
  
  constructor(
    validatorFn: (value: unknown) => { valid: boolean; message?: string },
    defaultMessage: string
  ) {
    super(defaultMessage);
    this.validatorFn = validatorFn;
  }
  
  override is_valid(value: unknown, _extra?: unknown): Promise<boolean> {
    const result = this.validatorFn(value);
    if (!result.valid && result.message) {
      this.error_message = result.message;
    }
    return Promise.resolve(result.valid);
  }
}

// Usage
const usernameInput = new InputText('username');
usernameInput.add_validator(
  new CustomMessageValidator(
    (value) => {
      if (typeof value !== 'string') {
        return { valid: false, message: 'Username must be a string' };
      }
      if (value.length < 3) {
        return { valid: false, message: 'Username must be at least 3 characters' };
      }
      if (!/^[a-zA-Z0-9_]+$/.test(value)) {
        return { valid: false, message: 'Username can only contain letters, numbers, and underscores' };
      }
      return { valid: true };
    },
    'Invalid username'
  )
);
```

---

## Validator with Extra Context

Validators can receive extra context for cross-field validation:

```typescript
import ValidatorBase from 'keira/validator/base';

class PasswordMatchValidator extends ValidatorBase {
  private passwordFieldName: string;
  
  constructor(passwordFieldName: string, message?: string) {
    super(message || 'Passwords do not match');
    this.passwordFieldName = passwordFieldName;
  }
  
  override is_valid(value: unknown, extra?: Record<string, unknown>): Promise<boolean> {
    if (!extra || typeof extra !== 'object') {
      return Promise.resolve(false);
    }
    
    const password = extra[this.passwordFieldName];
    
    if (typeof password !== 'string' || typeof value !== 'string') {
      return Promise.resolve(false);
    }
    
    return Promise.resolve(password === value);
  }
}

// Usage in form validation
import { Form } from 'keira/form';
import { InputText } from 'keira/input/text';

const form = new Form();

const password = new InputText('password');
password.set_label('Password');

const confirmPassword = new InputText('confirm_password');
confirmPassword.set_label('Confirm Password');
confirmPassword.add_validator(new PasswordMatchValidator('password'));

form.add(password);
form.add(confirmPassword);

// Validate with extra context
form.is_valid().then((isValid) => {
  if (isValid) {
    console.log('Form is valid');
  }
});
```

---

## Form-Level Validators

Validators can also be added at the form level for cross-field validation:

```typescript
import { Form } from 'keira/form';
import ValidatorBase from 'keira/validator/base';

class CrossFieldValidator extends ValidatorBase {
  constructor() {
    super('Start date must be before end date');
  }
  
  override is_valid(value: unknown, extra?: Record<string, unknown>): Promise<boolean> {
    if (!extra || typeof extra !== 'object') {
      return Promise.resolve(false);
    }
    
    const startDate = extra['start_date'];
    const endDate = extra['end_date'];
    
    if (typeof startDate !== 'string' || typeof endDate !== 'string') {
      return Promise.resolve(false);
    }
    
    return Promise.resolve(new Date(startDate) <= new Date(endDate));
  }
}

// Usage
const form = new Form();
form.add_validator(new CrossFieldValidator());

// Validate with form values as context
form.is_valid().then((isValid) => {
  // Form-level validators receive form values as extra context
});
```

---

## Complete Validation Example

```typescript
import { Form } from 'keira/form';
import { InputText, InputSelect } from 'keira/input';
import { ValidatorNotNull } from 'keira/validator';
import ValidatorBase from 'keira/validator/base';

// Custom validators
class EmailValidator extends ValidatorBase {
  constructor() {
    super('Invalid email format');
  }
  
  override is_valid(value: unknown): Promise<boolean> {
    if (typeof value !== 'string') return Promise.resolve(false);
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return Promise.resolve(regex.test(value));
  }
}

class MinLengthValidator extends ValidatorBase {
  constructor(private min: number) {
    super(`Minimum ${min} characters required`);
  }
  
  override is_valid(value: unknown): Promise<boolean> {
    if (typeof value !== 'string') return Promise.resolve(false);
    return Promise.resolve(value.length >= this.min);
  }
}

// Create form
const registrationForm = new Form();

// Email field with multiple validators
const email = new InputText('email');
email.set_label('Email');
email.add_validator(new ValidatorNotNull('Email is required'));
email.add_validator(new EmailValidator());
registrationForm.add(email);

// Password with length validation
const password = new InputText('password');
password.set_label('Password');
password.add_validator(new ValidatorNotNull('Password is required'));
password.add_validator(new MinLengthValidator(8));
registrationForm.add(password);

// Confirm password
const confirmPassword = new InputText('confirm_password');
confirmPassword.set_label('Confirm Password');
confirmPassword.add_validator(new ValidatorNotNull('Please confirm your password'));
// Add password match validator (requires extra context)
registrationForm.add(confirmPassword);

// Add form-level password match validator
registrationForm.add_validator({
  error_message: 'Passwords do not match',
  is_valid: (_value, extra) => {
    if (typeof extra !== 'object' || extra === null) return Promise.resolve(false);
    const pwd = (extra as Record<string, unknown>)['password'];
    const confirm = (extra as Record<string, unknown>)['confirm_password'];
    return Promise.resolve(pwd === confirm);
  },
  get_error: function() {
    return Promise.resolve(this.error_message);
  }
});

// Validate form
async function submitForm(): Promise<void> {
  const isValid = await registrationForm.is_valid();
  
  if (isValid) {
    const values = registrationForm.get_values();
    console.log('Form valid, submitting:', values);
    // Submit to server...
  } else {
    console.log('Form has validation errors');
    // Errors are automatically displayed on inputs
  }
}
```

---

## Async Validators

Validators can perform async operations:

```typescript
import ValidatorBase from 'keira/validator/base';

class UniqueUsernameValidator extends ValidatorBase {
  constructor() {
    super('Username is already taken');
  }
  
  override is_valid(value: unknown): Promise<boolean> {
    if (typeof value !== 'string' || value.length === 0) {
      return Promise.resolve(true); // Let other validators handle empty
    }
    
    // Async API call to check uniqueness
    return fetch(`/api/username/available?username=${encodeURIComponent(value)}`)
      .then((response) => response.json())
      .then((data) => data.available);
  }
}

// Usage
const username = new InputText('username');
username.add_validator(new UniqueUsernameValidator());
```

---

## Best Practices

1. **Always return promises**: Validators are async by design
2. **Handle unknown types**: Use type guards for `unknown` values
3. **Provide clear messages**: Error messages should help users fix the issue
4. **Combine validators**: Use multiple validators for complex rules
5. **Use form validators for cross-field**: Keep input validators single-field focused
6. **Consider async**: Validators can make API calls for server-side checks
7. **Reuse validators**: Create reusable validator classes for common patterns

---

## Validator Composition

Combine multiple validators:

```typescript
import { InputText } from 'keira/input/text';
import { ValidatorNotNull } from 'keira/validator';

const email = new InputText('email');

// Chain validators - all must pass
email.add_validator(new ValidatorNotNull('Email is required'));
email.add_validator(new EmailValidator());
email.add_validator(new UniqueUsernameValidator());

// Validators run in order, all errors are shown
```

---

## Related Documentation

- [Form API](form.md) - Form management
- [Input Components API](inputs.md) - Input types
- [Quick Start](../quickstart.md) - Basic examples
