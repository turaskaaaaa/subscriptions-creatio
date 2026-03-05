import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Upload, FileSpreadsheet, CheckCircle2, AlertTriangle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

interface ImportContactsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ImportContactsDialog = ({ open, onOpenChange }: ImportContactsDialogProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [optIn, setOptIn] = useState(true);
  const [step, setStep] = useState<"settings" | "pick">("settings");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      toast.success(`Imported contacts from "${selected.name}"${optIn ? " with opt-in status" : ""}`);
      handleClose();
    }
  };

  const handleClose = () => {
    setFile(null);
    setOptIn(true);
    setStep("settings");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Import Contacts</DialogTitle>
          <DialogDescription>
            Choose how imported contacts should be subscribed before uploading your file.
          </DialogDescription>
        </DialogHeader>

        {/* Opt-in setting */}
        <div className="space-y-3">
          <div className="flex items-start gap-3 rounded-lg border border-border p-4">
            <Checkbox
              id="opt-in"
              checked={optIn}
              onCheckedChange={(checked) => setOptIn(checked === true)}
              className="mt-0.5"
            />
            <div className="space-y-1">
              <Label htmlFor="opt-in" className="text-sm font-medium text-foreground cursor-pointer">
                Mark imported contacts as opted in
              </Label>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Imported contacts will be marked as opted in for email communications.
                Turn this off if you want to review or manage their consent later.
              </p>
            </div>
          </div>

          {!optIn && (
            <div className="flex items-start gap-2 rounded-md bg-amber-500/10 border border-amber-500/20 p-3">
              <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
                Without opt-in status, imported contacts will not receive any marketing emails until their consent is explicitly recorded.
              </p>
            </div>
          )}

          {optIn && (
            <div className="flex items-start gap-2 rounded-md bg-emerald-500/10 border border-emerald-500/20 p-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <p className="text-xs text-emerald-700 dark:text-emerald-400 leading-relaxed">
                Imported contacts will be eligible to receive marketing emails immediately after the import is complete.
              </p>
            </div>
          )}
        </div>

        <Separator />

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={() => inputRef.current?.click()}>
            <Upload className="w-4 h-4" />
            Select File & Import
          </Button>
        </DialogFooter>

        <input
          ref={inputRef}
          type="file"
          accept=".xlsx,.xls,.csv"
          className="hidden"
          onChange={handleFileChange}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ImportContactsDialog;
