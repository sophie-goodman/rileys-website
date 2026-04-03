const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function renderLine(line, key, lineClassName) {
  const t = String(line).trim();
  if (emailRe.test(t)) {
    return (
      <div key={key}>
        <a href={`mailto:${t}`} className={`hover:underline break-all ${lineClassName}`}>
          {t}
        </a>
      </div>
    );
  }
  if (t.startsWith("@")) {
    const user = t.slice(1).split(/\s/)[0];
    const href = user ? `https://www.instagram.com/${user}/` : "#";
    return (
      <div key={key}>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`hover:underline ${lineClassName}`}
        >
          {t}
        </a>
      </div>
    );
  }
  return (
    <div key={key} className={lineClassName}>
      {line}
    </div>
  );
}

/** Free-form lines (e.g. from Sanity home page text): auto mailto / Instagram links */
export function ContactLines({ lines, className = "text-sm md:text-base font-light antialiased" }) {
  const list = Array.isArray(lines) ? lines.filter(Boolean) : [];
  return (
    <div className={`font-Alkalami ${className}`}>
      {list.map((line, i) => renderLine(line, i, ""))}
    </div>
  );
}

/** Structured handle + email from site settings */
export function ContactInstagramEmail({
  instagramDisplay,
  email,
  className = "",
}) {
  const ig = instagramDisplay || "@rileyMidroni";
  const user = ig.replace(/^@/, "").split(/\s/)[0] || "rileyMidroni";
  const mail = email || "rileymidroni@info.com";
  return (
    <div className={`font-Alkalami text-sm md:text-base font-light antialiased ${className}`}>
      <div>
        <a
          href={`https://www.instagram.com/${user}/`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          {ig}
        </a>
      </div>
      <div>
        <a href={`mailto:${mail}`} className="hover:underline break-all">
          {mail}
        </a>
      </div>
    </div>
  );
}
