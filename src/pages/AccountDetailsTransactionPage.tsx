import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AppHeader from '@/components/AppHeader';
import AccountSummaryCard from '@/components/AccountSummaryCard';
import TransactionListItem from '@/components/TransactionListItem';
import NavigationMenu from '@/components/NavigationMenu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Home, ListMinus, PlusCircle, User, Settings, Search } from 'lucide-react';

// Sample data - in a real app, this would be fetched
const sampleAccountDetails = {
  pa1: {
    accountId: 'pa1', accountName: 'Personal Checking', balance: 5250.75, currencySymbol: '$', accountType: 'Personal' as const, status: 'Active' as const,
    transactions: [
      { id: 'txn101', description: 'Salary Deposit', amount: 2500, date: new Date(2024, 6, 1).toISOString(), type: 'credit' as const, category: 'Income' },
      { id: 'txn102', description: 'Rent Payment', amount: 1200, date: new Date(2024, 6, 2).toISOString(), type: 'debit' as const, category: 'Housing' },
      { id: 'txn103', description: 'Groceries - Whole Foods', amount: 150.25, date: new Date(2024, 6, 5).toISOString(), type: 'debit' as const, category: 'Food' },
      { id: 'txn104', description: 'Online Course Subscription', amount: 49.99, date: new Date(2024, 6, 10).toISOString(), type: 'debit' as const, category: 'Education' },
      { id: 'txn105', description: 'Restaurant - The Italian Place', amount: 75.00, date: new Date(2024, 6, 12).toISOString(), type: 'debit' as const, category: 'Dining' },
    ]
  },
  ja1: {
    accountId: 'ja1', accountName: 'Family Expenses', balance: 1875.20, currencySymbol: '$', accountType: 'Joint' as const, status: 'Active' as const,
    transactions: [
      { id: 'txn201', description: 'Groceries - SuperMart', amount: 75.50, date: new Date(2024, 6, 20).toISOString(), type: 'debit' as const, category: 'Food' },
      { id: 'txn202', description: 'Salary Deposit - Partner A', amount: 1200.00, date: new Date(2024, 6, 15).toISOString(), type: 'credit' as const, category: 'Income' },
      { id: 'txn203', description: 'Electricity Bill', amount: 95.00, date: new Date(2024, 6, 10).toISOString(), type: 'debit' as const, category: 'Utilities' },
    ]
  },
  all: { // Special case for "All Accounts" view or if no specific ID
    accountId: 'all', accountName: 'All Accounts Transactions', balance: 0, currencySymbol: '$', accountType: 'Overview' as const, status: 'Active' as const,
    transactions: [ // Combine some transactions for demo
        ...sampleAccountDetails.pa1.transactions,
        ...sampleAccountDetails.ja1.transactions,
    ].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // Sort combined by date
  }
};


const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: Home },
  { path: '/account-details/all', label: 'Accounts', icon: ListMinus },
  { path: '/joint-account/create/initiate', label: 'New Joint', icon: PlusCircle },
  { path: '/profile', label: 'Profile', icon: User },
  { path: '/settings', label: 'Settings', icon: Settings },
];

const AccountDetailsTransactionPage = () => {
  const { accountId = 'all' } = useParams<{ accountId?: string }>(); // Default to 'all' if no ID
  const navigate = useNavigate();
  console.log(`AccountDetailsTransactionPage loaded for account ID: ${accountId}`);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'debit' | 'credit'>('all');

  // @ts-ignore
  const account = sampleAccountDetails[accountId] || sampleAccountDetails.all;

  const filteredTransactions = useMemo(() => {
    return account.transactions.filter(tx => {
      const matchesSearch = tx.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            (tx.category && tx.category.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesType = filterType === 'all' || tx.type === filterType;
      return matchesSearch && matchesType;
    });
  }, [account.transactions, searchTerm, filterType]);

  if (!account) {
     return (
      <div className="flex flex-col min-h-screen items-center justify-center bg-slate-100">
        <AppHeader title="Error" showBackButton onBackButtonClick={() => navigate('/dashboard')} />
        <p className="p-4 text-red-600">Account details not found.</p>
        <NavigationMenu items={navItems} />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader title={accountId === 'all' ? 'All Transactions' : account.accountName} showBackButton onBackButtonClick={() => navigate(accountId === 'all' ? '/dashboard' : `/joint-account-overview/${accountId}`)} />
      <ScrollArea className="flex-grow mb-16">
        <main className="p-4 space-y-6">
          {accountId !== 'all' && <AccountSummaryCard {...account} />}

          <div className="space-y-4 p-4 bg-card rounded-lg border">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>
              <Select value={filterType} onValueChange={(value: 'all' | 'debit' | 'credit') => setFilterType(value)}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="debit">Debits</SelectItem>
                  <SelectItem value="credit">Credits</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {filteredTransactions.length > 0 ? (
            <div className="bg-card rounded-md border">
              {filteredTransactions.map(tx => (
                <TransactionListItem
                  key={tx.id}
                  {...tx}
                  onClick={(txId) => console.log('Transaction clicked:', txId)}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">No transactions match your criteria.</p>
          )}
        </main>
      </ScrollArea>
      <NavigationMenu items={navItems} />
    </div>
  );
};

export default AccountDetailsTransactionPage;