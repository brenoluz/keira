# Migration Guide: v1.0.0 (JavaScript) to v2.0.0 (TypeScript)

This guide helps you migrate from Keira v1.0.0 (JavaScript) to v2.0.0 (TypeScript).

## What's Changed

### Major Changes

1. **Full TypeScript Conversion**: All source files are now TypeScript with strict typing
2. **ESM Module System**: Uses native ES modules instead of CommonJS/Webpack
3. **No Build Tools**: Removed Webpack and Grunt, uses TypeScript compiler directly
4. **Strict Type Checking**: `noImplicitAny`, `strictNullChecks` enabled
5. **New Export Structure**: Subpath exports for better tree-shaking

### Breaking Changes

#### 1. Import Paths

**Before (v1.0.0):**
```javascript
// CommonJS or global
const { Controller, View } = require('keira');
// or
const Controller = keira.Controller;
```

**After (v2.0.0):**
```typescript
// ESM imports
import { Controller, View } from 'keira';
// or specific module
import Controller from 'keira/controller';
import View, { ce } from 'keira/view';
```

#### 2. Module Type

**Before:**
```json
{
  // No type field or "type": "commonjs"
}
```

**After:**
```json
{
  "type": "module"
}
```

#### 3. File Extensions in Imports

**Before:**
```javascript
import Controller from './controller';
```

**After:**
```typescript
import Controller from './controller.js';
// Note: .js extension required for ESM with NodeNext
```

#### 4. Error Handling Types

**Before:**
```javascript
error(e) {
  console.error(e.message); // e could be anything
}
```

**After:**
```typescript
error(e: unknown): void {
  if (e instanceof Error) {
    console.error(e.message);
  } else {
    console.error(String(e));
  }
}
```

#### 5. Input Component Exports

**Before:**
```javascript
const InputText = require('keira/input/text');
```

**After:**
```typescript
import { InputText } from 'keira/input';
// or
import InputText from 'keira/input/text';
```

---

## Migration Steps

### Step 1: Update Package.json

```json
{
  "type": "module",
  "dependencies": {
    "keira": "^2.0.0"
  }
}
```

### Step 2: Update tsconfig.json

Add or update your TypeScript configuration:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist"
  },
  "include": ["src/**/*"]
}
```

### Step 3: Update Import Statements

Replace all CommonJS requires with ESM imports:

**Before:**
```javascript
const Controller = require('keira/controller');
const View = require('keira/view');
const Form = require('keira/form');
```

**After:**
```typescript
import Controller from 'keira/controller';
import View, { ce } from 'keira/view';
import Form from 'keira/form';
```

### Step 4: Add Type Annotations

Add types to your classes and functions:

**Before:**
```javascript
class MyController extends Controller {
  init() {
    const view = new MyView(this);
    view.render().then(container => {
      document.body.append(container);
    });
  }
  
  error(e) {
    console.error(e);
  }
}
```

**After:**
```typescript
import { Controller, View, type ExtendedElement } from 'keira';

class MyController extends Controller {
  init(): void {
    const view = new MyView(this);
    view.render().then((container: ExtendedElement) => {
      document.body.append(container);
    });
  }
  
  override error(e: unknown): void {
    if (e instanceof Error) {
      console.error(e.message);
    } else {
      console.error(String(e));
    }
  }
}
```

### Step 5: Update Input Components

**Before:**
```javascript
const InputText = require('keira/input/text');
const InputSelect = require('keira/input/select');

const name = new InputText('name');
```

**After:**
```typescript
import { InputText, InputSelect } from 'keira/input';

const name = new InputText('name');
```

---

## Common Pattern Migrations

### Controller Pattern

**Before (v1.0.0):**
```javascript
const Controller = require('keira/controller');
const View = require('keira/view');

function MyController() {
  Controller.call(this);
}
MyController.prototype = Object.create(Controller.prototype);

MyController.prototype.init = function() {
  const view = new MyView(this);
  const self = this;
  view.render().then(function(container) {
    document.body.appendChild(container);
  });
};
```

**After (v2.0.0):**
```typescript
import { Controller, View, type ExtendedElement } from 'keira';

class MyController extends Controller {
  init(): void {
    const view = new MyView(this);
    view.render().then((container: ExtendedElement) => {
      document.body.append(container);
    });
  }
}
```

### View Pattern

**Before (v1.0.0):**
```javascript
const View = require('keira/view');
const ce = require('keira/view').ce;

function MyView(C) {
  View.call(this, C);
}
MyView.prototype = Object.create(View.prototype);

MyView.prototype.make = function() {
  const h1 = ce('h1', 'title');
  h1.innerText = 'Hello';
  this.container.appendChild(h1);
};
```

**After (v2.0.0):**
```typescript
import View, { ce, type ExtendedElement } from 'keira/view';
import type { Controller } from 'keira';

