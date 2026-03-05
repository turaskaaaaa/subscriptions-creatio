import { useSettings } from "@/contexts/SettingsContext";
import { Switch } from "@/components/ui/switch";
import { Mail, Shield, MailX, MessageSquareMore, ClipboardList } from "lucide-react";

interface PreferenceCenterPreviewProps {
  activeTab: string;
}

const PreferenceCenterPreview = ({ activeTab }: PreferenceCenterPreviewProps) => {
  const { preferenceCenterConfig: config } = useSettings();

  const visibleSubs = config.subscriptionTypes.filter(s => s.visibleInPreferenceCenter && s.channel === "Email");
  const unsub = config.unsubscribePage;
  const manage = config.managePreferencesPage;

  const Header = () => (
    <div
      className="px-6 py-5 text-center"
      style={{ backgroundColor: `hsl(${config.primaryColor})` }}
    >
      {config.logoUrl && (
        <img src={config.logoUrl} alt="Logo" className="h-8 mx-auto mb-3 object-contain" />
      )}
    </div>
  );

  return (
    <div className="w-full max-w-sm">

      {/* Unsubscribe Page */}
      {activeTab === "unsubscribe" && (
        <div className="rounded-lg border bg-card shadow-sm overflow-hidden">
          <Header />
          <div className="p-6 text-center space-y-4">
            <MailX className="w-10 h-10 mx-auto text-muted-foreground" />
            <h3 className="font-semibold text-foreground">{unsub.pageName || "Unsubscribe"}</h3>
            <p className="text-sm text-muted-foreground">{unsub.confirmationMessage}</p>
            <button
              className="w-full text-sm font-medium py-2.5 rounded-md text-white disabled:opacity-90"
              style={{ backgroundColor: `hsl(${config.primaryColor})` }}
              disabled
            >
              Unsubscribe
            </button>
            {unsub.showManagePreferencesLink && (
              <p className="text-xs text-muted-foreground">
                Or <span className="underline" style={{ color: `hsl(${config.primaryColor})` }}>manage your preferences</span> instead
              </p>
            )}
            {config.showLegalBasis && (
              <div className="flex items-start gap-2 text-left">
                <Shield className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                <p className="text-xs text-muted-foreground">
                  Your data is processed based on your explicit consent. You can withdraw consent at any time.
                </p>
              </div>
            )}
          </div>
          <div className="px-6 py-3 border-t bg-muted/30">
            <p className="text-xs text-muted-foreground">{config.footerText}</p>
          </div>
        </div>
      )}

      {/* Feedback Page */}
      {activeTab === "feedback" && (
        <div className="rounded-lg border bg-card shadow-sm overflow-hidden">
          <Header />
          <div className="p-6 space-y-4">
            <div className="text-center">
              <MessageSquareMore className="w-10 h-10 mx-auto text-muted-foreground mb-2" />
              <h3 className="font-semibold text-foreground">Before you go…</h3>
              <p className="text-sm text-muted-foreground mt-1">Help us improve by sharing why you're leaving.</p>
            </div>
            {unsub.reasons.filter(Boolean).length > 0 ? (
              <div className="space-y-2">
                {unsub.reasons.filter(Boolean).map((reason, i) => (
                  <label key={i} className="flex items-center gap-2.5 text-sm text-foreground p-2 rounded-md border bg-muted/20">
                    <input type="radio" name="preview-reason" disabled className="accent-primary" />
                    {reason}
                  </label>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-2">No reasons configured</p>
            )}
            <button
              className="w-full text-sm font-medium py-2.5 rounded-md text-white disabled:opacity-90"
              style={{ backgroundColor: `hsl(${config.primaryColor})` }}
              disabled
            >
              Submit Feedback
            </button>
            <button
              className="w-full text-sm font-medium py-2 rounded-md border border-input text-muted-foreground"
              disabled
            >
              Skip
            </button>
            {config.showLegalBasis && (
              <div className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                <p className="text-xs text-muted-foreground">
                  Your data is processed based on your explicit consent. You can withdraw consent at any time.
                </p>
              </div>
            )}
          </div>
          <div className="px-6 py-3 border-t bg-muted/30">
            <p className="text-xs text-muted-foreground">{config.footerText}</p>
          </div>
        </div>
      )}

      {/* Manage Preferences Page */}
      {activeTab === "preferences" && (
        <div className="rounded-lg border bg-card shadow-sm overflow-hidden">
          <Header />
          <div className="p-5 space-y-5">
            <div className="text-center">
              <h3 className="font-semibold text-foreground">{config.title}</h3>
              {config.welcomeMessage && (
                <p className="text-sm text-muted-foreground mt-1">{config.welcomeMessage}</p>
              )}
            </div>

            {visibleSubs.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Email Subscriptions</span>
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


            {config.showLegalBasis && (
              <div className="flex items-start gap-2 pt-2 border-t">
                <Shield className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                <p className="text-xs text-muted-foreground">
                  Your data is processed based on your explicit consent. You can withdraw consent at any time.
                </p>
              </div>
            )}

            <button
              className="w-full text-sm font-medium py-2.5 rounded-md text-white disabled:opacity-90"
              style={{ backgroundColor: `hsl(${config.primaryColor})` }}
              disabled
            >
              Save Preferences
            </button>
          </div>
          <div className="px-6 py-3 border-t bg-muted/30">
            <p className="text-xs text-muted-foreground">{config.footerText}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreferenceCenterPreview;
