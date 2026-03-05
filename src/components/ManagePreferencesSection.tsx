import { useSettings } from "@/contexts/SettingsContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown, X, Plus, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

const ManagePreferencesSection = () => {
  const { preferenceCenterConfig: config, updatePreferenceCenterField } = useSettings();
  const [open, setOpen] = useState(true);
  const prefs = config.managePreferencesPage;

  const updateField = <K extends keyof typeof prefs>(key: K, value: (typeof prefs)[K]) => {
    updatePreferenceCenterField("managePreferencesPage", { ...prefs, [key]: value });
  };

  const addCategory = () => {
    updateField("contentCategories", [...prefs.contentCategories, ""]);
  };

  const updateCategory = (index: number, value: string) => {
    const updated = [...prefs.contentCategories];
    updated[index] = value;
    updateField("contentCategories", updated);
  };

  const removeCategory = (index: number) => {
    updateField("contentCategories", prefs.contentCategories.filter((_, i) => i !== index));
  };

  const emailSubs = config.subscriptionTypes.filter(s => s.channel === "Email" && s.visibleInPreferenceCenter);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <Card>
        <CollapsibleTrigger asChild>
          <CardHeader className="pb-4 cursor-pointer hover:bg-muted/50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <SlidersHorizontal className="w-5 h-5 text-muted-foreground" />
                <div>
                  <CardTitle className="text-base">Manage Preferences Page</CardTitle>
                  <CardDescription>Configure the page where contacts manage their email preferences</CardDescription>
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
                value={prefs.pageName}
                onChange={e => updateField("pageName", e.target.value)}
                placeholder="Manage Preferences"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Show Content Categories</Label>
                <p className="text-xs text-muted-foreground mt-0.5">Let contacts pick topics they're interested in</p>
              </div>
              <Switch
                checked={prefs.showContentCategories}
                onCheckedChange={v => updateField("showContentCategories", v)}
              />
            </div>
            {prefs.showContentCategories && (
              <div className="space-y-2 pl-1">
                <Label className="text-sm">Content Categories</Label>
                {prefs.contentCategories.map((cat, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Input
                      value={cat}
                      onChange={e => updateCategory(i, e.target.value)}
                      placeholder="e.g. Product Updates"
                      className="flex-1"
                    />
                    <Button variant="ghost" size="icon" className="shrink-0 h-8 w-8" onClick={() => removeCategory(i)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={addCategory} className="mt-1">
                  <Plus className="w-4 h-4 mr-1" /> Add Category
                </Button>
              </div>
            )}

            {/* Mini preview */}
            <div className="border rounded-lg p-5 bg-muted/30 mt-4">
              <p className="text-xs font-medium text-muted-foreground mb-3">Preview</p>
              <div className="rounded-md border bg-card p-6 max-w-xs mx-auto space-y-4">
                <div className="text-center">
                  <SlidersHorizontal className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                  <h4 className="font-semibold text-foreground">{prefs.pageName || "Manage Preferences"}</h4>
                </div>

                {/* Subscription toggles */}
                {emailSubs.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Subscriptions</p>
                    {emailSubs.map(sub => (
                      <div key={sub.name} className="flex items-center justify-between">
                        <span className="text-sm text-foreground">{sub.name}</span>
                        <Switch checked disabled className="pointer-events-none" />
                      </div>
                    ))}
                  </div>
                )}

                {/* Content categories */}
                {prefs.showContentCategories && prefs.contentCategories.filter(Boolean).length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Topics</p>
                    {prefs.contentCategories.filter(Boolean).map((cat, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="text-sm text-foreground">{cat}</span>
                        <Switch checked disabled className="pointer-events-none" />
                      </div>
                    ))}
                  </div>
                )}

                <Button size="sm" disabled className="w-full pointer-events-none">
                  Save Preferences
                </Button>
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};

export default ManagePreferencesSection;
