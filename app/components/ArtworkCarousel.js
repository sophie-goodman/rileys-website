"use client";
import { useState } from "react";
import Image from "next/image";

function Slide({ slide, title, year, medium, dimensions, description, priority }) {
  if (slide.type === "image") {
    const hasNaturalDims = slide.width && slide.height;
    if (hasNaturalDims) {
      return (
        <div className="w-full flex items-start justify-center bg-white">
          <Image
            key={slide.url}
            src={slide.url}
            alt={slide.alt}
            width={slide.width}
            height={slide.height}
            className="w-full h-auto"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={priority}
          />
        </div>
      );
    }
    /* Fallback when dimensions aren't available yet (old cached data) */
    return (
      <div className="relative w-full overflow-hidden bg-white" style={{ paddingBottom: "75%" }}>
        <Image
          key={slide.url}
          src={slide.url}
          alt={slide.alt}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={priority}
        />
      </div>
    );
  }

  return (
    <div className="w-full flex items-center justify-center bg-white py-8 px-6 md:px-10 min-h-[12rem]">
      <div className="space-y-3 text-center max-w-md">
        <h1 className="font-Notable text-2xl md:text-3xl lg:text-4xl">{title}</h1>
        {(year || medium || dimensions) && (
          <div className="text-slate-600 text-xs md:text-sm space-y-1">
            {year && <div>Year: {year}</div>}
            {medium && <div>Medium: {medium}</div>}
            {dimensions && <div>Dimensions: {dimensions}</div>}
          </div>
        )}
        {description && (
          <p className="pt-3 text-sm md:text-base leading-relaxed whitespace-pre-wrap">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

export default function ArtworkCarousel({
  mainImageUrl,
  mainImageWidth,
  mainImageHeight,
  title,
  year,
  medium,
  dimensions,
  description,
  extraImages,
}) {
  const [index, setIndex] = useState(0);

  const slides = [];

  if (mainImageUrl) {
    slides.push({
      type: "image",
      url: mainImageUrl,
      alt: title ?? "Artwork",
      width: mainImageWidth,
      height: mainImageHeight,
    });
  }

  slides.push({ type: "info" });

  extraImages.forEach((img, i) => {
    slides.push({
      type: "image",
      url: img.url,
      alt: `${title ?? "Artwork"} — image ${i + 2}`,
      width: img.width ?? null,
      height: img.height ?? null,
    });
  });

  const total = slides.length;
  const maxIndex = Math.max(total - 2, 0);
  const canPrev = index > 0;
  const canNext = index < maxIndex;

  const left = slides[index];
  const right = index + 1 < total ? slides[index + 1] : null;

  return (
    <div className="relative w-full mx-auto mt-6">
      <div className="flex items-center">
        {/* Left arrow */}
        {total > 2 && (
          <button
            onClick={() => setIndex((i) => i - 1)}
            disabled={!canPrev}
            aria-label="Previous"
            className={`shrink-0 p-1 md:p-2 transition-opacity ${
              canPrev
                ? "opacity-100 hover:opacity-70 cursor-pointer"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6 md:w-7 md:h-7"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}

        {/* Slides */}
        <div className="grid grid-cols-2 gap-4 md:gap-6 flex-1 min-w-0 items-start">
          <Slide
            slide={left}
            title={title}
            year={year}
            medium={medium}
            dimensions={dimensions}
            description={description}
            priority={index === 0}
          />
          {right && (
            <Slide
              slide={right}
              title={title}
              year={year}
              medium={medium}
              dimensions={dimensions}
              description={description}
            />
          )}
        </div>

        {/* Right arrow */}
        {total > 2 && (
          <button
            onClick={() => setIndex((i) => i + 1)}
            disabled={!canNext}
            aria-label="Next"
            className={`shrink-0 p-1 md:p-2 transition-opacity ${
              canNext
                ? "opacity-100 hover:opacity-70 cursor-pointer"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6 md:w-7 md:h-7"
            >
              <polyline points="9 6 15 12 9 18" />
            </svg>
          </button>
        )}
      </div>

      {total > 2 && (
        <div className="text-center mt-3">
          <span className="text-xs text-slate-400 font-mono select-none">
            {index + 1}–{Math.min(index + 2, total)} / {total}
          </span>
        </div>
      )}
    </div>
  );
}
