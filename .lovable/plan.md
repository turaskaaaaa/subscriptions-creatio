

## Add Primary Color Picker to Preference Center

The `primaryColor` field already exists in `SettingsContext` and is consumed by the preview component. We just need to add a UI control.

### Changes

**`src/pages/PreferenceCenter.tsx`**

Add an "Appearance" card (or a color input field) in each of the three sub-tabs (or better, as a shared section outside the sub-tabs so it applies globally). The simplest approach: add a color picker input inside the **Unsubscribe** tab's first card (since logo/footer are already there as "shared" settings), or create a small shared "Appearance" section above the sub-tabs.

Best placement: Add a small "Appearance" card **above the sub-tabs** (after the channel tabs header, before the unsubscribe/feedback/preferences tabs) so it's always visible regardless of which sub-tab is active. This card will contain:

- A **color input** (`<input type="color">`) paired with a text input showing the current HSL value
- Label: "Primary Color" with description "Used for buttons, links, and header background"
- Convert between hex (for the native color picker) and HSL (stored in config) on change

The conversion logic:
- HSL string like `"214 80% 52%"` → hex for the `<input type="color">` display
- Hex from color picker → HSL string to store back via `updatePreferenceCenterField("primaryColor", hslString)`

Helper functions `hslToHex` and `hexToHsl` will be defined inline in the component.

