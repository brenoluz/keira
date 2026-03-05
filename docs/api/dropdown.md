# Dropdown API

The Dropdown component provides dropdown menu functionality with button triggers.

## Import

```typescript
import Dropdown from 'keira/dropdown';
// or
import { default as Dropdown } from 'keira/dropdown';
```

## Class Definition

```typescript
export default class Dropdown extends View {
  menu: Element | null;
  menu_show: boolean;
  
  constructor();
  set_button(button: Element): void;
  set_label(label: string): void;
  make_button(text?: string, cls?: string): HTMLButtonElement;
  make_and_set_button(text?: string, cls?: string): HTMLButtonElement;
  make_item(label?: string): HTMLButtonElement;
  make_and_add_item(label?: string): HTMLButtonElement;
  add(item: Element): void;
  toggle(): void;
  show(): void;
  hide(): void;
  remove(): void;
}
```

## Constructor

```typescript
constructor()
```

Creates a new dropdown instance.

**Example:**

```typescript
import Dropdown from 'keira/dropdown';

const dropdown = new Dropdown();
```

## Properties

| Property | Type | Description |
|----------|------|-------------|
| `menu` | `Element \| null` | The dropdown menu element |
| `menu_show` | `boolean` | Whether menu is currently shown |

## Methods

### set_button(button: Element): void

Sets a custom button element as the dropdown trigger.

```typescript
import Dropdown from 'keira/dropdown';
import { ce } from 'keira/view';

const dropdown = new Dropdown();
const customButton = ce('button', 'btn btn-custom');
customButton.text('My Button');
dropdown.set_button(customButton);
```

### set_label(label: string): void

Sets the label for the dropdown button.

```typescript
dropdown.set_label('Actions');
```

### make_button(text?: string, cls?: string): HTMLButtonElement

Creates a button element for the dropdown trigger.

**Parameters:**
- `text?: string` - Button text (optional)
- `cls?: string` - Additional CSS class (optional)

**Returns:** `HTMLButtonElement` - The created button

```typescript
const button = dropdown.make_button('Click Me', 'btn-primary');
dropdown.set_button(button);
```

### make_and_set_button(text?: string, cls?: string): HTMLButtonElement

Creates a button and sets it as the dropdown trigger in one step.

**Returns:** `HTMLButtonElement` - The created and set button

```typescript
const button = dropdown.make_and_set_button('Actions', 'btn-secondary');
```

### make_item(label?: string): HTMLButtonElement

Creates a menu item (button element).

**Parameters:**
- `label?: string` - Item label text

**Returns:** `HTMLButtonElement` - The created menu item

```typescript
const editItem = dropdown.make_item('Edit');
editItem.onclick = () => {
  console.log('Edit clicked');
};
```

### make_and_add_item(label?: string): HTMLButtonElement

Creates a menu item and adds it to the dropdown menu.

**Returns:** `HTMLButtonElement` - The created and added menu item

```typescript
const editItem = dropdown.make_and_add_item('Edit');
editItem.onclick = () => console.log('Edit');

const deleteItem = dropdown.make_and_add_item('Delete');
deleteItem.onclick = () => console.log('Delete');
```

### add(item: Element): void

Adds an existing element to the dropdown menu.

**Parameters:**
- `item: Element` - The element to add

```typescript
const customItem = document.createElement('button');
customItem.innerText = 'Custom';
dropdown.add(customItem);
```

### toggle(): void

Toggles the dropdown menu visibility.

```typescript
dropdown.toggle();
```

### show(): void

Shows the dropdown menu.

```typescript
dropdown.show();
```

### hide(): void

Hides the dropdown menu.

```typescript
dropdown.hide();
```

### remove(): void

Removes the dropdown and its backdrop from the DOM.

```typescript
dropdown.remove();
```

## Complete Usage Example

