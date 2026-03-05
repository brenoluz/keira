# Input Components API

Keira provides a comprehensive set of typed input components that extend the `InputBase` class. All inputs integrate with the validation system and provide consistent APIs.

## Common Base: InputBase

All input components extend `InputBase`, which provides common functionality.

### Import

```typescript
import { InputBase } from 'keira/input';
// or
import InputBase from 'keira/input/base';
```

### Properties

```typescript
class InputBase extends View {
  name: string;                    // Field name
  label: Element | null;           // Label element
  help: Element | null;            // Help text element
  input: HTMLElement | null;       // The actual input element
  value: unknown;                  // Current value
  editable: boolean;               // Whether input is editable
  label_text: string | null;       // Label text
  help_text: string;               // Help text content
  validators: ValidatorBase[];     // Attached validators
  error: ExtendedElement;          // Error display element
}
```

### Common Methods

#### set_label(text: string): void

Sets the label text for the input.

```typescript
const input = new InputText('username');
input.set_label('Username');
```

#### set_value(value: unknown): Promise<void>

Sets the input value programmatically.

```typescript
input.set_value('john_doe');
```

#### get_value(): unknown

Gets the current value of the input.

```typescript
const value = input.get_value();
```

#### set_help(text: string): void

Sets help text displayed below the input.

```typescript
input.set_help('Choose a unique username');
```

#### add_validator(validator: ValidatorBase): void

Adds a validator to the input.

```typescript
import { ValidatorNotNull } from 'keira/validator';

input.add_validator(new ValidatorNotNull('This field is required'));
```

#### is_valid(extra_context?: unknown): Promise<boolean>

Validates the input against all attached validators.

```typescript
const isValid = await input.is_valid();
if (!isValid) {
  console.log('Input has validation errors');
}
```

#### focus(): void

Focuses the input element.

```typescript
input.focus();
```

#### edit(flag: boolean): void

Enables or disables the input.

```typescript
input.edit(false); // Disable
input.edit(true);  // Enable
```

#### get_name(): string

Returns the input name.

```typescript
const name = input.get_name(); // 'username'
```

---

## InputText

Standard text input field.

### Import

```typescript
import { InputText } from 'keira/input';
// or
import InputText from 'keira/input/text';
```

### Usage

```typescript
import { InputText } from 'keira/input/text';
import { ValidatorNotNull } from 'keira/validator';

const username = new InputText('username');
username.set_label('Username');
username.add_validator(new ValidatorNotNull('Username is required'));
username.set_help('Choose a unique username');

// Render
await username.make();
document.body.append(username.container);

// Get/set value
username.set_value('john_doe');
const value = username.get_value();
```

### Methods

Inherits all methods from `InputBase`.

---

## InputSelect

Dropdown select input with options.

### Import

```typescript
import { InputSelect } from 'keira/input';
// or
import InputSelect from 'keira/input/select';
```

### Usage

```typescript
import { InputSelect } from 'keira/input/select';
import { ValidatorNotNull } from 'keira/validator';

const role = new InputSelect('role');
role.set_label('Role');
role.add('', 'Select a role');
role.add('admin', 'Administrator');
role.add('user', 'Regular User');
role.add('guest', 'Guest');
role.add_validator(new ValidatorNotNull('Please select a role'));

// Handle value changes
role.onchange = (input: InputSelect, value: unknown) => {
  console.log('Role changed to:', value);
};

// Get display text
const displayText = role.display(); // 'Administrator' if admin selected

// Render
await role.make();
document.body.append(role.container);
```

### Methods

#### add(key: string, label: string): void

Adds an option to the select.

```typescript
role.add('admin', 'Administrator');
```

#### onchange(input: InputSelect, value: unknown): void

Callback fired when value changes. Override for custom handling.

```typescript
role.onchange = (input: InputSelect, value: unknown) => {
  console.log('New value:', value);
};
```

#### display(): string

Returns the display label for the current value.

```typescript
role.set_value('admin');
const label = role.display(); // 'Administrator'
```

---

## InputRadio

Radio button group input.

### Import

```typescript
import { InputRadio } from 'keira/input';
// or
import InputRadio from 'keira/input/radio';
```

### Usage

```typescript
import { InputRadio } from 'keira/input/radio';

const preference = new InputRadio('preference');
preference.set_label('Contact Preference');
preference.add('email', 'Email', 'We will send updates via email');
preference.add('phone', 'Phone', 'We will call you');
preference.add('sms', 'SMS', 'We will send text messages');

// Handle changes
preference.onchange = (input: InputRadio, value: unknown) => {
  console.log('Preference changed to:', value);
};

// Render
await preference.make();
document.body.append(preference.container);
```

### Methods

#### add(key: string, label: string, help?: string): void

Adds a radio option with optional help text.

```typescript
radio.add('opt1', 'Option 1');
radio.add('opt2', 'Option 2', 'Help text shown on click');
```

#### onchange(input: InputRadio, value: unknown): void

Callback fired when selection changes.

```typescript
preference.onchange = (input, value) => {
  console.log('Selected:', value);
};
```

---

## InputRadioButton

Button-style radio group (Bootstrap button group).

### Import

```typescript
import { InputRadioButton } from 'keira/input';
// or
import InputRadioButton from 'keira/input/radio_button';
```

### Usage

