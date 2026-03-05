import { useSettings, type PreferenceCenterConfig } from "@/contexts/SettingsContext";
import { Switch } from "@/components/ui/switch";
import { Mail, Shield } from "lucide-react";

const PreferenceCenterPreview = () => {
  const { preferenceCenterConfig: config } = useSettings();

  const visibleSubs = config.subscriptionTypes.filter(s => s.visibleInPreferenceCenter && s.channel === "Email");

  return (
    <div className="rounded-lg border bg-card shadow-sm overflow-hidden max-w-sm w-full">
      {/* Header */}
      <div
        className="px-6 py-5 text-center"
        style={{ backgroundColor: `hsl(${config.primaryColor})` }}
      >
        {config.logoUrl && (
          <img src={config.logoUrl} alt="Logo" className="h-8 mx-auto mb-3 object-contain" />
        )}
        <h2 className="text-lg font-semibold text-white">{config.title}</h2>
        {config.welcomeMessage && (
          <p className="text-sm text-white/80 mt-1">{config.welcomeMessage}</p>
        )}
      </div>

      {/* Subscription toggles */}
      <div className="p-5 space-y-5">
        {visibleSubs.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Email</span>
            </div>
            <div className="space-y-3">
              {visibleSubs.map(sub => (
                <div key={sub.name} className="flex items-center justify-between">
                  <span className="text-sm text-foreground">{sub.name}</span>
                  <Switch checked={true} disabled className="pointer-events-none" />
                </div>
              ))}
            </div>
          </div>
        )}

        {visibleSubs.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">No subscription types visible</p>
        )}

        {config.showLegalBasis && (
          <div className="flex items-start gap-2 pt-2 border-t">
            <Shield className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
            <p className="text-xs text-muted-foreground">
              Your data is processed based on your explicit consent. You can withdraw consent at any time.
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-3 border-t bg-muted/30">
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">{config.footerText}</p>
          {config.privacyPolicyUrl && (
            <span className="text-xs underline" style={{ color: `hsl(${config.primaryColor})` }}>
              Privacy Policy
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreferenceCenterPreview;
