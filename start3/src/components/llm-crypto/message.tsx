import { cn } from "@/lib/utils";
import { Sparkle, UserIcon } from 'lucide-react';

// Different types of message bubbles.
export function UserMessage({ children }: { children: React.ReactNode; }) {
  return (
    <div className="group relative flex flex-col items-end">
      <div className="flex  shrink-0 select-none items-center justify-center shadow-sm bg-neutral-900">
   {'me'}
      </div>
      <div className="mt-2 min-w-[150px] rounded-3xl flex-1 space-y-2 overflow-hidden p-3 bg-neutral-200 text-black">
        {children}
      </div>
    </div>
  );
}

export function BotMessage({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('group relative flex flex-col items-start', className)}>
      <div className="flex  shrink-0 select-none items-center justify-center shadow-sm bg-primary text-primary-foreground">
    BlockBuddy 
      </div>
      <div className="mt-2 min-w-[150px] rounded-3xl flex-1 space-y-2 overflow-hidden p-3 bg-neutral-800">
        {children}
      </div>
    </div>
  );
}

export function BotCard({
  children,
  showAvatar = true,
}: {
  children: React.ReactNode;
  showAvatar?: boolean;
}) {
  return (
    <div className="group relative flex items-start md:-ml-12">
      <div
        className={cn(
          'flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow-sm bg-primary text-primary-foreground',
          !showAvatar && 'invisible',
        )}
      >
        <Sparkle />
      </div>
      <div className="ml-4 flex-1 px-1">{children}</div>
    </div>
  );
}

export function AssistantMessage({ children }: { children: React.ReactNode; }) {
  return (
    <div
      className={
        'mt-2 flex items-center justify-center gap-2 text-xs text-gray-500'
      }
    >
      <div className={'max-w-[600px] flex-initial px-2 py-2'}>{children}</div>
    </div>
  );
}
