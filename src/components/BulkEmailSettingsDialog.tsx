import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSettings } from "@/contexts/SettingsContext";
import type { LegalBasis } from "@/data/contactsData";

interface BulkEmailSettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SUBSCRIPTION_TYPE_OPTIONS = [
  "Information material",
  "Newsletter",
  "Promotions",
  "Account alerts",
  "Appointment reminders",
  "Security alerts",
];

const LEGAL_BASIS_OPTIONS: { value: LegalBasis; label: string; description: string }[] = [
  { value: "Explicit consent", label: "Explicit consent", description: "User actively opted in (GDPR Art. 6(1)(a))" },
  { value: "Legitimate interest", label: "Legitimate interest", description: "Reasonable business interest (GDPR Art. 6(1)(f))" },
  { value: "Contract necessity", label: "Contract necessity", description: "Required for contract fulfillment (GDPR Art. 6(1)(b))" },
  { value: "Legal obligation", label: "Legal obligation", description: "Required by law (GDPR Art. 6(1)(c))" },
  { value: "Vital interest", label: "Vital interest", description: "Protecting vital interests (GDPR Art. 6(1)(d))" },
  { value: "Public task", label: "Public task", description: "Public interest or official authority (GDPR Art. 6(1)(e))" },
];

const Toggle = ({ checked, onChange }: { checked: boolean; onChange: (val: boolean) => void }) => (
  <label className="relative inline-flex items-center cursor-pointer shrink-0">
    <input type="checkbox" className="sr-only peer" checked={checked} onChange={(e) => onChange(e.target.checked)} />
    <div className="w-9 h-5 bg-muted-foreground/30 peer-checked:bg-primary rounded-full peer-focus:ring-2 peer-focus:ring-ring transition-colors after:content-[''] after:absolute after:top-0.5 after:left-[2px] peer-checked:after:translate-x-full after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all" />
  </label>
);

