import {
  FixedWidthPrimarySidebar,
  TopbarForSidebarContentLayout,
  Card,
  CardContent,
  EyeIcon,
  DollarIcon,
  PillLightCoral,
  PillLightGreen,
  DotsVerticalIcon,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "@fe"; // псевдо-импорт, поправь под свои алиасы

import React from "react";

interface StatCardProps {
  icon: React.ReactNode;
  value: string | number;
  description: string;
  pill: React.ReactNode;
  ariaId: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, value, description, pill, ariaId }) => (
  <Card role="region" aria-labelledby={ariaId}>
    <CardContent>
      <div className="blink-surface-light p-2 rounded-full inline-block">
        {icon}
      </div>
      <h3 id={ariaId} className="text-xl blink-text-primary my-2">{value}</h3>
      <div className="flex justify-between items-center">
        <p className="text-sm blink-text-subdued">{description}</p>
        {pill}
      </div>
    </CardContent>
  </Card>
);

const stats = [
  {
    icon: <EyeIcon className="w-8 h-8 rounded-full" />,
    value: "32 567",
    description: "Views last month",
    pill: <PillLightGreen className="h-6 inline-flex items-center gap-2">10% ↑</PillLightGreen>,
    ariaId: "views-month",
  },
  {
    icon: <EyeIcon className="w-8 h-8 rounded-full" />,
    value: "11 334",
    description: "Views last 7 days",
    pill: <PillLightGreen className="h-6 inline-flex items-center gap-2">23% ↑</PillLightGreen>,
    ariaId: "views-week",
  },
  {
    icon: <DollarIcon className="w-8 h-8 rounded-full" />,
    value: "11 035",
    description: "Revenue last year",
    pill: <PillLightCoral className="h-6 inline-flex items-center gap-2">12% ↓</PillLightCoral>,
    ariaId: "revenue-year",
  },
  {
    icon: <DollarIcon className="w-8 h-8 rounded-full" />,
    value: "800",
    description: "Revenue last month",
    pill: <PillLightCoral className="h-6 inline-flex items-center gap-2">6% ↓</PillLightCoral>,
    ariaId: "revenue-month",
  },
];

const trafficData = [
  {
    source: "Unknown",
    visitors: "11 355",
    revenue: "2,123 $",
    pill: <PillLightGreen className="h-6 inline-flex items-center gap-2">23% ↑</PillLightGreen>,
  },
  {
    source: "Google search",
    visitors: "4 235",
    revenue: "999 $",
    pill: <PillLightGreen className="h-6 inline-flex items-center gap-2">3% ↑</PillLightGreen>,
  },
  {
    source: "Google ads",
    visitors: "4 560",
    revenue: "884 $",
    pill: <PillLightCoral className="h-6 inline-flex items-center gap-2">6% ↓</PillLightCoral>,
  },
];

export const DashboardPage = () => (
  <div className="blink-text-primary flex flex-col lg:flex-row h-screen bg-blinkGray50 dark:bg-blinkNeutral900 gap-0.5">
    <FixedWidthPrimarySidebar />

    <div className="flex flex-1 h-full flex-col">
      <TopbarForSidebarContentLayout />

      <div className="w-full h-full flex flex-col lg:flex-row">
        <div className="flex flex-1 h-full overflow-y-auto flex-col p-6 gap-6">
          <div className="grid gap-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
            {stats.map((s) => (
              <StatCard key={s.ariaId} {...s} />
            ))}
          </div>

          <div className="blink-surface-default border blink-border-container-white rounded-lg p-4">
            <h3 className="text-xl bold pb-6 px-2">
              Website statistics last three months
            </h3>

            <div className="w-full overflow-auto">
              <Table className="min-w-[44rem]">
                <TableHead>
                  <TableRow>
                    <TableHeadCell>Source</TableHeadCell>
                    <TableHeadCell>Visitors</TableHeadCell>
                    <TableHeadCell>Revenue</TableHeadCell>
                    <TableHeadCell>Status</TableHeadCell>
                    <TableHeadCell>Action</TableHeadCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {trafficData.map((row, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{row.source}</TableCell>
                      <TableCell>{row.visitors}</TableCell>
                      <TableCell>{row.revenue}</TableCell>
                      <TableCell>{row.pill}</TableCell>
                      <TableCell>
                        <Button appearance="text" className="w-10">
                          <DotsVerticalIcon className="w-8 h-8 shrink-0" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
