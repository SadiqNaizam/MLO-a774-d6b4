import React from 'react';
import { cn } from '@/lib/utils';

interface Step {
  id: string | number;
  label: string;
}

interface SteppedProgressIndicatorProps {
  steps: Step[];
  currentStepId: string | number;
  onStepClick?: (stepId: string | number) => void; // Optional: allow clicking on steps
}

const SteppedProgressIndicator: React.FC<SteppedProgressIndicatorProps> = ({
  steps,
  currentStepId,
  onStepClick,
}) => {
  console.log(`Rendering SteppedProgressIndicator, current step ID: ${currentStepId}`);
  const currentStepIndex = steps.findIndex(step => step.id === currentStepId);

  return (
    <nav aria-label="Progress" className="py-4">
      <ol role="list" className="flex items-center justify-between space-x-2 sm:space-x-4">
        {steps.map((step, stepIdx) => (
          <li key={step.id} className="relative flex-1">
            {/* Connector line (except for the first step) */}
            {stepIdx > 0 && (
              <div
                className={cn(
                  "absolute inset-0 flex items-center",
                  stepIdx < steps.length ? "w-full" : ""
                )}
                aria-hidden="true"
              >
                <div className={cn(
                    "h-0.5 w-full",
                    stepIdx <= currentStepIndex ? "bg-primary" : "bg-gray-200 dark:bg-gray-700"
                )} />
              </div>
            )}

            <button
              type="button"
              onClick={() => onStepClick?.(step.id)}
              disabled={!onStepClick && stepIdx > currentStepIndex} // Disable future steps if not clickable
              className={cn(
                "relative flex h-8 w-8 items-center justify-center rounded-full transition-colors",
                stepIdx < currentStepIndex ? "bg-primary hover:bg-primary/90" : "",
                stepIdx === currentStepIndex ? "ring-2 ring-primary ring-offset-2 bg-primary text-primary-foreground" : "",
                stepIdx > currentStepIndex ? "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600" : "",
                onStepClick ? "cursor-pointer" : "cursor-default"
              )}
              aria-current={stepIdx === currentStepIndex ? "step" : undefined}
            >
              <span className={cn(
                  "text-xs font-medium",
                  stepIdx < currentStepIndex ? "text-primary-foreground" : "",
                  stepIdx === currentStepIndex ? "text-primary-foreground" : "",
                  stepIdx > currentStepIndex ? "text-gray-600 dark:text-gray-300" : ""
              )}>
                {stepIdx + 1}
              </span>
              <span className="sr-only">{step.label}</span>
            </button>
            <p className={cn(
                "mt-2 text-center text-xs sm:text-sm font-medium truncate",
                stepIdx <= currentStepIndex ? "text-primary" : "text-muted-foreground"
            )}>
              {step.label}
            </p>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default SteppedProgressIndicator;