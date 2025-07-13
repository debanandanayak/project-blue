// "use client"

import { Search } from 'lucide-react'
import type * as React from 'react'

import { NavMain } from '@/components/nav-main'
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
} from '@/components/ui/sidebar'
import { Button } from './ui/button'
import { WorkspaceSwitcher } from './workspace-switcher'

export type AppSidebarData = {
	user: {
		name: string
		email: string
		avatar: string
	}
	teams: {
		name: string
		logo: string
		plan: string
		url: string
	}[]
	navMain: {
		title: string
		url: string
		icon: string
		isActive?: boolean
		// biome-ignore lint/suspicious/noExplicitAny: <its okay>
		items: any[] // You can further type this if needed
	}[]
}

export function AppSidebar({
	data,
	...props
}: { data: AppSidebarData } & React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar variant="inset" {...props}>
			<SidebarHeader>
				<div className="flex flex-row items-center">
					<WorkspaceSwitcher teams={data.teams} />
					<Button variant="ghost" className="hover:text-muted-foreground">
						<Search />
					</Button>
				</div>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
			</SidebarContent>
			<SidebarFooter></SidebarFooter>
		</Sidebar>
	)
}
