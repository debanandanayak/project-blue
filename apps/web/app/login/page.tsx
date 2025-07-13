import { LoginForm } from '@/modules/auth/login';
import { RuntimePublicConfig } from '@/modules/config/config';
import { fetchPublicConfig } from '@/modules/config/config.services';
import { apiClient } from '@/modules/shared/http/api-client';

export default async function LoginPage() {
	const { config } = await fetchPublicConfig();
	return (
		<div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
			<div className="w-full max-w-sm">
				<LoginForm config={config} />
			</div>
		</div>
	);
}
