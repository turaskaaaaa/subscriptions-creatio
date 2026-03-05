

## Plan: Add Configuration Sections for the 3 Preview Pages

Currently the left panel has General Settings, Subscription Types, and Compliance cards. The `UnsubscribePageSection` and `ManagePreferencesSection` components already exist but are **not rendered** on the page. The user wants to expose configuration controls for all three pages (Unsubscribe, Feedback/Questionnaire, Manage Preferences).

### Changes

**`src/pages/PreferenceCenter.tsx`** — Add the existing section components into the left column, between the Subscription Types card and the Compliance card:

1. Import `UnsubscribePageSection` and `ManagePreferencesSection`
2. Render `<UnsubscribePageSection />` after the Subscription Types card — this already has fields for page name, confirmation message, reason toggle, and editable reasons list
3. Render `<ManagePreferencesSection />` after the Unsubscribe section — this already has fields for page name, content categories toggle, and editable category list
4. Remove the inline mini-previews from both section components (since the live preview sidebar already covers that)

**`src/components/UnsubscribePageSection.tsx`** — Remove the mini preview block (lines 102-123) to avoid duplication with the sidebar live preview.

**`src/components/ManagePreferencesSection.tsx`** — Remove the mini preview block (lines 95-134) to avoid duplication with the sidebar live preview.

No context or data model changes needed — everything is already wired up in `SettingsContext`.

### Result

The left column will show, in order:
1. General Settings (title, logo, welcome, footer)
2. Subscription Types (visibility toggles)
3. Unsubscribe Page (page name, message, reasons)
4. Manage Preferences Page (page name, content categories)
5. Compliance (legal basis)

The right column continues to show the 3-tab live preview that updates in real time.

