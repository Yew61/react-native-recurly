import { posthog } from '@/lib/posthog'

type LogAttributes = Record<string, boolean | number | string>

/**
 * Sends only purpose-written application logs through the PostHog SDK-native
 * log exporter. Existing application loggers remain unmodified.
 */
export const posthogAppLogger = {
  info(message: string, attributes?: LogAttributes) {
    posthog?.logger.info(message, attributes)
  },
}