```typescript
import Dropdown from 'keira/dropdown';
import { ce } from 'keira/view';

// Create dropdown
const actionsDropdown = new Dropdown();

// Create and set button
const button = actionsDropdown.make_and_set_button('Actions', 'btn-primary');

// Add menu items
const editItem = actionsDropdown.make_and_add_item('Edit');
editItem.onclick = () => {
  console.log('Edit action');
  // Navigate to edit page or open edit modal
};

const duplicateItem = actionsDropdown.make_and_add_item('Duplicate');
duplicateItem.onclick = () => {
  console.log('Duplicate action');
  // Duplicate current item
};

// Add divider (custom element)
const divider = document.createElement('div');
divider.className = 'dropdown-divider';
actionsDropdown.add(divider);

const deleteItem = actionsDropdown.make_and_add_item('Delete');
deleteItem.className = 'dropdown-item text-danger';
deleteItem.onclick = () => {
  console.log('Delete action');
  // Show confirmation and delete
};

// Render dropdown
async function render(): Promise<void> {
  await actionsDropdown.make();
  const container = await actionsDropdown.render();
  document.body.append(container);
}

render();
```

## Dynamic Menu Example

```typescript
import Dropdown from 'keira/dropdown';

class UserMenuDropdown {
  private dropdown: Dropdown;
  
  constructor() {
    this.dropdown = new Dropdown();
    this.dropdown.make_and_set_button('User Menu', 'btn-outline-secondary');
  }
  
  setItems(items: Array<{ label: string; action: () => void }>): void {
    // Clear existing items by creating new dropdown
    this.dropdown = new Dropdown();
    this.dropdown.make_and_set_button('User Menu', 'btn-outline-secondary');
    
    for (const item of items) {
      const menuItem = this.dropdown.make_and_add_item(item.label);
      menuItem.onclick = () => {
        item.action();
        this.dropdown.hide();
      };
    }
  }
  
  render(): Promise<void> {
    return this.dropdown.make().then(() => {
      return this.dropdown.render().then((container) => {
        document.body.append(container);
      });
    });
  }
}

// Usage
const userMenu = new UserMenuDropdown();
userMenu.setItems([
  { label: 'Profile', action: () => console.log('Go to profile') },
  { label: 'Settings', action: () => console.log('Open settings') },
  { label: 'Logout', action: () => console.log('Logout user') }
]);
userMenu.render();
```

## Programmatic Control Example

```typescript
import Dropdown from 'keira/dropdown';

const dropdown = new Dropdown();
dropdown.make_and_set_button('Menu');
dropdown.make_and_add_item('Item 1');
dropdown.make_and_add_item('Item 2');

// Show dropdown programmatically
setTimeout(() => {
  dropdown.show();
}, 1000);

// Hide after 3 seconds
setTimeout(() => {
  dropdown.hide();
}, 4000);

// Toggle on external trigger
const triggerBtn = document.getElementById('trigger');
if (triggerBtn) {
  triggerBtn.onclick = () => dropdown.toggle();
}
```

## Styling with Bootstrap Classes

Dropdown works well with Bootstrap CSS classes:

```typescript
import Dropdown from 'keira/dropdown';

const dropdown = new Dropdown();

// Primary button
dropdown.make_and_set_button('Primary', 'btn btn-primary');

// Add items with icons (if using icon library)
const item1 = dropdown.make_and_add_item('Edit');
item1.classList.add('dropdown-item');

const item2 = dropdown.make_and_add_item('Delete');
item2.classList.add('dropdown-item', 'text-danger');

// The dropdown menu gets 'dropdown-menu' class automatically
```

## Best Practices

1. **Hide menu after selection**: Call `hide()` in item click handlers
2. **Use meaningful labels**: Button and item text should be clear
3. **Clean up on remove**: Call `remove()` when dropdown is no longer needed
4. **Add click handlers**: Always attach onclick to menu items
5. **Use CSS classes**: Apply Bootstrap or custom classes for styling

## Related Documentation

- [View API](view.md) - Base View class
- [Modal API](modal.md) - Modal dialogs
- [Event System API](event.md) - Event handling
