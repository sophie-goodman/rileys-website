import { type SchemaTypeDefinition } from 'sanity'

export const cvSection: SchemaTypeDefinition = {
  name: 'cvSection',
  title: 'CV Section',
  type: 'document',
  fields: [
    {
      name: 'sectionTitle',
      title: 'Section title',
      type: 'string',
      description: 'e.g. EXHIBITIONS, PUBLICATIONS, EDUCATION',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'order',
      title: 'Display order',
      type: 'number',
      description: 'Lower numbers appear first',
    },
    {
      name: 'entries',
      title: 'Entries',
      type: 'array',
      of: [{ type: 'cvEntry' }],
      description:
        'Use for exhibitions, publications, etc. For EDUCATION, prefer “Education (by institution)” below.',
    },
    {
      name: 'educationInstitutions',
      title: 'Education (by institution)',
      type: 'array',
      of: [{ type: 'cvEducationInstitution' }],
      description:
        'For EDUCATION: add each institution, then add multiple rows (degree or certification + year). Leave “Entries” empty for this section if you use this block.',
    },
  ],
  orderings: [{ title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'sectionTitle' },
    prepare({ title }) {
      return { title: title || 'Untitled section' }
    },
  },
}
