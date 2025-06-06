import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppHeader from '@/components/AppHeader';
import SteppedProgressIndicator from '@/components/SteppedProgressIndicator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import JointAccountPermissionsControl, { JointAccountPermissions } from '@/components/JointAccountPermissionsControl';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const creationSteps = [
  { id: 'initiate', label: 'Account Details' },
  { id: 'invite', label: 'Invite Partner' },
  { id: 'confirm', label: 'Confirmation' },
];

const JointAccountInvitationPermissionsPage = () => {
  console.log('JointAccountInvitationPermissionsPage loaded');
  const navigate = useNavigate();
  const [partnerEmail, setPartnerEmail] = useState('');
  const [permissions, setPermissions] = useState<JointAccountPermissions>({
    role: 'contributor',
    canViewBalance: true,
    canMakeTransactions: true,
    canInviteUsers: false,
    spendingLimitEnabled: false,
    spendingLimitAmount: 500, // Default limit
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!partnerEmail) {
      alert('Please enter your partner\'s email address.');
      return;
    }
    // Validate email format (basic)
    if (!/\S+@\S+\.\S+/.test(partnerEmail)) {
        alert('Please enter a valid email address.');
        return;
    }
    console.log('Invitation Details:', { partnerEmail, permissions });
    // Send invite, set up account (mocked)
    // Navigate to a confirmation/dashboard page
    alert(`Invitation sent to ${partnerEmail} with specified permissions. Account setup (mocked).`);
    navigate('/dashboard'); // Or a confirmation page
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <AppHeader
        title="Invite & Set Permissions"
        showBackButton
        onBackButtonClick={() => navigate('/joint-account/create/initiate')}
      />
      <main className="flex-grow container mx-auto px-4 py-8">
        <SteppedProgressIndicator steps={creationSteps} currentStepId="invite" />

        <Card className="max-w-lg mx-auto mt-8">
          <CardHeader>
            <CardTitle>Invite Your Partner</CardTitle>
            <CardDescription>Enter your partner's email to invite them to the joint account and set their access permissions.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="partnerEmail" className="font-semibold">Partner's Email Address</Label>
                <Input
                  id="partnerEmail"
                  type="email"
                  value={partnerEmail}
                  onChange={(e) => setPartnerEmail(e.target.value)}
                  placeholder="partner@example.com"
                  required
                  className="mt-1"
                />
              </div>

              <JointAccountPermissionsControl
                permissions={permissions}
                onPermissionsChange={setPermissions}
                currencySymbol="$"
              />
              
              <Button type="submit" className="w-full" disabled={!partnerEmail}>
                Send Invite & Set Up Account
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default JointAccountInvitationPermissionsPage;