import { useSettings } from "@/contexts/SettingsContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown, X, Plus, MailX } from "lucide-react";
import { useState } from "react";

const UnsubscribePageSection = () => {
  const { preferenceCenterConfig: config, updatePreferenceCenterField } = useSettings();
  const [open, setOpen] = useState(true);
  const unsub = config.unsubscribePage;

  const updateField = <K extends keyof typeof unsub>(key: K, value: (typeof unsub)[K]) => {
    updatePreferenceCenterField("unsubscribePage", { ...unsub, [key]: value });
  };

  const addReason = () => {
    updateField("reasons", [...unsub.reasons, ""]);
  };

  const updateReason = (index: number, value: string) => {
    const updated = [...unsub.reasons];
    updated[index] = value;
    updateField("reasons", updated);
  };

  const removeReason = (index: number) => {
    updateField("reasons", unsub.reasons.filter((_, i) => i !== index));
  };

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <Card>
        <CollapsibleTrigger asChild>
          <CardHeader className="pb-4 cursor-pointer hover:bg-muted/50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MailX className="w-5 h-5 text-muted-foreground" />
                <div>
                  <CardTitle className="text-base">Unsubscribe Page</CardTitle>
                  <CardDescription>Configure the page contacts see when unsubscribing</CardDescription>
                </div>
              </div>
              <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Page Name</Label>
              <Input
                value={unsub.pageName}
                onChange={e => updateField("pageName", e.target.value)}
                placeholder="Unsubscribe"
              />
            </div>
            <div className="space-y-2">
              <Label>Confirmation Message</Label>
              <Textarea
                rows={2}
                value={unsub.confirmationMessage}
                onChange={e => updateField("confirmationMessage", e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Ask Reason for Unsubscribing</Label>
                <p className="text-xs text-muted-foreground mt-0.5">Show a reason selector before confirming</p>
              </div>
              <Switch
                checked={unsub.showReasonSelection}
                onCheckedChange={v => updateField("showReasonSelection", v)}
              />
            </div>
            {unsub.showReasonSelection && (
              <div className="space-y-2 pl-1">
                <Label className="text-sm">Reasons</Label>
                {unsub.reasons.map((reason, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Input
                      value={reason}
                      onChange={e => updateReason(i, e.target.value)}
                      placeholder="e.g. Too many emails"
                      className="flex-1"
                    />
                    <Button variant="ghost" size="icon" className="shrink-0 h-8 w-8" onClick={() => removeReason(i)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={addReason} className="mt-1">
                  <Plus className="w-4 h-4 mr-1" /> Add Reason
                </Button>
              </div>
            )}

            {/* Mini preview */}
            <div className="border rounded-lg p-5 bg-muted/30 mt-4">
              <p className="text-xs font-medium text-muted-foreground mb-3">Preview</p>
              <div className="rounded-md border bg-card p-6 text-center max-w-xs mx-auto space-y-3">
                <MailX className="w-8 h-8 mx-auto text-muted-foreground" />
                <h4 className="font-semibold text-foreground">{unsub.pageName || "Unsubscribe"}</h4>
                <p className="text-sm text-muted-foreground">{unsub.confirmationMessage}</p>
                {unsub.showReasonSelection && unsub.reasons.length > 0 && (
                  <div className="space-y-1.5 text-left">
                    {unsub.reasons.filter(Boolean).map((r, i) => (
                      <label key={i} className="flex items-center gap-2 text-sm text-foreground">
                        <input type="radio" name="preview-reason" disabled className="accent-primary" />
                        {r}
                      </label>
                    ))}
                  </div>
                )}
                <Button size="sm" disabled className="w-full pointer-events-none">
                  Confirm Unsubscribe
                </Button>
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};

export default UnsubscribePageSection;
