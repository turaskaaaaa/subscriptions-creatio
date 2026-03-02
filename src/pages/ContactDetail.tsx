import { useParams, useNavigate } from "react-router-dom";
import { contactsData } from "@/data/contactsData";
import TopBar from "@/components/TopBar";
import AppSidebar from "@/components/AppSidebar";
import { ArrowLeft, Tag, Lock, MessageSquare, Paperclip, Plus, RefreshCw, MoreVertical, Search, ChevronUp, User, Mail, Phone, X, ShieldAlert, Ban, Clock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const ContactDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const contact = contactsData.find((c) => c.id === Number(id));

  if (!contact) {
    return (
      <div className="flex flex-col h-screen overflow-hidden">
        <TopBar />
        <div className="flex flex-1 overflow-hidden">
          <AppSidebar />
          <div className="flex-1 flex items-center justify-center">
            <p className="text-muted-foreground">Contact not found</p>
          </div>
        </div>
      </div>);

  }

  const isSubscribed = contact.subscriptions.some((s) => s.status === "Subscribed");

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <AppSidebar />
        <div className="flex-1 flex flex-col overflow-hidden bg-background">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <div className="flex items-center gap-3">
              <button onClick={() => navigate("/contacts")} className="text-muted-foreground hover:text-foreground">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-xl font-semibold text-foreground">{contact.fullName}</h1>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => navigate("/contacts")} className="text-sm text-muted-foreground hover:text-foreground">
                Close
              </button>
              <Lock className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>

          {/* Tag row + Feed/Attachments */}
          <div className="flex items-center justify-between px-6 py-2 border-b border-border">
            <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
              <Tag className="w-3.5 h-3.5" /> Add tag
            </button>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
                <MessageSquare className="w-3.5 h-3.5" /> Feed
              </button>
              <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
                <Paperclip className="w-3.5 h-3.5" /> Attachments
              </button>
            </div>
          </div>

          {/* Main content */}
          <div className="flex flex-1 overflow-hidden">
            {/* Left panel - Contact info */}
            <div className="w-[320px] min-w-[320px] border-r border-border overflow-y-auto p-6 space-y-6">
              {/* Avatar & name card */}
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center shrink-0">
                  <User className="w-8 h-8 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{contact.fullName}</p>
                  <p className="text-xs text-muted-foreground">{contact.birthDate}</p>
                  <p className="text-xs text-muted-foreground">{contact.country}</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground">Account</p>
                  <p className="text-sm text-primary cursor-pointer hover:underline">{contact.account}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Full job title</p>
                  <p className="text-sm text-foreground">{contact.jobTitle}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Type</p>
                  <p className="text-sm text-foreground">{contact.type}</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-destructive" />
                    <span className="text-sm text-primary cursor-pointer hover:underline">{contact.email}</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Mobile phone</p>
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-sm text-foreground">{contact.mobilePhone}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right panel - Tabs */}
            <div className="flex-1 overflow-y-auto">
              <Tabs defaultValue="subscriptions" className="w-full">
                <TabsList className="w-full justify-start bg-transparent border-b border-border rounded-none h-auto p-0 px-6 gap-0">
                  {["CONTACT INFO", "TIMELINE", "SUBSCRIPTIONS", "SALES", "MARKETING", "SERVICE"].map((tab) =>
                  <TabsTrigger
                    key={tab}
                    value={tab.toLowerCase().replace(" ", "-")}
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-3 text-xs font-semibold uppercase tracking-wide">
                    
                      {tab}
                    </TabsTrigger>
                  )}
                </TabsList>

                <TabsContent value="subscriptions" className="p-6 space-y-6">
                  {/* Primary email banner */}
                  <div className="border-2 border-primary/40 bg-primary/5 rounded-lg p-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Primary communication email</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
                        <Mail className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{contact.email}</p>
                        <p className="text-xs text-muted-foreground">All opted-in and transactional emails will be delivered to this address</p>
                      </div>
                      <span className="ml-auto inline-flex items-center gap-1.5 text-xs font-medium bg-primary/10 text-primary border border-primary/30 rounded-full px-3 py-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        Primary
                      </span>
                    </div>
                  </div>

                  {/* Subscriptions table */}
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">SUBSCRIPTION TYPES</p>
                    <div className="border border-border rounded-lg overflow-hidden">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-muted/80">
                            <th className="text-left py-2.5 px-4 font-semibold text-xs uppercase tracking-wider text-muted-foreground">SUBSCRIPTION TYPE

                            </th>
                            <th className="text-left py-2.5 px-4 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Channel</th>
                            <th className="text-left py-2.5 px-4 font-semibold text-xs uppercase tracking-wider text-muted-foreground">DELIVERS TO (TARGET ADRESS)</th>
                            <th className="text-left py-2.5 px-4 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {contact.subscriptions.map((sub, idx) => <tr key={idx} className="border-t border-border hover:bg-secondary/30 transition-colors">
                              <td className="py-3 px-4 font-medium text-foreground">{sub.type}</td>
                              <td className="py-3 px-4 text-foreground">
                                <span className="inline-flex items-center gap-1.5">
                                  {sub.channel === "SMS" ? <Phone className="w-3.5 h-3.5 text-muted-foreground" /> : <Mail className="w-3.5 h-3.5 text-muted-foreground" />}
                                  {sub.channel}
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                <span className="inline-flex items-center gap-1.5 text-sm text-foreground">
                                  → {sub.channel === "SMS" ? contact.mobilePhone : contact.email}
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                <span className={`inline-flex items-center gap-1.5 text-xs rounded-full px-2.5 py-1 font-medium ${sub.status === "Subscribed" ?
                              "bg-primary/10 text-primary border border-primary/30" :
                              "bg-destructive/10 text-destructive border border-destructive/30"}`}>
                                  <span className={`w-1.5 h-1.5 rounded-full ${sub.status === "Subscribed" ? "bg-primary" : "bg-destructive"}`} />
                                  {sub.status === "Subscribed" ? "Opted In" : "Opted Out"}
                                </span>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {/* Suppressions / Blocked List */}
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">SUPPRESSIONS (BLOCKED LIST)</p>
                    {contact.suppressions.length === 0 ? (
                      <div className="border border-border rounded-lg p-6 flex flex-col items-center gap-2 text-muted-foreground">
                        <ShieldAlert className="w-6 h-6" />
                        <p className="text-sm">No suppressed addresses for this contact</p>
                      </div>
                    ) : (
                      <div className="border border-border rounded-lg overflow-hidden">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-muted/80">
                              <th className="text-left py-2.5 px-4 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Channel</th>
                              <th className="text-left py-2.5 px-4 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Blocked Address</th>
                              <th className="text-left py-2.5 px-4 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Reason</th>
                              <th className="text-left py-2.5 px-4 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Date Blocked</th>
                              <th className="text-left py-2.5 px-4 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Source</th>
                            </tr>
                          </thead>
                          <tbody>
                            {contact.suppressions.map((sup, idx) => (
                              <tr key={idx} className="border-t border-border hover:bg-secondary/30 transition-colors">
                                <td className="py-3 px-4 text-foreground">
                                  <span className="inline-flex items-center gap-1.5">
                                    {sup.channel === "SMS" ? <Phone className="w-3.5 h-3.5 text-muted-foreground" /> : <Mail className="w-3.5 h-3.5 text-muted-foreground" />}
                                    {sup.channel}
                                  </span>
                                </td>
                                <td className="py-3 px-4 font-medium text-foreground">{sup.address}</td>
                                <td className="py-3 px-4">
                                  <span className={`inline-flex items-center gap-1.5 text-xs rounded-full px-2.5 py-1 font-medium ${
                                    sup.reason === "Hard bounce" ? "bg-destructive/10 text-destructive border border-destructive/30" :
                                    sup.reason === "Soft bounce" ? "bg-yellow-500/10 text-yellow-600 border border-yellow-500/30" :
                                    sup.reason === "Spam complaint" ? "bg-destructive/10 text-destructive border border-destructive/30" :
                                    "bg-muted text-muted-foreground border border-border"
                                  }`}>
                                    <Ban className="w-3 h-3" />
                                    {sup.reason}
                                  </span>
                                </td>
                                <td className="py-3 px-4 text-muted-foreground">{sup.blockedDate}</td>
                                <td className="py-3 px-4 text-muted-foreground text-xs">{sup.source}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>

                  {/* Consent Timeline */}
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">CONSENT TIMELINE</p>
                    {contact.consentTimeline.length === 0 ? (
                      <div className="border border-border rounded-lg p-6 flex flex-col items-center gap-2 text-muted-foreground">
                        <Clock className="w-6 h-6" />
                        <p className="text-sm">No consent events recorded</p>
                      </div>
                    ) : (
                      <div className="border border-border rounded-lg overflow-hidden">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-muted/80">
                              <th className="text-left py-2.5 px-4 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Date</th>
                              <th className="text-left py-2.5 px-4 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Action</th>
                              <th className="text-left py-2.5 px-4 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Subscription</th>
                              <th className="text-left py-2.5 px-4 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Channel</th>
                              <th className="text-left py-2.5 px-4 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Source</th>
                              <th className="text-left py-2.5 px-4 font-semibold text-xs uppercase tracking-wider text-muted-foreground">Modified By</th>
                            </tr>
                          </thead>
                          <tbody>
                            {contact.consentTimeline.map((evt, idx) => (
                              <tr key={idx} className="border-t border-border hover:bg-secondary/30 transition-colors">
                                <td className="py-3 px-4 text-muted-foreground whitespace-nowrap">
                                  <span className="inline-flex items-center gap-1.5">
                                    <Clock className="w-3.5 h-3.5" />
                                    {evt.date}
                                  </span>
                                </td>
                                <td className="py-3 px-4">
                                  <span className={`inline-flex items-center gap-1.5 text-xs rounded-full px-2.5 py-1 font-medium ${
                                    evt.action === "Opted In" || evt.action === "Re-subscribed" || evt.action === "Consent given"
                                      ? "bg-primary/10 text-primary border border-primary/30"
                                      : "bg-destructive/10 text-destructive border border-destructive/30"
                                  }`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${
                                      evt.action === "Opted In" || evt.action === "Re-subscribed" || evt.action === "Consent given"
                                        ? "bg-primary" : "bg-destructive"
                                    }`} />
                                    {evt.action}
                                  </span>
                                </td>
                                <td className="py-3 px-4 font-medium text-foreground">{evt.subscriptionType}</td>
                                <td className="py-3 px-4 text-foreground">
                                  <span className="inline-flex items-center gap-1.5">
                                    {evt.channel === "SMS" ? <Phone className="w-3.5 h-3.5 text-muted-foreground" /> : <Mail className="w-3.5 h-3.5 text-muted-foreground" />}
                                    {evt.channel}
                                  </span>
                                </td>
                                <td className="py-3 px-4 text-muted-foreground text-xs">{evt.source}</td>
                                <td className="py-3 px-4 text-muted-foreground text-xs">{evt.modifiedBy}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="contact-info" className="p-6">
                  <p className="text-sm text-muted-foreground">Contact information details will appear here.</p>
                </TabsContent>
                <TabsContent value="timeline" className="p-6">
                  <p className="text-sm text-muted-foreground">Timeline events will appear here.</p>
                </TabsContent>
                <TabsContent value="sales" className="p-6">
                  <p className="text-sm text-muted-foreground">Sales information will appear here.</p>
                </TabsContent>
                <TabsContent value="marketing" className="p-6">
                  <p className="text-sm text-muted-foreground">Marketing information will appear here.</p>
                </TabsContent>
                <TabsContent value="service" className="p-6">
                  <p className="text-sm text-muted-foreground">Service information will appear here.</p>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>);

};

export default ContactDetail;