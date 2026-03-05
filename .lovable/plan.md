

## Move Color Picker Into Each Page Section (Under Logo URL)

Currently the primary color picker sits in a shared "Appearance" card above the sub-tabs. The user wants it placed directly inside each page's config card, right below the "Logo URL" field.

### Changes — `src/pages/PreferenceCenter.tsx`

1. **Remove** the standalone Appearance `<Card>` (lines 143-161) that sits above the sub-tabs.

2. **Add** the color picker field inside each of the three sub-tab cards, positioned right after the Logo URL input:

   - **Unsubscribe tab** (line ~195, after Logo URL input): Insert a "Primary Color" field with the same `<input type="color">` + HSL label.
   - **Feedback tab** (line ~243, inside the Feedback Page card): Add Logo URL + Primary Color fields (currently feedback has no logo field — add both).
   - **Preferences tab** (line ~304, inside General Settings card): Add Logo URL + Primary Color fields after Welcome Message.

Each insertion is the same small block:
```tsx
<div className="space-y-2">
  <Label>Primary Color</Label>
  <div className="flex items-center gap-2">
    <input type="color" value={hslToHex(config.primaryColor)} onChange={e => updatePreferenceCenterField("primaryColor", hexToHsl(e.target.value))} className="w-9 h-9 rounded-md border border-input cursor-pointer p-0.5" />
    <span className="text-xs text-muted-foreground font-mono">{config.primaryColor}</span>
  </div>
</div>
```

For the Feedback and Preferences tabs, also add the Logo URL field if not already present, so it mirrors the Unsubscribe tab structure.

