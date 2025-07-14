import { genericOAuthClient } from "better-auth/client/plugins"
import { createAuthClient as createBetterAuthClient } from "better-auth/react"
import type { Config } from "../config/config"
import { buildTimeConfig } from "../config/config"
import { createDemoAuthClient } from "./auth.demo.services"
import type { SsoProviderConfig } from "./auth.types"

export function createAuthClient() {
    console.log(buildTimeConfig)

    const client = createBetterAuthClient({
        baseURL: buildTimeConfig.baseApiUrl,
        plugins: [genericOAuthClient()],
    })

    return {
        // we can't spread the client because it is a proxy object
        signIn: client.signIn,
        signUp: client.signUp,
        forgetPassword: client.forgetPassword,
        resetPassword: client.resetPassword,
        sendVerificationEmail: client.sendVerificationEmail,
        useSession: client.useSession,
        signOut: async () => {
            const result = await client.signOut()
            return result
        },
    }
}

export const {
    useSession,
    signIn,
    signUp,
    signOut,
    forgetPassword,
    resetPassword,
    sendVerificationEmail,
} = buildTimeConfig.isDemoMode ? createDemoAuthClient() : createAuthClient()

export async function authWithProvider({
    provider,
    config,
}: {
    provider: SsoProviderConfig
    config: Config
}) {
    const isCustomProvider = config.auth.providers.customs.some(
        ({ providerId }) => providerId === provider.key,
    )

    if (isCustomProvider) {
        signIn.oauth2({
            providerId: provider.key,
            callbackURL: config.baseUrl,
        })
        return
    }

    await signIn.social({
        provider: provider.key as "github" | "google",
        callbackURL: config.baseUrl,
    })
}
