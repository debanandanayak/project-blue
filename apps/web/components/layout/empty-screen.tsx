import type React from 'react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

export function EmptyScreen({
	Icon: icon,
	customIcon,
	avatar,
	headline,
	description,
	buttonText,
	buttonOnClick,
	buttonRaw,
	border = false,
	dashedBorder = false,
	className,
	iconClassName,
	iconWrapperClassName,
	limitWidth = true,
}: {
	Icon?: React.ReactElement;
	customIcon?: React.ReactElement;
	avatar?: React.ReactElement;
	headline: string | React.ReactElement;
	description?: string | React.ReactElement;
	buttonText?: string;
	buttonOnClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
	buttonRaw?: ReactNode; // Used incase you want to provide your own button.
	border?: boolean;
	dashedBorder?: boolean;
	iconWrapperClassName?: string;
	iconClassName?: string;
	limitWidth?: boolean;
} & React.HTMLAttributes<HTMLDivElement>) {
	return (
		<>
			<div
				data-testid="empty-screen"
				className={cn(
					'flex w-full select-none flex-col items-center justify-center rounded-lg p-7 lg:p-20',
					border && 'border-subtle border',
					dashedBorder && 'border-dashed',
					className,
				)}
			>
				{!avatar ? null : (
					<div className="flex h-[72px] w-[72px] items-center justify-center rounded-full">
						{avatar}
					</div>
				)}

				{!icon ? null : (
					<div
						className={cn(
							'bg-secondary flex h-[72px] w-[72px] items-center justify-center rounded-full ',
							iconWrapperClassName,
						)}
					>
						{icon}
					</div>
				)}
				{!customIcon ? null : <>{customIcon}</>}
				<div
					className={`flex ${limitWidth ? 'max-w-[420px]' : ''}  flex-col items-center`}
				>
					<h2
						className={cn(
							'text-semibold text-muted-foreground text-center text-md font-bold normal-nums',
							icon && 'mt-6',
							!description && 'mb-8',
						)}
					>
						{headline}
					</h2>
					{description && (
						<div className="text-muted-foreground mb-8 mt-3 text-center text-sm font-normal leading-6">
							{description}
						</div>
					)}
					{buttonOnClick && buttonText && (
						<Button onClick={(e) => buttonOnClick(e)}>{buttonText}</Button>
					)}
					{buttonRaw}
				</div>
			</div>
		</>
	);
}
