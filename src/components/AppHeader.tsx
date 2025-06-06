import React from 'react';
import { ArrowLeft, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AppHeaderProps {
  title: string;
  showBackButton?: boolean;
  onBackButtonClick?: () => void;
  showCancelButton?: boolean;
  onCancelButtonClick?: () => void;
  // You can add more props for right-side actions, etc.
}

const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  showBackButton = false,
  onBackButtonClick,
  showCancelButton = false,
  onCancelButtonClick,
}) => {
  console.log(`Rendering AppHeader with title: ${title}, back: ${showBackButton}, cancel: ${showCancelButton}`);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center px-4">
        {showBackButton && (
          <Button variant="ghost" size="icon" className="mr-2" onClick={onBackButtonClick} aria-label="Go back">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        <div className="flex-1">
          <h1 className="text-lg font-semibold truncate">{title}</h1>
        </div>
        {showCancelButton && (
          <Button variant="ghost" size="icon" className="ml-2" onClick={onCancelButtonClick} aria-label="Cancel">
            <X className="h-5 w-5" />
          </Button>
        )}
        {/* Placeholder for other actions if needed */}
      </div>
    </header>
  );
};

export default AppHeader;