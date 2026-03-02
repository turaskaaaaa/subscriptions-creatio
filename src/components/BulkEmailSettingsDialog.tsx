import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

interface BulkEmailSettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BulkEmailSettingsDialog = ({ open, onOpenChange }: BulkEmailSettingsDialogProps) => {
  const [domains, setDomains] = useState(
    "www.creatio.com,creatio.com,www.marketplace.creatio.com,marketplace.creatio.com,www.academy.creatio.com,academy.creatio.com,www.community.creatio.com,community.creatio.com"
  );
  const [utmSource, setUtmSource] = useState("newsletter");
  const [utmCampaign, setUtmCampaign] = useState("email-ncd-london-2025");
  const [utmMedium, setUtmMedium] = useState("email");
  const [utmTerm, setUtmTerm] = useState("");
  const [utmContent, setUtmContent] = useState("");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Bulk email settings</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="optin" className="w-full">
          <TabsList className="w-full justify-start bg-transparent border-b border-border rounded-none h-auto p-0 gap-0">
            <TabsTrigger
              value="optin"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2 text-xs font-semibold uppercase tracking-wide"
            >
              Opt-in / Opt-out
            </TabsTrigger>
            <TabsTrigger
              value="tracking"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2 text-xs font-semibold uppercase tracking-wide"
            >
              Tracking defaults
            </TabsTrigger>
            <TabsTrigger
              value="multilanguage"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2 text-xs font-semibold uppercase tracking-wide"
            >
              Multilanguage defaults
            </TabsTrigger>
            <TabsTrigger
              value="limits"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2 text-xs font-semibold uppercase tracking-wide"
            >
              Limits defaults
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tracking" className="mt-6 space-y-6">
            <div>
              <h3 className="text-base font-semibold text-foreground mb-1">Source tracking</h3>
              <p className="text-sm text-muted-foreground">
                Configure default UTM parameters for tracking traffic from your emails
              </p>
            </div>

            <div className="space-y-1">
              <label className="text-sm text-muted-foreground">
                List of domains<span className="text-destructive">*</span>
              </label>
              <Input value={domains} onChange={(e) => setDomains(e.target.value)} />
              <p className="text-xs text-muted-foreground">
                Enter the domains where your email links will direct users (e.g., company website, landing pages, academy pages).
              </p>
            </div>

            <div className="space-y-1">
              <label className="text-sm text-muted-foreground">
                utm_source<span className="text-destructive">*</span>
              </label>
              <Input value={utmSource} onChange={(e) => setUtmSource(e.target.value)} />
              <p className="text-xs text-muted-foreground">
                Identifies where the traffic originated. Use a consistent label like "newsletter" or "email-blast" so you can distinguish email traffic from other sources.
              </p>
            </div>

            <div className="space-y-1">
              <label className="text-sm text-muted-foreground">
                utm_campaign<span className="text-destructive">*</span>
              </label>
              <Input value={utmCampaign} onChange={(e) => setUtmCampaign(e.target.value)} />
              <p className="text-xs text-muted-foreground">
                Specifies the name of the email campaign or promotion. Helps you group related messages in analytics reports.
              </p>
            </div>

            <div className="space-y-1">
              <label className="text-sm text-muted-foreground">
                utm_medium<span className="text-destructive">*</span>
              </label>
              <Input value={utmMedium} onChange={(e) => setUtmMedium(e.target.value)} />
              <p className="text-xs text-muted-foreground">
                Describes the type of marketing channel. For email campaigns, this is usually "email".
              </p>
            </div>

            <div className="space-y-1">
              <label className="text-sm text-muted-foreground">utm_term</label>
              <Input value={utmTerm} onChange={(e) => setUtmTerm(e.target.value)} />
              <p className="text-xs text-muted-foreground">
                (Optional) Used for tracking specific keywords or audience segments if relevant.
              </p>
            </div>

            <div className="space-y-1">
              <label className="text-sm text-muted-foreground">utm_content</label>
              <Input value={utmContent} onChange={(e) => setUtmContent(e.target.value)} />
              <p className="text-xs text-muted-foreground">
                (Optional) Helps you identify which specific link or creative variation was clicked in the email.
              </p>
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

          <TabsContent value="multilanguage" className="mt-6">
            <p className="text-sm text-muted-foreground">Multilanguage default settings will appear here.</p>
          </TabsContent>

          <TabsContent value="limits" className="mt-6">
            <p className="text-sm text-muted-foreground">Limits default settings will appear here.</p>
          </TabsContent>

          <TabsContent value="optin" className="mt-6 space-y-6">
            <div>
              <h3 className="text-base font-semibold text-foreground mb-1">Opt-in / Opt-out settings</h3>
              <p className="text-sm text-muted-foreground">
                Configure how contacts subscribe and unsubscribe from your bulk emails
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-border rounded-md">
                <div>
                  <p className="text-sm font-medium text-foreground">Double opt-in</p>
                  <p className="text-xs text-muted-foreground">
                    Require contacts to confirm their subscription via a confirmation email
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-9 h-5 bg-muted-foreground/30 peer-checked:bg-primary rounded-full peer-focus:ring-2 peer-focus:ring-ring transition-colors after:content-[''] after:absolute after:top-0.5 after:left-[2px] peer-checked:after:translate-x-full after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 border border-border rounded-md">
                <div>
                  <p className="text-sm font-medium text-foreground">Unsubscribe link</p>
                  <p className="text-xs text-muted-foreground">
                    Automatically include an unsubscribe link in all bulk emails
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-9 h-5 bg-muted-foreground/30 peer-checked:bg-primary rounded-full peer-focus:ring-2 peer-focus:ring-ring transition-colors after:content-[''] after:absolute after:top-0.5 after:left-[2px] peer-checked:after:translate-x-full after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 border border-border rounded-md">
                <div>
                  <p className="text-sm font-medium text-foreground">Re-subscription</p>
                  <p className="text-xs text-muted-foreground">
                    Allow previously unsubscribed contacts to re-subscribe
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-9 h-5 bg-muted-foreground/30 peer-checked:bg-primary rounded-full peer-focus:ring-2 peer-focus:ring-ring transition-colors after:content-[''] after:absolute after:top-0.5 after:left-[2px] peer-checked:after:translate-x-full after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                </label>
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
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default BulkEmailSettingsDialog;
