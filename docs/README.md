# Keira Documentation

TypeScript browser-side MVC framework for building modular web applications.

## Table of Contents

### Getting Started
- [Installation](installation.md) - How to install and setup Keira
- [Quick Start](quickstart.md) - Basic examples to get you started

### API Reference
- [Controller](api/controller.md) - Base controller class for MVC pattern
- [View](api/view.md) - View class and DOM manipulation utilities
- [Form](api/form.md) - Form management and validation
- [Input Components](api/inputs.md) - All input types (Text, Select, Radio, etc.)
- [Modal](api/modal.md) - Modal dialogs and alerts
- [Dropdown](api/dropdown.md) - Dropdown menu component
- [Event System](api/event.md) - Event emitter for pub/sub pattern
- [Back Navigation](api/back.md) - Back navigation with priority callbacks
- [Validators](api/validators.md) - Form validation system

### Migration
- [Migration Guide](migration.md) - Upgrade from JavaScript v1.0.0 to TypeScript v2.0.0

## Overview

Keira is a lightweight MVC framework that provides:

- **Controller**: Base class for application controllers with error handling
- **View**: DOM manipulation utilities and view base class
- **Form**: Form composition with validation support
- **Input Components**: Pre-built input types with validation integration
- **Modal**: Modal dialogs with backdrop support
- **Dropdown**: Dropdown menus with button triggers
- **Event System**: Pub/sub event emitter
- **Back Navigation**: Priority-based back button handling
- **Validators**: Extensible validation system

## Quick Example

```typescript
import { Controller, View, ce } from 'keira';

class MyController extends Controller {
  init(): void {
    const view = new MyView(this);
    view.render().then((container) => {
      document.body.append(container);
    });
  }
}

class MyView extends View {
  override async make(): Promise<void> {
    const heading = ce('h1', 'title');
    heading.text('Hello, Keira!');
    this.container.append(heading);
  }
}

const app = new MyController();
app.init();
```
