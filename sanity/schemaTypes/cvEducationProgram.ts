import { type SchemaTypeDefinition } from 'sanity'

/** One degree or certification line under an institution */
export const cvEducationProgram: SchemaTypeDefinition = {
  name: 'cvEducationProgram',
  title: 'Degree or certification',
  type: 'object',
  fields: [
    {
      name: 'degreeOrCertification',
      title: 'Degree or certification',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'year',
      title: 'Year',
      type: 'string',
      description: 'e.g. 2024 or 2020–2024',
    },
  ],
  preview: {
    select: { degree: 'degreeOrCertification', year: 'year' },
    prepare({ degree, year }) {
      return {
        title: degree || 'Untitled',
        subtitle: year,
      }
    },
  },
}
