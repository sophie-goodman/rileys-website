// GROQ query fragments and full queries for the portfolio site

const imageWithDims = `{
  ...,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height
}`

const artworkFields = `
  _id,
  title,
  "slug": slug.current,
  year,
  medium,
  dimensions,
  description,
  category,
  mainImage ${imageWithDims},
  images[] ${imageWithDims},
  order
`

const cvEntryFields = `
  title,
  institution,
  location,
  date,
  description
`

const cvEducationFields = `
  institution,
  programs[] {
    degreeOrCertification,
    year
  }
`

const cvSectionFields = `
  _id,
  sectionTitle,
  order,
  entries[] {
    ${cvEntryFields}
  },
  educationInstitutions[] {
    ${cvEducationFields}
  }
`

export const homePageQuery = `*[_type == "homePage"][0] {
  heroImage,
  nameLine1,
  nameLine2,
  contactTextDesktop,
  contactTextMobile
}`

export const siteSettingsQuery = `*[_type == "siteSettings"][0] {
  siteName,
  contactEmail,
  instagramHandle,
  contactEmailMobile,
  instagramHandleMobile
}`

export const aboutPageQuery = `*[_type == "aboutPage"][0] {
  portrait ${imageWithDims},
  bio,
  showContactForm
}`

export const artworksQuery = `*[_type == "artwork"] | order(order asc, year desc) {
  ${artworkFields}
}`

export const artworkBySlugQuery = `*[_type == "artwork" && slug.current == $slug][0] {
  ${artworkFields}
}`

export const artworksByCategoryQuery = (category: string) =>
  category === 'all'
    ? artworksQuery
    : `*[_type == "artwork" && category == $category] | order(order asc, year desc) {
  ${artworkFields}
}`

export const cvSectionsQuery = `*[_type == "cvSection"] | order(order asc) {
  ${cvSectionFields}
}`
