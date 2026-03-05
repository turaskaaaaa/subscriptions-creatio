import { createContext, useContext, useState, ReactNode } from "react";
import type { LegalBasis } from "@/data/contactsData";

export interface SubscriptionTypeConfig {
  name: string;
  channel: "Email" | "WhatsApp" | "SMS";
  visibleInPreferenceCenter: boolean;
}

export interface UnsubscribePageConfig {
  pageName: string;
  confirmationMessage: string;
  showReasonSelection: boolean;
  reasons: string[];
}

export interface ManagePreferencesPageConfig {
  pageName: string;
  showContentCategories: boolean;
  contentCategories: string[];
}

export interface PreferenceCenterConfig {
  title: string;
  logoUrl: string;
  welcomeMessage: string;
  footerText: string;
  subscriptionTypes: SubscriptionTypeConfig[];
  primaryColor: string;
  darkModeEnabled: boolean;
  requireReconfirmation: boolean;
  showLegalBasis: boolean;
  privacyPolicyUrl: string;
  emailPageName: string;
  unsubscribePage: UnsubscribePageConfig;
  managePreferencesPage: ManagePreferencesPageConfig;
}

interface SettingsContextType {
  // Marketing consent
  marketingConsentDefault: boolean;
  setMarketingConsentDefault: (value: boolean) => void;

  // Double opt-in
  doubleOptInEnabled: boolean;
  setDoubleOptInEnabled: (value: boolean) => void;
  doubleOptInExpiryHours: number;
  setDoubleOptInExpiryHours: (value: number) => void;
  doubleOptInMaxResends: number;
  setDoubleOptInMaxResends: (value: number) => void;
  doubleOptInSubscriptionTypes: string[];
  setDoubleOptInSubscriptionTypes: (value: string[]) => void;

  // Unsubscribe
  unsubscribeLinkEnabled: boolean;
  setUnsubscribeLinkEnabled: (value: boolean) => void;

  // Re-subscription
  reSubscriptionEnabled: boolean;
  setReSubscriptionEnabled: (value: boolean) => void;

  // Legal basis
  defaultLegalBasis: LegalBasis;
  setDefaultLegalBasis: (value: LegalBasis) => void;

  // Suppression rules
  softBounceThreshold: number;
  setSoftBounceThreshold: (value: number) => void;
  spamComplaintThreshold: number;
  setSpamComplaintThreshold: (value: number) => void;
  autoSuppressHardBounce: boolean;
  setAutoSuppressHardBounce: (value: boolean) => void;
  autoSuppressSpamComplaint: boolean;
  setAutoSuppressSpamComplaint: (value: boolean) => void;

  // Preference Center
  preferenceCenterConfig: PreferenceCenterConfig;
  setPreferenceCenterConfig: (value: PreferenceCenterConfig) => void;
  updatePreferenceCenterField: <K extends keyof PreferenceCenterConfig>(key: K, value: PreferenceCenterConfig[K]) => void;
}

const defaultPreferenceCenterConfig: PreferenceCenterConfig = {
  title: "Manage Your Preferences",
  logoUrl: "",
  welcomeMessage: "Choose which communications you'd like to receive from us.",
  footerText: "© 2026 Your Company. All rights reserved.",
  subscriptionTypes: [
    { name: "Newsletter", channel: "Email", visibleInPreferenceCenter: true },
    { name: "Promotions", channel: "Email", visibleInPreferenceCenter: true },
    { name: "Information material", channel: "Email", visibleInPreferenceCenter: true },
    { name: "Order updates", channel: "WhatsApp", visibleInPreferenceCenter: true },
    { name: "Promotional messages", channel: "WhatsApp", visibleInPreferenceCenter: true },
    { name: "Support notifications", channel: "WhatsApp", visibleInPreferenceCenter: true },
    { name: "Security alerts", channel: "SMS", visibleInPreferenceCenter: true },
    { name: "Account alerts", channel: "SMS", visibleInPreferenceCenter: true },
    { name: "Appointment reminders", channel: "SMS", visibleInPreferenceCenter: true },
  ],
  primaryColor: "214 80% 52%",
  darkModeEnabled: false,
  requireReconfirmation: true,
  showLegalBasis: false,
  privacyPolicyUrl: "",
};

