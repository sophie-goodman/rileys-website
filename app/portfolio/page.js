import Link from "next/link";
import { ContactInstagramEmail } from "../components/ContactLines";
import { client } from "../../sanity/lib/client";
import { urlFor } from "../../sanity/lib/image";
import { artworksQuery, siteSettingsQuery } from "../../sanity/lib/queries";
import ArtworkGrid from "./ArtworkGrid";

export const metadata = {
  title: "Riley Midroni | Portfolio",
};

export default async function PortfolioPage() {
  const [artworks, settings] = await Promise.all([
    client.fetch(artworksQuery),
    client.fetch(siteSettingsQuery),
  ]);

  const name = settings?.siteName ?? "Riley Midroni";
  const contactEmail = settings?.contactEmail ?? "RILEYMIDRONI@INFO.COM";
  const instagramHandle = settings?.instagramHandle
    ? `@${settings.instagramHandle}`
    : "@RILEYMIDRONI";
  const safeArtworks = (Array.isArray(artworks) ? artworks : []).map((a) => {
    let mainImageUrl = null;
    if (a?.mainImage) {
      try {
        mainImageUrl = urlFor(a.mainImage).width(600).height(600).url();
      } catch {
        mainImageUrl = null;
      }
    }
    return { ...a, mainImageUrl };
  });

  return (
    <main className="min-h-screen flex flex-col bg-white">
      <div className="flex flex-col md:flex-row p-3 sm:p-6 sm:w-full gap-5 md:gap-0">
        <div className="text-black font-Notable w-full text-center text-[clamp(2.125rem,6.5vw,2.75rem)] leading-tight md:text-left md:text-3xl md:text-5xl md:ml-5 md:leading-none">
          {name}
        </div>

        <div className="flex w-full text-center justify-center md:text-right md:flex-grow md:justify-end md:mr-4 md:text-lg">
          <nav className="flex flex-col items-center gap-3 md:flex-row md:items-end md:gap-8 text-black font-Alkalami">
            <Link href="/" className="hover:underline">
              HOME
            </Link>
            <Link href="/about" className="hover:underline">
              ABOUT
            </Link>
            <Link href="/CV" className="hover:underline">
              CV
            </Link>
          </nav>
        </div>
      </div>

      <ArtworkGrid artworks={safeArtworks} />

      <div className="hidden md:block mt-auto px-6 pt-4 pb-5">
        <ContactInstagramEmail
          instagramDisplay={instagramHandle}
          email={contactEmail}
          className="text-black [&_a]:text-black"
        />
      </div>

      <div className="block md:hidden text-center mt-4 mb-3 px-4 pb-3">
        <ContactInstagramEmail
          instagramDisplay={instagramHandle}
          email={contactEmail}
          className="text-black [&_a]:text-black"
        />
      </div>
    </main>
  );
}
