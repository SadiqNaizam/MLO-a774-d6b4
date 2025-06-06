import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge'; // For status like "Pending"
import { Button } from '@/components/ui/button'; // For actions like "View Details"

interface AccountSummaryCardProps {
  accountId: string;
  accountName: string;
  balance: number;
  currencySymbol?: string;
  accountType?: string; // e.g., "Personal", "Joint"
  status?: 'Active' | 'Pending Partner Acceptance' | 'Closed';
  onViewDetails?: (accountId: string) => void;
}

const AccountSummaryCard: React.FC<AccountSummaryCardProps> = ({
  accountId,
  accountName,
  balance,
  currencySymbol = '$',
  accountType,
  status,
  onViewDetails,
}) => {
  console.log(`Rendering AccountSummaryCard for: ${accountName}, ID: ${accountId}`);

  return (
    <Card className="w-full max-w-md transition-shadow hover:shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{accountName}</CardTitle>
          {status && <Badge variant={status === 'Pending Partner Acceptance' ? 'secondary' : 'outline'}>{status}</Badge>}
        </div>
        {accountType && <CardDescription>{accountType} Account</CardDescription>}
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">
          {currencySymbol}
          {balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
        {/* You could add more details here like last transaction, etc. */}
      </CardContent>
      {onViewDetails && (
        <CardFooter>
          <Button variant="outline" className="w-full" onClick={() => onViewDetails(accountId)}>
            View Details
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default AccountSummaryCard;