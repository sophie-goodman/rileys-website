import Image from "next/image";
import Link from "next/link";
import { ContactLines } from "./components/ContactLines";
import { client } from "../sanity/lib/client";
import { urlFor } from "../sanity/lib/image";
import { homePageQuery, siteSettingsQuery } from "../sanity/lib/queries";

export const metadata = {
  title: "Riley Midroni | Home",
};

export default async function Home() {
  const [home, settings] = await Promise.all([
    client.fetch(homePageQuery),
    client.fetch(siteSettingsQuery),
  ]);

  const nameLine1 = home?.nameLine1 ?? "Riley";
  const nameLine2 = home?.nameLine2 ?? "Midroni";
  const contactDesktop =
    home?.contactTextDesktop ??
    (settings
      ? [settings.instagramHandle ? `@${settings.instagramHandle}` : null, settings.contactEmail]
          .filter(Boolean)
          .join("\n")
      : null) ??
    "@RILEYMIDRONI\nRILEYMIDRONI@INFO.COM";
  const contactMobile =
    home?.contactTextMobile ??
    (settings
      ? [
          settings.instagramHandleMobile ? `@${settings.instagramHandleMobile}` : settings.instagramHandle ? `@${settings.instagramHandle}` : null,
          settings.contactEmailMobile ?? settings.contactEmail,
        ]
          .filter(Boolean)
          .join("\n")
      : null) ??
    "@RILEYMIDRONI\nRILEYMIDRONI@INFO.COM";

  /** Local fallback when Sanity has no hero (IMG_0356 was removed from the repo). */
  const fallbackHero = "/assets/homepage.JPG";
  let heroSrc = fallbackHero;
  if (home?.heroImage?.asset) {
    try {
      heroSrc = urlFor(home.heroImage).width(1920).height(1080).url();
    } catch {
      heroSrc = fallbackHero;
    }
  }

  const contactDesktopLines = contactDesktop.split("\n").filter(Boolean);
  const contactMobileLines = contactMobile.split("\n").filter(Boolean);

  return (
    <main className="relative min-h-screen flex flex-col md:bg-zinc-900">
      {/* Desktop: full-bleed hero behind content (z-0); avoid -z-10 or text can sit on white body and disappear */}
      <div className="pointer-events-none hidden md:block md:absolute md:inset-0 z-0 bg-zinc-900">
        <Image
          src={heroSrc}
          alt="Art Thumbnail"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>

      {/* Mobile: grey header with name + vertical menu, centered */}
      <header className="md:hidden bg-[#2C2924] px-6 pt-6 pb-5 text-center">
        <div className="text-white font-Notable text-4xl">
          {nameLine1} <br />
          {nameLine2}
        </div>
        <nav className="flex flex-col text-white text-xl gap-3 mt-5 items-center font-Alkalami">
          <Link href="/portfolio" className="underline hover:text-neutral-200 py-1">
            PORTFOLIO
          </Link>
          <Link href="/about" className="underline hover:text-neutral-200 py-1">
            ABOUT
          </Link>
          <Link href="/CV" className="underline hover:text-neutral-200 py-1">
            CV
          </Link>
        </nav>
      </header>

      {/* Mobile: hero image (tighter crop) with socials overlaid at bottom */}
      <div className="md:hidden relative w-full aspect-[3/4] bg-[#2C2924]">
        <Image
          src={heroSrc}
          alt="Art Thumbnail"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent pt-6 pb-4 px-6 text-white text-center">
          <ContactLines
            lines={contactMobileLines}
            className="text-xs sm:text-sm leading-snug font-light antialiased text-white [&_a]:text-white"
          />
        </div>
      </div>

      {/* Desktop: name + nav above hero */}
      <div className="relative z-10 hidden md:flex flex-col flex-grow md:flex-row p-6 gap-6">
        <div className="flex flex-col flex-grow">
          <div className="text-white font-Notable md:text-6xl">
            {nameLine1} <br />
            {nameLine2}
          </div>
          <div className="mt-auto text-white">
            <ContactLines
              lines={contactDesktopLines}
              className="text-sm md:text-base leading-snug font-light antialiased text-white [&_a]:text-white"
            />
          </div>
        </div>
        <nav className="flex flex-col text-2xl text-white items-center gap-2 md:self-start text-right md:mr-20 md:mt-30 font-Alkalami">
          <Link href="/portfolio" className="underline hover:text-black">
            PORTFOLIO
          </Link>
          <Link href="/about" className="underline hover:text-black">
            ABOUT
          </Link>
          <Link href="/CV" className="underline hover:text-black">
            CV
          </Link>
        </nav>
      </div>
    </main>
  );
}
