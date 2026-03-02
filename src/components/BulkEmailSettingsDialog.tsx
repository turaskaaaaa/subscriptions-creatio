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
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Bulk email settings</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="tracking" className="w-full">
          <TabsList className="w-full justify-start bg-transparent border-b border-border rounded-none h-auto p-0 gap-0">
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
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default BulkEmailSettingsDialog;
