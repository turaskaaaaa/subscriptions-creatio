

## Plan: Reorganize Settings to Match Live Preview Tabs

**Problem:** The left column has a flat list of cards (General Settings, Subscription Types, Unsubscribe Page, Manage Preferences, Compliance) with no clear mapping to the 3-tab live preview (Unsub / Feedback / Prefs). It's confusing which settings affect which preview tab.

**Solution:** Replace the flat card layout in the left column with a **tabbed layout matching the preview's 3 tabs**, so each config tab directly corresponds to its preview tab. The live preview should also sync its active tab to match whichever config tab is selected.

### Left Column Tab Structure

**Tab 1 — "Unsubscribe Page"**
- Page Name, Confirmation Message (from `UnsubscribePageSection`)
- Logo URL, Footer Text (shared general settings that appear on this preview)

**Tab 2 — "Feedback Page"**
- Ask Reason toggle + editable reasons list (currently in `UnsubscribePageSection`)
- These are the fields that feed the Feedback preview tab

**Tab 3 — "Manage Preferences"**
- Page Title, Welcome Message (from General Settings — these show on the Prefs preview)
- Subscription Types visibility toggles (the table that's currently a standalone card)
- Content Categories toggle + list (from `ManagePreferencesSection`)
- Compliance / Legal Basis toggle

### Preview Sync
- Add a shared state (e.g. `activePreviewTab`) that syncs the left tabs with the right preview tabs, so switching a config tab auto-switches the preview to show the corresponding page.

### Files to modify
- **`src/pages/PreferenceCenter.tsx`** — Replace the flat card layout with 3 inner tabs (Unsubscribe, Feedback, Preferences). Move the relevant fields into each tab. Add state to sync with preview.
- **`src/components/PreferenceCenterPreview.tsx`** — Accept an `activeTab` prop to control which preview tab is shown, instead of having independent tabs.
- **`src/components/UnsubscribePageSection.tsx`** — Split into two: unsubscribe fields (page name, message) and feedback fields (reasons). Or inline directly into the parent page.
- **`src/components/ManagePreferencesSection.tsx`** — Inline into the Preferences tab of the parent, or keep as component but render inside the correct tab.

### Outer channel tabs (Email/WhatsApp/SMS)
Keep the outer channel tabs as-is. Within each channel tab, the inner 3-tab structure replaces the current flat card list.

