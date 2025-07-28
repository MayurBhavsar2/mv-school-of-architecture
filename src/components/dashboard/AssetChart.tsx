import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from "recharts";

export const AssetChart = () => {
  const assetData = [
    { month: "Jan", physical: 120, digital: 45, consumable: 23 },
    { month: "Feb", physical: 135, digital: 52, consumable: 28 },
    { month: "Mar", physical: 148, digital: 61, consumable: 31 },
    { month: "Apr", physical: 162, digital: 68, consumable: 35 },
    { month: "May", physical: 178, digital: 74, consumable: 38 },
    { month: "Jun", physical: 195, digital: 82, consumable: 42 }
  ];

  const pieData = [
    { name: "Physical", value: 892, color: "hsl(214, 84%, 56%)" },
    { name: "Digital", value: 234, color: "hsl(142, 76%, 36%)" },
    { name: "Consumable", value: 121, color: "hsl(25, 95%, 53%)" }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <Card className="bg-gradient-to-br from-card to-card/80 border shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Asset Growth Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={assetData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="month" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px"
                }}
              />
              <Bar dataKey="physical" fill="hsl(214, 84%, 56%)" radius={[2, 2, 0, 0]} />
              <Bar dataKey="digital" fill="hsl(142, 76%, 36%)" radius={[2, 2, 0, 0]} />
              <Bar dataKey="consumable" fill="hsl(25, 95%, 53%)" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-card to-card/80 border shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Asset Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px"
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-4">
            {pieData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-muted-foreground">
                  {item.name}: {item.value}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};