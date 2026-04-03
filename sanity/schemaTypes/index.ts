import { type SchemaTypeDefinition } from 'sanity'
import { aboutPage } from './aboutPage'
import { artwork } from './artwork'
import { cvEducationInstitution } from './cvEducationInstitution'
import { cvEducationProgram } from './cvEducationProgram'
import { cvEntry } from './cvEntry'
import { cvSection } from './cvSection'
import { homePage } from './homePage'
import { siteSettings } from './siteSettings'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    artwork,
    cvEducationProgram,
    cvEducationInstitution,
    cvEntry,
    cvSection,
    siteSettings,
    homePage,
    aboutPage,
  ],
}
