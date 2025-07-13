import Form from 'next/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
export default async function NewTeam() {
	return (
		<div className="relative">
			<div className="mx-auto px-4 py-10 grid items-center h-screen">
				<div className="sm:mx-auto sm:w-full sm:max-w-[600px]">
					<div className="mx-auto sm:max-w-[520px] lg:rounded-sm lg:ring lg:ring-accent">
						<div className="space-y-4 p-8 backdrop-blur-lg">
							<div className="grid w-full items-center gap-1.5">
								<Form action={'/plan'}>
									<div className="flex flex-col items-center mb-5">
										<h1 className="text-3xl font-bold text-center">
											Create new team
										</h1>
										<p className="w-[30ch] mt-1.5 text-center">
											Continue to start inviting members and clients to write
											and send emails.
										</p>
									</div>
									<Label className="mb-1.5 mt-1.5" htmlFor="team">
										Team name
									</Label>
									<Input
										type="text"
										id="team"
										name="team"
										placeholder="Enter your team name"
										required
									/>

									<Label className="mb-1.5 mt-3.5" htmlFor="slug">
										Team slug
									</Label>
									<Input
										type="text"
										id="slug"
										name="slug"
										placeholder="your-team"
										required
									/>
									<p className="text-white/40 text-sm mt-1">
										Your can acces your team /team-slug
									</p>
									<div className="grid grid-cols-2 gap-3 w-full mt-3">
										<Button variant="outline" type="button">
											Cancel
										</Button>
										<Button type="submit">Continue</Button>
									</div>
								</Form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
