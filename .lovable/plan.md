

## Plan: Redesign Re-consent Action Bar

The current action bar has 4 buttons wrapping awkwardly across two rows with inconsistent border colors and spacing. We'll consolidate into a clean, contained toolbar.

### Changes

**`src/pages/ContactDetail.tsx` (lines 157-201)**

Replace the loose `flex-wrap` button group with a single bordered toolbar card:

- **Row 1:** "Send Re-consent Email" and "Copy Preference Center Link" side by side as ghost-style buttons with subtle hover states, no colored borders
- **Row 2:** A horizontal separator, then "Subscribe All Email" and "Unsubscribe All Email" as smaller, secondary-styled buttons aligned right
- Wrap everything in a `border border-border rounded-lg` container with consistent padding
- Use `Button` component variants (`outline`, `ghost`) instead of raw `<button>` elements with inline classes
- Add a small section label "Actions" above like the other sections use
- Remove the vertical divider pipe — use the container's structure for visual separation instead

This turns the scattered buttons into a tidy, card-like action panel matching the rest of the page's design language.

