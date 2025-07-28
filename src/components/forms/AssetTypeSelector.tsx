import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PhysicalAssetForm } from "./PhysicalAssetForm";
import { DigitalAssetForm } from "./DigitalAssetForm";
import { ConsumableAssetForm } from "./ConsumableAssetForm";
import { Package, Laptop, ShoppingCart, X } from "lucide-react";

interface AssetTypeSelectorProps {
  onClose: () => void;
}

export const AssetTypeSelector = ({ onClose }: AssetTypeSelectorProps) => {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const assetTypes = [
    {
      type: "physical",
      title: "Physical Asset",
      description: "Equipment, machinery, furniture, and other tangible assets",
      icon: Package,
      color: "bg-blue-50 text-blue-600 border-blue-200"
    },
    {
      type: "digital",
      title: "Digital Asset",
      description: "Software licenses, digital subscriptions, and virtual assets",
      icon: Laptop,
      color: "bg-green-50 text-green-600 border-green-200"
    },
    {
      type: "consumable",
      title: "Consumable Asset",
      description: "Office supplies, materials, and items that get consumed",
      icon: ShoppingCart,
      color: "bg-orange-50 text-orange-600 border-orange-200"
    }
  ];

  if (selectedType === "physical") {
    return <PhysicalAssetForm onClose={onClose} />;
  }

  if (selectedType === "digital") {
    return <DigitalAssetForm onClose={onClose} />;
  }

  if (selectedType === "consumable") {
    return <ConsumableAssetForm onClose={onClose} />;
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Select Asset Type</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {assetTypes.map((asset) => {
              const Icon = asset.icon;
              return (
                <Card 
                  key={asset.type}
                  className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-primary/50"
                  onClick={() => setSelectedType(asset.type)}
                >
                  <CardContent className="p-6 text-center space-y-4">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto ${asset.color}`}>
                      <Icon className="h-8 w-8" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{asset.title}</h3>
                      <p className="text-sm text-muted-foreground">{asset.description}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};