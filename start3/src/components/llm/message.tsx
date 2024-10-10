import { cn } from "@/lib/utils";
import { Sparkle, UserIcon } from 'lucide-react';

// Different types of message bubbles.
export function UserMessage({ children }: { children: React.ReactNode; }) {
  return (
    <div className="group relative flex flex-col items-end">
      <div className="mt-2 rounded-3xl flex-1 text-black text-pretty text-lg font-bold tracking-tighter space-y-2 overflow-hidden p-3  px-4 min-w-xl',
          'rotate-[-10deg] rounded-full blur-3xl', bg-opacity-10">
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
      <div className="h-10 w-10  flex items-center justify-center">
        <svg width="40" height="40" viewBox="0 0 90 128" fill="#A479FF" xmlns="http://www.w3.org/2000/svg" strokeWidth="0.5px" strokeLinecap="round" strokeLinejoin="round"><path d="M28.3501 72.57V102.8L2 87.59V57.36L22 68.9L28.3501 72.57Z" stroke="white" strokeLinejoin="round"/><path d="M87.8799 85.39V115.62L67.8799 125.62V95.39L87.8799 85.39Z" stroke="white" strokeLinejoin="round"/><path d="M87.8801 85.39L67.8801 95.39L61.5303 91.72L48.3503 84.12L41.5303 80.18L48.3503 76.7701L55.5703 73.16L61.5303 76.6L67.8801 80.2701L73.8403 77.29L87.8801 85.39Z" stroke="white" strokeLinejoin="round"/><path d="M67.8801 95.39V125.62L41.5303 110.41V80.1799L48.3503 84.1199L61.5303 91.7199L67.8801 95.39Z" stroke="white" strokeLinejoin="round"/><path d="M48.3501 17.22L28.3501 27.22L22 23.55L2 12L22 2L48.3501 17.22Z" stroke="white" strokeLinejoin="round"/><path d="M28.3501 27.22V57.45L22 53.78L16.04 50.34L2 42.24V12L22 23.55L28.3501 27.22Z" stroke="white" strokeLinejoin="round"/><path d="M87.8799 40.03V70.2701L67.8799 80.2701V50.03L87.8799 40.03Z" stroke="white" strokeLinejoin="round"/><path d="M67.8801 50.03V80.27L61.5303 76.6L55.5703 73.16L48.3503 69L42.3801 65.55L41.5303 65.06V34.82L48.3503 38.76L61.5303 46.36L67.8801 50.03Z" stroke="white" strokeLinejoin="round"/><path d="M48.3496 17.22V31.41L41.5295 34.82V50.86L34.3096 54.47L28.3496 57.45V27.22L48.3496 17.22Z" stroke="white" strokeLinejoin="round"/><path d="M42.3799 65.55L28.3501 72.57L22 68.9L2 57.36L16.04 50.34L22 53.78L28.3501 57.45L34.3101 54.47L41.53 58.63V65.06L42.3799 65.55Z" stroke="white" strokeLinejoin="round"/><path d="M48.3496 69V76.7701L41.5295 80.18V96.21L28.3496 102.8V72.57L42.3794 65.55L48.3496 69Z" stroke="white" strokeLinejoin="round"/><path d="M87.8801 40.03L67.8801 50.03L61.5303 46.36L48.3503 38.76L41.5303 34.82L48.3503 31.41L61.5303 24.82L87.8801 40.03Z" stroke="white" strokeLinejoin="round"/></svg>
      </div>
      <div className=" flex-1 space-y-2 overflow-hidden px-1 w-full">
        {children}
      </div>
    </div>
  );
}

export function ResponseSubmitted({ children }: { children: React.ReactNode }) {
  return (
    <div className="group relative flex items-start justify-end md:-mr-12">
      <div className="max-w-xs rounded-lg py-2 px-3 mr-2 bg-background text-primary flex items-center text-sm ">
        {children}
      </div>
      <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full bg-black">
        <UserIcon className='text-black h-5 w-5' />
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
