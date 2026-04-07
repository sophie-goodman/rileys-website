import { type SchemaTypeDefinition } from 'sanity'

export const aboutPage: SchemaTypeDefinition = {
  name: 'aboutPage',
  title: 'About page',
  type: 'document',
  fields: [
    {
      name: 'portrait',
      title: 'Bio portrait',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'bio',
      title: 'Artist statement',
      type: 'text',
      rows: 12,
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
