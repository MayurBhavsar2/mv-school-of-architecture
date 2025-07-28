import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { AssetChart } from "@/components/dashboard/AssetChart";
import { RecentAssets } from "@/components/dashboard/RecentAssets";
import { AssetTypeSelector } from "@/components/forms/AssetTypeSelector";

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
        <AssetTypeSelector onClose={() => setShowAssetForm(false)} />
      )}
    </>
  );
};

export default Index;
