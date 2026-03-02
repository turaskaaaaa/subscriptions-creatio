import { Search, Grid3X3, Plus, Play, Bell, HelpCircle, Settings, User } from "lucide-react";

const TopBar = () => {
  return (
    <header className="flex items-center justify-between h-12 px-4 bg-topbar border-b border-topbar/80">
      {/* Left */}
      <div className="flex items-center gap-3">
        <Grid3X3 className="w-5 h-5 text-topbar-foreground/70 cursor-pointer" />
        <div className="flex items-center gap-1">
          <span className="text-sm font-bold text-topbar-foreground tracking-wide">Creatio</span>
        </div>
        <Play className="w-4 h-4 text-topbar-foreground/60" />
        <Plus className="w-4 h-4 text-topbar-foreground/60 bg-topbar-foreground/20 rounded-full p-0.5" />

        {/* Search */}
        <div className="flex items-center gap-2 bg-[hsl(232,40%,22%)] rounded px-3 py-1.5 ml-2 w-48">
          <Search className="w-3.5 h-3.5 text-topbar-foreground/40" />
          <span className="text-xs text-topbar-foreground/40">Search...</span>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <span className="text-topbar-foreground/70 text-sm font-medium cursor-pointer">AI</span>
        <Grid3X3 className="w-4 h-4 text-topbar-foreground/60 cursor-pointer" />
        <Bell className="w-4 h-4 text-topbar-foreground/60 cursor-pointer" />
        <HelpCircle className="w-4 h-4 text-topbar-foreground/60 cursor-pointer" />
        <Settings className="w-4 h-4 text-topbar-foreground/60 cursor-pointer" />
        <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
          <User className="w-4 h-4 text-primary-foreground" />
        </div>
      </div>
    </header>
  );
};

export default TopBar;
