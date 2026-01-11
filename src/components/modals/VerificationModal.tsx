import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Loader2, CheckCircle2 } from "lucide-react";

interface VerificationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onVerify: () => void;
}

export const VerificationModal = ({ open, onOpenChange, onVerify }: VerificationModalProps) => {
  const [name, setName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [department, setDepartment] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleVerify = async () => {
    if (!name || !idNumber || !department) return;
    
    setIsVerifying(true);
    // Simulate verification delay (demo flow - no actual API call)
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsVerifying(false);
    setIsVerified(true);
    
    // Close after showing success
    setTimeout(() => {
      onVerify();
      onOpenChange(false);
      // Reset state
      setIsVerified(false);
      setName("");
      setIdNumber("");
      setDepartment("");
    }, 1000);
  };

  const isFormValid = name.trim() && idNumber.trim() && department.trim();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Verify as Government Official
          </DialogTitle>
          <DialogDescription>
            Complete verification to access full government features. This is a demo flow - no data is stored.
          </DialogDescription>
        </DialogHeader>
        
        {isVerified ? (
          <div className="py-8 flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-india-green/10 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-india-green" />
            </div>
            <p className="text-center font-medium text-india-green">Verification Successful!</p>
          </div>
        ) : (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isVerifying}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="idNumber">Government ID Number</Label>
              <Input
                id="idNumber"
                placeholder="e.g., GOV-2024-XXXXX"
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
                disabled={isVerifying}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                placeholder="e.g., Election Commission of India"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                disabled={isVerifying}
              />
            </div>
          </div>
        )}
        
        {!isVerified && (
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isVerifying}>
              Cancel
            </Button>
            <Button onClick={handleVerify} disabled={!isFormValid || isVerifying}>
              {isVerifying ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify Identity"
              )}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};
