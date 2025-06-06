import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input"; // For precise limit input
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export interface JointAccountPermissions {
  role: 'viewer' | 'contributor' | 'full_control';
  canViewBalance: boolean;
  canMakeTransactions: boolean;
  canInviteUsers: boolean;
  spendingLimitEnabled: boolean;
  spendingLimitAmount: number; // Per transaction or period
}

interface JointAccountPermissionsControlProps {
  permissions: JointAccountPermissions;
  onPermissionsChange: (newPermissions: JointAccountPermissions) => void;
  currencySymbol?: string;
}

const JointAccountPermissionsControl: React.FC<JointAccountPermissionsControlProps> = ({
  permissions,
  onPermissionsChange,
  currencySymbol = '$',
}) => {
  console.log("Rendering JointAccountPermissionsControl with permissions:", permissions);

  const handleRoleChange = (newRole: JointAccountPermissions['role']) => {
    // Pre-set capabilities based on role
    let newPermissions: JointAccountPermissions = { ...permissions, role: newRole };
    if (newRole === 'viewer') {
      newPermissions = {
        ...newPermissions,
        canViewBalance: true,
        canMakeTransactions: false,
        canInviteUsers: false,
        spendingLimitEnabled: false,
      };
    } else if (newRole === 'contributor') {
      newPermissions = {
        ...newPermissions,
        canViewBalance: true,
        canMakeTransactions: true,
        canInviteUsers: false,
        // spendingLimitEnabled can be true by default or user choice
      };
    } else if (newRole === 'full_control') {
      newPermissions = {
        ...newPermissions,
        canViewBalance: true,
        canMakeTransactions: true,
        canInviteUsers: true,
        spendingLimitEnabled: false, // Full control usually means no limit
      };
    }
    onPermissionsChange(newPermissions);
  };

  const handleCheckboxChange = (field: keyof Pick<JointAccountPermissions, 'canViewBalance' | 'canMakeTransactions' | 'canInviteUsers' | 'spendingLimitEnabled'>, checked: boolean) => {
    onPermissionsChange({ ...permissions, [field]: checked });
  };

  const handleSpendingLimitChange = (value: number[]) => {
    onPermissionsChange({ ...permissions, spendingLimitAmount: value[0] });
  };
  
  const handleSpendingLimitInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
        onPermissionsChange({ ...permissions, spendingLimitAmount: value });
    }
  };


  const isRoleBasedControl = permissions.role !== 'full_control'; // Example: less granular for full control

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Set Partner Permissions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="permission-role">Role</Label>
          <Select value={permissions.role} onValueChange={handleRoleChange}>
            <SelectTrigger id="permission-role">
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="viewer">Viewer (Can only see balance & transactions)</SelectItem>
              <SelectItem value="contributor">Contributor (Can make transactions, optionally with limits)</SelectItem>
              <SelectItem value="full_control">Full Control (Manage account, invite others)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isRoleBasedControl && (
            <>
                <div className="space-y-3">
                    <h3 className="text-sm font-medium">Capabilities:</h3>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                        id="canViewBalance"
                        checked={permissions.canViewBalance}
                        onCheckedChange={(checked) => handleCheckboxChange('canViewBalance', !!checked)}
                        disabled={permissions.role === 'viewer' || permissions.role === 'contributor' || permissions.role === 'full_control'} // View balance is usually mandatory
                        />
                        <Label htmlFor="canViewBalance" className="text-sm font-normal">View balance and transactions</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                        id="canMakeTransactions"
                        checked={permissions.canMakeTransactions}
                        onCheckedChange={(checked) => handleCheckboxChange('canMakeTransactions', !!checked)}
                        disabled={permissions.role === 'viewer'}
                        />
                        <Label htmlFor="canMakeTransactions" className="text-sm font-normal">Make transactions</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                        id="canInviteUsers"
                        checked={permissions.canInviteUsers}
                        onCheckedChange={(checked) => handleCheckboxChange('canInviteUsers', !!checked)}
                        disabled={permissions.role !== 'full_control'}
                        />
                        <Label htmlFor="canInviteUsers" className="text-sm font-normal">Invite other users to this account</Label>
                    </div>
                </div>

                {permissions.canMakeTransactions && permissions.role === 'contributor' && (
                    <div className="space-y-3 pt-4 border-t">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="spendingLimitEnabled"
                                checked={permissions.spendingLimitEnabled}
                                onCheckedChange={(checked) => handleCheckboxChange('spendingLimitEnabled', !!checked)}
                            />
                            <Label htmlFor="spendingLimitEnabled" className="text-sm font-medium">Enable Spending Limit (per transaction)</Label>
                        </div>
                        {permissions.spendingLimitEnabled && (
                        <div className="space-y-2 pl-6">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">{currencySymbol}</span>
                                <Input 
                                    type="number"
                                    value={permissions.spendingLimitAmount}
                                    onChange={handleSpendingLimitInputChange}
                                    className="w-32"
                                    min="0"
                                    step="1"
                                />
                            </div>
                            <Slider
                                value={[permissions.spendingLimitAmount]}
                                onValueChange={handleSpendingLimitChange}
                                max={1000} // Example max limit
                                step={10}
                                className="w-full"
                            />
                            <p className="text-xs text-muted-foreground">
                                Partner can spend up to {currencySymbol}{permissions.spendingLimitAmount.toLocaleString()} per transaction.
                            </p>
                        </div>
                        )}
                    </div>
                )}
            </>
        )}
      </CardContent>
    </Card>
  );
};

export default JointAccountPermissionsControl;