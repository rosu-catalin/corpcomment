import { ReactNode } from 'react';
import { cn } from '../../lib/utils.ts';

const MaxWidthWrapper = ({ className, children }: { className?: string; children: ReactNode }) => {
    return <div className={cn('mx-auto w-full max-w-[1060px] px-6', className)}>{children}</div>;
};

export default MaxWidthWrapper;
