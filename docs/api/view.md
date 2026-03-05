# View API

The View class is the base class for all views in the Keira MVC pattern, providing DOM manipulation utilities and rendering capabilities.

## Import

```typescript
import { View, ce, type ExtendedElement } from 'keira/view';
// or
import View, { ce, type ExtendedElement } from 'keira/view';
```

## Types

### ExtendedElement

Extended HTMLElement with custom chainable methods:

```typescript
export interface ExtendedElement extends HTMLElement {
  append(child: Node): ExtendedElement;
  text(text: string): ExtendedElement;
  html(html: string): ExtendedElement;
}
```

## ce Function

Helper function for creating DOM elements with optional className and attributes.

### Signatures

```typescript
// With className first
export function ce(tag: string, className?: string, attrs?: ElementAttributes): ExtendedElement;

// With attributes first
export function ce(tag: string, attrs?: ElementAttributes, className?: string): ExtendedElement;

interface ElementAttributes {
  [key: string]: string | number | boolean;
}
```

### Parameters

- `tag: string` - HTML tag name
- `className?: string` - CSS class name (optional)
- `attrs?: ElementAttributes` - HTML attributes object (optional)

### Returns

`ExtendedElement` - The created element with chainable methods

### Examples

```typescript
import { ce, type ExtendedElement } from 'keira/view';

// Create element with class
const div: ExtendedElement = ce('div', 'container');

// Create element with attributes
const input = ce('input', { type: 'text', placeholder: 'Enter name' });

// Create element with both class and attributes
const button = ce('button', 'btn', { disabled: true, id: 'submit' });

// Chain methods
const heading = ce('h1', 'title')
  .text('Hello World')
  .html('<strong>Bold</strong>');

// Append child elements
const container = ce('div', 'wrapper');
const child = ce('span');
container.append(child);
```

## View Class

### Properties

```typescript
export default class View {
  protected C: Controller | null;  // Reference to controller
  container: ExtendedElement;       // Root DOM element
}
```

### Constructor

```typescript
constructor(C: Controller | null)
```

**Parameters:**
- `C: Controller | null` - Reference to the parent controller

**Example:**

```typescript
import View from 'keira/view';
import type { Controller } from 'keira';

class MyView extends View {
  constructor(C: Controller | null) {
    super(C);
  }
}
```

### Methods

#### make(): Promise<void>

Override this method to build the view's DOM structure. Called by `render()`.

**Example:**

```typescript
class MyView extends View {
  override async make(): Promise<void> {
    const heading = ce('h1', 'title');
    heading.text('My View');
    
    const paragraph = ce('p', 'content');
    paragraph.text('View content here');
    
    this.container.append(heading);
    this.container.append(paragraph);
  }
}
```

#### render(): Promise<ExtendedElement>

Renders the view by calling `make()` and returning the container.

**Returns:** `Promise<ExtendedElement>` - The rendered container element

**Example:**

```typescript
const view = new MyView(controller);
view.render().then((container) => {
  document.body.append(container);
});
```

#### toString(): string

Returns the inner HTML of the container.

**Returns:** `string` - The container's innerHTML

**Example:**

```typescript
const html = view.toString();
console.log(html); // "<h1>My View</h1><p>View content here</p>"
```

#### remove(): void

Removes the container from the DOM.

**Example:**

```typescript
// Clean up view
view.remove();
```

## Complete Example

```typescript
import { View, ce, type ExtendedElement } from 'keira/view';
import { Controller } from 'keira';

interface User {
  id: number;
  name: string;
  email: string;
}

class UserView extends View {
  private user: User;

  constructor(C: Controller | null, user: User) {
    super(C);
    this.user = user;
  }

  override async make(): Promise<void> {
    // Create card container
    const card = ce('div', 'card');
    this.container.append(card);

    // Header
    const header = ce('div', 'card-header');
    header.text(`User: ${this.user.name}`);
    card.append(header);

    // Body
    const body = ce('div', 'card-body');
    card.append(body);

    // Email
    const email = ce('p', 'email');
    email.text(`Email: ${this.user.email}`);
    body.append(email);

    // Actions
    const actions = ce('div', 'card-actions');
    body.append(actions);

    // Edit button
    const editBtn = ce('button', 'btn btn-edit');
    editBtn.text('Edit');
    editBtn.onclick = () => this.handleEdit();
    actions.append(editBtn);

    // Delete button
    const deleteBtn = ce('button', 'btn btn-delete');
    deleteBtn.text('Delete');
    deleteBtn.onclick = () => this.handleDelete();
    actions.append(deleteBtn);
  }

  private handleEdit(): void {
    console.log('Edit user', this.user.id);
  }

  private handleDelete(): void {
    this.remove();
    console.log('Deleted user', this.user.id);
  }
}

// Usage
const user: User = { id: 1, name: 'John Doe', email: 'john@example.com' };
const userView = new UserView(null, user);
userView.render().then((container) => {
  document.body.append(container);
});
```

## Best Practices

1. **Override make()**: Put all DOM creation logic in the `make()` method
2. **Use ce()**: Always use the `ce()` helper for creating elements
3. **Type your elements**: Use `ExtendedElement` for proper typing
4. **Clean up resources**: Call `remove()` when the view is no longer needed
5. **Keep views focused**: A view should represent a single UI component

## Related Documentation

- [Controller API](controller.md) - Controller base class
- [Form API](form.md) - Form component
- [Modal API](modal.md) - Modal dialogs
- [Dropdown API](dropdown.md) - Dropdown menus
