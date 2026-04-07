import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

const realClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})

export const client = {
  fetch: async <T>(query: string, params?: Record<string, unknown>): Promise<T | null> => {
    return realClient.fetch<T>(query, params)
  },
}
