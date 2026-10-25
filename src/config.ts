/**
 * Public build-time settings supplied by Vite environment files.
 * Only variables prefixed with VITE_ are available in browser code.
 */
export const appConfig = {
  environment: import.meta.env.VITE_APP_ENV ?? import.meta.env.MODE,
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? '',
} as const
