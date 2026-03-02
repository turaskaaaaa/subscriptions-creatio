import { useNavigate } from "react-router-dom";
import { useSettings } from "@/contexts/SettingsContext";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Mail } from "lucide-react";

const DoubleOptInEmail = () => {
  const navigate = useNavigate();
  const {
    doubleOptInEmailSubject, setDoubleOptInEmailSubject,
    doubleOptInEmailBody, setDoubleOptInEmailBody,
  } = useSettings();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-muted-foreground" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Mail className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">Double opt-in confirmation email</h1>
              <p className="text-xs text-muted-foreground">
                Configure the email sent to contacts to confirm their subscription
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Subject */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Subject</label>
            <Input
              value={doubleOptInEmailSubject}
              onChange={(e) => setDoubleOptInEmailSubject(e.target.value)}
              placeholder="Please confirm your subscription"
            />
            <p className="text-xs text-muted-foreground">
              The subject line of the confirmation email
            </p>
          </div>

          {/* Body */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Body</label>
            <textarea
              value={doubleOptInEmailBody}
              onChange={(e) => setDoubleOptInEmailBody(e.target.value)}
              rows={12}
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-y font-mono"
              placeholder="Email body..."
            />
            <p className="text-xs text-muted-foreground">
              The body of the confirmation email. Use merge tags to personalize the message.
            </p>
          </div>

          {/* Merge tags */}
          <div className="border border-border rounded-lg p-4 space-y-2 bg-muted/30">
            <p className="text-xs font-semibold text-foreground">Available merge tags</p>
            <div className="space-y-1.5">
              {[
                { tag: "{{confirmation_link}}", desc: "The unique confirmation URL the contact must click", required: true },
                { tag: "{{contact_name}}", desc: "The contact's full name" },
                { tag: "{{subscription_type}}", desc: "The name of the subscription being confirmed" },
              ].map(({ tag, desc, required }) => (
                <div key={tag} className="flex items-start gap-2">
                  <code className="text-xs bg-background border border-border rounded px-1.5 py-0.5 font-mono text-foreground shrink-0">
                    {tag}
                  </code>
                  <span className="text-xs text-muted-foreground">{desc}</span>
                  {required && (
                    <span className="text-[10px] text-destructive font-medium shrink-0">Required</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoubleOptInEmail;
