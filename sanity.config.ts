'use client'

/**
 * Used by the embedded Studio (`app/studio`) and by `sanity deploy`.
 * `use client` is required so Next.js does not evaluate Studio plugins on the server.
 * Project/dataset come from `sanity/env.ts` with repo defaults so the CLI build always has a projectId
 * when `NEXT_PUBLIC_*` vars are unset during `npx sanity deploy`.
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

import {apiVersion, dataset, projectId} from './sanity/env'
import {schema} from './sanity/schemaTypes'
import {structure} from './sanity/structure'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    structureTool({structure}),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
  ],
})
