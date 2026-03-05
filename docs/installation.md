# Installation

This guide covers how to install and setup Keira in your project.

## Prerequisites

- Node.js 18+ 
- npm or yarn package manager
- TypeScript 5.0+ (Keira is a TypeScript library)

## Installation

### Using npm

```bash
npm install keira
```

### Using yarn

```bash
yarn add keira
```

## TypeScript Configuration

Ensure your `tsconfig.json` has the following settings for proper ESM module resolution:

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
    "forceConsistentCasingInFileNames": true
  }
}
```

## Package.json Configuration

For ESM projects, ensure your `package.json` includes:

```json
{
  "type": "module"
}
```

## Import Paths

Keira provides multiple entry points:

```typescript
// Main entry - exports everything
import { Controller, View, Form } from 'keira';

// Specific module imports
import { Modal, Alert } from 'keira/modal';
import { InputText, InputSelect } from 'keira/input';
import { ValidatorNotNull } from 'keira/validator';
import Event from 'keira/event';
import Back from 'keira/back';
import Dropdown from 'keira/dropdown';
```

## Browser Usage

Keira runs in the browser. Include the compiled output in your HTML:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Keira App</title>
</head>
<body>
  <script type="module" src="./main.ts"></script>
</body>
</html>
```

## Next Steps

- Check out the [Quick Start](quickstart.md) for basic usage examples
- Browse the [API Reference](api/) for detailed documentation
