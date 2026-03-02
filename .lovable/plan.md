

## Problem

The `BulkEmailSettingsDialog` component calls `useNavigate()` at the top level (line 42). When Visual Edits tries to render this component in isolation (outside of `BrowserRouter`), it crashes because `useNavigate` requires a Router context. The console error confirms this: "Function components cannot be given refs."

## Fix

**`src/components/BulkEmailSettingsDialog.tsx`**
- Remove the `useNavigate()` hook from the component
- Instead, accept an optional `onNavigate` callback prop, or use `window.location.href` for navigation which works without Router context
- Alternatively, wrap the navigate call in a try-catch or check if router context is available

The simplest and cleanest approach: replace `useNavigate()` with a safe wrapper that falls back gracefully when no Router context exists. Use a try-catch around the hook, or pass navigation as a prop from the parent.

**Recommended approach**: Add an optional `onNavigateToDoiEmail?: () => void` prop. The parent (Index page) passes the actual navigation function. Inside the dialog, the "Configure confirmation email" button calls this prop. This removes the direct router dependency from the dialog component.

