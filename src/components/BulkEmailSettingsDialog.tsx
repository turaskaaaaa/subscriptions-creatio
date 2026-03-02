import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useSettings } from "@/contexts/SettingsContext";
import { Scale, ShieldAlert, Clock, RefreshCw, Mail, CheckCircle2 } from "lucide-react";
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
    <div className="w-9 h-5 bg-muted-foreground/30 peer-checked:bg-primary rounded-full peer-focus:ring-2 peer-focus:ring-ring transition-colors after:content-[''] after:absolute after:top-0.5 after:left-[2px] peer-checked:after:translate-x-full after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
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
    defaultLegalBasis, setDefaultLegalBasis,
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
        ? doubleOptInSubscriptionTypes.filter(t => t !== type)
        : [...doubleOptInSubscriptionTypes, type]
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Bulk email settings</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="optin" className="w-full">
          <TabsList className="w-full justify-start bg-transparent border-b border-border rounded-none h-auto p-0 gap-0">
            <TabsTrigger value="optin" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2 text-xs font-semibold uppercase tracking-wide">
              Opt-in / Opt-out
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

          {/* ===== OPT-IN / OPT-OUT TAB ===== */}
          <TabsContent value="optin" className="mt-6 space-y-6">
            <div>
              <h3 className="text-base font-semibold text-foreground mb-1">Opt-in / Opt-out settings</h3>
              <p className="text-sm text-muted-foreground">
                Configure how contacts subscribe and unsubscribe from your bulk emails
              </p>
            </div>

            {/* --- Double Opt-In Section --- */}
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Double opt-in</p>
                    <p className="text-xs text-muted-foreground">
                      Require contacts to confirm their subscription via a confirmation email
                    </p>
                  </div>
                </div>
                <Toggle checked={doubleOptInEnabled} onChange={setDoubleOptInEnabled} />
              </div>

              {doubleOptInEnabled && (
                <div className="border-t border-border bg-muted/30 p-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                        <Clock className="w-3 h-3" /> Confirmation expiry
                      </label>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          min={1}
                          max={168}
                          value={doubleOptInExpiryHours}
                          onChange={(e) => setDoubleOptInExpiryHours(Number(e.target.value))}
                          className="w-20 h-8 text-sm"
                        />
                        <span className="text-xs text-muted-foreground">hours</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground">Confirmation link expires after this period</p>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                        <RefreshCw className="w-3 h-3" /> Max resend attempts
                      </label>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          min={1}
                          max={10}
                          value={doubleOptInMaxResends}
                          onChange={(e) => setDoubleOptInMaxResends(Number(e.target.value))}
                          className="w-20 h-8 text-sm"
                        />
                        <span className="text-xs text-muted-foreground">times</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground">Maximum number of confirmation resends per contact</p>
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
                    <p className="text-[10px] text-muted-foreground">
                      Only selected subscription types will require double opt-in confirmation
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* --- Other toggles --- */}
            <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-muted/20">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Unsubscribe link</p>
                  <p className="text-xs text-muted-foreground">
                    Automatically include an unsubscribe link in all bulk emails
                  </p>
                  <p className="text-[10px] text-destructive mt-1">
                    Required by CAN-SPAM, GDPR, and CASL regulations. This setting cannot be disabled.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">Enforced</span>
                <Toggle checked={true} onChange={() => {}} />
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                  <RefreshCw className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Re-subscription</p>
                  <p className="text-xs text-muted-foreground">
                    Allow previously unsubscribed contacts to re-subscribe
                  </p>
                </div>
              </div>
              <Toggle checked={reSubscriptionEnabled} onChange={setReSubscriptionEnabled} />
            </div>

            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div>
                <p className="text-sm font-medium text-foreground">Marketing consent default</p>
                <p className="text-xs text-muted-foreground">
                  New contacts will have the "Allowed to receive marketing materials" checkbox active by default
                </p>
              </div>
              <Toggle checked={marketingConsentDefault} onChange={setMarketingConsentDefault} />
            </div>

            <Separator />

            {/* --- Legal Basis Default --- */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-primary" />
                <h4 className="text-sm font-semibold text-foreground">Default legal basis</h4>
              </div>
              <p className="text-xs text-muted-foreground">
                Select the default GDPR legal basis assigned to new subscriptions. This can be overridden per subscription.
              </p>
              <div className="grid grid-cols-1 gap-2">
                {LEGAL_BASIS_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setDefaultLegalBasis(option.value)}
                    className={`flex items-start gap-3 p-3 rounded-lg border text-left transition-colors ${
                      defaultLegalBasis === option.value
                        ? "border-primary/50 bg-primary/5"
                        : "border-border hover:border-primary/30"
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full border-2 mt-0.5 shrink-0 flex items-center justify-center ${
                      defaultLegalBasis === option.value ? "border-primary" : "border-muted-foreground/40"
                    }`}>
                      {defaultLegalBasis === option.value && (
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      )}
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${defaultLegalBasis === option.value ? "text-primary" : "text-foreground"}`}>
                        {option.label}
                      </p>
                      <p className="text-[10px] text-muted-foreground">{option.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <Separator />

            {/* --- Suppression Rules --- */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-destructive" />
                <h4 className="text-sm font-semibold text-foreground">Suppression rules</h4>
              </div>
              <p className="text-xs text-muted-foreground">
                Configure automatic suppression thresholds. Contacts exceeding these limits will be blocked from receiving emails.
              </p>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-foreground">Auto-suppress on hard bounce</p>
                    <p className="text-xs text-muted-foreground">
                      Immediately block delivery after a single hard bounce (permanent failure)
                    </p>
                  </div>
                  <Toggle checked={autoSuppressHardBounce} onChange={setAutoSuppressHardBounce} />
                </div>

                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-foreground">Auto-suppress on spam complaint</p>
                    <p className="text-xs text-muted-foreground">
                      Immediately block delivery when a spam complaint is received
                    </p>
                  </div>
                  <Toggle checked={autoSuppressSpamComplaint} onChange={setAutoSuppressSpamComplaint} />
                </div>

                <div className="border border-border rounded-lg p-4 space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground">Soft bounce threshold</label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        min={1}
                        max={20}
                        value={softBounceThreshold}
                        onChange={(e) => setSoftBounceThreshold(Number(e.target.value))}
                        className="w-20 h-8 text-sm"
                      />
                      <span className="text-xs text-muted-foreground">consecutive soft bounces before auto-suppression</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground">
                      After this many consecutive soft bounces, the address will be automatically suppressed
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground">Spam complaint threshold</label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        min={1}
                        max={10}
                        value={spamComplaintThreshold}
                        onChange={(e) => setSpamComplaintThreshold(Number(e.target.value))}
                        className="w-20 h-8 text-sm"
                      />
                      <span className="text-xs text-muted-foreground">complaints before permanent block</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground">
                      After this many spam complaints across campaigns, the contact is permanently blocked
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => onOpenChange(false)}
                className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => onOpenChange(false)}
                className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Save
              </button>
            </div>
          </TabsContent>

          {/* ===== TRACKING TAB ===== */}
          <TabsContent value="tracking" className="mt-6 space-y-6">
            <div>
              <h3 className="text-base font-semibold text-foreground mb-1">Source tracking</h3>
              <p className="text-sm text-muted-foreground">
                Configure default UTM parameters for tracking traffic from your emails
              </p>
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
