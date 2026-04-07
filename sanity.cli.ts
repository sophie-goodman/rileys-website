/**
 * Lets you run `npx sanity [command]` in this folder.
 * https://www.sanity.io/docs/cli
 */
import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'huz1pj9w',
    dataset: 'production',
  },
  /** Hostname for https://rileymidroni.sanity.studio */
  studioHost: 'rileymidroni',
  deployment: {
    appId: 'zujuyyi4vatonefvk6rn5vmv',
  },
})
