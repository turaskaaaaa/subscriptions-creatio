

## Plan: Context-Specific Legal Basis Settings

**Problem:** Currently there is a single `defaultLegalBasis` setting. But the legal basis should differ depending on *how* consent was acquired -- e.g., "Legitimate interest" when an admin manually adds a contact vs. "Explicit consent" when a contact updates their own preferences via the preference center.

**Solution:** Replace the single `defaultLegalBasis` with two separate settings:

1. **"Manual creation" legal basis** -- applied when an admin creates/edits a contact manually (e.g., via New Contact dialog or CRM import)
2. **"Self-service" legal basis** -- applied when a contact opts in through the preference center or unsubscribe/feedback pages

### Changes

**`src/contexts/SettingsContext.tsx`**
- Replace `defaultLegalBasis` / `setDefaultLegalBasis` with:
  - `manualLegalBasis` / `setManualLegalBasis` (default: "Legitimate interest")
  - `selfServiceLegalBasis` / `setSelfServiceLegalBasis` (default: "Explicit consent")

**`src/components/BulkEmailSettingsDialog.tsx`**
- Replace the single "Default legal basis" radio group with two side-by-side sections:
  - "When contact is created/edited by admin" → selects `manualLegalBasis`
  - "When contact updates via preference center" → selects `selfServiceLegalBasis`
- Reuse the existing `LEGAL_BASIS_OPTIONS` list for both selectors.

**`src/pages/PreferenceCenter.tsx`**
- In each tab's Compliance card, show the currently configured `selfServiceLegalBasis` value as read-only info text (e.g., "Legal basis for self-service changes: Explicit consent") with a note pointing to Bulk Email Settings for editing. This keeps the setting in one place but gives visibility in the preference center config.

**`src/components/PreferenceCenterPreview.tsx`**
- Update the legal basis display text to use `selfServiceLegalBasis` instead of the old single value.

