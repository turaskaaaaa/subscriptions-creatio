import { createContext, useContext, useState, ReactNode } from "react";

interface SettingsContextType {
  marketingConsentDefault: boolean;
  setMarketingConsentDefault: (value: boolean) => void;
}

const SettingsContext = createContext<SettingsContextType>({
  marketingConsentDefault: true,
  setMarketingConsentDefault: () => {},
});

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [marketingConsentDefault, setMarketingConsentDefault] = useState(true);

  return (
    <SettingsContext.Provider value={{ marketingConsentDefault, setMarketingConsentDefault }}>
      {children}
    </SettingsContext.Provider>
  );
};
