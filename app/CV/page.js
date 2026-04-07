import Link from "next/link";
import { ContactInstagramEmail } from "../components/ContactLines";
import { client } from "../../sanity/lib/client";
import { cvSectionsQuery, siteSettingsQuery } from "../../sanity/lib/queries";

export const metadata = {
  title: "Riley Midroni | CV",
};

/** Italic entry titles for Costume and Group exhibitions sections. */
function sectionUsesItalicEntryTitles(sectionTitle) {
  if (!sectionTitle || typeof sectionTitle !== "string") return false;
  const t = sectionTitle.toLowerCase().trim();
  if (t.includes("costume")) return true;
  if (/\bgroup\s+exhibitions?\b/.test(t)) return true;
  return false;
}

export default async function CVPage() {
  const [sections, settings] = await Promise.all([
    client.fetch(cvSectionsQuery),
    client.fetch(siteSettingsQuery),
  ]);

  const name = settings?.siteName ?? "Riley Midroni";
  const contactEmail = settings?.contactEmail ?? "RILEYMIDRONI@INFO.COM";
  const instagramHandle = settings?.instagramHandle
    ? `@${settings.instagramHandle}`
    : "@RILEYMIDRONI";
  const safeSections = Array.isArray(sections) ? sections : [];

  return (
    <main className="flex flex-col min-h-screen bg-white text-black">
      <h1 className="font-Notable text-center w-full px-4 text-[clamp(2.125rem,6.5vw,2.75rem)] leading-tight md:text-5xl md:mt-6 flex justify-center">
        {name}
      </h1>

      <header className="flex flex-col items-center justify-center">
        <nav className="flex flex-col text-center items-center gap-3 md:flex-row md:gap-20 mt-6 md:mt-8 font-Alkalami">
          <Link href="/portfolio" className="text-black hover:underline">
            PORTFOLIO
          </Link>
          <Link href="/about" className="text-black hover:underline">
            ABOUT
          </Link>
          <Link href="/" className="text-black hover:underline">
            HOME
          </Link>
        </nav>
      </header>

      <div className="pt-12 md:pt-20 flex flex-col flex-1 w-full md:items-center align-text-left justify-left max-md:px-8 min-[480px]:max-md:px-10">
        <div className="w-full md:w-1/2 text-start max-md:max-w-none">
          {safeSections.length === 0 ? (
            <>
              <div className="pb-3 p-2 underline">EXHIBITIONS</div>
              <div className="p-2" />
              <div className="pb-3 pt-8 p-2 underline">PUBLICATIONS</div>
            </>
          ) : (
            safeSections.map((section) => {
              const italicTitles = sectionUsesItalicEntryTitles(section.sectionTitle);
              return (
              <div key={section._id} className="pb-3 pt-8 first:pt-0">
                <div className="p-2 underline font-normal">{section.sectionTitle}</div>
                <div className="p-2">
                  {Array.isArray(section.educationInstitutions) &&
                  section.educationInstitutions.length > 0 ? (
                    section.educationInstitutions.map((block, bi) => (
                      <div key={bi} className="mb-6 last:mb-2">
                        {block.institution && (
                          <div className="font-bold">{block.institution}</div>
                        )}
                        {Array.isArray(block.programs) && block.programs.length > 0 && (
                          <ul className="mt-2 space-y-1.5 list-none pl-0 font-normal">
                            {block.programs.map((p, pi) => (
                              <li key={pi} className="text-sm font-normal">
                                {p.degreeOrCertification}
                                {p.year ? (
                                  <span className="text-black"> — {p.year}</span>
                                ) : null}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))
                  ) : (
                    Array.isArray(section.entries) &&
                    section.entries.map((entry, i) => (
                      <div key={i} className="mb-4">
                        {entry.title && (
                          <div
                            className={
                              italicTitles ? "font-bold italic" : "font-bold"
                            }
                          >
                            {entry.title}
                          </div>
                        )}
                        {(entry.institution || entry.location || entry.date) && (
                          <div className="text-black text-sm">
                            {[entry.institution, entry.location, entry.date]
                              .filter(Boolean)
                              .join(" · ")}
                          </div>
                        )}
                        {entry.description && (
                          <div className="mt-1 text-sm">{entry.description}</div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
              );
            })
          )}
        </div>
      </div>

      <footer className="mt-auto px-6 pt-4 pb-5 max-w-6xl mx-auto w-full text-center md:text-left">
        <ContactInstagramEmail
          instagramDisplay={instagramHandle}
          email={contactEmail}
          className="text-black [&_a]:text-black"
        />
      </footer>
    </main>
  );
}
