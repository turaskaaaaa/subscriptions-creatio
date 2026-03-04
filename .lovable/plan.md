

## Plan: Remove Email Delivery Routing Map

**What:** Remove the "Email delivery routing" card (lines 139-183 in `src/pages/ContactDetail.tsx`) — the grouped banner that shows addresses like "aaron.personal@gmail.com → Newsletter". The per-subscription "DELIVERS TO" column in the subscriptions table already shows this info inline.

**File:** `src/pages/ContactDetail.tsx`
- Delete the entire IIFE block from line 138 (`{/* Primary email banner... */}`) through line 183 (closing `})()}`)

The subscription table's existing "DELIVERS TO (TARGET ADDRESS)" column will continue displaying the delivery address for each individual subscription row.

