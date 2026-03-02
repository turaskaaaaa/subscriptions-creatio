import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Folder, Tag, Search, Plus, MoreHorizontal, RefreshCw, SlidersHorizontal, BarChart3, Download, Mail, ArrowUpDown } from "lucide-react";
import { contactsData } from "@/data/contactsData";
import { Checkbox } from "@/components/ui/checkbox";
import NewContactDialog from "./NewContactDialog";

const ContactsTable = () => {
  const [newContactOpen, setNewContactOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-background">
      {/* Page header */}
      <div className="flex items-center justify-between px-6 py-4">
        <h1 className="text-xl font-semibold text-foreground">Contacts</h1>
        <div className="flex items-center gap-2">
          <button onClick={() => setNewContactOpen(true)} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
            <Plus className="w-4 h-4" />
            New
          </button>
          <button className="flex items-center gap-2 border border-border text-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-secondary transition-colors">
            <Download className="w-4 h-4" />
            Import
          </button>
          <button className="p-2 text-muted-foreground hover:text-foreground">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filters bar */}
      <div className="flex items-center justify-between px-6 pb-3">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <Folder className="w-3.5 h-3.5" /> Folders
          </button>
          <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <Tag className="w-3.5 h-3.5" /> Tag
          </button>
          <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <Search className="w-3.5 h-3.5" /> Search
          </button>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Σ Summaries</span>
          <RefreshCw className="w-3.5 h-3.5 text-muted-foreground cursor-pointer" />
          <SlidersHorizontal className="w-3.5 h-3.5 text-muted-foreground cursor-pointer" />
          <BarChart3 className="w-3.5 h-3.5 text-muted-foreground cursor-pointer" />
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto px-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="text-left py-2 px-2 font-medium text-muted-foreground w-8">
                <Checkbox className="h-4 w-4" />
              </th>
              <th className="text-left py-2 px-2 font-medium text-muted-foreground min-w-[250px]">
                <span className="flex items-center gap-1 cursor-pointer">
                  Full name <ArrowUpDown className="w-3 h-3" />
                </span>
              </th>
              <th className="text-left py-2 px-2 font-medium text-muted-foreground min-w-[120px]">Type</th>
              <th className="text-left py-2 px-2 font-medium text-muted-foreground min-w-[150px]">Account</th>
              <th className="text-left py-2 px-2 font-medium text-muted-foreground min-w-[150px]">Mobile phone</th>
              <th className="text-left py-2 px-2 font-medium text-muted-foreground min-w-[280px]">Email</th>
              <th className="text-left py-2 px-2 font-medium text-muted-foreground">Country</th>
              <th className="text-right py-2 px-2 font-medium text-muted-foreground w-8">
                <Plus className="w-3.5 h-3.5 inline" />
              </th>
            </tr>
          </thead>
          <tbody>
            {contactsData.map((contact) => (
              <tr key={contact.id} className="border-b border-border hover:bg-secondary/30 transition-colors group">
                <td className="py-2 px-2 text-muted-foreground">{contact.id}</td>
                <td className="py-2 px-2">
                  <span className="text-primary cursor-pointer hover:underline" onClick={() => navigate(`/contacts/${contact.id}`)}>
                    {contact.fullName}
                  </span>
                </td>
                <td className="py-2 px-2 text-foreground">{contact.type}</td>
                <td className="py-2 px-2 text-foreground">{contact.account}</td>
                <td className="py-2 px-2 text-foreground">{contact.mobilePhone}</td>
                <td className="py-2 px-2">
                  {contact.email && (
                    <span className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-destructive" />
                      <span className="text-primary cursor-pointer hover:underline">{contact.email}</span>
                    </span>
                  )}
                </td>
                <td className="py-2 px-2 text-foreground">{contact.country}</td>
                <td className="py-2 px-2"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <NewContactDialog open={newContactOpen} onOpenChange={setNewContactOpen} />
    </div>
  );
};

export default ContactsTable;
