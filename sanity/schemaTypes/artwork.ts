import { type SchemaTypeDefinition } from 'sanity'

export const artwork: SchemaTypeDefinition = {
  name: 'artwork',
  title: 'Artwork',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'year',
      title: 'Year',
      type: 'string',
    },
    {
      name: 'medium',
      title: 'Medium',
      type: 'string',
    },
    {
      name: 'dimensions',
      title: 'Dimensions',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'All', value: 'all' },
          { title: 'Jewelry', value: 'jewelry' },
          { title: 'Sculpture and Installation', value: 'sculpture' },
          { title: 'Painting and Drawing', value: 'painting' },
        ],
      },
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'images',
      title: 'Additional images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    },
    {
      name: 'order',
      title: 'Display order',
      type: 'number',
      description: 'Lower numbers appear first',
    },
  ],
  orderings: [
    { title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
    { title: 'Year (new first)', name: 'yearDesc', by: [{ field: 'year', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'title', media: 'mainImage', year: 'year' },
    prepare({ title, media, year }) {
      return { title: title || 'Untitled', subtitle: year, media }
    },
  },
}
