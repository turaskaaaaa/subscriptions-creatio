import { createContext, useContext, useState, ReactNode } from "react";
import type { LegalBasis } from "@/data/contactsData";

interface SettingsContextType {
  marketingConsentDefault: boolean;
  setMarketingConsentDefault: (value: boolean) => void;
  doubleOptInEnabled: boolean;
  setDoubleOptInEnabled: (value: boolean) => void;
  doubleOptInExpiryHours: number;
  setDoubleOptInExpiryHours: (value: number) => void;
  doubleOptInMaxResends: number;
  setDoubleOptInMaxResends: (value: number) => void;
  doubleOptInSubscriptionTypes: string[];
  setDoubleOptInSubscriptionTypes: (value: string[]) => void;
  doubleOptInEmailSubject: string;
  setDoubleOptInEmailSubject: (value: string) => void;
  doubleOptInEmailBody: string;
  setDoubleOptInEmailBody: (value: string) => void;
  unsubscribeLinkEnabled: boolean;
  setUnsubscribeLinkEnabled: (value: boolean) => void;
  reSubscriptionEnabled: boolean;
  setReSubscriptionEnabled: (value: boolean) => void;
  defaultLegalBasis: LegalBasis;
  setDefaultLegalBasis: (value: LegalBasis) => void;
  softBounceThreshold: number;
  setSoftBounceThreshold: (value: number) => void;
  spamComplaintThreshold: number;
  setSpamComplaintThreshold: (value: number) => void;
  autoSuppressHardBounce: boolean;
  setAutoSuppressHardBounce: (value: boolean) => void;
  autoSuppressSpamComplaint: boolean;
  setAutoSuppressSpamComplaint: (value: boolean) => void;
}

const DEFAULT_EMAIL_BODY = "Hi {{contact_name}},\n\nThank you for subscribing to {{subscription_type}}.\n\nPlease confirm your subscription by clicking the link below:\n\n{{confirmation_link}}\n\nThis link will expire in 48 hours.\n\nIf you did not request this, you can safely ignore this email.";

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
  doubleOptInEmailSubject: "Please confirm your subscription",
  setDoubleOptInEmailSubject: () => {},
  doubleOptInEmailBody: DEFAULT_EMAIL_BODY,
  setDoubleOptInEmailBody: () => {},
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
  const [doubleOptInEmailSubject, setDoubleOptInEmailSubject] = useState("Please confirm your subscription");
  const [doubleOptInEmailBody, setDoubleOptInEmailBody] = useState(DEFAULT_EMAIL_BODY);
  const [unsubscribeLinkEnabled, setUnsubscribeLinkEnabled] = useState(true);
  const [reSubscriptionEnabled, setReSubscriptionEnabled] = useState(false);
  const [defaultLegalBasis, setDefaultLegalBasis] = useState<LegalBasis>("Explicit consent");
  const [softBounceThreshold, setSoftBounceThreshold] = useState(3);
  const [spamComplaintThreshold, setSpamComplaintThreshold] = useState(1);
  const [autoSuppressHardBounce, setAutoSuppressHardBounce] = useState(true);
  const [autoSuppressSpamComplaint, setAutoSuppressSpamComplaint] = useState(true);

  return (
    <SettingsContext.Provider value={{
      marketingConsentDefault, setMarketingConsentDefault,
      doubleOptInEnabled, setDoubleOptInEnabled,
      doubleOptInExpiryHours, setDoubleOptInExpiryHours,
      doubleOptInMaxResends, setDoubleOptInMaxResends,
      doubleOptInSubscriptionTypes, setDoubleOptInSubscriptionTypes,
      doubleOptInEmailSubject, setDoubleOptInEmailSubject,
      doubleOptInEmailBody, setDoubleOptInEmailBody,
      unsubscribeLinkEnabled, setUnsubscribeLinkEnabled,
      reSubscriptionEnabled, setReSubscriptionEnabled,
      defaultLegalBasis, setDefaultLegalBasis,
      softBounceThreshold, setSoftBounceThreshold,
      spamComplaintThreshold, setSpamComplaintThreshold,
      autoSuppressHardBounce, setAutoSuppressHardBounce,
      autoSuppressSpamComplaint, setAutoSuppressSpamComplaint,
    }}>
      {children}
    </SettingsContext.Provider>
  );
};