```typescript
import { InputRadioButton } from 'keira/input/radio_button';

const visibility = new InputRadioButton('visibility');
visibility.set_label('Visibility');
visibility.add('public', 'Public');
visibility.add('private', 'Private');
visibility.add('friends', 'Friends Only');

// Handle changes
visibility.onchange = (input: InputRadioButton, value: unknown) => {
  console.log('Visibility set to:', value);
};

// Render
await visibility.make();
document.body.append(visibility.container);
```

### Methods

#### add(key: string, label: string): void

Adds a button option.

```typescript
visibility.add('public', 'Public');
```

#### onchange(input: InputRadioButton, value: unknown): void

Callback fired when selection changes.

---

## InputTextarea

Multi-line text input.

### Import

```typescript
import { InputTextarea } from 'keira/input';
// or
import InputTextarea from 'keira/input/textarea';
```

### Usage

```typescript
import { InputTextarea } from 'keira/input/textarea';

const bio = new InputTextarea('bio');
bio.set_label('Biography');
bio.rows(5);
bio.maxlength(500);
bio.set_help('Tell us about yourself (max 500 characters)');

// Render
await bio.make();
document.body.append(bio.container);
```

### Methods

#### rows(length: number): void

Sets the number of visible rows.

```typescript
textarea.rows(10);
```

#### maxlength(length: number): void

Sets the maximum character length.

```typescript
textarea.maxlength(1000);
```

---

## InputHidden

Hidden input field for storing data.

### Import

```typescript
import { InputHidden } from 'keira/input';
// or
import InputHidden from 'keira/input/hidden';
```

### Usage

```typescript
import { InputHidden } from 'keira/input/hidden';

const csrfToken = new InputHidden('csrf_token');
csrfToken.set_value('abc123xyz');

// Render (won't be visible)
await csrfToken.make();
document.body.append(csrfToken.container);

// Get value
const token = csrfToken.get_value(); // 'abc123xyz'
```

### Methods

#### display(): string

Always returns empty string (hidden inputs have no display).

```typescript
const display = hidden.display(); // ''
```

---

## InputDate

Date input with locale-aware format detection.

### Import

```typescript
import { InputDate } from 'keira/input';
// or
import InputDate from 'keira/input/date';
```

### Usage

```typescript
import { InputDate } from 'keira/input/date';

const birthDate = new InputDate('birth_date');
birthDate.set_label('Date of Birth');

// Get the locale format
const format = birthDate.get_format(); // e.g., 'MM/dd/yyyy' or 'dd/MM/yyyy'

// Set value
birthDate.set_value('12/25/1990');

// Render
await birthDate.make();
document.body.append(birthDate.container);
```

### Methods

#### get_format(): string

Returns the date format string based on the user's locale.

```typescript
const format = dateInput.get_format();
console.log(format); // 'MM/dd/yyyy' (US) or 'dd/MM/yyyy' (UK)
```

---

## Complete Form Example

```typescript
import { Form } from 'keira/form';
import { 
  InputText, 
  InputSelect, 
  InputRadio, 
  InputTextarea, 
  InputHidden,
  InputDate 
} from 'keira/input';
import { ValidatorNotNull } from 'keira/validator';

// Create form
const registrationForm = new Form();

// Text input
const email = new InputText('email');
email.set_label('Email Address');
email.add_validator(new ValidatorNotNull('Email is required'));
registrationForm.add(email);

// Select input
const country = new InputSelect('country');
country.set_label('Country');
country.add('', 'Select country');
country.add('us', 'United States');
country.add('uk', 'United Kingdom');
country.add('ca', 'Canada');
country.add_validator(new ValidatorNotNull('Country is required'));
registrationForm.add(country);

// Radio input
const contactMethod = new InputRadio('contact_method');
contactMethod.set_label('Preferred Contact Method');
contactMethod.add('email', 'Email');
contactMethod.add('phone', 'Phone');
contactMethod.add('mail', 'Mail');
registrationForm.add(contactMethod);

// Textarea
const comments = new InputTextarea('comments');
comments.set_label('Comments');
comments.rows(4);
comments.maxlength(500);
registrationForm.add(comments);

// Hidden field
const formToken = new InputHidden('form_token');
formToken.set_value('secure-token-123');
registrationForm.add(formToken);

// Date input
const birthDate = new InputDate('birth_date');
birthDate.set_label('Date of Birth');
console.log('Expected format:', birthDate.get_format());
registrationForm.add(birthDate);

// Render all inputs
async function render(): Promise<void> {
  for (const element of registrationForm.get_elements()) {
    await element.make();
    document.body.append(element.container);
  }
  
  // Add submit button
  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.innerText = 'Register';
  submitBtn.className = 'btn btn-primary';
  submitBtn.onclick = async (e) => {
    e.preventDefault();
    
    const isValid = await registrationForm.is_valid();
    if (isValid) {
      const values = registrationForm.get_values();
      console.log('Form values:', values);
      // Submit to server...
    }
  };
  document.body.append(submitBtn);
}

render();
```

## Best Practices

1. **Always set labels**: Use `set_label()` for accessibility
2. **Add validators early**: Configure validators before rendering
3. **Render before validation**: Call `make()` before `is_valid()`
4. **Use form for grouping**: Add all inputs to a `Form` for easy validation
5. **Handle async properly**: All validation is asynchronous

## Related Documentation

- [Form API](form.md) - Form management
- [Validators API](validators.md) - Validation system
- [Quick Start](../quickstart.md) - Basic examples
