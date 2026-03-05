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
import { Save, MailX, MessageSquareMore, ClipboardList, Plus, X, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";

const channels = ["Email", "WhatsApp", "SMS"] as const;

const PreferenceCenter = () => {
  const { preferenceCenterConfig: config, updatePreferenceCenterField } = useSettings();
  const [activePreviewTab, setActivePreviewTab] = useState("unsubscribe");

  const unsub = config.unsubscribePage;
  const prefs = config.managePreferencesPage;

  const updateUnsubField = <K extends keyof typeof unsub>(key: K, value: (typeof unsub)[K]) => {
    updatePreferenceCenterField("unsubscribePage", { ...unsub, [key]: value });
  };

  const updatePrefsField = <K extends keyof typeof prefs>(key: K, value: (typeof prefs)[K]) => {
    updatePreferenceCenterField("managePreferencesPage", { ...prefs, [key]: value });
  };

  const toggleSubscriptionVisibility = (index: number) => {
    const updated = [...config.subscriptionTypes];
    updated[index] = { ...updated[index], visibleInPreferenceCenter: !updated[index].visibleInPreferenceCenter };
    updatePreferenceCenterField("subscriptionTypes", updated);
  };

  const getSubsByChannel = (channel: string) =>
    config.subscriptionTypes
      .map((sub, i) => ({ sub, originalIndex: i }))
      .filter(({ sub }) => sub.channel === channel);

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
                <p className="text-sm text-muted-foreground mt-1">Configure what contacts see when managing their subscriptions</p>
              </div>
              <Button onClick={() => toast.success("Preference center settings saved")} size="sm">
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
            </div>

            <Tabs defaultValue="Email">
              <TabsList className="w-full justify-start border-b rounded-none bg-transparent p-0 h-auto">
                {channels.map((ch) => (
                  <TabsTrigger
                    key={ch}
                    value={ch}
                    className="uppercase tracking-wide text-xs font-semibold rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3"
                  >
                    {ch}
                  </TabsTrigger>
                ))}
              </TabsList>

              {channels.map((channel) => (
                <TabsContent key={channel} value={channel}>
                  <div className="flex gap-8 mt-6">
                    {/* Left column — Config tabs synced with preview */}
                    <div className="flex-1 min-w-0">
                      <Tabs value={activePreviewTab} onValueChange={setActivePreviewTab}>
                        <TabsList className="w-full grid grid-cols-3 mb-4">
                          <TabsTrigger value="unsubscribe" className="text-xs gap-1.5">
                            <MailX className="w-3.5 h-3.5" /> Unsubscribe
                          </TabsTrigger>
                          <TabsTrigger value="feedback" className="text-xs gap-1.5">
                            <MessageSquareMore className="w-3.5 h-3.5" /> Feedback
                          </TabsTrigger>
                          <TabsTrigger value="preferences" className="text-xs gap-1.5">
                            <ClipboardList className="w-3.5 h-3.5" /> Preferences
                          </TabsTrigger>
                        </TabsList>

                        {/* Tab 1 — Unsubscribe Page */}
                        <TabsContent value="unsubscribe" className="space-y-6">
                          <Card>
                            <CardHeader className="pb-4">
                              <CardTitle className="text-base">Unsubscribe Page</CardTitle>
                              <CardDescription>Configure the page contacts see when unsubscribing</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <div className="space-y-2">
                                <Label>Page Name</Label>
                                <Input value={unsub.pageName} onChange={e => updateUnsubField("pageName", e.target.value)} placeholder="Unsubscribe" />
                              </div>
                              <div className="space-y-2">
                                <Label>Confirmation Message</Label>
                                <Textarea rows={2} value={unsub.confirmationMessage} onChange={e => updateUnsubField("confirmationMessage", e.target.value)} />
                              </div>
                              <div className="space-y-2">
                                <Label>Logo URL</Label>
                                <Input placeholder="https://example.com/logo.png" value={config.logoUrl} onChange={e => updatePreferenceCenterField("logoUrl", e.target.value)} />
                              </div>
                              <div className="space-y-2">
                                <Label>Footer Text</Label>
                                <Input value={config.footerText} onChange={e => updatePreferenceCenterField("footerText", e.target.value)} />
                              </div>
                              <div className="flex items-center justify-between">
                                <div>
                                  <Label>Show "Manage Preferences" Link</Label>
                                  <p className="text-xs text-muted-foreground mt-0.5">Display a link to manage preferences instead of fully unsubscribing</p>
                                </div>
                                <Switch checked={unsub.showManagePreferencesLink} onCheckedChange={v => updateUnsubField("showManagePreferencesLink", v)} />
                              </div>
                            </CardContent>
                          </Card>
                        </TabsContent>

                        {/* Tab 2 — Feedback Page */}
                        <TabsContent value="feedback" className="space-y-6">
                          <Card>
                            <CardHeader className="pb-4">
                              <CardTitle className="text-base">Feedback Page</CardTitle>
                              <CardDescription>Configure the feedback form shown before confirming unsubscribe</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <Label>Ask Reason for Unsubscribing</Label>
                                  <p className="text-xs text-muted-foreground mt-0.5">Show a reason selector before confirming</p>
                                </div>
                                <Switch checked={unsub.showReasonSelection} onCheckedChange={v => updateUnsubField("showReasonSelection", v)} />
                              </div>
                              {unsub.showReasonSelection && (
                                <div className="space-y-2 pl-1">
                                  <Label className="text-sm">Reasons</Label>
                                  {unsub.reasons.map((reason, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                      <Input value={reason} onChange={e => updateReason(i, e.target.value)} placeholder="e.g. Too many emails" className="flex-1" />
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
                            </CardContent>
                          </Card>
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
                                <Input value={config.title} onChange={e => updatePreferenceCenterField("title", e.target.value)} />
                              </div>
                              <div className="space-y-2">
                                <Label>Welcome Message</Label>
                                <Textarea rows={2} value={config.welcomeMessage} onChange={e => updatePreferenceCenterField("welcomeMessage", e.target.value)} />
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
                                  {getSubsByChannel(channel).map(({ sub, originalIndex }) => (
                                    <TableRow key={sub.name}>
                                      <TableCell className="font-medium">{sub.name}</TableCell>
                                      <TableCell className="text-right">
                                        <Switch checked={sub.visibleInPreferenceCenter} onCheckedChange={() => toggleSubscriptionVisibility(originalIndex)} />
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
                                <Switch checked={config.showLegalBasis} onCheckedChange={v => updatePreferenceCenterField("showLegalBasis", v)} />
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
              ))}
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PreferenceCenter;
