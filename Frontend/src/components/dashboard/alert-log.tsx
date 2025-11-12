'use client';

import { formatDistanceToNow } from 'date-fns';
import { Siren, ShieldAlert, CheckCircle, Smartphone } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';

export type Alert = {
  id: number;
  timestamp: Date;
  level: number;
  status: 'New' | 'Acknowledged' | 'Resolved';
};

interface AlertLogProps {
  alerts: Alert[];
  onUpdateAlertStatus: (id: number, status: Alert['status']) => void;
}

export function AlertLog({ alerts, onUpdateAlertStatus }: AlertLogProps) {
  const getRiskVariant = (
    level: number
  ): 'destructive' | 'secondary' | 'default' => {
    if (level > 75) return 'destructive';
    if (level > 50) return 'secondary';
    return 'default';
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Siren className="w-6 h-6" />
          Alert Log
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-0 overflow-hidden">
        <ScrollArea className="h-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Risk</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {alerts.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center text-muted-foreground h-24"
                  >
                    No high-risk events detected.
                  </TableCell>
                </TableRow>
              ) : (
                alerts.map((alert) => (
                  <TableRow key={alert.id}>
                    <TableCell className="text-xs">
                      {formatDistanceToNow(alert.timestamp, { addSuffix: true })}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getRiskVariant(alert.level)}>
                        {alert.level}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          alert.status === 'New'
                            ? 'destructive'
                            : alert.status === 'Acknowledged'
                            ? 'default'
                            : 'outline'
                        }
                      >
                        {alert.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            Respond
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            onClick={() =>
                              onUpdateAlertStatus(alert.id, 'Acknowledged')
                            }
                          >
                            <ShieldAlert className="mr-2 h-4 w-4" /> Acknowledge
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              onUpdateAlertStatus(alert.id, 'Resolved')
                            }
                          >
                            <CheckCircle className="mr-2 h-4 w-4" /> Mark as Resolved
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Smartphone className="mr-2 h-4 w-4" /> Notify Team
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
