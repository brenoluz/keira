# Keira

[![npm version](https://img.shields.io/npm/v/keira.svg)](https://www.npmjs.com/package/keira)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)

A lightweight **TypeScript browser-side MVC framework** for building modular web applications.

## Features

- 🎯 **MVC Pattern**: Clean separation of Controller, View, and Model
- 📝 **TypeScript**: Full type safety with strict mode
- 🧩 **Modular**: Tree-shakeable ESM exports
- ✅ **Validation**: Built-in form validation system
- 🎨 **Input Components**: Pre-built typed input components
- 🪟 **Modals**: Modal dialogs and alerts
- 📋 **Dropdowns**: Dropdown menu components
- 📡 **Event System**: Pub/sub event emitter
- 🔙 **Back Navigation**: Priority-based back button handling
- 🧪 **Tested**: Comprehensive Vitest test suite

## Installation

```bash
npm install keira
```

## Quick Start

```typescript
import { Controller, View, ce, type ExtendedElement } from 'keira';

// Create a controller
class AppController extends Controller {
  init(): void {
    const view = new AppView(this);
    view.render().then((container: ExtendedElement) => {
      document.body.append(container);
    });
  }
}

// Create a view
class AppView extends View {
  constructor(C: Controller | null) {
    super(C);
  }

  override async make(): Promise<void> {
    const heading = ce('h1', 'title');
    heading.text('Hello, Keira!');
    this.container.append(heading);
  }
}

// Initialize the app
const app = new AppController();
app.init();
```

## Documentation

- **[Getting Started](docs/installation.md)** - Installation and setup
- **[Quick Start](docs/quickstart.md)** - Basic usage examples
- **[API Reference](docs/api/)** - Complete API documentation
  - [Controller](docs/api/controller.md)
  - [View](docs/api/view.md)
  - [Form](docs/api/form.md)
  - [Input Components](docs/api/inputs.md)
  - [Modal](docs/api/modal.md)
  - [Dropdown](docs/api/dropdown.md)
  - [Event System](docs/api/event.md)
  - [Back Navigation](docs/api/back.md)
  - [Validators](docs/api/validators.md)
- **[Migration Guide](docs/migration.md)** - Upgrading from v1.0.0 to v2.0.0

## Examples

### Form with Validation

```typescript
import { Form } from 'keira/form';
import { InputText, InputSelect } from 'keira/input';
import { ValidatorNotNull } from 'keira/validator';

const form = new Form();

// Text input with validation
const email = new InputText('email');
email.set_label('Email');
email.add_validator(new ValidatorNotNull('Email is required'));
form.add(email);

// Select input
const role = new InputSelect('role');
role.set_label('Role');
role.add('', 'Select role');
role.add('admin', 'Administrator');
role.add('user', 'User');
form.add(role);

// Validate
const isValid = await form.is_valid();
if (isValid) {
  const values = form.get_values();
  console.log(values);
}
```

### Modal Dialog

```typescript
import { Modal } from 'keira/modal';
import { ce } from 'keira/view';

class ConfirmModal extends Modal {
  constructor() {
    super(null);
    this.set_title('Confirm');
  }

  override async make(): Promise<void> {
    if (this.body) {
      const msg = ce('p');
      msg.text('Are you sure?');
      this.body.append(msg);
    }
  }
}

const modal = new ConfirmModal();
modal.render();
```

### Event System

```typescript
import Event from 'keira/event';

// Subscribe
Event.on('user:login', (data: unknown) => {
  console.log('User logged in:', data);
  return Promise.resolve();
});

// Emit
Event.emit('user:login', { userId: 123, username: 'john' });
```

### Back Navigation

```typescript
import Back from 'keira/back';

// Add back handler
Back.add(Back.MODAL, () => {
  closeModal();
  return undefined;
});

// Trigger back
Back.back();
```

## Project Structure

```
keira/
├── src/
│   ├── controller.ts    # Base controller class
│   ├── view.ts          # View class and ce helper
│   ├── form.ts          # Form management
│   ├── input/           # Input components
│   ├── modal/           # Modal components
│   ├── validator/       # Validation system
│   ├── event.ts         # Event emitter
│   ├── back.ts          # Back navigation
│   └── dropdown.ts      # Dropdown component
├── tests/               # Vitest test files
├── docs/                # Documentation
└── dist/                # Compiled output
```

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Run tests
npm test

# Test with coverage
npm run test:coverage

# Type check
npm run typecheck
```

## Browser Support

Keira runs in modern browsers that support ES2020+:

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## License

[ISC](LICENSE)

## Contributing

Contributions are welcome! Please read the documentation and submit pull requests.

## Changelog

### v2.0.0

- **Breaking**: Full TypeScript migration
- **Breaking**: ESM module system (removed CommonJS)
- **Breaking**: New export structure with subpath exports
- Added strict type checking
- Removed Webpack and Grunt build tools
- Added Vitest test framework
- Comprehensive documentation

### v1.0.0

- Initial JavaScript release
- MVC pattern implementation
- Form validation system
- Modal and dropdown components
- Event system and back navigation
