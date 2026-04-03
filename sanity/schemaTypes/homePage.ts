import { type SchemaTypeDefinition } from 'sanity'

export const homePage: SchemaTypeDefinition = {
  name: 'homePage',
  title: 'Home page',
  type: 'document',
  fields: [
    {
      name: 'heroImage',
      title: 'Hero image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'nameLine1',
      title: 'Name (line 1)',
      type: 'string',
      description: 'e.g. Riley',
    },
    {
      name: 'nameLine2',
      title: 'Name (line 2)',
      type: 'string',
      description: 'e.g. Midroni',
    },
    {
      name: 'contactTextDesktop',
      title: 'Contact text (desktop)',
      type: 'text',
      description: 'Lines for handle and email shown on desktop',
    },
    {
      name: 'contactTextMobile',
      title: 'Contact text (mobile)',
      type: 'text',
      description: 'Lines for handle and email shown on mobile',
    },
  ],
  preview: {
    prepare() {
      return { title: 'Home page' }
    },
  },
}
