# Event System API

Keira provides a pub/sub event emitter for decoupled communication between components.

## Import

```typescript
import Event from 'keira/event';
// or
import { default as Event } from 'keira/event';
```

## Type Definitions

```typescript
type ListenerFunction = (data: unknown) => Promise<unknown>;

interface ListenerMap {
  [name: string]: ListenerFunction[];
}
```

## Event Object

The Event system is a singleton object with the following methods:

```typescript
export default new class Event {
  listeners: ListenerMap;
  
  emit(name: string, data?: unknown): Promise<unknown[]>;
  on(name: string, func: ListenerFunction): void;
  remove(name: string, func: ListenerFunction): void;
  remove_all(name: string): void;
}
```

## Methods

### on(name: string, func: ListenerFunction): void

Subscribes a listener function to an event.

**Parameters:**
- `name: string` - The event name
- `func: ListenerFunction` - Callback function that receives event data

**Example:**

```typescript
import Event from 'keira/event';

// Subscribe to user login event
Event.on('user:login', (data: unknown) => {
  console.log('User logged in:', data);
  return Promise.resolve();
});

// Subscribe with typed data
interface LoginData {
  userId: number;
  username: string;
}

Event.on('user:login', (data: unknown) => {
  if (typeof data === 'object' && data !== null && 'userId' in data) {
    const loginData = data as LoginData;
    console.log(`User ${loginData.username} logged in`);
  }
  return Promise.resolve();
});
```

### emit(name: string, data?: unknown): Promise<unknown[]>

Emits an event to all subscribed listeners.

**Parameters:**
- `name: string` - The event name
- `data?: unknown` - Optional data to pass to listeners

**Returns:** `Promise<unknown[]>` - Array of results from all listeners

**Example:**

```typescript
import Event from 'keira/event';

// Emit with data
Event.emit('user:login', { userId: 123, username: 'john' }).then((results) => {
  console.log(`Event handled by ${results.length} listeners`);
});

// Emit without data
Event.emit('app:ready').then((results) => {
  console.log('All ready handlers completed');
});

// Emit with error handling
Event.emit('data:load', { id: 42 }).catch((error) => {
  console.error('Event handler error:', error);
});
```

### remove(name: string, func: ListenerFunction): void

Removes a specific listener from an event.

**Parameters:**
- `name: string` - The event name
- `func: ListenerFunction` - The listener function to remove

**Example:**

```typescript
import Event from 'keira/event';

// Create a named listener function
function handleLogin(data: unknown): Promise<unknown> {
  console.log('Login:', data);
  return Promise.resolve();
}

// Subscribe
Event.on('user:login', handleLogin);

// Later, remove the specific listener
Event.remove('user:login', handleLogin);
```

### remove_all(name: string): void

Removes all listeners from an event.

**Parameters:**
- `name: string` - The event name

**Example:**

```typescript
import Event from 'keira/event';

// Remove all login listeners
Event.remove_all('user:login');

// Useful for cleanup
Event.remove_all('app:*'); // Note: This won't match wildcards, use exact names
```

## Real-World Examples

### User Authentication Events

```typescript
import Event from 'keira/event';

// Define event types
interface UserLoginEvent {
  userId: number;
  username: string;
  timestamp: Date;
}

interface UserLogoutEvent {
  userId: number;
  reason: string;
}

// Auth service emits events
class AuthService {
  login(username: string, password: string): Promise<void> {
    // ... authentication logic
    return fetch('/api/login', { /* ... */ })
      .then((response) => response.json())
      .then((user) => {
        Event.emit('user:login', {
          userId: user.id,
          username: user.username,
          timestamp: new Date()
        } as UserLoginEvent);
      });
  }
  
  logout(reason: string): void {
    const userId = this.getCurrentUserId();
    Event.emit('user:logout', { userId, reason } as UserLogoutEvent);
  }
}

// Components subscribe to events
class UserProfile {
  constructor() {
    Event.on('user:login', (data: unknown) => {
      if (typeof data === 'object' && data !== null && 'userId' in data) {
        this.loadUserData((data as UserLoginEvent).userId);
      }
      return Promise.resolve();
    });
    
    Event.on('user:logout', () => {
      this.clearUserData();
      return Promise.resolve();
    });
  }
  
  private loadUserData(userId: number): void {
    // Load user data
  }
  
  private clearUserData(): void {
    // Clear user data
  }
}
```

### Application State Events

