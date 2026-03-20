

## Add Gear Icon to Open Subscription Settings Dialog on Subscription Center Page

### Summary
Add a gear icon button to the Subscription Center page header that opens the existing `BulkEmailSettingsDialog` (which already contains the Subscription tab). No new tabs or screens needed — just wire up the existing dialog.

### Changes

**`src/pages/PreferenceCenter.tsx`**
- Import `Settings` icon from lucide-react and `BulkEmailSettingsDialog` component
- Add a `useState<boolean>` for controlling the dialog open state
- Add a gear icon `Button` next to the "Save Changes" button in the page header
- Render `<BulkEmailSettingsDialog open={...} onOpenChange={...} />` in the component tree

### Result
Clicking the gear icon on the Subscription Center page opens the same Bulk Email Settings dialog (with its Subscription tab) that exists elsewhere, giving admins quick access to subscription defaults without leaving the page.

