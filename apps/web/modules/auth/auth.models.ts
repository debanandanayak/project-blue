import { get } from "lodash-es"
import type { Config } from "../config/config"
import { ssoProviders } from "./auth.constants"
import type { SsoProviderConfig } from "./auth.types"

export function isAuthErrorWithCode({
    error,
    code,
}: {
    error: unknown
    code: string
}) {
    return get(error, "code") === code
}

export const isEmailVerificationRequiredError = ({
    error,
}: {
    error: unknown
}) => isAuthErrorWithCode({ error, code: "EMAIL_NOT_VERIFIED" })

export function getEnabledSsoProviderConfigs({
    config,
}: {
    config: Config
}): SsoProviderConfig[] {
    const enabledSsoProviders: SsoProviderConfig[] = [
        ...ssoProviders.filter(({ key }) =>
            get(config, `auth.providers.${key}.isEnabled`),
        ),
        ...config.auth.providers.customs.map(
            ({ providerId, providerName, providerIconUrl }) => ({
                key: providerId,
                name: providerName,
                icon: providerIconUrl ?? "i-tabler-login-2",
            }),
        ),
    ]

    return enabledSsoProviders
}
