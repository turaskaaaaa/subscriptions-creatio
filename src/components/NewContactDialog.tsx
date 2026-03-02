import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Phone, Mail } from "lucide-react";
import { useSettings } from "@/contexts/SettingsContext";

interface NewContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NewContactDialog = ({ open, onOpenChange }: NewContactDialogProps) => {
  const { marketingConsentDefault } = useSettings();
  const [contactName, setContactName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [type, setType] = useState("");
  const [account, setAccount] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [mobilePhone, setMobilePhone] = useState("");
  const [email, setEmail] = useState("");
  const [marketingConsent, setMarketingConsent] = useState(marketingConsentDefault);

  useEffect(() => {
    if (open) {
      setMarketingConsent(marketingConsentDefault);
    }
  }, [open, marketingConsentDefault]);

  const handleSave = () => {
    // For now just close — no persistence
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">New record</DialogTitle>
        </DialogHeader>

        <div className="space-y-5 py-2">
          {/* Avatar + Name */}
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-lg bg-secondary flex items-center justify-center shrink-0">
              <User className="w-8 h-8 text-muted-foreground" />
            </div>
            <div className="flex-1 space-y-1">
              <Input
                placeholder="Add contact name"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="border-0 border-b border-border rounded-none px-0 text-base font-medium focus-visible:ring-0 shadow-none"
              />
              <Input
                placeholder="and birth date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="border-0 border-b border-border rounded-none px-0 text-sm text-muted-foreground focus-visible:ring-0 shadow-none"
              />
            </div>
          </div>

          {/* Type */}
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Type</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger className="border-0 border-b border-border rounded-none px-0 shadow-none focus:ring-0">
                <SelectValue placeholder="Select contact type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Customer">Customer</SelectItem>
                <SelectItem value="Partner">Partner</SelectItem>
                <SelectItem value="Lead">Lead</SelectItem>
                <SelectItem value="Employee">Employee</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Account */}
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Account</Label>
            <Input
              placeholder="Select account"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              className="border-0 border-b border-border rounded-none px-0 shadow-none focus-visible:ring-0"
            />
          </div>

          {/* Job title */}
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Full job title</Label>
            <Input
              placeholder="Enter job title"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="border-0 border-b border-border rounded-none px-0 shadow-none focus-visible:ring-0"
            />
          </div>

          {/* Mobile phone */}
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Mobile phone</Label>
            <div className="flex items-center gap-2 border-b border-border pb-1">
              <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
              <Input
                placeholder="Enter phone number"
                value={mobilePhone}
                onChange={(e) => setMobilePhone(e.target.value)}
                className="border-0 rounded-none px-0 shadow-none focus-visible:ring-0 h-auto py-0"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Email</Label>
            <div className="flex items-center gap-2 border-b border-border pb-1">
              <Mail className="w-4 h-4 text-destructive shrink-0" />
              <Input
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-0 rounded-none px-0 shadow-none focus-visible:ring-0 h-auto py-0"
              />
            </div>
          </div>

          {/* Marketing consent checkbox */}
          <div className="flex items-start gap-3 pt-1">
            <Checkbox
              id="marketing-consent"
              checked={marketingConsent}
              onCheckedChange={(checked) => setMarketingConsent(checked === true)}
              className="mt-0.5"
            />
            <Label htmlFor="marketing-consent" className="text-sm leading-snug cursor-pointer">
              Allowed to receive marketing materials
            </Label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewContactDialog;
