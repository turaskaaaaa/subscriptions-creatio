

## Plan: Restyle Bulk Email Subscription tab to match Creatio UI

The screenshot shows Creatio's clean settings page style. The goal is to match that visual pattern for the existing subscription tab content.

### Key visual differences from screenshot

1. **Page-level layout**: Clean white background, no heavy card nesting — content sections use subtle borders and generous spacing
2. **Section headers**: Simple bold text with description, no colored icon circles
3. **Toggle rows**: Flat layout with label + description on left, toggle on right — no rounded card borders on every row
4. **Card widgets**: Thin border, white background, header row with title (left) and action link/button (right, blue text), content below with large emphasis text
5. **Tabs**: Underline-style tabs (already matching)
6. **Typography**: Cleaner, less dense — fewer uppercase labels, more natural casing

### Changes to `src/components/BulkEmailSettingsDialog.tsx`

- Remove colored icon circles (the `w-8 h-8 rounded-full bg-primary/10` wrappers) from toggle rows — use flat text-based layout instead
- Simplify toggle row cards: remove `bg-muted/20`, use lighter borders or no borders for simple settings, keep border only for grouped sections
- Reduce visual density: remove redundant description text, use consistent spacing
- Make section headings match Creatio style: simple bold text + muted description, no icon prefixes on headings
- Clean up the double opt-in expanded area to use a cleaner white card style instead of `bg-muted/30`
- Adjust suppression rules section to match the cleaner card pattern

This is a styling-only change — no functionality or state changes.