```typescript
import Event from 'keira/event';

// App initialization
Event.on('app:ready', () => {
  console.log('Application ready');
  return Promise.resolve();
});

Event.on('app:loading', (data: unknown) => {
  const message = typeof data === 'string' ? data : 'Loading...';
  showLoadingIndicator(message);
  return Promise.resolve();
});

Event.on('app:error', (data: unknown) => {
  const error = data instanceof Error ? data : new Error(String(data));
  showErrorNotification(error);
  return Promise.resolve();
});

// Emit during app lifecycle
async function initializeApp(): Promise<void> {
  Event.emit('app:loading', 'Initializing...');
  
  try {
    await loadConfig();
    await loadUser();
    await Event.emit('app:ready');
  } catch (e) {
    Event.emit('app:error', e);
  }
}
```

### Data Synchronization Events

```typescript
import Event from 'keira/event';

interface DataChangeEvent {
  entity: string;
  action: 'create' | 'update' | 'delete';
  id: number;
  data?: unknown;
}

// Data service
class DataService {
  async createEntity(entity: string, data: unknown): Promise<number> {
    const id = await this.api.post(entity, data);
    Event.emit('data:change', {
      entity,
      action: 'create',
      id,
      data
    } as DataChangeEvent);
    return id;
  }
  
  async updateEntity(entity: string, id: number, data: unknown): Promise<void> {
    await this.api.put(entity, id, data);
    Event.emit('data:change', {
      entity,
      action: 'update',
      id,
      data
    } as DataChangeEvent);
  }
}

// Cache listener
Event.on('data:change', (data: unknown) => {
  if (typeof data === 'object' && data !== null && 'entity' in data) {
    const event = data as DataChangeEvent;
    invalidateCache(event.entity, event.id);
  }
  return Promise.resolve();
});

// UI listener
Event.on('data:change', (data: unknown) => {
  if (typeof data === 'object' && data !== null && 'entity' in data) {
    const event = data as DataChangeEvent;
    refreshUI(event.entity);
  }
  return Promise.resolve();
});
```

## Event Naming Conventions

Use colon-separated namespacing for events:

```typescript
// Entity-based
'user:login'
'user:logout'
'user:update'

// Action-based
'app:ready'
'app:error'
'app:loading'

// Data-based
'data:change'
'data:sync'
'data:refresh'

// Component-based
'modal:open'
'modal:close'
'form:submit'
'form:valid'
```

## Multiple Listeners

Multiple listeners can subscribe to the same event:

```typescript
import Event from 'keira/event';

// First listener
Event.on('user:login', (data: unknown) => {
  console.log('Logger: User logged in');
  return Promise.resolve();
});

// Second listener
Event.on('user:login', (data: unknown) => {
  console.log('Analytics: Tracking login');
  return Promise.resolve();
});

// Third listener
Event.on('user:login', (data: unknown) => {
  console.log('UI: Updating user menu');
  return Promise.resolve();
});

// All three will be called when emitted
Event.emit('user:login', { userId: 1 });
```

## Async Event Handling

All event handlers must return promises:

```typescript
import Event from 'keira/event';

// Async handler
Event.on('data:load', async (data: unknown) => {
  await fetch('/api/data');
  await updateUI();
  return Promise.resolve();
});

// Handler with async operations
Event.on('user:save', (data: unknown) => {
  return fetch('/api/user', { method: 'POST', body: JSON.stringify(data) })
    .then((response) => response.json())
    .then((result) => {
      console.log('User saved:', result);
      return result;
    });
});

// Wait for all handlers to complete
Event.emit('user:save', userData).then((results) => {
  console.log('All handlers completed:', results);
});
```

## Best Practices

1. **Use descriptive event names**: Follow the `namespace:action` convention
2. **Type your event data**: Use TypeScript interfaces for event payloads
3. **Handle errors in listeners**: Catch errors to prevent breaking other listeners
4. **Clean up listeners**: Use `remove()` when components are destroyed
5. **Return promises**: All handlers should return `Promise<unknown>`
6. **Use type guards**: Check data types in handlers since data is `unknown`

## Common Patterns

### Event Bus Pattern

```typescript
import Event from 'keira/event';

// Central event bus for the application
const EventBus = Event;

// Any component can emit
EventBus.emit('navigation:change', { path: '/home' });

// Any component can listen
EventBus.on('navigation:change', (data: unknown) => {
  updateActiveNavLink(data as { path: string });
  return Promise.resolve();
});
```

### Request-Response Pattern

```typescript
import Event from 'keira/event';

// Request handler
Event.on('user:get', (data: unknown) => {
  const userId = data as number;
  return fetch(`/api/user/${userId}`).then((r) => r.json());
});

// Requester
Event.emit('user:get', 123).then((results) => {
  const user = results[0]; // First handler's result
  console.log('User:', user);
});
```

## Related Documentation

- [Back Navigation API](back.md) - Back button handling
- [Modal API](modal.md) - Modal dialogs
- [Controller API](controller.md) - Controller base class
