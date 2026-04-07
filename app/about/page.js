import Image from "next/image";
import Link from "next/link";
import { ContactInstagramEmail } from "../components/ContactLines";
import { client } from "../../sanity/lib/client";
import { urlFor } from "../../sanity/lib/image";
import { aboutPageQuery, siteSettingsQuery } from "../../sanity/lib/queries";

export const metadata = {
  title: "Riley Midroni | About",
};

/** Used when no portrait is set in Sanity (match filename casing for Linux/Vercel). */
const FALLBACK_PORTRAIT_SRC = "/assets/riley.JPG";

export default async function AboutPage() {
  const [about, settings] = await Promise.all([
    client.fetch(aboutPageQuery),
    client.fetch(siteSettingsQuery),
  ]);

  const siteName = settings?.siteName ?? "Riley Midroni";
  const displayTitle = String(siteName).trim().toUpperCase();
  const contactEmail = settings?.contactEmail ?? "RILEYMIDRONI@INFO.COM";
  const instagramHandle = settings?.instagramHandle
    ? `@${settings.instagramHandle}`
    : "@RILEYMIDRONI";

  let portraitSrc = FALLBACK_PORTRAIT_SRC;
  if (about?.portrait?.asset) {
    try {
      portraitSrc = urlFor(about.portrait).width(900).height(900).quality(90).url();
    } catch {
      portraitSrc = FALLBACK_PORTRAIT_SRC;
    }
  }

  const statementBody = about?.bio?.trim() ? about.bio : "";

  return (
    <main className="min-h-screen flex flex-col bg-white text-black">
      {/* Header row: title left, nav right — same line */}
      <header className="flex items-start justify-between gap-8 px-4 sm:px-6 lg:px-10 pt-6 sm:pt-8 pb-5 max-w-7xl mx-auto w-full [container-type:inline-size]">
        <h1 className="font-Notable uppercase text-[clamp(2.25rem,8.5cqi,6.25rem)] leading-[0.92] tracking-tight text-black min-w-0">
          {displayTitle}
        </h1>
        <nav className="flex flex-col items-start gap-1 sm:gap-0.5 font-Alkalami text-base sm:text-lg text-black text-left shrink-0 pt-1">
          <Link href="/portfolio" className="hover:underline">PORTFOLIO</Link>
          <Link href="/" className="hover:underline">HOME</Link>
          <Link href="/CV" className="hover:underline">CV</Link>
        </nav>
      </header>
  
      {/* Image + statement below */}
      <section className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-12 xl:gap-16 gap-y-6 md:gap-y-0">
          <div className="relative aspect-square w-full max-w-[min(100%,28rem)] mx-auto md:mx-0 md:max-w-none bg-neutral-200 min-w-0 md:self-start">
            <Image
              src={portraitSrc}
              alt={`${siteName} portrait`}
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 45vw"
              priority
            />
          </div>
          <div className="font-Alkalami text-sm sm:text-[15px] leading-[1.65] text-black text-left min-w-0 md:self-start md:pt-2">
            <div className="whitespace-pre-wrap text-neutral-900">{statementBody}</div>
          </div>
        </div>
      </section>

      {about?.showContactForm !== false && (
        <div className="w-full max-w-xl mx-auto px-4 sm:px-6 pb-8 pt-4 border-t border-neutral-200/80">
          <h2 className="text-2xl md:text-3xl text-slate-900 font-Notable">Reach out</h2>
          <p className="text-sm text-slate-600 mt-2 font-Alkalami">
            Send a message — I&apos;ll get back to you by email.
          </p>
          <form className="mt-6 space-y-5" action="#" method="post">
            <div>
              <label className="text-sm text-slate-900 font-medium mb-2 block">Name</label>
              <input
                type="text"
                placeholder="Enter Name"
                className="w-full py-2.5 px-4 text-slate-800 bg-gray-100 border border-gray-200 focus:border-slate-900 focus:bg-transparent text-sm outline-0 transition-all"
              />
            </div>
            <div>
              <label className="text-sm text-slate-900 font-medium mb-2 block">Email</label>
              <input
                type="email"
                placeholder="Enter Email"
                className="w-full py-2.5 px-4 text-slate-800 bg-gray-100 border border-gray-200 focus:border-slate-900 focus:bg-transparent text-sm outline-0 transition-all"
              />
            </div>
            <div>
              <label className="text-sm text-slate-900 font-medium mb-2 block">Subject</label>
              <input
                type="text"
                placeholder="Enter Subject"
                className="w-full py-2.5 px-4 text-slate-800 bg-gray-100 border border-gray-200 focus:border-slate-900 focus:bg-transparent text-sm outline-0 transition-all"
              />
            </div>
            <div>
              <label className="text-sm text-slate-900 font-medium mb-2 block">Message</label>
              <textarea
                placeholder="Enter Message"
                rows={6}
                className="w-full px-4 text-slate-800 bg-gray-100 border border-gray-200 focus:border-slate-900 focus:bg-transparent text-sm pt-3 outline-0 transition-all"
              />
            </div>
            <button
              type="submit"
              className="text-white bg-slate-900 font-medium hover:bg-slate-800 tracking-wide text-sm px-4 py-2.5 w-full border-0 outline-0 cursor-pointer"
            >
              Send message
            </button>
          </form>
        </div>
      )}

      <footer className="mt-auto px-6 pt-4 pb-8 max-w-xl mx-auto w-full text-center">
        <ContactInstagramEmail
          instagramDisplay={instagramHandle}
          email={contactEmail}
          className="text-black [&_a]:text-black justify-center"
        />
      </footer>
    </main>
  );
}
