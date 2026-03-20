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
import { Save, MailX, MessageSquareMore, ClipboardList, Plus, X, Shield, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";

const channels = ["Email", "WhatsApp", "SMS"] as const;

const PreferenceCenter = () => {
  const { preferenceCenterConfig: config, updatePreferenceCenterField, selfServiceLegalBasis } = useSettings();
  const [activePreviewTab, setActivePreviewTab] = useState("unsubscribe");

  const unsub = config.unsubscribePage;
  const prefs = config.managePreferencesPage;

  // HSL string "214 80% 52%" <-> hex conversion
  const hslToHex = (hslStr: string): string => {
    const parts = hslStr.match(/[\d.]+/g);
    if (!parts || parts.length < 3) return "#3b82f6";
    const h = parseFloat(parts[0]) / 360;
    const s = parseFloat(parts[1]) / 100;
    const l = parseFloat(parts[2]) / 100;
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    const r = Math.round(hue2rgb(p, q, h + 1 / 3) * 255);
    const g = Math.round(hue2rgb(p, q, h) * 255);
    const b = Math.round(hue2rgb(p, q, h - 1 / 3) * 255);
    return `#${[r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("")}`;
  };

  const hexToHsl = (hex: string): string => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return config.primaryColor;
    const r = parseInt(result[1], 16) / 255;
    const g = parseInt(result[2], 16) / 255;
    const b = parseInt(result[3], 16) / 255;
    const max = Math.max(r, g, b),min = Math.min(r, g, b);
    let h = 0,s = 0;
    const l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:h = ((g - b) / d + (g < b ? 6 : 0)) / 6;break;
        case g:h = ((b - r) / d + 2) / 6;break;
        case b:h = ((r - g) / d + 4) / 6;break;
      }
    }
    return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
  };

  const updateUnsubField = <K extends keyof typeof unsub,>(key: K, value: (typeof unsub)[K]) => {
    updatePreferenceCenterField("unsubscribePage", { ...unsub, [key]: value });
  };

  const updatePrefsField = <K extends keyof typeof prefs,>(key: K, value: (typeof prefs)[K]) => {
    updatePreferenceCenterField("managePreferencesPage", { ...prefs, [key]: value });
  };

  const toggleSubscriptionVisibility = (index: number) => {
    const updated = [...config.subscriptionTypes];
    updated[index] = { ...updated[index], visibleInPreferenceCenter: !updated[index].visibleInPreferenceCenter };
    updatePreferenceCenterField("subscriptionTypes", updated);
  };

  const getSubsByChannel = (channel: string) =>
  config.subscriptionTypes.
  map((sub, i) => ({ sub, originalIndex: i })).
  filter(({ sub }) => sub.channel === channel);

  // Feedback reason helpers
  const addReason = () => updateUnsubField("reasons", [...unsub.reasons, ""]);
  const updateReason = (index: number, value: string) => {
    const updated = [...unsub.reasons];
    updated[index] = value;
    updateUnsubField("reasons", updated);
  };
  const removeReason = (index: number) => updateUnsubField("reasons", unsub.reasons.filter((_, i) => i !== index));

  // Content category helpers
  const addCategory = () => updatePrefsField("contentCategories", [...prefs.contentCategories, ""]);
  const updateCategory = (index: number, value: string) => {
    const updated = [...prefs.contentCategories];
    updated[index] = value;
    updatePrefsField("contentCategories", updated);
  };
  const removeCategory = (index: number) => updatePrefsField("contentCategories", prefs.contentCategories.filter((_, i) => i !== index));

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
                <p className="text-sm text-muted-foreground mt-1">Customize the experience contacts see when managing their communication preferences.</p>
              </div>
              <Button onClick={() => toast.success("Preference center settings saved")} size="sm">
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
            </div>

            <Tabs defaultValue="Email">
              <TabsList className="w-full justify-start border-b rounded-none bg-transparent p-0 h-auto">
                {channels.map((ch) => <TabsTrigger
                    key={ch}
                    value={ch}
                    className="uppercase tracking-wide text-xs font-semibold rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3">
                  
                    {ch}
                  </TabsTrigger>
                )}
              </TabsList>

              {channels.map((channel) =>
              <TabsContent key={channel} value={channel}>
                  <div className="flex gap-8 mt-6">
                    {/* Left column — Config tabs synced with preview */}
                    <div className="flex-1 min-w-0">
                      <Tabs value={activePreviewTab} onValueChange={setActivePreviewTab}>
                        <TabsList className="w-full grid grid-cols-3 mb-4">
                          <TabsTrigger value="unsubscribe" className="text-xs gap-1.5">
                            <MailX className="w-3.5 h-3.5" /> UnsubscribePage
                          </TabsTrigger>
                          <TabsTrigger value="preferences" className="text-xs gap-1.5">
                            <ClipboardList className="w-3.5 h-3.5" /> PreferencesCenter
                          </TabsTrigger>
                          <TabsTrigger value="feedback" className="text-xs gap-1.5">
                            <MessageSquareMore className="w-3.5 h-3.5" /> Feedback
                          </TabsTrigger>
                        </TabsList>

                        {/* Tab 1 — Unsubscribe Page */}
                        <TabsContent value="unsubscribe" className="space-y-6">
                          <Card>
                            <CardHeader className="pb-4">
                              <CardTitle className="text-base">Unsubscribe Page Settings</CardTitle>
                              <CardDescription>Customize the page contacts see when they unsubscribe from your emails</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <div className="space-y-2">
                                <Label>Page Name</Label>
                                <Input value={unsub.pageName} onChange={(e) => updateUnsubField("pageName", e.target.value)} placeholder="Unsubscribe" />
                              </div>
                              <div className="space-y-2">
                                <Label>Confirmation Message</Label>
                                <Textarea rows={2} value={unsub.confirmationMessage} onChange={(e) => updateUnsubField("confirmationMessage", e.target.value)} />
                              </div>
                              <div className="grid grid-cols-[1fr_auto] gap-3 items-end">
                                <div className="space-y-2">
                                  <Label>Company Logo</Label>
                                  <Input placeholder="https://example.com/logo.png" value={config.logoUrl} onChange={(e) => updatePreferenceCenterField("logoUrl", e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                  <Label>Primary Color</Label>
                                  <input type="color" value={hslToHex(config.primaryColor)} onChange={(e) => updatePreferenceCenterField("primaryColor", hexToHsl(e.target.value))} className="w-10 h-10 rounded-md border border-input cursor-pointer p-0.5" />
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label>Footer Message</Label>
                                <Input value={config.footerText} onChange={(e) => updatePreferenceCenterField("footerText", e.target.value)} />
                              </div>
                              <div className="flex items-center justify-between">
                                <div>
                                  <Label>Show "Manage Preferences" options</Label>
                                  <p className="text-xs text-muted-foreground mt-0.5">Allow contacts to update their email preferences instead of unsubscribing completely.</p>
                                </div>
                                <Switch checked={unsub.showManagePreferencesLink} onCheckedChange={(v) => updateUnsubField("showManagePreferencesLink", v)} />
                              </div>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader className="pb-4">
                              <CardTitle className="text-base">Compliance & Legal</CardTitle>
                              <CardDescription>Display the legal reason you are allowed to send emails (for example, explicit consent).</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <Label>Show legal basis for communication</Label>
                                  <p className="text-xs text-muted-foreground mt-0.5">Display the legal basis for data processing</p>
                                </div>
                                <Switch checked={config.showLegalBasis} onCheckedChange={(v) => updatePreferenceCenterField("showLegalBasis", v)} />
                              </div>
                              <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/40 border border-border">
                                <Shield className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                                <div>
                                  <p className="text-xs text-muted-foreground">
                                    Self-service legal basis: <span className="font-medium text-foreground">{selfServiceLegalBasis}</span>
                                  </p>
                                  <p className="text-[10px] text-muted-foreground mt-0.5">Configured in Bulk Email Settings → Opt-in / Opt-out</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </TabsContent>

                        {/* Tab 2 — Feedback Page */}
                        <TabsContent value="feedback" className="space-y-6">
                          <Card>
                            <CardHeader className="pb-4">
                              <CardTitle className="text-base">Feedback Page</CardTitle>
                              <CardDescription>Configure the feedback form shown after a contact unsubscribes</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <Label>Enable Feedback Page</Label>
                                  <p className="text-xs text-muted-foreground mt-0.5">Show a feedback form after contacts unsubscribe</p>
                                </div>
                                <Switch checked={unsub.showFeedbackPage} onCheckedChange={(v) => updateUnsubField("showFeedbackPage", v)} />
                              </div>
                              {unsub.showFeedbackPage && <>
                              <div className="grid grid-cols-[1fr_auto] gap-3 items-end">
                                <div className="space-y-2">
                                  <Label>Company Logo</Label>
                                  <Input placeholder="https://example.com/logo.png" value={config.logoUrl} onChange={(e) => updatePreferenceCenterField("logoUrl", e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                  <Label>Primary Color</Label>
                                  <input type="color" value={hslToHex(config.primaryColor)} onChange={(e) => updatePreferenceCenterField("primaryColor", hexToHsl(e.target.value))} className="w-10 h-10 rounded-md border border-input cursor-pointer p-0.5" />
                                </div>
                              </div>
                              <div className="flex items-center justify-between">
                                <div>
                                  <Label>Ask Reason for Unsubscribing</Label>
                                  <p className="text-xs text-muted-foreground mt-0.5">Show a reason selector before confirming</p>
                                </div>
                                <Switch checked={unsub.showReasonSelection} onCheckedChange={(v) => updateUnsubField("showReasonSelection", v)} />
                              </div>
                              {unsub.showReasonSelection &&
                            <div className="space-y-2 pl-1">
                                  <Label className="text-sm">Reasons</Label>
                                  {unsub.reasons.map((reason, i) =>
                              <div key={i} className="flex items-center gap-2">
                                      <Input value={reason} onChange={(e) => updateReason(i, e.target.value)} placeholder="e.g. Too many emails" className="flex-1" />
                                      <Button variant="ghost" size="icon" className="shrink-0 h-8 w-8" onClick={() => removeReason(i)}>
                                        <X className="w-4 h-4" />
                                      </Button>
                                    </div>
                              )}
                                  <Button variant="outline" size="sm" onClick={addReason} className="mt-1">
                                    <Plus className="w-4 h-4 mr-1" /> Add Reason
                                  </Button>
                                </div>
                            }
                              </>}
                            </CardContent>
                          </Card>

                          {unsub.showFeedbackPage && <Card>
                            <CardHeader className="pb-4">
                              <CardTitle className="text-base">Compliance</CardTitle>
                              <CardDescription>Legal and compliance settings for the feedback page</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <Label>Show Legal Basis to Contacts</Label>
                                  <p className="text-xs text-muted-foreground mt-0.5">Display the legal basis for data processing</p>
                                </div>
                                <Switch checked={config.showLegalBasis} onCheckedChange={(v) => updatePreferenceCenterField("showLegalBasis", v)} />
                              </div>
                              <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/40 border border-border">
                                <Shield className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                                <div>
                                  <p className="text-xs text-muted-foreground">
                                    Self-service legal basis: <span className="font-medium text-foreground">{selfServiceLegalBasis}</span>
                                  </p>
                                  <p className="text-[10px] text-muted-foreground mt-0.5">Configured in Bulk Email Settings → Opt-in / Opt-out</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>}
                        </TabsContent>

                        {/* Tab 3 — Manage Preferences */}
                        <TabsContent value="preferences" className="space-y-6">
                          {/* General info */}
                          <Card>
                            <CardHeader className="pb-4">
                              <CardTitle className="text-base">General Settings</CardTitle>
                              <CardDescription>Title and message displayed on the preferences page</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <div className="space-y-2">
                                <Label>Page Title</Label>
                                <Input value={config.title} onChange={(e) => updatePreferenceCenterField("title", e.target.value)} />
                              </div>
                              <div className="space-y-2">
                                <Label>Welcome Message</Label>
                                <Textarea rows={2} value={config.welcomeMessage} onChange={(e) => updatePreferenceCenterField("welcomeMessage", e.target.value)} />
                              </div>
                              <div className="grid grid-cols-[1fr_auto] gap-3 items-end">
                                <div className="space-y-2">
                                  <Label>Company Logo</Label>
                                  <Input placeholder="https://example.com/logo.png" value={config.logoUrl} onChange={(e) => updatePreferenceCenterField("logoUrl", e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                  <Label>Primary Color</Label>
                                  <input type="color" value={hslToHex(config.primaryColor)} onChange={(e) => updatePreferenceCenterField("primaryColor", hexToHsl(e.target.value))} className="w-10 h-10 rounded-md border border-input cursor-pointer p-0.5" />
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          {/* Subscription types */}
                          <Card>
                            <CardHeader className="pb-4">
                              <CardTitle className="text-base">{channel} Subscription Types</CardTitle>
                              <CardDescription>Toggle which subscriptions are visible to contacts</CardDescription>
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
                                  {getSubsByChannel(channel).map(({ sub, originalIndex }) =>
                                <TableRow key={sub.name}>
                                      <TableCell className="font-medium">{sub.name}</TableCell>
                                      <TableCell className="text-right">
                                        <Switch checked={sub.visibleInPreferenceCenter} onCheckedChange={() => toggleSubscriptionVisibility(originalIndex)} />
                                      </TableCell>
                                    </TableRow>
                                )}
                                  {getSubsByChannel(channel).length === 0 &&
                                <TableRow>
                                      <TableCell colSpan={2} className="text-center text-muted-foreground py-6">
                                        No {channel} subscription types configured
                                      </TableCell>
                                    </TableRow>
                                }
                                </TableBody>
                              </Table>
                            </CardContent>
                          </Card>


                          {/* Compliance */}
                          <Card>
                            <CardHeader className="pb-4">
                              <CardTitle className="text-base">Compliance</CardTitle>
                              <CardDescription>Legal and compliance settings</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <Label>Show Legal Basis to Contacts</Label>
                                  <p className="text-xs text-muted-foreground mt-0.5">Display the legal basis for data processing</p>
                                </div>
                                <Switch checked={config.showLegalBasis} onCheckedChange={(v) => updatePreferenceCenterField("showLegalBasis", v)} />
                              </div>
                              <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/40 border border-border">
                                <Shield className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                                <div>
                                  <p className="text-xs text-muted-foreground">
                                    Self-service legal basis: <span className="font-medium text-foreground">{selfServiceLegalBasis}</span>
                                  </p>
                                  <p className="text-[10px] text-muted-foreground mt-0.5">Configured in Bulk Email Settings → Opt-in / Opt-out</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </TabsContent>
                      </Tabs>
                    </div>

                    {/* Right column — Live preview */}
                    <div className="w-[380px] shrink-0">
                      <div className="sticky top-6">
                        <h3 className="text-sm font-medium text-muted-foreground mb-3">Live Preview</h3>
                        <PreferenceCenterPreview activeTab={activePreviewTab} />
                      </div>
                    </div>
                  </div>
                </TabsContent>
              )}
            </Tabs>
          </div>
        </main>
      </div>
    </div>);

};

export default PreferenceCenter;