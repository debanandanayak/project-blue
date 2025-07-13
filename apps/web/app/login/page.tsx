import { LoginForm } from '@/modules/auth/login'
import { fetchPublicConfig } from '@/modules/config/config.services'

export default async function LoginPage() {
	const { config } = await fetchPublicConfig()
	return (
		<div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
			<div className="w-full max-w-sm">
				<LoginForm config={config} />
			</div>
		</div>
	)
}
