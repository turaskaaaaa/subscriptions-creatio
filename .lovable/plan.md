

## Marketing Email Preview Page

### What we're building
A new page that shows a preview of what a marketing email looks like, focusing on the email footer with "Unsubscribe" and "Manage Preferences" links. This gives users a visual representation of the recipient experience.

### Plan

1. **Create `src/pages/EmailPreview.tsx`**
   - Full-page layout with AppSidebar + TopBar (consistent with other pages)
   - Renders a mock marketing email in a centered card/container:
     - **Email header**: Company logo + primary color banner
     - **Email body**: Placeholder marketing content (headline, paragraph, CTA button)
     - **Email footer**: The key part — shows:
       - Company footer text
       - "Unsubscribe" link (styled with primary color)
       - "Manage your preferences" link (conditionally shown based on `unsubscribePage.showManagePreferencesLink`)
       - Legal basis text (conditionally shown based on `showLegalBasis`)
   - All content pulls from `SettingsContext` (preferenceCenterConfig) so it reflects the user's current configuration

2. **Add route in `src/App.tsx`**
   - Add `/email-preview` route pointing to the new page

3. **Add sidebar nav item in `src/components/AppSidebar.tsx`**
   - Add an "Email Preview" entry to the navigation (e.g., using `Eye` or `FileText` icon)

### Technical details
- The email preview is purely visual/static (no interactivity beyond navigation)
- Uses existing `useSettings()` context for branding (logo, primary color, footer text, legal basis)
- Footer links are disabled/non-functional — they're just for visual preview
- Responsive: email container is max-width constrained and centered

