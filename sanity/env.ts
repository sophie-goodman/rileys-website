/** Default project for this repo — keeps `sanity deploy` working when .env is not loaded. */
const DEFAULT_PROJECT_ID = 'huz1pj9w'
const DEFAULT_DATASET = 'production'

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-12-12'

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || DEFAULT_DATASET

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() || DEFAULT_PROJECT_ID