const BulkEmailSettingsDialog = ({ open, onOpenChange }: BulkEmailSettingsDialogProps) => {
  const {
    marketingConsentDefault, setMarketingConsentDefault,
    doubleOptInEnabled, setDoubleOptInEnabled,
    doubleOptInExpiryHours, setDoubleOptInExpiryHours,
    doubleOptInMaxResends, setDoubleOptInMaxResends,
    doubleOptInSubscriptionTypes, setDoubleOptInSubscriptionTypes,
    unsubscribeLinkEnabled, setUnsubscribeLinkEnabled,
    reSubscriptionEnabled, setReSubscriptionEnabled,
    manualLegalBasis, setManualLegalBasis,
    selfServiceLegalBasis, setSelfServiceLegalBasis,
    softBounceThreshold, setSoftBounceThreshold,
    spamComplaintThreshold, setSpamComplaintThreshold,
    autoSuppressHardBounce, setAutoSuppressHardBounce,
    autoSuppressSpamComplaint, setAutoSuppressSpamComplaint,
  } = useSettings();

  const [domains, setDomains] = useState(
    "www.creatio.com,creatio.com,www.marketplace.creatio.com,marketplace.creatio.com,www.academy.creatio.com,academy.creatio.com,www.community.creatio.com,community.creatio.com"
  );
  const [utmSource, setUtmSource] = useState("newsletter");
  const [utmCampaign, setUtmCampaign] = useState("email-ncd-london-2025");
  const [utmMedium, setUtmMedium] = useState("email");
  const [utmTerm, setUtmTerm] = useState("");
  const [utmContent, setUtmContent] = useState("");

  const toggleSubscriptionType = (type: string) => {
    setDoubleOptInSubscriptionTypes(
      doubleOptInSubscriptionTypes.includes(type)
        ? doubleOptInSubscriptionTypes.filter((t) => t !== type)
        : [...doubleOptInSubscriptionTypes, type]
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Subscription settings</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="optin" className="w-full">
          <TabsList className="w-full justify-start bg-transparent border-b border-border rounded-none h-auto p-0 gap-0">
            <TabsTrigger value="optin" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2 text-xs font-semibold uppercase tracking-wide">
              Subscription
            </TabsTrigger>
            <TabsTrigger value="tracking" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2 text-xs font-semibold uppercase tracking-wide">
              Tracking defaults
            </TabsTrigger>
            <TabsTrigger value="multilanguage" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2 text-xs font-semibold uppercase tracking-wide">
              Multilanguage defaults
            </TabsTrigger>
            <TabsTrigger value="limits" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2 text-xs font-semibold uppercase tracking-wide">
              Limits defaults
            </TabsTrigger>
          </TabsList>

          {/* ===== SUBSCRIPTION TAB ===== */}
          <TabsContent value="optin" className="mt-6 space-y-5">

            {/* --- Unsubscribe Link --- */}
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-medium text-foreground">Unsubscribe link</p>
                <p className="text-xs text-muted-foreground">Automatically include an unsubscribe link in all bulk emails</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-muted-foreground">Enforced</span>
                <Toggle checked={true} onChange={() => {}} />
              </div>
            </div>

            <Separator />

            {/* --- Marketing Consent --- */}
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-medium text-foreground">Marketing consent default</p>
                <p className="text-xs text-muted-foreground">New contacts will have "Allow marketing emails" enabled by default</p>
              </div>
              <Toggle checked={marketingConsentDefault} onChange={setMarketingConsentDefault} />
            </div>

            <Separator />

            {/* --- Legal Basis Default --- */}
            <div className="space-y-3 py-3">
              <div>
                <h4 className="text-sm font-semibold text-foreground">Default legal basis</h4>
                <p className="text-xs text-muted-foreground mt-0.5">Select the default GDPR legal basis used for marketing subscriptions.</p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <p className="text-xs font-medium text-muted-foreground">When created by Creatio user</p>
                  <Select value={manualLegalBasis} onValueChange={(val) => setManualLegalBasis(val as LegalBasis)}>
                    <SelectTrigger className="h-9 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {LEGAL_BASIS_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value} className="text-xs">
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-[10px] text-muted-foreground">
                    {LEGAL_BASIS_OPTIONS.find((o) => o.value === manualLegalBasis)?.description}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <p className="text-xs font-medium text-muted-foreground">When updated via preference center</p>
                  <Select value={selfServiceLegalBasis} onValueChange={(val) => setSelfServiceLegalBasis(val as LegalBasis)}>
                    <SelectTrigger className="h-9 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {LEGAL_BASIS_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value} className="text-xs">
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-[10px] text-muted-foreground">
                    {LEGAL_BASIS_OPTIONS.find((o) => o.value === selfServiceLegalBasis)?.description}
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            {/* --- Double Opt-In --- */}
            <div className="py-3 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Double opt-in</p>
                  <p className="text-xs text-muted-foreground">Require contacts to confirm their subscription via a confirmation email</p>
                </div>
                <Toggle checked={doubleOptInEnabled} onChange={setDoubleOptInEnabled} />
              </div>

              {doubleOptInEnabled && (
                <div className="border border-border rounded-lg p-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-muted-foreground">Confirmation expiry</label>
                      <div className="flex items-center gap-2">
                        <Input type="number" min={1} max={168} value={doubleOptInExpiryHours} onChange={(e) => setDoubleOptInExpiryHours(Number(e.target.value))} className="w-20 h-8 text-sm" />
                        <span className="text-xs text-muted-foreground">hours</span>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-muted-foreground">Max resend attempts</label>
                      <div className="flex items-center gap-2">
                        <Input type="number" min={1} max={10} value={doubleOptInMaxResends} onChange={(e) => setDoubleOptInMaxResends(Number(e.target.value))} className="w-20 h-8 text-sm" />
                        <span className="text-xs text-muted-foreground">times</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground">Require double opt-in for:</label>
                    <div className="flex flex-wrap gap-2">
                      {SUBSCRIPTION_TYPE_OPTIONS.map((type) => {
                        const isActive = doubleOptInSubscriptionTypes.includes(type);
                        return (
                          <button
                            key={type}
                            onClick={() => toggleSubscriptionType(type)}
                            className={`text-xs px-3 py-1.5 rounded-full border transition-colors font-medium ${
                              isActive
                                ? "bg-primary/10 text-primary border-primary/30"
                                : "bg-muted text-muted-foreground border-border hover:border-primary/30"
                            }`}
                          >
                            {type}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Separator />

            {/* --- Suppression Rules --- */}
            <div className="py-3 space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-foreground">Suppression rules</h4>
                <p className="text-xs text-muted-foreground mt-0.5">Configure automatic suppression thresholds for bounces and spam complaints.</p>
              </div>

              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium text-foreground">Auto-suppress on hard bounce</p>
                  <p className="text-xs text-muted-foreground">Block delivery after a hard bounce</p>
                </div>
                <Toggle checked={autoSuppressHardBounce} onChange={setAutoSuppressHardBounce} />
              </div>

              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium text-foreground">Auto-suppress on spam complaint</p>
                  <p className="text-xs text-muted-foreground">Block delivery when a spam complaint is received</p>
                </div>
                <Toggle checked={autoSuppressSpamComplaint} onChange={setAutoSuppressSpamComplaint} />
              </div>

              <div className="border border-border rounded-lg p-4 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Soft bounce threshold</label>
                  <div className="flex items-center gap-2">
                    <Input type="number" min={1} max={20} value={softBounceThreshold} onChange={(e) => setSoftBounceThreshold(Number(e.target.value))} className="w-20 h-8 text-sm" />
                    <span className="text-xs text-muted-foreground">consecutive soft bounces before auto-suppression</span>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Spam complaint threshold</label>
                  <div className="flex items-center gap-2">
                    <Input type="number" min={1} max={10} value={spamComplaintThreshold} onChange={(e) => setSpamComplaintThreshold(Number(e.target.value))} className="w-20 h-8 text-sm" />
                    <span className="text-xs text-muted-foreground">complaints before permanent block</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button onClick={() => onOpenChange(false)} className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">Cancel</button>
              <button onClick={() => onOpenChange(false)} className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">Save</button>
            </div>
          </TabsContent>

          {/* ===== TRACKING TAB ===== */}
          <TabsContent value="tracking" className="mt-6 space-y-6">
            <div>
              <h3 className="text-base font-semibold text-foreground mb-1">Source tracking</h3>
              <p className="text-sm text-muted-foreground">Configure default UTM parameters for tracking traffic from your emails</p>
            </div>

            <div className="space-y-1">
              <label className="text-sm text-muted-foreground">List of domains<span className="text-destructive">*</span></label>
              <Input value={domains} onChange={(e) => setDomains(e.target.value)} />
              <p className="text-xs text-muted-foreground">Enter the domains where your email links will direct users.</p>
            </div>
            <div className="space-y-1">
              <label className="text-sm text-muted-foreground">utm_source<span className="text-destructive">*</span></label>
              <Input value={utmSource} onChange={(e) => setUtmSource(e.target.value)} />
              <p className="text-xs text-muted-foreground">Identifies where the traffic originated.</p>
            </div>
            <div className="space-y-1">
              <label className="text-sm text-muted-foreground">utm_campaign<span className="text-destructive">*</span></label>
              <Input value={utmCampaign} onChange={(e) => setUtmCampaign(e.target.value)} />
              <p className="text-xs text-muted-foreground">Specifies the name of the email campaign or promotion.</p>
            </div>
            <div className="space-y-1">
              <label className="text-sm text-muted-foreground">utm_medium<span className="text-destructive">*</span></label>
              <Input value={utmMedium} onChange={(e) => setUtmMedium(e.target.value)} />
              <p className="text-xs text-muted-foreground">Describes the type of marketing channel.</p>
            </div>
            <div className="space-y-1">
              <label className="text-sm text-muted-foreground">utm_term</label>
              <Input value={utmTerm} onChange={(e) => setUtmTerm(e.target.value)} />
              <p className="text-xs text-muted-foreground">(Optional) Used for tracking specific keywords or audience segments.</p>
            </div>
            <div className="space-y-1">
              <label className="text-sm text-muted-foreground">utm_content</label>
              <Input value={utmContent} onChange={(e) => setUtmContent(e.target.value)} />
              <p className="text-xs text-muted-foreground">(Optional) Helps identify which specific link or creative was clicked.</p>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button onClick={() => onOpenChange(false)} className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">Cancel</button>
              <button onClick={() => onOpenChange(false)} className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">Save</button>
            </div>
          </TabsContent>

          <TabsContent value="multilanguage" className="mt-6">
            <p className="text-sm text-muted-foreground">Multilanguage default settings will appear here.</p>
          </TabsContent>

          <TabsContent value="limits" className="mt-6">
            <p className="text-sm text-muted-foreground">Limits default settings will appear here.</p>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default BulkEmailSettingsDialog;
