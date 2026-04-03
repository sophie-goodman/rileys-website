import { type SchemaTypeDefinition } from 'sanity'

export const cvEntry: SchemaTypeDefinition = {
  name: 'cvEntry',
  title: 'CV Entry',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title / Role',
      type: 'string',
    },
    {
      name: 'institution',
      title: 'Institution / Publication / Venue',
      type: 'string',
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
    },
    {
      name: 'date',
      title: 'Date',
      type: 'string',
      description: 'e.g. "2024" or "Jan 2024 - Mar 2024"',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
  ],
  preview: {
    select: { title: 'title', institution: 'institution', date: 'date' },
    prepare({ title, institution, date }) {
      return {
        title: title || institution || 'Untitled',
        subtitle: [institution, date].filter(Boolean).join(' · '),
      }
    },
  },
}
