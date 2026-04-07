import Link from "next/link";
import { notFound } from "next/navigation";
import ArtworkCarousel from "../../components/ArtworkCarousel";
import { ContactInstagramEmail } from "../../components/ContactLines";
import { client } from "../../../sanity/lib/client";
import { urlFor } from "../../../sanity/lib/image";
import { artworkBySlugQuery, siteSettingsQuery } from "../../../sanity/lib/queries";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const artwork = await client.fetch(artworkBySlugQuery, { slug });
  const title = artwork?.title ? `${artwork.title} | Riley Midroni` : "Artwork | Riley Midroni";
  return { title };
}

export default async function ArtworkPage({ params }) {
  const { slug } = await params;
  const [artwork, settings] = await Promise.all([
    client.fetch(artworkBySlugQuery, { slug }),
    client.fetch(siteSettingsQuery),
  ]);

  if (!artwork) notFound();

  const name = settings?.siteName ?? "Riley Midroni";
  const contactEmail = settings?.contactEmail ?? "RILEYMIDRONI@INFO.COM";
  const instagramHandle = settings?.instagramHandle
    ? `@${settings.instagramHandle}`
    : "@RILEYMIDRONI";
  const extraImages = (Array.isArray(artwork.images) ? artwork.images : []).map((img) => ({
    url: urlFor(img).width(1200).url(),
    width: img?.width ?? null,
    height: img?.height ?? null,
  }));
  const mainImageUrl = artwork.mainImage
    ? urlFor(artwork.mainImage).width(1200).url()
    : null;
  const mainImageWidth = artwork.mainImage?.width ?? null;
  const mainImageHeight = artwork.mainImage?.height ?? null;

  return (
    <main className="min-h-screen flex flex-col bg-white text-black">
      <div className="flex flex-col md:flex-row p-3 sm:p-6 sm:w-full gap-5 md:gap-0">
        <div className="text-black font-Notable w-full text-center text-[clamp(2.125rem,6.5vw,2.75rem)] leading-tight md:text-left md:text-3xl md:text-5xl md:ml-5 md:leading-none">
          {name}
        </div>
        <div className="flex w-full text-center justify-center md:text-right md:flex-grow md:justify-end md:mr-4 md:text-lg">
          <nav className="flex flex-col items-center gap-3 md:flex-row md:items-end md:gap-8 text-black font-Alkalami">
            <Link href="/" className="hover:underline">HOME</Link>
            <Link href="/about" className="hover:underline">ABOUT</Link>
            <Link href="/CV" className="hover:underline">CV</Link>
            <Link href="/portfolio" className="hover:underline">PORTFOLIO</Link>
          </nav>
        </div>
      </div>

      <article className="max-w-6xl mx-auto w-full px-6 pb-16">
        <ArtworkCarousel
          mainImageUrl={mainImageUrl}
          mainImageWidth={mainImageWidth}
          mainImageHeight={mainImageHeight}
          title={artwork.title}
          year={artwork.year}
          medium={artwork.medium}
          dimensions={artwork.dimensions}
          description={artwork.description}
          extraImages={extraImages}
        />
      </article>

      <footer className="mt-auto px-6 pt-2 pb-5 max-w-6xl mx-auto w-full text-center md:text-left">
        <ContactInstagramEmail
          instagramDisplay={instagramHandle}
          email={contactEmail}
          className="text-black [&_a]:text-black"
        />
      </footer>
    </main>
  );
}
