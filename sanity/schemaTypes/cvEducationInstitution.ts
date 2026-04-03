import { type SchemaTypeDefinition } from 'sanity'

/** School / org with multiple degree or certification lines */
export const cvEducationInstitution: SchemaTypeDefinition = {
  name: 'cvEducationInstitution',
  title: 'Institution',
  type: 'object',
  fields: [
    {
      name: 'institution',
      title: 'Institution',
      type: 'string',
      description: 'School, academy, or organization name',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'programs',
      title: 'Degrees and certifications',
      type: 'array',
      of: [{ type: 'cvEducationProgram' }],
      validation: (Rule) => Rule.min(1).error('Add at least one degree or certification'),
    },
  ],
  preview: {
    select: { institution: 'institution' },
    prepare({ institution }) {
      return { title: institution || 'Institution' }
    },
  },
}
