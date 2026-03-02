export interface EmailRecord {
  id: number;
  name: string;
  status: "Planned" | "Completed";
  sendingMethod: string;
  delivered: number;
  openRate: number;
  clickRate: number;
  unsubscribeRate: number;
  owner: string;
  date: string;
}

export const emailData: EmailRecord[] = [
  { id: 1, name: "03.03.2026 - Global, APAC, Partners, Weekly Partner Digest", status: "Planned", sendingMethod: "Manual at optimal time", delivered: 0, openRate: 0, clickRate: 0, unsubscribeRate: 0, owner: "Marina Vibla", date: "27" },
  { id: 2, name: "27.02.2025 - Global, EMEA, EU & UKI, Customers, FinServ, MoneyLIVE Conferen...", status: "Completed", sendingMethod: "Manual at optimal time", delivered: 12, openRate: 16.67, clickRate: 0, unsubscribeRate: 0, owner: "Marina Vibla", date: "27" },
  { id: 3, name: "27.02.2025 - Global, EMEA, EU & UKI, Subscribers, FinServ, MoneyLIVE Confere...", status: "Completed", sendingMethod: "Manual at optimal time", delivered: 45, openRate: 44.44, clickRate: 0, unsubscribeRate: 0, owner: "Marina Vibla", date: "27" },
  { id: 4, name: "25.02.2026 - Global, Americas, Partners, AI Month: Enablement Session #1", status: "Completed", sendingMethod: "Manual at optimal time", delivered: 1685, openRate: 23.50, clickRate: 1.72, unsubscribeRate: 0.18, owner: "Marina Vibla", date: "27" },
  { id: 5, name: "02.27.2026 General Nurturing Campaign, Step 5 - Success stories", status: "Planned", sendingMethod: "Using a campaign flow", delivered: 0, openRate: 0, clickRate: 0, unsubscribeRate: 0, owner: "Marina Vibla", date: "27" },
  { id: 6, name: "02.27.2026 General Nurturing Campaign, Step 4 - Main Products", status: "Planned", sendingMethod: "Using a campaign flow", delivered: 0, openRate: 0, clickRate: 0, unsubscribeRate: 0, owner: "Marina Vibla", date: "27" },
  { id: 7, name: "02.27.2026 General Nurturing Campaign, Step 3 - Midcampaign Demo check", status: "Planned", sendingMethod: "Using a campaign flow", delivered: 0, openRate: 0, clickRate: 0, unsubscribeRate: 0, owner: "Marina Vibla", date: "27" },
  { id: 8, name: "02.27.2026 General Nurturing Campaign, Step 2 - Usefull materials", status: "Planned", sendingMethod: "Using a campaign flow", delivered: 0, openRate: 0, clickRate: 0, unsubscribeRate: 0, owner: "Marina Vibla", date: "27" },
  { id: 9, name: "02.27.2026 General Nurturing Campaign, Step 6 - Book a demo", status: "Planned", sendingMethod: "Using a campaign flow", delivered: 0, openRate: 0, clickRate: 0, unsubscribeRate: 0, owner: "Marina Vibla", date: "27" },
  { id: 10, name: "02.27.2026 General Nurturing Campaign, Step 1 - Creatio AI", status: "Planned", sendingMethod: "Using a campaign flow", delivered: 0, openRate: 0, clickRate: 0, unsubscribeRate: 0, owner: "Marina Vibla", date: "27" },
  { id: 11, name: "26.02.2026 - Regular Update Package, 8.3.2 (US)", status: "Completed", sendingMethod: "Manual at optimal time", delivered: 646, openRate: 39.94, clickRate: 3.10, unsubscribeRate: 0.62, owner: "Nataly Rybachek", date: "26" },
  { id: 12, name: "27.02.2026 - UKI, Registered, Birmingham, Executive Seminar #4", status: "Completed", sendingMethod: "Manual at optimal time", delivered: 27, openRate: 62.96, clickRate: 11.11, unsubscribeRate: 3.70, owner: "Marina Vibla", date: "27" },
  { id: 13, name: "26.02.2025 - Global, Americas, CUs, Cold, GAC Conference", status: "Completed", sendingMethod: "Manual at optimal time", delivered: 50, openRate: 54.00, clickRate: 40.00, unsubscribeRate: 0, owner: "Marina Vibla", date: "26" },
  { id: 14, name: "26.02.2025 - Global, Americas, CUs, Warm, GAC Conference", status: "Completed", sendingMethod: "Manual at optimal time", delivered: 150, openRate: 19.33, clickRate: 2.00, unsubscribeRate: 0, owner: "Marina Vibla", date: "26" },
  { id: 15, name: "26.02.2025 - Global, Americas, Partners, NCD Florida 2026, #3", status: "Completed", sendingMethod: "Manual at optimal time", delivered: 1607, openRate: 19.23, clickRate: 1.18, unsubscribeRate: 0, owner: "Marina Vibla", date: "26" },
  { id: 16, name: "26.02.2025 - Global, EMEA, Partners, NCD Florida 2026, #3", status: "Completed", sendingMethod: "Manual at optimal time", delivered: 1679, openRate: 25.13, clickRate: 0.89, unsubscribeRate: 0.06, owner: "Marina Vibla", date: "26" },
  { id: 17, name: "26.02.2025 - Global, EE, Partners, NCD Florida 2026, #3", status: "Completed", sendingMethod: "Manual at optimal time", delivered: 655, openRate: 21.22, clickRate: 0.61, unsubscribeRate: 0.15, owner: "Marina Vibla", date: "26" },
  { id: 18, name: "27.02.2025 - Global, APAC, Partners, NCD Florida 2026, #3", status: "Completed", sendingMethod: "Manual at optimal time", delivered: 1289, openRate: 22.65, clickRate: 0.23, unsubscribeRate: 0, owner: "Marina Vibla", date: "26" },
];
