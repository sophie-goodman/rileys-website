import { type SchemaTypeDefinition } from 'sanity'

export const siteSettings: SchemaTypeDefinition = {
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  fields: [
    {
      name: 'siteName',
      title: 'Site name',
      type: 'string',
      description: 'Used in metadata and headings',
    },
    {
      name: 'contactEmail',
      title: 'Contact email',
      type: 'string',
    },
    {
      name: 'instagramHandle',
      title: 'Instagram handle',
      type: 'string',
      description: 'Without @',
    },
    {
      name: 'contactEmailMobile',
      title: 'Contact email (mobile)',
      type: 'string',
      description: 'Optional; if different from main contact email on mobile',
    },
    {
      name: 'instagramHandleMobile',
      title: 'Instagram handle (mobile)',
      type: 'string',
      description: 'Optional; if different on mobile',
    },
  ],
  preview: {
    prepare() {
      return { title: 'Site settings' }
    },
  },
}
