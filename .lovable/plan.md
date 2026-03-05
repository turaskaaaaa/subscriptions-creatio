

## Add sample email indicator to live preview

Add a placeholder email address (e.g. `john@example.com`) near the top of each preview tab so users can see which contact's email is affected.

### Changes

**`src/components/PreferenceCenterPreview.tsx`**

Add a small email indicator below the Header in all three tabs (unsubscribe, feedback, preferences). It will show a sample/placeholder email styled as a muted pill or text line, like:

```
📧 john@example.com
```

Specifically:
- Below each `<Header />`, add a small centered line showing a sample email: `<div className="text-center py-2 bg-muted/20 border-b"><span className="text-xs text-muted-foreground">john@example.com</span></div>`
- This appears in all three tabs (unsubscribe, feedback, preferences) to indicate which email address the action applies to
- Uses a hardcoded placeholder since this is a preview/demo component

