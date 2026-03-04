import { useState } from "react";
import { Folder, Filter, Calendar, Tag, Search, Plus, MoreHorizontal, RefreshCw, SlidersHorizontal, BarChart3, FileSpreadsheet, ClipboardCheck, SlidersHorizontal as SettingsIcon } from "lucide-react";
import { emailData } from "@/data/emailData";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import BulkEmailSettingsDialog from "./BulkEmailSettingsDialog";

const EmailTable = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-background">
      {/* Page header */}
      <div className="flex items-center justify-between px-6 py-4">
        <h1 className="text-xl font-semibold text-foreground">Bulk emails</h1>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
            <Plus className="w-4 h-4" />
            Create email
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium border border-border text-foreground hover:bg-secondary transition-colors"
            onClick={() => setSettingsOpen(true)}
          >
            <SettingsIcon className="w-4 h-4" />
            Bulk email settings
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2 text-muted-foreground hover:text-foreground">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem className="flex items-center gap-3 cursor-pointer">
                <FileSpreadsheet className="w-4 h-4 text-primary" />
                Export to Excel
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-3 cursor-pointer">
                <ClipboardCheck className="w-4 h-4 text-primary" />
                Progress check
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <BulkEmailSettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />


      {/* Filters bar */}
      <div className="flex items-center justify-between px-6 pb-3">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <Folder className="w-3.5 h-3.5" /> Folders
          </button>
          <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <Filter className="w-3.5 h-3.5" /> Status
          </button>
          <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <Calendar className="w-3.5 h-3.5" /> Created on
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
              <th className="text-left py-2 px-2 font-medium text-muted-foreground w-8"></th>
              <th className="text-left py-2 px-2 font-medium text-muted-foreground min-w-[400px]">Name</th>
              <th className="text-left py-2 px-2 font-medium text-muted-foreground">Status</th>
              <th className="text-left py-2 px-2 font-medium text-muted-foreground">Sending method</th>
              <th className="text-left py-2 px-2 font-medium text-muted-foreground">Subscription type</th>
              <th className="text-right py-2 px-2 font-medium text-muted-foreground">Delivered</th>
              <th className="text-right py-2 px-2 font-medium text-muted-foreground">Open rate, %</th>
              <th className="text-right py-2 px-2 font-medium text-muted-foreground">Click rate, %</th>
              <th className="text-right py-2 px-2 font-medium text-muted-foreground">Unsubscribe r...</th>
              <th className="text-left py-2 px-2 font-medium text-muted-foreground">Owner</th>
              <th className="text-right py-2 px-2 font-medium text-muted-foreground w-8">
                <Plus className="w-3.5 h-3.5 inline" />
              </th>
            </tr>
          </thead>
          <tbody>
            {emailData.map((row) => (
              <tr key={row.id} className="border-b border-border hover:bg-secondary/30 transition-colors">
                <td className="py-2 px-2 text-muted-foreground">{row.id}</td>
                <td className="py-2 px-2">
                  <span className="text-primary cursor-pointer hover:underline truncate block max-w-[450px]">
                    {row.name}
                  </span>
                </td>
                <td className="py-2 px-2 text-foreground">{row.status}</td>
                <td className="py-2 px-2 text-foreground">{row.sendingMethod}</td>
                <td className="py-2 px-2">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium">
                    {row.subscriptionType}
                  </span>
                </td>
                <td className="py-2 px-2 text-right text-foreground">{row.delivered.toLocaleString()}</td>
                <td className="py-2 px-2 text-right text-foreground">{row.openRate.toFixed(2)}</td>
                <td className="py-2 px-2 text-right text-foreground">{row.clickRate.toFixed(2)}</td>
                <td className="py-2 px-2 text-right text-foreground">{row.unsubscribeRate.toFixed(2)}</td>
                <td className="py-2 px-2 text-primary cursor-pointer hover:underline">{row.owner}</td>
                <td className="py-2 px-2 text-right text-muted-foreground">{row.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmailTable;
