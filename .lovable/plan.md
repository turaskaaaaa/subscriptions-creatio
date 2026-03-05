

## Preference Center Configuration Page

A new admin-facing page where CRM administrators can configure the Preference Center settings that contacts will see when managing their subscriptions.

### What it includes

1. **New route `/preference-center`** added to the router and sidebar navigation (between "Contacts" and "Campaigns")

2. **Page sections:**
   - **General Settings** -- Preference center name/title, company logo URL, welcome message text, footer text
   - **Subscription Types** -- Table listing all available subscription types (e.g. Newsletter, Promotions, Information material) with toggles to show/hide each in the preference center, grouped by channel (Email / SMS)
   - **Appearance** -- Primary color picker, toggle for dark/light mode support
   - **Compliance** -- Toggle to require re-confirmation on re-subscribe, toggle to show legal basis info to contacts, custom privacy policy URL
   - **Preview panel** -- A live card preview on the right side showing how the preference center will look to contacts, updating as the admin changes settings

3. **State management** -- Settings stored in a new `PreferenceCenterContext` (or extend existing `SettingsContext`) so values persist across the app session. The "Copy Preference Center Link" button on contact detail pages already generates URLs pointing to this.

### Files to create/modify

- **Create** `src/pages/PreferenceCenter.tsx` -- Main config page with form sections
- **Create** `src/components/PreferenceCenterPreview.tsx` -- Live preview card component
- **Modify** `src/App.tsx` -- Add `/preference-center` route
- **Modify** `src/components/AppSidebar.tsx` -- Add nav item with `Settings2` or `SlidersHorizontal` icon
- **Modify** `src/contexts/SettingsContext.tsx` -- Add preference center config fields (title, welcome message, visible subscription types, colors, compliance toggles)

