# Back Navigation API

Keira provides a priority-based back navigation system for handling browser back button and custom back actions.

## Import

```typescript
import Back from 'keira/back';
// or
import { default as Back } from 'keira/back';
```

## Type Definitions

```typescript
type CallbackFunction = () => unknown;

interface CallbackMap {
  [priority: number]: CallbackFunction;
}
```

## Back Object

The Back system is a singleton object with priority constants and navigation methods:

```typescript
export default new class Back {
  list: CallbackMap;
  default: CallbackFunction | null;
  readonly MENU = 8;
  readonly OVERRIDE = 6;
  readonly MODAL = 4;
  readonly DIALOG = 3;
  
  add(priority: number, cb: CallbackFunction): void;
  clear(): void;
  set_default(cb: CallbackFunction): void;
  remove(priority: number): void;
  override(cb: CallbackFunction): void;
  back(): unknown;
}
```

## Priority Constants

| Constant | Value | Use Case |
|----------|-------|----------|
| `MENU` | 8 | Menu navigation |
| `OVERRIDE` | 6 | One-time override |
| `MODAL` | 4 | Modal dialogs |
| `DIALOG` | 3 | Dialog windows |

**Note:** Lower numbers are checked first (priority 0 is highest). The system loops from 0-9 and executes the first matching callback.

## Methods

### add(priority: number, cb: CallbackFunction): void

Adds a callback with a specific priority.

**Parameters:**
- `priority: number` - Priority level (0-9, lower = higher priority)
- `cb: CallbackFunction` - Callback function to execute

**Example:**

```typescript
import Back from 'keira/back';

// Add modal back handler
Back.add(Back.MODAL, () => {
  console.log('Modal back pressed');
  closeModal();
  return undefined;
});

// Add menu back handler
Back.add(Back.MENU, () => {
  console.log('Menu back pressed');
  closeMenu();
  return undefined;
});
```

### set_default(cb: CallbackFunction): void

Sets the default back handler (used when no priority callbacks are registered).

**Parameters:**
- `cb: CallbackFunction` - Default callback function

**Example:**

```typescript
import Back from 'keira/back';

// Set default back behavior
Back.set_default(() => {
  console.log('Default back - navigate to previous page');
  window.history.back();
  return undefined;
});
```

### override(cb: CallbackFunction): void

Sets a one-time override callback (priority 6). The callback is removed after execution.

**Parameters:**
- `cb: CallbackFunction` - Override callback function

**Example:**

```typescript
import Back from 'keira/back';

// Override next back press
Back.override(() => {
  console.log('This handles the next back press only');
  saveDraft();
  return undefined;
});
```

### remove(priority: number): void

Removes the callback at a specific priority.

**Parameters:**
- `priority: number` - Priority level to remove

**Example:**

```typescript
import Back from 'keira/back';

// Remove modal handler when modal closes
Back.remove(Back.MODAL);
```

### clear(): void

Removes all registered callbacks (but not the default).

**Example:**

```typescript
import Back from 'keira/back';

// Clear all handlers (e.g., on page navigation)
Back.clear();
```

### back(): unknown

Triggers the back action. Executes the highest priority callback available.

**Returns:** The return value of the executed callback, or `undefined` if no callback

**Example:**

```typescript
import Back from 'keira/back';

// Trigger back action
const result = Back.back();

// Typically connected to a button
const backBtn = document.getElementById('back-btn');
if (backBtn) {
  backBtn.onclick = () => Back.back();
}
```

## Real-World Examples

### Modal Back Handling

```typescript
import Back from 'keira/back';
import { Modal } from 'keira/modal';

class ConfirmModal extends Modal {
  constructor() {
    super(null);
    this.set_title('Confirm Exit');
    
    // Register back handler when modal opens
    Back.add(Back.MODAL, () => {
      this.remove();
      return undefined;
    });
  }
  
  override remove(): void {
    // Clean up back handler when modal closes
    Back.remove(Back.MODAL);
    super.remove();
  }
}

// Usage
const modal = new ConfirmModal();
modal.render();
```

### Multi-Level Navigation

```typescript
import Back from 'keira/back';

class NavigationManager {
  private stack: string[] = [];
  
  navigate(path: string): void {
    this.stack.push(path);
    
    // Add back handler for this level
    Back.add(Back.MENU, () => {
      this.goBack();
      return undefined;
    });
    
    // Update URL
    window.history.pushState({ path }, '', path);
  }
  
  goBack(): void {
    if (this.stack.length > 1) {
      this.stack.pop(); // Remove current
      const previous = this.stack[this.stack.length - 1];
      this.loadPage(previous);
      Back.remove(Back.MENU); // Remove current handler
    } else {
      // At root, use default back
      Back.set_default(() => {
        window.history.back();
        return undefined;
      });
    }
  }
  
  private loadPage(path: string): void {
    console.log('Loading page:', path);
    // Load page content
  }
}

// Usage
const nav = new NavigationManager();
nav.navigate('/home');
nav.navigate('/products');
nav.navigate('/products/123');

// Back button will navigate: /products/123 -> /products -> /home
```

