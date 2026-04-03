import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

const realClient = createClient({
  projectId: projectId || 'placeholder',
  dataset,
  apiVersion,
  useCdn: true,
})

/** Use a no-op client when Sanity env vars are missing so dev server can start without hanging. */
export const client = {
  fetch: async <T>(query: string, params?: Record<string, unknown>): Promise<T | null> => {
    if (!projectId) return null
    return realClient.fetch<T>(query, params)
  },
}