class MyView extends View {
  constructor(C: Controller | null) {
    super(C);
  }
  
  override async make(): Promise<void> {
    const h1 = ce('h1', 'title');
    h1.text('Hello');
    this.container.append(h1);
  }
}
```

### Form Pattern

**Before (v1.0.0):**
```javascript
const Form = require('keira/form');
const InputText = require('keira/input/text');
const ValidatorNotNull = require('keira/validator/not_null');

const form = new Form();
const name = new InputText('name');
name.add_validator(new ValidatorNotNull('Name required'));
form.add(name);

form.is_valid().then(function(valid) {
  if (valid) {
    const values = form.get_values();
    console.log(values);
  }
});
```

**After (v2.0.0):**
```typescript
import { Form } from 'keira/form';
import { InputText } from 'keira/input';
import { ValidatorNotNull } from 'keira/validator';

const form = new Form();
const name = new InputText('name');
name.set_label('Name');
name.add_validator(new ValidatorNotNull('Name is required'));
form.add(name);

const isValid = await form.is_valid();
if (isValid) {
  const values = form.get_values();
  console.log(values);
}
```

### Modal Pattern

**Before (v1.0.0):**
```javascript
const Modal = require('keira/modal');
const ce = require('keira/view').ce;

function MyModal(C) {
  Modal.call(this, C);
  this.set_title('My Modal');
}
MyModal.prototype = Object.create(Modal.prototype);

MyModal.prototype.make = function() {
  const p = ce('p');
  p.innerText = 'Modal content';
  this.body.appendChild(p);
};
```

**After (v2.0.0):**
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
      const p = ce('p');
      p.text('Modal content');
      this.body.append(p);
    }
  }
}
```

### Event System Pattern

**Before (v1.0.0):**
```javascript
const Event = require('keira/event');

Event.on('user:login', function(data) {
  console.log('User logged in:', data);
});

Event.emit('user:login', { id: 123 });
```

**After (v2.0.0):**
```typescript
import Event from 'keira/event';

Event.on('user:login', (data: unknown) => {
  console.log('User logged in:', data);
  return Promise.resolve();
});

Event.emit('user:login', { id: 123 }).then((results) => {
  console.log('Handled by', results.length, 'listeners');
});
```

### Back Navigation Pattern

**Before (v1.0.0):**
```javascript
const Back = require('keira/back');

Back.add(Back.MODAL, function() {
  console.log('Modal back');
});

Back.back();
```

**After (v2.0.0):**
```typescript
import Back from 'keira/back';

Back.add(Back.MODAL, () => {
  console.log('Modal back');
  return undefined;
});

Back.back();
```

---

## TypeScript-Specific Tips

### Handling `unknown` Types

When dealing with `unknown` types, use type guards:

```typescript
function handleError(e: unknown): void {
  if (e instanceof Error) {
    console.error(e.message);
  } else if (typeof e === 'string') {
    console.error(e);
  } else {
    console.error('Unknown error');
  }
}
```

### Typing Event Data

```typescript
interface LoginEvent {
  userId: number;
  username: string;
}

Event.on('user:login', (data: unknown) => {
  if (typeof data === 'object' && data !== null && 'userId' in data) {
    const loginData = data as LoginEvent;
    console.log(loginData.username);
  }
  return Promise.resolve();
});
```

### Typing DOM Elements

```typescript
import { ce, type ExtendedElement } from 'keira/view';

const button = ce('button', 'btn') as unknown as HTMLButtonElement;
button.onclick = () => {
  // button is typed as HTMLButtonElement
};
```

---

## Troubleshooting

### Error: "Cannot find module"

Make sure you're using `.js` extensions in imports:
```typescript
// Correct
import Controller from './controller.js';

// Incorrect
import Controller from './controller';
```

### Error: "Module requires ESM"

Add `"type": "module"` to your package.json.

### Error: "Implicit any type"

Add explicit type annotations:
```typescript
// Before (error)
function process(data) { }

// After (correct)
function process(data: unknown): void { }
```

### Error: "Property does not exist on type"

Use type guards or type assertions:
```typescript
if ('value' in element) {
  const value = (element as HTMLInputElement).value;
}
```

---

## Quick Reference

| v1.0.0 (JavaScript) | v2.0.0 (TypeScript) |
|---------------------|---------------------|
| `require('keira')` | `import { } from 'keira'` |
| `function() {}` | `(): void => {}` |
| `var`, `let` | `const` with types |
| `null` checks | `strictNullChecks` |
| No types | Full type annotations |
| Webpack/Grunt | TypeScript compiler only |
| CommonJS | ESM |

---

## Next Steps

- Review the [API Documentation](api/) for detailed type information
- Check the [Quick Start](quickstart.md) for updated examples
- Read about [Input Components](api/inputs.md) for typed input usage

## Support

For migration issues, please open an issue on GitHub or consult the API documentation.
