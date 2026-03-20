import TopBar from "@/components/TopBar";
import AppSidebar from "@/components/AppSidebar";
import { useSettings } from "@/contexts/SettingsContext";

const EmailPreview = () => {
  const { preferenceCenterConfig, unsubscribeLinkEnabled } = useSettings();
  const { footerText, primaryColor, logoUrl, unsubscribePage } = preferenceCenterConfig;

  const primaryHsl = `hsl(${primaryColor})`;

  return (
    <div className="flex h-screen w-full bg-background">
      <AppSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-auto bg-muted/30 p-8">
          <div className="mb-6">
            <h1 className="text-xl font-semibold text-foreground">Email Preview</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Preview how your marketing emails will appear to recipients.
            </p>
          </div>

          {/* Email container */}
          <div className="max-w-[600px] mx-auto rounded-lg border border-border shadow-md bg-card overflow-hidden">
            {/* Email header / banner */}
            <div
              className="px-8 py-6 flex items-center gap-3"
              style={{ backgroundColor: primaryHsl }}
            >
              {logoUrl ? (
                <img src={logoUrl} alt="Company logo" className="h-8 object-contain" />
              ) : (
                <div className="h-8 w-8 rounded bg-white/20" />
              )}
              <span className="text-white font-semibold text-lg">Your Company</span>
            </div>

            {/* Email body */}
            <div className="px-8 py-10 space-y-5">
              <h2 className="text-xl font-bold text-foreground">
                Exciting news just for you!
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
              </p>
              <button
                className="inline-block px-6 py-2.5 rounded text-sm font-medium text-white cursor-default"
                style={{ backgroundColor: primaryHsl }}
              >
                Learn More
              </button>
            </div>

            {/* Email footer */}
            <div className="border-t border-border bg-muted/40 px-8 py-6 space-y-3">
              <p className="text-xs text-muted-foreground text-center">
                {footerText || "© 2026 Your Company. All rights reserved."}
              </p>

              <div className="flex items-center justify-center gap-4 text-xs">
                {unsubscribeLinkEnabled && (
                  <span
                    className="underline cursor-default"
                    style={{ color: primaryHsl }}
                  >
                    Unsubscribe
                  </span>
                )}
                {unsubscribePage.showManagePreferencesLink && (
                  <span
                    className="underline cursor-default"
                    style={{ color: primaryHsl }}
                  >
                    Manage your preferences
                  </span>
                )}
              </div>

              {preferenceCenterConfig.showLegalBasis && (
                <p className="text-[10px] text-muted-foreground/60 text-center">
                  You are receiving this email based on your consent. Your data is processed
                  in accordance with our privacy policy.
                </p>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EmailPreview;
