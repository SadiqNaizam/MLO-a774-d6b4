import React from 'react';
import { ArrowDownCircle, ArrowUpCircle, Circle } from 'lucide-react'; // Icons for transaction type
import { cn } from '@/lib/utils';

interface TransactionListItemProps {
  id: string;
  description: string;
  amount: number;
  date: string | Date; // Could be ISO string or Date object
  type: 'debit' | 'credit' | 'pending';
  category?: string;
  currencySymbol?: string;
  onClick?: (transactionId: string) => void;
}

const TransactionListItem: React.FC<TransactionListItemProps> = ({
  id,
  description,
  amount,
  date,
  type,
  category,
  currencySymbol = '$',
  onClick,
}) => {
  console.log(`Rendering TransactionListItem: ${description}, Type: ${type}, ID: ${id}`);

  const formattedDate = typeof date === 'string' ? new Date(date).toLocaleDateString() : date.toLocaleDateString();
  const isDebit = type === 'debit';
  const isCredit = type === 'credit';

  const Icon = isDebit ? ArrowUpCircle : isCredit ? ArrowDownCircle : Circle;
  const amountColor = isDebit ? 'text-red-600' : isCredit ? 'text-green-600' : 'text-muted-foreground';
  const amountPrefix = isDebit ? '-' : isCredit ? '+' : '';

  return (
    <div
      className={cn(
        "flex items-center justify-between p-4 border-b last:border-b-0",
        onClick ? "cursor-pointer hover:bg-muted/50 transition-colors" : ""
      )}
      onClick={() => onClick?.(id)}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => (e.key === 'Enter' || e.key === ' ') && onClick(id) : undefined}
    >
      <div className="flex items-center space-x-3">
        <Icon className={cn("h-6 w-6 flex-shrink-0", amountColor)} />
        <div>
          <p className="font-medium truncate max-w-xs sm:max-w-sm md:max-w-md">{description}</p>
          <p className="text-xs text-muted-foreground">{formattedDate}{category ? ` • ${category}` : ''}</p>
        </div>
      </div>
      <p className={cn("font-semibold text-right", amountColor)}>
        {amountPrefix}{currencySymbol}{Math.abs(amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </p>
    </div>
  );
};

export default TransactionListItem;