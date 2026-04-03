import { type SchemaTypeDefinition } from 'sanity'

export const aboutPage: SchemaTypeDefinition = {
  name: 'aboutPage',
  title: 'About page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'e.g. Riley Midroni',
    },
    {
      name: 'portrait',
      title: 'Portrait image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'bio',
      title: 'Bio / Statement',
      type: 'text',
    },
    {
      name: 'showContactForm',
      title: 'Show contact form',
      type: 'boolean',
      initialValue: true,
    },
  ],
  preview: {
    prepare() {
      return { title: 'About page' }
    },
  },
}
