// src/components/SignOutDialog.jsx
import { LogOut, Shield, X } from "lucide-react";
import { Button } from "./ui/button";

export default function SignOutDialog({
  open,
  onOpenChange,
  onConfirm,
  isLoading = false,
}) {
  if (!open) return null;

  const handleSignOut = () => {
    onConfirm();
    onOpenChange(false);
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ zIndex: 99999 }} // Inline style as fallback
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={() => onOpenChange(false)}
      />

      {/* Dialog */}
      <div className="relative bg-background border border-border shadow-2xl rounded-2xl p-6 w-full max-w-md mx-auto">
        {/* Close Button */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-4 right-4 p-1 rounded-lg hover:bg-accent transition-colors"
        >
          <X className="h-4 w-4 text-muted-foreground" />
        </button>

        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center space-x-4 pr-8">
            <div className="p-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg">
              <LogOut className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-foreground mb-1">
                Sign Out?
              </h2>
              <p className="text-sm text-muted-foreground">
                Are you sure you want to end your session?
              </p>
            </div>
          </div>

          {/* Info */}
          <div className="p-4 bg-muted/30 rounded-xl">
            <div className="flex items-start space-x-3">
              <Shield className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-foreground mb-1">
                  Your session will be ended
                </p>
                <p className="text-muted-foreground">
                  You'll need to sign in again to access your workspace.
                </p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 h-11"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSignOut}
              disabled={isLoading}
              className="flex-1 h-11 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Signing Out...</span>
                </div>
              ) : (
                <>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
