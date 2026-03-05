# Quick Start

This guide shows you how to get started with Keira using basic examples.

## Basic MVC Pattern

### Creating a Controller

```typescript
import { Controller } from 'keira';

class HomeController extends Controller {
  init(): void {
    console.log('Home controller initialized');
    // Initialize views, handle routing, etc.
  }
}

const homeController = new HomeController();
homeController.init();
```

### Creating a View

```typescript
import { View, ce, type ExtendedElement } from 'keira/view';
import type { Controller } from 'keira';

class HomeView extends View {
  constructor(C: Controller | null) {
    super(C);
  }

  override async make(): Promise<void> {
    // Create elements using the ce helper
    const heading = ce('h1', 'title');
    heading.text('Welcome to Keira');
    
    const paragraph = ce('p', 'description');
    paragraph.text('A TypeScript MVC framework');
    
    // Append to container
    this.container.append(heading);
    this.container.append(paragraph);
  }

  override async render(): Promise<ExtendedElement> {
    await this.make();
    return this.container;
  }
}

// Usage
const view = new HomeView(homeController);
view.render().then((container) => {
  document.body.append(container);
});
```

## Working with Forms

### Basic Form Setup

```typescript
import { Form } from 'keira/form';
import { InputText } from 'keira/input/text';
import { InputSelect } from 'keira/input/select';
import { ValidatorNotNull } from 'keira/validator';

const form = new Form();

// Create text input
const nameInput = new InputText('username');
nameInput.set_label('Username');
nameInput.add_validator(new ValidatorNotNull('Username is required'));

// Create select input
const roleInput = new InputSelect('role');
roleInput.set_label('Role');
roleInput.add('admin', 'Administrator');
roleInput.add('user', 'Regular User');
roleInput.add_validator(new ValidatorNotNull('Role is required'));

// Add to form
form.add(nameInput);
form.add(roleInput);

// Validate form
form.is_valid().then((isValid: boolean) => {
  if (isValid) {
    console.log('Form is valid!');
    const values = form.get_values();
    console.log(values);
  }
});

// Set values programmatically
form.set_values({
  username: 'john_doe',
  role: 'admin'
});
```

### Input Types

```typescript
import { InputText } from 'keira/input/text';
import { InputTextarea } from 'keira/input/textarea';
import { InputSelect } from 'keira/input/select';
import { InputRadio } from 'keira/input/radio';
import { InputHidden } from 'keira/input/hidden';
import { InputDate } from 'keira/input/date';

// Text input
const textInput = new InputText('email');
textInput.set_label('Email');
textInput.set_value('user@example.com');

// Textarea
const textarea = new InputTextarea('description');
textarea.set_label('Description');
textarea.rows(5);
textarea.maxlength(500);

// Select dropdown
const select = new InputSelect('country');
select.add('us', 'United States');
select.add('uk', 'United Kingdom');
select.add('br', 'Brazil');

// Radio buttons
const radio = new InputRadio('preference');
radio.add('opt1', 'Option 1');
radio.add('opt2', 'Option 2');

// Hidden field
const hidden = new InputHidden('csrf_token');
hidden.set_value('abc123');

// Date input
const dateInput = new InputDate('birth_date');
dateInput.set_label('Birth Date');
console.log(dateInput.get_format()); // e.g., 'MM/dd/yyyy'
```

## Modal Dialogs

### Basic Modal

```typescript
import { Modal } from 'keira/modal';
import { ce } from 'keira/view';
import type { Controller } from 'keira';

class MyModal extends Modal {
  constructor(C: Controller | null) {
    super(C);
    this.set_title('My Modal');
  }

  override async make(): Promise<void> {
    if (this.body) {
      const content = ce('p');
      content.text('This is modal content');
      this.body.append(content);
      
      const closeButton = ce('button', 'btn btn-secondary');
      closeButton.text('Close');
      closeButton.onclick = () => this.remove();
      this.footer?.append(closeButton);
    }
  }
}

// Show modal
const modal = new MyModal(controller);
modal.render();

// Hide modal
modal.hide();

// Remove modal
modal.remove();
```

### Alert Dialog

```typescript
import { Alert } from 'keira/modal';
import type { Controller } from 'keira';

const alert = new Alert(controller);
alert.set_message('Operation completed successfully!');
alert.render();
```

## Dropdown Menus

```typescript
import Dropdown from 'keira/dropdown';
import { ce } from 'keira/view';

const dropdown = new Dropdown();
dropdown.set_label('Actions');

// Create and set button
const button = dropdown.make_and_set_button('Menu');

// Add items
const item1 = dropdown.make_and_add_item('Edit');
item1.onclick = () => console.log('Edit clicked');

const item2 = dropdown.make_and_add_item('Delete');
item2.onclick = () => console.log('Delete clicked');

// Render dropdown
dropdown.render().then((container) => {
  document.body.append(container);
});

// Programmatically toggle
dropdown.show();
dropdown.hide();
dropdown.toggle();
```

## Event System

```typescript
import Event from 'keira/event';

// Subscribe to event
Event.on('user:login', (data: unknown) => {
  console.log('User logged in:', data);
  return Promise.resolve();
});

// Emit event
Event.emit('user:login', { userId: 123, username: 'john' }).then((results) => {
  console.log('Event handled by', results.length, 'listeners');
});

// Remove specific listener
Event.remove('user:login', listenerFunction);

// Remove all listeners for event
Event.remove_all('user:login');
```

## Back Navigation

```typescript
import Back from 'keira/back';

// Add callback with priority
Back.add(Back.MODAL, () => {
  console.log('Modal back pressed');
  return undefined;
});

// Set default back handler
Back.set_default(() => {
  console.log('Default back action');
  return undefined;
});

// Override next back press
Back.override(() => {
  console.log('This will be called on next back');
  return undefined;
});

// Trigger back
Back.back();

// Remove specific priority
Back.remove(Back.MODAL);

// Clear all
Back.clear();
```

## Validators

### Built-in Validator

```typescript
import { ValidatorNotNull } from 'keira/validator';
import { InputText } from 'keira/input/text';

const input = new InputText('email');
input.add_validator(new ValidatorNotNull('Email is required'));
```

### Custom Validator

```typescript
import ValidatorBase from 'keira/validator';

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

const emailInput = new InputText('email');
emailInput.add_validator(new ValidatorNotNull('Email is required'));
emailInput.add_validator(new EmailValidator());
```

## Next Steps

- Read the full [API Reference](api/) for detailed documentation
- Check the [Migration Guide](migration.md) if upgrading from v1.0.0
