# Modal API

The Modal component provides dialog windows with backdrop support for Keira applications.

## Modal Class

### Import

```typescript
import { Modal } from 'keira/modal';
// or
import Modal from 'keira/modal';
```

### Class Definition

```typescript
export default class Modal extends View {
  titleText: string | null;
  header: Element | null;
  body: Element | null;
  footer: Element | null;
  opacity: ExtendedElement | null;
  backdropClose: boolean;
  
  constructor(C: Controller | null);
  set_title(title: string): void;
  show(): void;
  hide(): void;
  remove(): void;
  static set_document(document: Document): void;
  static get_document(): Document;
}
```

### Constructor

```typescript
constructor(C: Controller | null)
```

**Parameters:**
- `C: Controller | null` - Optional reference to the controller

**Example:**

```typescript
import { Modal } from 'keira/modal';
import type { Controller } from 'keira';

class MyModal extends Modal {
  constructor(C: Controller | null) {
    super(C);
    this.set_title('My Modal');
  }
}
```

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `titleText` | `string \| null` | The modal title |
| `header` | `Element \| null` | Header element |
| `body` | `Element \| null` | Body content element |
| `footer` | `Element \| null` | Footer element |
| `opacity` | `ExtendedElement \| null` | Backdrop overlay |
| `backdropClose` | `boolean` | Allow closing by clicking backdrop |

### Methods

#### set_title(title: string): void

Sets the modal title.

```typescript
modal.set_title('Confirmation');
```

#### show(): void

Shows the modal with backdrop.

```typescript
modal.show();
```

#### hide(): void

Hides the modal (keeps it in DOM).

```typescript
modal.hide();
```

#### remove(): void

Removes the modal and backdrop from DOM.

```typescript
modal.remove();
```

#### static set_document(document: Document): void

Sets the document to use (useful for testing).

```typescript
Modal.set_document(mockDocument);
```

#### static get_document(): Document

Gets the current document reference.

```typescript
const doc = Modal.get_document();
```

### Creating a Custom Modal

```typescript
import { Modal } from 'keira/modal';
import { ce, type ExtendedElement } from 'keira/view';
import type { Controller } from 'keira';

class ConfirmModal extends Modal {
  private onConfirm: (() => void) | null;
  private onCancel: (() => void) | null;

  constructor(C: Controller | null) {
    super(C);
    this.set_title('Confirm Action');
    this.backdropClose = true;
    this.onConfirm = null;
    this.onCancel = null;
  }

  override async render(): Promise<ExtendedElement> {
    const container = await super.render();
    
    // Add content to body
    if (this.body) {
      const message = ce('p');
      message.text('Are you sure you want to proceed?');
      this.body.append(message);
    }

    // Add cancel button
    if (this.footer) {
      const cancelBtn = ce('button', 'btn btn-secondary');
      cancelBtn.text('Cancel');
      cancelBtn.onclick = () => {
        if (this.onCancel) this.onCancel();
        this.remove();
      };
      this.footer.append(cancelBtn);

      // Add confirm button
      const confirmBtn = ce('button', 'btn btn-primary');
      confirmBtn.text('Confirm');
      confirmBtn.onclick = () => {
        if (this.onConfirm) this.onConfirm();
        this.remove();
      };
      this.footer.append(confirmBtn);
    }

    return container;
  }

  setCallbacks(onConfirm: () => void, onCancel: () => void): void {
    this.onConfirm = onConfirm;
    this.onCancel = onCancel;
  }
}

// Usage
const controller = new MyController();
const modal = new ConfirmModal(controller);
modal.setCallbacks(
  () => console.log('Confirmed!'),
  () => console.log('Cancelled')
);
modal.render();
```

---

## Alert Component

A simple modal for displaying alert messages.

### Import

```typescript
import { Alert } from 'keira/modal';
// or
import Alert from 'keira/modal/alert';
```

### Class Definition

```typescript
export default class Alert extends Modal {
  message: string;
  
  constructor(msg: string);
  set_message(msg: string): void;
  render(): Promise<ExtendedElement>;
}
```

### Constructor

```typescript
constructor(msg: string)
```

**Parameters:**
- `msg: string` - The alert message to display

### Methods

#### set_message(msg: string): void

Sets the alert message.

```typescript
alert.set_message('Operation completed successfully!');
```

#### render(): Promise<ExtendedElement>

Renders the alert modal with an OK button.

### Usage

```typescript
import { Alert } from 'keira/modal';
import type { Controller } from 'keira';

// Simple alert
const alert = new Alert('Your changes have been saved!');
alert.render();

// Alert with custom message
const errorAlert = new Alert('An error occurred while saving.');
errorAlert.set_message('Failed to save: Invalid data format');
errorAlert.render();

// In a controller method
class UserController extends Controller {
  saveUser(): void {
    // ... save logic
    const alert = new Alert('User saved successfully!');
    alert.render();
  }
}
```

### Complete Alert Example

```typescript
import { Controller } from 'keira';
import { Alert } from 'keira/modal';

class FormController extends Controller {
  async submitForm(data: Record<string, unknown>): Promise<void> {
    try {
      // Simulate API call
      await fetch('/api/submit', {
        method: 'POST',
        body: JSON.stringify(data)
      });
      
      // Show success alert
      const successAlert = new Alert('Form submitted successfully!');
      successAlert.render();
      
    } catch (e) {
      // Show error alert
      const message = e instanceof Error ? e.message : 'An error occurred';
      const errorAlert = new Alert(`Error: ${message}`);
      errorAlert.render();
      
      // Log error
      this.error(e);
    }
  }
}
```

---

## Modal Lifecycle

```
1. Create modal instance (extends Modal)
2. Call render() - creates DOM structure
3. Modal shows automatically after render
4. User interacts with modal
5. Call hide() to hide or remove() to destroy
```

## Backdrop Behavior

- Modal creates a backdrop overlay (`modal-backdrop`)
- Clicking backdrop does NOT close modal by default
- Set `backdropClose = true` to enable backdrop closing

```typescript
class DismissibleModal extends Modal {
  constructor(C: Controller | null) {
    super(C);
    this.backdropClose = true; // Click backdrop to close
  }
}
```

## Best Practices

1. **Extend Modal for custom modals**: Create subclasses for reusable modals
2. **Clean up with remove()**: Always call `remove()` when done to clean up DOM
3. **Use Alert for simple messages**: Don't create a full modal for simple alerts
4. **Handle backdrop close**: Set `backdropClose = true` for dismissible modals
5. **Type your modals**: Use proper TypeScript types for modal content

## Related Documentation

- [View API](view.md) - Base View class
- [Dropdown API](dropdown.md) - Dropdown menus
- [Back Navigation API](back.md) - Back button handling
