

## Plan: Add Confirmation Email Editor to Double Opt-In Settings

**Goal**: Add an editable confirmation email template section inside the double opt-in expanded settings panel.

### Changes

**1. SettingsContext (`src/contexts/SettingsContext.tsx`)**
- Add new state fields:
  - `doubleOptInEmailSubject: string` (default: `"Please confirm your subscription"`)
  - `doubleOptInEmailBody: string` (default: a standard confirmation template with placeholder text)
  - Their setters

**2. BulkEmailSettingsDialog (`src/components/BulkEmailSettingsDialog.tsx`)**
- Inside the `doubleOptInEnabled` expanded section, add a new **"Confirmation email"** subsection after the subscription type chips
- Include:
  - A `Mail` icon + "Confirmation email" label
  - **Subject** input field (single-line `Input`)
  - **Body** textarea with a multi-line editor for the email content
  - Helper text explaining available merge tags like `{{confirmation_link}}`, `{{contact_name}}`, `{{subscription_type}}`
  - A small preview hint or note that `{{confirmation_link}}` is required

This keeps the email template co-located with the double opt-in config, making it easy to customize the confirmation message contacts receive.

