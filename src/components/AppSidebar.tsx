import { Mail, Megaphone, Globe, HeartPulse, ChevronLeft, Search } from "lucide-react";

const navItems = [
  { icon: Mail, label: "Bulk emails", active: true, color: "text-blue-400" },
  { icon: Megaphone, label: "Campaigns", active: false, color: "text-blue-500" },
  { icon: Globe, label: "Sender domains", active: false, color: "text-emerald-400" },
  { icon: HeartPulse, label: "Email audience health", active: false, color: "text-teal-400" },
];

const AppSidebar = () => {
  return (
    <aside className="flex flex-col w-[200px] min-w-[200px] bg-sidebar h-screen">
      {/* Section header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-sidebar-hover">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-sidebar-foreground">Email marketing</span>
          <ChevronLeft className="w-3 h-3 text-sidebar-foreground/50 rotate-180" />
        </div>
        <ChevronLeft className="w-4 h-4 text-sidebar-foreground/60 cursor-pointer hover:text-sidebar-foreground" />
      </div>

      {/* Search */}
      <div className="px-3 py-2">
        <div className="flex items-center gap-2 px-2 py-1.5 rounded bg-sidebar-hover/50">
          <Search className="w-3.5 h-3.5 text-sidebar-foreground/40" />
          <span className="text-xs text-sidebar-foreground/40">Search app...</span>
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex flex-col gap-0.5 px-2 mt-1">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
              item.active
                ? "bg-sidebar-active text-primary-foreground font-medium"
                : "text-sidebar-foreground hover:bg-sidebar-hover"
            }`}
          >
            <item.icon className={`w-4 h-4 ${item.active ? "text-primary-foreground" : item.color}`} />
            <span className="truncate">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default AppSidebar;
