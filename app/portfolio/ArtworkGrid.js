"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";

const CATEGORIES = [
  { label: "Gallery", value: "all" },
  { label: "Jewelry", value: "jewelry" },
  { label: "Sculpture and Installation", value: "sculpture" },
  { label: "Painting and Drawing", value: "painting" },
];

export default function ArtworkGrid({ artworks = [] }) {
  const [category, setCategory] = useState("all");

  const filtered = useMemo(() => {
    if (category === "all") return artworks;
    return artworks.filter((a) => a?.category === category);
  }, [artworks, category]);

  return (
    <>
      <div className="flex flex-row gap-2 items-center justify-center sm:mt-40 sm:gap-7 text-md flex-wrap text-black mt-40 font-Alkalami">
        {CATEGORIES.map((cat, i) => (
          <span key={cat.value} className="inline-flex items-center gap-2 sm:gap-7">
            {i > 0 && <span className="select-none" aria-hidden>·</span>}
            <button
              type="button"
              onClick={() => setCategory(cat.value)}
              className={`cursor-pointer ${category === cat.value ? "underline font-medium" : ""}`}
            >
              {cat.label}
            </button>
          </span>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4 p-6 px-20 mt-10">
        {filtered.map((artwork) => {
          const src = artwork?.mainImageUrl ?? null;
          if (!src) return null;
          const href = artwork?.slug ? `/portfolio/${artwork.slug}` : null;
          const content = (
            <>
              <Image
                src={src}
                alt={artwork.title ?? "Artwork"}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />

            </>
          );
          return (
            <div key={artwork._id} className="relative aspect-square">
              {href ? (
                <Link href={href} className="block absolute inset-0 cursor-pointer">
                  {content}
                </Link>
              ) : (
                content
              )}
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="p-8 text-center text-slate-500">
          No artworks in this category yet.
        </div>
      )}
    </>
  );
}
