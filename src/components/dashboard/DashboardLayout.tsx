import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Settings, Bell } from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
  onAddAsset: () => void;
}

export const DashboardLayout = ({ children, onAddAsset }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">MV School of Architecture</h1>
              <p className="text-muted-foreground">Asset Management System</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" onClick={() => window.location.href = '/alerts'}>
                <Bell className="h-4 w-4 mr-2" />
                Alerts
              </Button>
              <Button variant="outline" size="sm" onClick={() => window.location.href = '/handover'}>
                <Settings className="h-4 w-4 mr-2" />
                Hand-Over
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button onClick={onAddAsset} className="bg-primary hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                Add Asset
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
};