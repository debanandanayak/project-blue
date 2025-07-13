import { redirect } from 'next/navigation';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

type Team = {
	name: string;
	logo: string;
	plan: string;
	url: string;
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const teams: Team[] = [
		{
			name: 'Acme Inc',
			logo: '',
			plan: 'hobby',
			url: 'my-team',
		},
	];
	if (teams.length === 0) {
		redirect('/team/new');
	}
	const data = {
		user: {
			name: 'shadcn',
			email: 'm@example.com',
			avatar: '/avatars/shadcn.jpg',
		},
		teams,
		navMain: [
			{
				title: 'Playground',
				url: 'play',
				icon: '',
				isActive: true,
				items: [],
			},
			{
				title: 'Models',
				url: '#',
				icon: '',
				items: [],
			},
			{
				title: 'Documentation',
				url: '#',
				icon: '',
				items: [],
			},
			{
				title: 'Settings',
				url: '#',
				icon: '',
				items: [],
			},
		],
	};
	return (
		<SidebarProvider>
			<AppSidebar
				data={data}
				variant="sidebar"
				className="group-data-[side=left]:border-r-0"
			/>
			<SidebarInset className="h-svh p-0 lg:p-1.5">
				<div className="h-full flex flex-col  lg:rounded-sm lg:ring lg:ring-accent">
					{children}
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