### Form Unsaved Changes

```typescript
import Back from 'keira/back';
import { Alert } from 'keira/modal';

class FormManager {
  private hasUnsavedChanges = false;
  
  enableUnsavedProtection(): void {
    this.hasUnsavedChanges = true;
    
    Back.override(() => {
      if (this.hasUnsavedChanges) {
        const alert = new Alert('You have unsaved changes. Are you sure you want to leave?');
        alert.render();
        
        // Set up another override for the confirmation
        Back.override(() => {
          this.hasUnsavedChanges = false;
          return Back.back();
        });
      }
      return undefined;
    });
  }
  
  disableUnsavedProtection(): void {
    this.hasUnsavedChanges = false;
  }
  
  save(): void {
    // Save form
    this.disableUnsavedProtection();
  }
}

// Usage
const formManager = new FormManager();

// When user starts editing
form.on('input', () => {
  formManager.enableUnsavedProtection();
});

// When user saves
form.on('submit', () => {
  formManager.save();
});
```

### Dialog Stack

```typescript
import Back from 'keira/back';

class DialogManager {
  private dialogCount = 0;
  
  openDialog(): void {
    this.dialogCount++;
    
    // Add handler for this dialog
    Back.add(Back.DIALOG, () => {
      this.closeDialog();
      return undefined;
    });
  }
  
  closeDialog(): void {
    if (this.dialogCount > 0) {
      Back.remove(Back.DIALOG);
      this.dialogCount--;
      // Remove dialog from DOM
    }
  }
  
  closeAll(): void {
    while (this.dialogCount > 0) {
      this.closeDialog();
    }
  }
}

// Usage
const dialogs = new DialogManager();
dialogs.openDialog(); // Press back -> closes this dialog
dialogs.openDialog(); // Press back -> closes this dialog
dialogs.openDialog(); // Press back -> closes this dialog
```

## Priority Flow

When `Back.back()` is called:

```
1. Loop from priority 0 to 9
2. First matching callback wins
3. Execute callback
4. Return callback result

Priority order (checked first to last):
- 0, 1, 2: Custom priorities
- 3: DIALOG
- 4: MODAL
- 5: Custom
- 6: OVERRIDE
- 7: Custom
- 8: MENU
- 9: Custom
- Default: If no priority callback found
```

## Browser Back Button Integration

```typescript
import Back from 'keira/back';

// Listen for browser back button
window.addEventListener('popstate', (event) => {
  Back.back();
});

// Set up initial state
window.history.pushState({ initial: true }, '', window.location.href);

// Now browser back button triggers Back.back()
```

## Best Practices

1. **Clean up handlers**: Always `remove()` handlers when components unmount
2. **Use appropriate priorities**: Use constants (MODAL, MENU, etc.) for clarity
3. **Set default handler**: Always set a default for root-level back behavior
4. **Use override for one-time actions**: `override()` is automatically cleared
5. **Don't block back**: Back handlers should complete quickly
6. **Return undefined**: Most handlers should return `undefined`

## Common Patterns

### Router Integration

```typescript
import Back from 'keira/back';

class Router {
  private routes: string[] = [];
  
  constructor() {
    // Handle browser back
    window.addEventListener('popstate', () => {
      this.back();
    });
    
    // Set default back
    Back.set_default(() => {
      this.back();
      return undefined;
    });
  }
  
  push(path: string): void {
    this.routes.push(path);
    window.history.pushState({ path }, '', path);
  }
  
  back(): void {
    if (this.routes.length > 1) {
      this.routes.pop();
      const prevPath = this.routes[this.routes.length - 1];
      this.load(prevPath);
    }
  }
  
  private load(path: string): void {
    console.log('Loading:', path);
  }
}
```

### Confirmation Flow

```typescript
import Back from 'keira/back';
import { Alert } from 'keira/modal';

// Set up confirmation
function confirmBack(message: string, onConfirm: () => void): void {
  Back.override(() => {
    const alert = new Alert(message);
    alert.render();
    
    // After user acknowledges, proceed with back
    Back.override(() => {
      onConfirm();
      return undefined;
    });
    
    return undefined;
  });
}

// Usage
confirmBack('Press back again to exit', () => {
  console.log('Exiting...');
});
```

## Related Documentation

- [Event System API](event.md) - Event emitter
- [Modal API](modal.md) - Modal dialogs
- [Dropdown API](dropdown.md) - Dropdown menus
