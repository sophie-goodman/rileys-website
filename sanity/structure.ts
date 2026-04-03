import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Pages')
        .child(
          S.list()
            .title('Pages')
            .items([
              S.listItem()
                .title('Site settings')
                .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
              S.listItem()
                .title('Home page')
                .child(S.document().schemaType('homePage').documentId('homePage')),
              S.listItem()
                .title('About page')
                .child(S.document().schemaType('aboutPage').documentId('aboutPage')),
            ])
        ),
      S.divider(),
      S.documentTypeListItem('artwork').title('Artwork'),
      S.divider(),
      S.listItem()
        .title('CV')
        .child(S.documentTypeList('cvSection').title('CV Sections')),
    ])
