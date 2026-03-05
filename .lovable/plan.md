

## Plan: Split Live Preview into 3 Separate Page Previews

The user wants the live preview area to show 3 distinct pages instead of one combined view:

1. **Unsubscribe Page** — One-click unsubscribe button, simple and direct
2. **Questionnaire Page** — Short survey asking why the user decided to unsubscribe (using the existing reasons config)
3. **Manage Preferences Page** — Subscription toggles, content categories, save button

### Implementation

**1. Replace `PreferenceCenterPreview.tsx`** with a tabbed/stepped preview showing all 3 pages:

- **Tab 1 — "Unsubscribe"**: Shows the page title, a brief message, and a single prominent "Unsubscribe" button. Clean, one-click experience.
- **Tab 2 — "Feedback"**: Shows a questionnaire with radio buttons for unsubscribe reasons (pulled from `config.unsubscribePage.reasons`), plus a "Submit" button. This is the "why are you leaving?" step.
- **Tab 3 — "Manage Preferences"**: Shows email subscription toggles (from visible subscription types), content categories (from `config.managePreferencesPage`), and a "Save Preferences" button. This is the alternative to unsubscribing — the user can fine-tune what they receive.

Each tab will be rendered as a mini preview card within the sticky sidebar, using small `Tabs` to switch between the 3 views.

**2. Update `PreferenceCenter.tsx`**: No structural changes needed — the preview component swap handles everything. The existing config sections (UnsubscribePageSection, ManagePreferencesSection) already provide the data.

### Files to modify
- `src/components/PreferenceCenterPreview.tsx` — Rewrite to show 3 tabbed preview pages

