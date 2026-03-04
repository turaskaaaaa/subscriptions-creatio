import AppSidebar from "@/components/AppSidebar";
import TopBar from "@/components/TopBar";
import { useSettings, type SubscriptionTypeConfig } from "@/contexts/SettingsContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import PreferenceCenterPreview from "@/components/PreferenceCenterPreview";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const PreferenceCenter = () => {
  const { preferenceCenterConfig: config, updatePreferenceCenterField, setPreferenceCenterConfig } = useSettings();

  const toggleSubscriptionVisibility = (index: number) => {
    const updated = [...config.subscriptionTypes];
    updated[index] = { ...updated[index], visibleInPreferenceCenter: !updated[index].visibleInPreferenceCenter };
    updatePreferenceCenterField("subscriptionTypes", updated);
  };

  return (
    <div className="flex h-screen bg-background">
      <AppSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-auto">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-xl font-semibold text-foreground">Preference Center</h1>
                <p className="text-sm text-muted-foreground mt-1">Configure what contacts see when managing their subscriptions</p>
              </div>
              <Button onClick={() => toast.success("Preference center settings saved")} size="sm">
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
            </div>

            <div className="flex gap-8">
              {/* Left column — Config forms */}
              <div className="flex-1 space-y-6 min-w-0">
                {/* General Settings */}
                <Card>
                  <CardHeader className="pb-4">
                    <CardTitle className="text-base">General Settings</CardTitle>
                    <CardDescription>Basic information displayed in the preference center</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="pc-title">Page Title</Label>
                        <Input
                          id="pc-title"
                          value={config.title}
                          onChange={e => updatePreferenceCenterField("title", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pc-logo">Logo URL</Label>
                        <Input
                          id="pc-logo"
                          placeholder="https://example.com/logo.png"
                          value={config.logoUrl}
                          onChange={e => updatePreferenceCenterField("logoUrl", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pc-welcome">Welcome Message</Label>
                      <Textarea
                        id="pc-welcome"
                        rows={2}
                        value={config.welcomeMessage}
                        onChange={e => updatePreferenceCenterField("welcomeMessage", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pc-footer">Footer Text</Label>
                      <Input
                        id="pc-footer"
                        value={config.footerText}
                        onChange={e => updatePreferenceCenterField("footerText", e.target.value)}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Subscription Types */}
                <Card>
                  <CardHeader className="pb-4">
                    <CardTitle className="text-base">Subscription Types</CardTitle>
                    <CardDescription>Toggle which subscription types are visible to contacts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Subscription</TableHead>
                          <TableHead>Channel</TableHead>
                          <TableHead className="text-right">Visible</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {config.subscriptionTypes.map((sub, i) => (
                          <TableRow key={sub.name + sub.channel}>
                            <TableCell className="font-medium">{sub.name}</TableCell>
                            <TableCell>
                              <Badge variant="secondary" className="text-xs">
                                {sub.channel}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <Switch
                                checked={sub.visibleInPreferenceCenter}
                                onCheckedChange={() => toggleSubscriptionVisibility(i)}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* Appearance */}
                <Card>
                  <CardHeader className="pb-4">
                    <CardTitle className="text-base">Appearance</CardTitle>
                    <CardDescription>Customize the look of your preference center</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="pc-color">Primary Color (HSL)</Label>
                      <div className="flex items-center gap-3">
                        <Input
                          id="pc-color"
                          value={config.primaryColor}
                          onChange={e => updatePreferenceCenterField("primaryColor", e.target.value)}
                          className="flex-1"
                        />
                        <div
                          className="w-10 h-10 rounded-md border shrink-0"
                          style={{ backgroundColor: `hsl(${config.primaryColor})` }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Dark Mode Support</Label>
                        <p className="text-xs text-muted-foreground mt-0.5">Allow contacts to view in dark mode</p>
                      </div>
                      <Switch
                        checked={config.darkModeEnabled}
                        onCheckedChange={v => updatePreferenceCenterField("darkModeEnabled", v)}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Compliance */}
                <Card>
                  <CardHeader className="pb-4">
                    <CardTitle className="text-base">Compliance</CardTitle>
                    <CardDescription>Legal and compliance settings for the preference center</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Require Re-confirmation on Re-subscribe</Label>
                        <p className="text-xs text-muted-foreground mt-0.5">Contacts must confirm again when re-subscribing</p>
                      </div>
                      <Switch
                        checked={config.requireReconfirmation}
                        onCheckedChange={v => updatePreferenceCenterField("requireReconfirmation", v)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Show Legal Basis to Contacts</Label>
                        <p className="text-xs text-muted-foreground mt-0.5">Display the legal basis for data processing</p>
                      </div>
                      <Switch
                        checked={config.showLegalBasis}
                        onCheckedChange={v => updatePreferenceCenterField("showLegalBasis", v)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pc-privacy">Privacy Policy URL</Label>
                      <Input
                        id="pc-privacy"
                        placeholder="https://example.com/privacy"
                        value={config.privacyPolicyUrl}
                        onChange={e => updatePreferenceCenterField("privacyPolicyUrl", e.target.value)}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right column — Live preview */}
              <div className="w-[380px] shrink-0">
                <div className="sticky top-6">
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">Live Preview</h3>
                  <PreferenceCenterPreview />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PreferenceCenter;
