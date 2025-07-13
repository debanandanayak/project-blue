'use client'

import { ChevronDown, Plus } from 'lucide-react'
import Link from 'next/link'
import * as React from 'react'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar'

export function WorkspaceSwitcher({
	teams,
}: {
	teams: {
		name: string
		logo: string
		plan: string
		url: string
	}[]
}) {
	const [activeTeam, setActiveTeam] = React.useState(teams[0])

	if (!activeTeam) {
		return null
	}

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton className="w-fit px-1.5">
							<div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-5 items-center justify-center rounded-md">
								{/* <activeTeam.logo className="size-3" /> */}
							</div>
							<span className="truncate font-medium">{activeTeam.name}</span>
							<ChevronDown className="opacity-50" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-60 rounded-sm"
						align="start"
						side="bottom"
						sideOffset={4}
					>
						<DropdownMenuLabel className="text-muted-foreground text-xs">
							Workspaces
						</DropdownMenuLabel>
						{teams.map((team, index) => (
							<Link href={`/${team.url}`} key={team.url}>
								<DropdownMenuItem
									key={team.name}
									onClick={() => setActiveTeam(team)}
									className="gap-2"
								>
									<div className="flex items-center justify-center rounded-xs border">
										{/* <workspace.logo className="size-4 shrink-0" /> */}
									</div>
									{team.name}
									<DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
								</DropdownMenuItem>
							</Link>
						))}
						<DropdownMenuSeparator />
						<DropdownMenuItem className="gap-2">
							<div className="bg-background flex size-6 items-center justify-center rounded-md border">
								<Plus className="size-4" />
							</div>
							<Link
								className="text-muted-foreground font-medium"
								href={'/team/new'}
							>
								Add team
							</Link>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}
