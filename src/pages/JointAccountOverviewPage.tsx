import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AppHeader from '@/components/AppHeader';
import AccountSummaryCard from '@/components/AccountSummaryCard';
import TransactionListItem from '@/components/TransactionListItem';
import NavigationMenu from '@/components/NavigationMenu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { BarChart, XAxis, YAxis, Bar, ResponsiveContainer, Legend, Tooltip, CartesianGrid } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Home, ListMinus, PlusCircle, User, Settings, Users, Cog } from 'lucide-react';

// Sample data - in a real app, this would be fetched based on accountId
const sampleJointAccountData = {
  ja1: {
    accountId: 'ja1',
    accountName: 'Family Expenses',
    balance: 1875.20,
    currencySymbol: '$',
    accountType: 'Joint' as const,
    status: 'Active' as const,
    transactions: [
      { id: 'txn1', description: 'Groceries - SuperMart', amount: 75.50, date: new Date(2024, 6, 20).toISOString(), type: 'debit' as const, category: 'Food' },
      { id: 'txn2', description: 'Salary Deposit - Partner A', amount: 1200.00, date: new Date(2024, 6, 15).toISOString(), type: 'credit' as const, category: 'Income' },
      { id: 'txn3', description: 'Electricity Bill', amount: 95.00, date: new Date(2024, 6, 10).toISOString(), type: 'debit' as const, category: 'Utilities' },
      { id: 'txn4', description: 'Kids School Fees', amount: 300.00, date: new Date(2024, 6, 5).toISOString(), type: 'debit' as const, category: 'Education' },
    ],
    chartData: [
      { category: 'Food', amount: 350 },
      { category: 'Utilities', amount: 150 },
      { category: 'Transfers', amount: 200 },
      { category: 'Shopping', amount: 250 },
    ]
  },
   ja2: { // Example for "Pending" account
    accountId: 'ja2',
    accountName: 'Vacation Fund (Pending)',
    balance: 500.00,
    currencySymbol: '$',
    accountType: 'Joint' as const,
    status: 'Pending Partner Acceptance' as const,
    transactions: [],
    chartData: []
  }
};

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: Home },
  { path: '/account-details/all', label: 'Accounts', icon: ListMinus },
  { path: '/joint-account/create/initiate', label: 'New Joint', icon: PlusCircle },
  { path: '/profile', label: 'Profile', icon: User },
  { path: '/settings', label: 'Settings', icon: Settings },
];


const JointAccountOverviewPage = () => {
  const { accountId } = useParams<{ accountId: string }>();
  const navigate = useNavigate();
  console.log(`JointAccountOverviewPage loaded for account ID: ${accountId}`);

  // @ts-ignore
  const account = accountId ? sampleJointAccountData[accountId] : null;

  if (!account) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center bg-slate-100">
        <AppHeader title="Error" showBackButton onBackButtonClick={() => navigate('/dashboard')} />
        <p className="p-4 text-red-600">Joint account not found.</p>
        <NavigationMenu items={navItems} />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader title={account.accountName} showBackButton onBackButtonClick={() => navigate('/dashboard')} />
      <ScrollArea className="flex-grow mb-16">
        <main className="p-4 space-y-6">
          <AccountSummaryCard {...account} />

          {account.status === 'Active' && (
            <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button variant="outline" onClick={() => console.log('Manage Members Clicked for', accountId)}>
                    <Users className="mr-2 h-4 w-4" /> Manage Members
                </Button>
                <Button variant="outline" onClick={() => console.log('Account Settings Clicked for', accountId)}>
                    <Cog className="mr-2 h-4 w-4" /> Account Settings
                </Button>
            </div>

            <Card>
                <CardHeader>
                <CardTitle>Spending Breakdown</CardTitle>
                <CardDescription>Spending by category this month.</CardDescription>
                </CardHeader>
                <CardContent>
                {account.chartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={account.chartData} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="category" type="category" width={80} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="amount" fill="#8884d8" radius={[0, 4, 4, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                ) : <p className="text-muted-foreground">No spending data available for this period.</p>}
                </CardContent>
            </Card>

            <section>
                <h2 className="text-xl font-semibold mb-3">Recent Transactions</h2>
                {account.transactions.length > 0 ? (
                <div className="bg-card rounded-md border">
                    {account.transactions.map(tx => (
                    <TransactionListItem
                        key={tx.id}
                        {...tx}
                        onClick={(txId) => console.log('Transaction clicked:', txId)}
                    />
                    ))}
                </div>
                ) : (
                <p className="text-muted-foreground">No transactions yet.</p>
                )}
            </section>
            </>
          )}
          {account.status === 'Pending Partner Acceptance' && (
            <Card className="bg-yellow-50 border-yellow-300">
                <CardHeader>
                    <CardTitle className="text-yellow-700">Pending Acceptance</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-yellow-600">This joint account is awaiting acceptance from the invited partner. Some features will be unavailable until the account is active.</p>
                    <Button className="mt-4" variant="outline">Resend Invitation</Button>
                </CardContent>
            </Card>
          )}

        </main>
      </ScrollArea>
      <NavigationMenu items={navItems} />
    </div>
  );
};

export default JointAccountOverviewPage;