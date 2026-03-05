

## Split Preference Center into Three Channel Sections

Currently the Preference Center has subscription types with only "Email" and "SMS" channels. The user wants three distinct channel sections: **Email**, **WhatsApp**, and **SMS**.

### Changes

1. **`src/contexts/SettingsContext.tsx`** -- Extend the `SubscriptionTypeConfig.channel` type to `"Email" | "WhatsApp" | "SMS"`. Add WhatsApp subscription types to the default config (e.g. "Order updates", "Promotional messages").

2. **`src/pages/PreferenceCenter.tsx`** -- In the Subscription Types table, add a visual grouping or channel badge that now includes "WhatsApp". No structural change needed since it already renders all subscription types dynamically.

3. **`src/components/PreferenceCenterPreview.tsx`** -- Add a third section for WhatsApp subscriptions (with a phone/message icon), following the same pattern as the existing Email and SMS sections. The preview will show three clearly separated channel groups.

