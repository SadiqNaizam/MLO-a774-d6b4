import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppHeader from '@/components/AppHeader';
import SteppedProgressIndicator from '@/components/SteppedProgressIndicator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const creationSteps = [
  { id: 'initiate', label: 'Account Details' },
  { id: 'invite', label: 'Invite Partner' },
  { id: 'confirm', label: 'Confirmation' },
];

const JointAccountCreationInitiationPage = () => {
  console.log('JointAccountCreationInitiationPage loaded');
  const navigate = useNavigate();
  const [accountName, setAccountName] = useState('');
  const [accountPurpose, setAccountPurpose] = useState(''); // Optional
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accountName || !agreedToTerms) {
      alert('Please provide an account name and agree to the terms.');
      return;
    }
    console.log('Account Details:', { accountName, accountPurpose, agreedToTerms });
    // Save details to state/context and navigate to next step
    navigate('/joint-account/create/invite');
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <AppHeader
        title="Create Joint Account"
        showBackButton
        onBackButtonClick={() => navigate('/dashboard')}
        showCancelButton
        onCancelButtonClick={() => navigate('/dashboard')}
      />
      <main className="flex-grow container mx-auto px-4 py-8">
        <SteppedProgressIndicator steps={creationSteps} currentStepId="initiate" />

        <Card className="max-w-lg mx-auto mt-8">
          <CardHeader>
            <CardTitle>Set Up Your Joint Account</CardTitle>
            <CardDescription>Start by giving your new joint account a name and purpose.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="accountName" className="font-semibold">Account Name</Label>
                <Input
                  id="accountName"
                  type="text"
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  placeholder="E.g., Family Expenses, Vacation Fund"
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="accountPurpose" className="font-semibold">Purpose (Optional)</Label>
                <Input
                  id="accountPurpose"
                  type="text"
                  value={accountPurpose}
                  onChange={(e) => setAccountPurpose(e.target.value)}
                  placeholder="E.g., Managing household bills"
                  className="mt-1"
                />
              </div>
              <div className="items-top flex space-x-2">
                <Checkbox
                  id="terms"
                  checked={agreedToTerms}
                  onCheckedChange={(checked) => setAgreedToTerms(!!checked)}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    I agree to the terms and conditions for joint accounts.
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Please review the <a href="/terms/joint-account" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">Joint Account Agreement</a>.
                  </p>
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={!accountName || !agreedToTerms}>
                Continue to Invite Partner
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default JointAccountCreationInitiationPage;