const SettingsContext = createContext<SettingsContextType>({
  marketingConsentDefault: true,
  setMarketingConsentDefault: () => {},
  doubleOptInEnabled: true,
  setDoubleOptInEnabled: () => {},
  doubleOptInExpiryHours: 48,
  setDoubleOptInExpiryHours: () => {},
  doubleOptInMaxResends: 3,
  setDoubleOptInMaxResends: () => {},
  doubleOptInSubscriptionTypes: ["Newsletter", "Promotions", "Information material"],
  setDoubleOptInSubscriptionTypes: () => {},
  unsubscribeLinkEnabled: true,
  setUnsubscribeLinkEnabled: () => {},
  reSubscriptionEnabled: false,
  setReSubscriptionEnabled: () => {},
  defaultLegalBasis: "Explicit consent",
  setDefaultLegalBasis: () => {},
  softBounceThreshold: 3,
  setSoftBounceThreshold: () => {},
  spamComplaintThreshold: 1,
  setSpamComplaintThreshold: () => {},
  autoSuppressHardBounce: true,
  setAutoSuppressHardBounce: () => {},
  autoSuppressSpamComplaint: true,
  setAutoSuppressSpamComplaint: () => {},
  preferenceCenterConfig: defaultPreferenceCenterConfig,
  setPreferenceCenterConfig: () => {},
  updatePreferenceCenterField: () => {},
});

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [marketingConsentDefault, setMarketingConsentDefault] = useState(true);
  const [doubleOptInEnabled, setDoubleOptInEnabled] = useState(true);
  const [doubleOptInExpiryHours, setDoubleOptInExpiryHours] = useState(48);
  const [doubleOptInMaxResends, setDoubleOptInMaxResends] = useState(3);
  const [doubleOptInSubscriptionTypes, setDoubleOptInSubscriptionTypes] = useState([
    "Newsletter", "Promotions", "Information material"
  ]);
  const [unsubscribeLinkEnabled, setUnsubscribeLinkEnabled] = useState(true);
  const [reSubscriptionEnabled, setReSubscriptionEnabled] = useState(false);
  const [defaultLegalBasis, setDefaultLegalBasis] = useState<LegalBasis>("Explicit consent");
  const [softBounceThreshold, setSoftBounceThreshold] = useState(3);
  const [spamComplaintThreshold, setSpamComplaintThreshold] = useState(1);
  const [autoSuppressHardBounce, setAutoSuppressHardBounce] = useState(true);
  const [autoSuppressSpamComplaint, setAutoSuppressSpamComplaint] = useState(true);
  const [preferenceCenterConfig, setPreferenceCenterConfig] = useState<PreferenceCenterConfig>(defaultPreferenceCenterConfig);

  const updatePreferenceCenterField = <K extends keyof PreferenceCenterConfig>(key: K, value: PreferenceCenterConfig[K]) => {
    setPreferenceCenterConfig(prev => ({ ...prev, [key]: value }));
  };

  return (
    <SettingsContext.Provider value={{
      marketingConsentDefault, setMarketingConsentDefault,
      doubleOptInEnabled, setDoubleOptInEnabled,
      doubleOptInExpiryHours, setDoubleOptInExpiryHours,
      doubleOptInMaxResends, setDoubleOptInMaxResends,
      doubleOptInSubscriptionTypes, setDoubleOptInSubscriptionTypes,
      unsubscribeLinkEnabled, setUnsubscribeLinkEnabled,
      reSubscriptionEnabled, setReSubscriptionEnabled,
      defaultLegalBasis, setDefaultLegalBasis,
      softBounceThreshold, setSoftBounceThreshold,
      spamComplaintThreshold, setSpamComplaintThreshold,
      autoSuppressHardBounce, setAutoSuppressHardBounce,
      autoSuppressSpamComplaint, setAutoSuppressSpamComplaint,
      preferenceCenterConfig, setPreferenceCenterConfig,
      updatePreferenceCenterField,
    }}>
      {children}
    </SettingsContext.Provider>
  );
};
