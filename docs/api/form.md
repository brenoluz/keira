# Form API

The Form class manages form elements and validation in Keira.

## Import

```typescript
import { Form } from 'keira/form';
// or
import Form from 'keira/form';
```

## Class Definition

```typescript
export default class Form {
  elements: InputBase[];      // All form input elements
  validators: ValidatorBase[]; // Form-level validators
  
  constructor();
  add(element: InputBase): void;
  add_validator(validator: ValidatorBase): void;
  get_elements(): InputBase[];
  is_valid(extra_context?: unknown): Promise<boolean>;
  is_valid_form(extra_context?: unknown): Promise<boolean>;
  set_values(values: Record<string, unknown>): void;
  get_values(): Record<string, unknown>;
}
```

## Constructor

```typescript
constructor()
```

Creates a new empty form.

**Example:**

```typescript
import { Form } from 'keira/form';

const form = new Form();
```

## Methods

### add(element: InputBase): void

Adds an input element to the form.

**Parameters:**
- `element: InputBase` - The input element to add (must extend InputBase)

**Example:**

```typescript
import { Form } from 'keira/form';
import { InputText } from 'keira/input/text';

const form = new Form();
const username = new InputText('username');
username.set_label('Username');
form.add(username);
```

### add_validator(validator: ValidatorBase): void

Adds a form-level validator.

**Parameters:**
- `validator: ValidatorBase` - The validator to add

**Example:**

```typescript
import { Form } from 'keira/form';
import { ValidatorNotNull } from 'keira/validator';

class CrossFieldValidator extends ValidatorBase {
  constructor() {
    super('Password and confirmation do not match');
  }

  override is_valid(value: unknown, extra?: Record<string, unknown>): Promise<boolean> {
    if (typeof extra !== 'object' || extra === null) {
      return Promise.resolve(false);
    }
    const pwd = extra['password'];
    const confirm = extra['confirm_password'];
    return Promise.resolve(pwd === confirm);
  }
}

const form = new Form();
form.add_validator(new CrossFieldValidator());
```

### get_elements(): InputBase[]

Returns all input elements in the form (including nested elements).

**Returns:** `InputBase[]` - Array of all input elements

**Example:**

```typescript
const elements = form.get_elements();
console.log(`${elements.length} elements in form`);

// Access individual elements
for (const element of elements) {
  console.log(element.get_name(), element.get_value());
}
```

### is_valid(extra_context?: unknown): Promise<boolean>

Validates all form elements and form-level validators.

**Parameters:**
- `extra_context?: unknown` - Additional context for validators (optional)

**Returns:** `Promise<boolean>` - True if form is valid

**Example:**

```typescript
const isValid = await form.is_valid();
if (isValid) {
  // Submit form
  const values = form.get_values();
  await submitData(values);
} else {
  // Show validation errors (automatically displayed on inputs)
  console.log('Form has errors');
}
```

### is_valid_form(extra_context?: unknown): Promise<boolean>

Validates only form-level validators (not individual elements).

**Parameters:**
- `extra_context?: unknown` - Additional context for validators

**Returns:** `Promise<boolean>` - True if form validators pass

**Example:**

```typescript
// First validate individual elements
const elementsValid = await form.is_valid();
if (!elementsValid) return;

// Then validate cross-field rules
const formValid = await form.is_valid_form({
  password: 'abc123',
  confirm_password: 'abc123'
});
```

### set_values(values: Record<string, unknown>): void

Sets values for form elements by name.

**Parameters:**
- `values: Record<string, unknown>` - Object with name-value pairs

**Example:**

```typescript
// Populate form with existing data
form.set_values({
  username: 'john_doe',
  email: 'john@example.com',
  role: 'admin'
});
```

### get_values(): Record<string, unknown>

Gets all form values as an object.

**Returns:** `Record<string, unknown>` - Object with name-value pairs

**Example:**

```typescript
const values = form.get_values();
console.log(values);
// { username: 'john_doe', email: 'john@example.com', role: 'admin' }

// Access individual values
const username = values['username'];
```

## Complete Form Example

```typescript
import { Form } from 'keira/form';
import { InputText } from 'keira/input/text';
import { InputSelect } from 'keira/input/select';
import { InputTextarea } from 'keira/input/textarea';
import { ValidatorNotNull } from 'keira/validator';

// Create form
const userForm = new Form();

// Create inputs
const nameInput = new InputText('name');
nameInput.set_label('Full Name');
nameInput.add_validator(new ValidatorNotNull('Name is required'));

const emailInput = new InputText('email');
emailInput.set_label('Email');
emailInput.add_validator(new ValidatorNotNull('Email is required'));

const roleInput = new InputSelect('role');
roleInput.set_label('Role');
roleInput.add('', 'Select a role');
roleInput.add('admin', 'Administrator');
roleInput.add('user', 'Regular User');
roleInput.add_validator(new ValidatorNotNull('Role is required'));

const bioInput = new InputTextarea('bio');
bioInput.set_label('Bio');
bioInput.rows(4);
bioInput.maxlength(500);

// Add inputs to form
userForm.add(nameInput);
userForm.add(emailInput);
userForm.add(roleInput);
userForm.add(bioInput);

// Render inputs
async function renderForm(): Promise<void> {
  await nameInput.make();
  await emailInput.make();
  await roleInput.make();
  await bioInput.make();
  
  // Append to DOM
  document.body.append(nameInput.container);
  document.body.append(emailInput.container);
  document.body.append(roleInput.container);
  document.body.append(bioInput.container);
  
  // Add submit button
  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.innerText = 'Submit';
  submitBtn.className = 'btn btn-primary';
  submitBtn.onclick = async (e) => {
    e.preventDefault();
    
    const isValid = await userForm.is_valid();
    if (isValid) {
      const values = userForm.get_values();
      console.log('Submitting:', values);
      // Submit to server...
    }
  };
  document.body.append(submitBtn);
}

renderForm();

// Pre-populate form with existing user data
userForm.set_values({
  name: 'John Doe',
  email: 'john@example.com',
  role: 'admin',
  bio: 'Software developer'
});
```

## Form Validation Flow

```
1. User fills form
2. Call form.is_valid()
3. Each element validates its validators
4. Form-level validators run
5. Errors displayed on invalid inputs
6. Returns true if all validations pass
```

## Best Practices

1. **Add validators at input level**: Validate individual fields where possible
2. **Use form validators for cross-field rules**: Validate relationships between fields
3. **Always await is_valid()**: Validation is asynchronous
4. **Call get_values() after validation**: Ensure you're getting valid data
5. **Render inputs before validation**: Inputs must be in DOM for error display

## Related Documentation

- [Input Components API](inputs.md) - All input types
- [Validators API](validators.md) - Validator system
- [Controller API](controller.md) - Controller base class
