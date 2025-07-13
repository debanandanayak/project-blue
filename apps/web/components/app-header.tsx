import { cn } from '@/lib/utils';
import { SidebarTrigger } from './ui/sidebar';

export function AppHeader({
	className,
	children,
	...props
}: React.ComponentProps<'header'>) {
	return (
		<header className={cn('flex items-center ml-4 h-10', className)} {...props}>
			<SidebarTrigger
				variant="link"
				className="text-muted-foreground cursor-pointer hover:text-foreground mr-3"
			/>
			{children}
		</header>
	);
}
