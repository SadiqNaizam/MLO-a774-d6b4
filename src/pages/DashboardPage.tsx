import React from 'react';
import AppHeader from '@/components/AppHeader';
import AccountSummaryCard from '@/components/AccountSummaryCard';
import NavigationMenu from '@/components/NavigationMenu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { BarChart, XAxis, YAxis, Bar, ResponsiveContainer, Legend, Tooltip, CartesianGrid } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Home, ListMinus, PlusCircle, User, Settings, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Sample data for the chart
const chartData = [
  { month: 'Jan', spending: 400, income: 600 },
  { month: 'Feb', spending: 300, income: 500 },
  { month: 'Mar', spending: 500, income: 750 },
  { month: 'Apr', spending: 450, income: 650 },
  { month: 'May', spending: 600, income: 800 },
];

// Sample nav items for NavigationMenu (can be customized or use defaults from component)
const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: Home },
  { path: '/account-details/all', label: 'Accounts', icon: ListMinus }, // Example link to a generic accounts page
  { path: '/joint-account/create/initiate', label: 'New Joint', icon: PlusCircle },
  { path: '/profile', label: 'Profile', icon: User }, // Assuming a profile page exists or will be added
  { path: '/settings', label: 'Settings', icon: Settings }, // Assuming a settings page
];

const DashboardPage = () => {
  console.log('DashboardPage loaded');
  const navigate = useNavigate();

  const personalAccounts = [
    { accountId: 'pa1', accountName: 'Personal Checking', balance: 5250.75, currencySymbol: '$', accountType: 'Personal', status: 'Active' as const },
    { accountId: 'pa2', accountName: 'Savings Account', balance: 12340.00, currencySymbol: '$', accountType: 'Personal', status: 'Active' as const },
  ];

  const jointAccounts = [
    { accountId: 'ja1', accountName: 'Family Expenses', balance: 1875.20, currencySymbol: '$', accountType: 'Joint', status: 'Active' as const },
    { accountId: 'ja2', accountName: 'Vacation Fund (Pending)', balance: 500.00, currencySymbol: '$', accountType: 'Joint', status: 'Pending Partner Acceptance' as const },
  ];


  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-slate-50">
      <AppHeader title="Dashboard" />
      <ScrollArea className="flex-grow mb-16"> {/* mb-16 for bottom nav */}
        <main className="p-4 space-y-6">
          
          <section>
            <h2 className="text-xl font-semibold mb-3 text-blue-300">My Accounts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {personalAccounts.map(acc => (
                <AccountSummaryCard
                  key={acc.accountId}
                  {...acc}
                  onViewDetails={() => navigate(`/account-details/${acc.accountId}`)}
                />
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-blue-300">Joint Accounts</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {jointAccounts.map(acc => (
                    <AccountSummaryCard
                    key={acc.accountId}
                    {...acc}
                    onViewDetails={() => navigate(`/joint-account-overview/${acc.accountId}`)}
                    />
                ))}
             </div>
            <Button 
              className="mt-4 w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white"
              onClick={() => navigate('/joint-account/create/initiate')}
            >
              Create New Joint Account <PlusCircle className="ml-2 h-4 w-4" />
            </Button>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-blue-300">Quick Actions</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Button variant="outline" className="bg-slate-800 border-blue-400 hover:bg-slate-700">Transfer Funds</Button>
              <Button variant="outline" className="bg-slate-800 border-blue-400 hover:bg-slate-700">Pay Bills</Button>
              <Button variant="outline" className="bg-slate-800 border-blue-400 hover:bg-slate-700">Deposit Check</Button>
              <Button variant="outline" className="bg-slate-800 border-blue-400 hover:bg-slate-700">View Statements</Button>
            </div>
          </section>

          <section>
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-blue-300">Financial Overview</CardTitle>
                <CardDescription className="text-slate-400">Your income vs. spending for the last 5 months.</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                    <XAxis dataKey="month" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip
                        contentStyle={{ backgroundColor: 'rgba(30, 41, 59, 0.9)', border: '1px solid #475569', borderRadius: '0.5rem' }}
                        labelStyle={{ color: '#cbd5e1' }}
                        itemStyle={{ color: '#e2e8f0' }}
                    />
                    <Legend wrapperStyle={{ color: '#e2e8f0' }} />
                    <Bar dataKey="income" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="spending" fill="#818cf8" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </section>

        </main>
      </ScrollArea>
      <NavigationMenu items={navItems} />
    </div>
  );
};

export default DashboardPage;