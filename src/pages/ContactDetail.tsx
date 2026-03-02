import { useParams, useNavigate } from "react-router-dom";
import { contactsData } from "@/data/contactsData";
import TopBar from "@/components/TopBar";
import AppSidebar from "@/components/AppSidebar";
import { ArrowLeft, Tag, Lock, MessageSquare, Paperclip, Plus, RefreshCw, MoreVertical, Search, ChevronUp, User, Mail, Phone, X } from "lucide-react";
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
      </div>
    );
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
                  {["CONTACT INFO", "TIMELINE", "SUBSCRIPTIONS", "SALES", "MARKETING", "SERVICE"].map((tab) => (
                    <TabsTrigger
                      key={tab}
                      value={tab.toLowerCase().replace(" ", "-")}
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-3 text-xs font-semibold uppercase tracking-wide"
                    >
                      {tab}
                    </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value="subscriptions" className="p-6 space-y-6">
                  {/* Subscription status banner */}
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {isSubscribed
                          ? "This contact is currently subscribed to bulk marketing emails"
                          : "This contact is not subscribed to bulk marketing emails"}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        You can {isSubscribed ? "manage" : "add"} this contact to the audience of bulk marketing emails
                      </p>
                    </div>
                    <button className="flex items-center gap-1.5 text-sm text-destructive hover:text-destructive/80 whitespace-nowrap">
                      <X className="w-3.5 h-3.5" />
                      Unsubscribe contact
                    </button>
                  </div>

                  {/* Bulk email subscriptions section */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-foreground">Bulk email subscriptions</h3>
                      <RefreshCw className="w-3.5 h-3.5 text-muted-foreground cursor-pointer" />
                      <MoreVertical className="w-3.5 h-3.5 text-muted-foreground cursor-pointer" />
                      <Search className="w-3.5 h-3.5 text-muted-foreground cursor-pointer" />
                      <div className="ml-auto">
                        <ChevronUp className="w-4 h-4 text-muted-foreground cursor-pointer" />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Customize the contact's subscriptions of the contact by the bulk email type
                    </p>

                    {/* Subscriptions table */}
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-2 px-2 font-medium text-muted-foreground">Bulk email type</th>
                          <th className="text-left py-2 px-2 font-medium text-muted-foreground">Subscription status</th>
                          <th className="text-right py-2 px-2 font-medium text-muted-foreground w-16">
                            <div className="flex items-center justify-end gap-2">
                              <Plus className="w-3.5 h-3.5" />
                              <MoreVertical className="w-3.5 h-3.5" />
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {contact.subscriptions.map((sub, idx) => (
                          <tr key={idx} className="border-b border-border hover:bg-secondary/30 transition-colors">
                            <td className="py-2.5 px-2 text-foreground">{sub.type}</td>
                            <td className="py-2.5 px-2 text-foreground">{sub.status}</td>
                            <td className="py-2.5 px-2"></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mt-2">
                      <Plus className="w-3.5 h-3.5" /> New
                    </button>
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
    </div>
  );
};

export default ContactDetail;
