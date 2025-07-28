import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { AssetChart } from "@/components/dashboard/AssetChart";
import { RecentAssets } from "@/components/dashboard/RecentAssets";
import { AssetForm } from "@/components/forms/AssetForm";

const Index = () => {
  const [showAssetForm, setShowAssetForm] = useState(false);

  return (
    <>
      <DashboardLayout onAddAsset={() => setShowAssetForm(true)}>
        <div className="space-y-8">
          <DashboardStats />
          <AssetChart />
          <RecentAssets />
        </div>
      </DashboardLayout>
      
      {showAssetForm && (
        <AssetForm onClose={() => setShowAssetForm(false)} />
      )}
    </>
  );
};

export default Index;
