import { cors } from "hono/cors"
import { first } from "lodash-es"
import type { Config } from "@/src/modules/config/config.types"

export function createCorsMiddleware({ config }: { config: Config }) {
    return cors({
        origin: (origin) => {
            const allowedOrigins = config.server.corsOrigins

            if (first(allowedOrigins) === "*" && allowedOrigins.length === 1) {
                return origin
            }

            return allowedOrigins.find((allowedOrigin) => allowedOrigin === origin)
        },
        credentials: true,
    })
}
