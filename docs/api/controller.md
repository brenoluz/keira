# Controller API

The Controller class is the base class for all controllers in the Keira MVC pattern.

## Import

```typescript
import { Controller } from 'keira';
// or
import Controller from 'keira/controller';
```

## Class Definition

```typescript
export default class Controller {
  error(e: unknown): void;
}
```

## Methods

### error(e: unknown): void

Handles errors in the controller. Override this method to implement custom error handling.

**Parameters:**
- `e: unknown` - The error object or message

**Returns:** `void`

**Example:**

```typescript
import { Controller } from 'keira';

class HomeController extends Controller {
  override error(e: unknown): void {
    if (e instanceof Error) {
      console.error('Controller error:', e.message);
      // Log to error tracking service
      this.logError(e);
    } else {
      console.error('Unknown error:', e);
    }
  }

  private logError(error: Error): void {
    // Custom error logging
  }

  loadData(): void {
    fetch('/api/data')
      .then((response) => response.json())
      .catch((e) => this.error(e));
  }
}
```

## Usage Pattern

Controllers are typically used as the entry point for application logic:

```typescript
import { Controller, View, ce } from 'keira';

class AppController extends Controller {
  init(): void {
    try {
      const view = new AppView(this);
      view.render().then((container) => {
        document.body.append(container);
      });
    } catch (e) {
      this.error(e);
    }
  }
}

class AppView extends View {
  constructor(C: Controller | null) {
    super(C);
  }

  override async make(): Promise<void> {
    const heading = ce('h1');
    heading.text('My App');
    this.container.append(heading);
  }
}

const app = new AppController();
app.init();
```

## Best Practices

1. **Extend the base Controller**: Always extend Controller for your application controllers
2. **Override error handling**: Implement custom error handling in your controllers
3. **Keep controllers thin**: Delegate view logic to View classes
4. **Use type guards**: When handling `unknown` errors, use type guards to safely access properties

```typescript
class UserController extends Controller {
  override error(e: unknown): void {
    if (e instanceof Error) {
      console.error(e.message);
    } else if (typeof e === 'string') {
      console.error(e);
    } else {
      console.error('Unknown error type', e);
    }
  }
}
```

## Related Documentation

- [View API](view.md) - View class for rendering UI
- [Form API](form.md) - Form management
- [Quick Start](../quickstart.md) - Basic usage examples
