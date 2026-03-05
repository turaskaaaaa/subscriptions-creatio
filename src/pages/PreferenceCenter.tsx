import AppSidebar from "@/components/AppSidebar";
import TopBar from "@/components/TopBar";
import { useSettings } from "@/contexts/SettingsContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import PreferenceCenterPreview from "@/components/PreferenceCenterPreview";
import UnsubscribePageSection from "@/components/UnsubscribePageSection";
import ManagePreferencesSection from "@/components/ManagePreferencesSection";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const channels = ["Email", "WhatsApp", "SMS"] as const;

const PreferenceCenter = () => {
  const { preferenceCenterConfig: config, updatePreferenceCenterField } = useSettings();

  const toggleSubscriptionVisibility = (index: number) => {
    const updated = [...config.subscriptionTypes];
    updated[index] = { ...updated[index], visibleInPreferenceCenter: !updated[index].visibleInPreferenceCenter };
    updatePreferenceCenterField("subscriptionTypes", updated);
  };

  const getSubsByChannel = (channel: string) =>
    config.subscriptionTypes
      .map((sub, i) => ({ sub, originalIndex: i }))
      .filter(({ sub }) => sub.channel === channel);

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

            <Tabs defaultValue="Email">
              <TabsList className="w-full justify-start border-b rounded-none bg-transparent p-0 h-auto">
                {channels.map(ch => (
                  <TabsTrigger
                    key={ch}
                    value={ch}
                    className="uppercase tracking-wide text-xs font-semibold rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3"
                  >
                    {ch}
                  </TabsTrigger>
                ))}
              </TabsList>

              {channels.map(channel => (
                <TabsContent key={channel} value={channel}>
                  <div className="flex gap-8 mt-6">
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
                              <Label htmlFor={`pc-title-${channel}`}>Page Title</Label>
                              <Input
                                id={`pc-title-${channel}`}
                                value={config.title}
                                onChange={e => updatePreferenceCenterField("title", e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`pc-logo-${channel}`}>Logo URL</Label>
                              <Input
                                id={`pc-logo-${channel}`}
                                placeholder="https://example.com/logo.png"
                                value={config.logoUrl}
                                onChange={e => updatePreferenceCenterField("logoUrl", e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`pc-welcome-${channel}`}>Welcome Message</Label>
                            <Textarea
                              id={`pc-welcome-${channel}`}
                              rows={2}
                              value={config.welcomeMessage}
                              onChange={e => updatePreferenceCenterField("welcomeMessage", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`pc-footer-${channel}`}>Footer Text</Label>
                            <Input
                              id={`pc-footer-${channel}`}
                              value={config.footerText}
                              onChange={e => updatePreferenceCenterField("footerText", e.target.value)}
                            />
                          </div>
                        </CardContent>
                      </Card>

                      {/* Channel Subscription Types */}
                      <Card>
                        <CardHeader className="pb-4">
                          <CardTitle className="text-base">{channel} Subscription Types</CardTitle>
                          <CardDescription>Toggle which {channel.toLowerCase()} subscriptions are visible to contacts</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Subscription</TableHead>
                                <TableHead className="text-right">Visible</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {getSubsByChannel(channel).map(({ sub, originalIndex }) => (
                                <TableRow key={sub.name}>
                                  <TableCell className="font-medium">{sub.name}</TableCell>
                                  <TableCell className="text-right">
                                    <Switch
                                      checked={sub.visibleInPreferenceCenter}
                                      onCheckedChange={() => toggleSubscriptionVisibility(originalIndex)}
                                    />
                                  </TableCell>
                                </TableRow>
                              ))}
                              {getSubsByChannel(channel).length === 0 && (
                                <TableRow>
                                  <TableCell colSpan={2} className="text-center text-muted-foreground py-6">
                                    No {channel} subscription types configured
                                  </TableCell>
                                </TableRow>
                              )}
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
                            <Label htmlFor={`pc-color-${channel}`}>Primary Color (HSL)</Label>
                            <div className="flex items-center gap-3">
                              <Input
                                id={`pc-color-${channel}`}
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
                            <Label htmlFor={`pc-privacy-${channel}`}>Privacy Policy URL</Label>
                            <Input
                              id={`pc-privacy-${channel}`}
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
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PreferenceCenter;
