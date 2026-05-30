const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const { site, sharedFaqs, blogPosts, serviceAreas } = require("./seo-content");

const root = __dirname;
const port = Number(process.env.PORT || 3000);
const quoteRateLimit = new Map();
const maxQuoteBodyBytes = 100_000;

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon"
};

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function absoluteUrl(pathname) {
  return `${site.canonicalBase}${pathname}`;
}

function smallImage(src) {
  return src.replace("-1200.jpg", "-640.jpg");
}

function imageSrcset(src) {
  return `${smallImage(src)} 640w, ${src} 1200w`;
}

function jsonLd(data) {
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}

function layout({ title, description, canonical, h1, eyebrow, intro, body, schema = [], image = site.image }) {
  const schemas = schema.map(jsonLd).join("\n");
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}">
    <link rel="canonical" href="${escapeHtml(absoluteUrl(canonical))}">
    <meta property="og:title" content="${escapeHtml(title)}">
    <meta property="og:description" content="${escapeHtml(description)}">
    <meta property="og:image" content="${escapeHtml(absoluteUrl(image))}">
    <meta property="og:type" content="website">
    <link rel="preload" as="image" href="${escapeHtml(image)}" imagesrcset="${escapeHtml(imageSrcset(image))}" imagesizes="(max-width: 1180px) 100vw, 50vw">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/styles.css">
    ${schemas}
  </head>
  <body>
    <a class="skip-link" href="#content">Skip to main content</a>
    ${renderHeader()}
    <main id="content">
      <section class="section article-hero">
        <div>
          <p class="eyebrow">${escapeHtml(eyebrow)}</p>
          <h1>${escapeHtml(h1)}</h1>
          <p>${escapeHtml(intro)}</p>
          <div class="hero-actions">
            <a class="button button-primary" href="/request-a-quote" data-cta="article-hero-request-quote">Request a Free Quote</a>
            <a class="button button-secondary" href="tel:6137447336" data-cta="article-hero-phone">Call or Text 613-744-7336</a>
          </div>
        </div>
        <img src="${escapeHtml(image)}" srcset="${escapeHtml(imageSrcset(image))}" sizes="(max-width: 1180px) 100vw, 50vw" width="1200" height="800" alt="${escapeHtml(h1)}" decoding="async">
      </section>
      ${body}
    </main>
    ${renderFooter()}
    <script src="/data.js"></script>
    <script src="/script.js"></script>
  </body>
</html>`;
}

function renderHeader() {
  return `<header class="site-header" data-header>
    <a class="brand" href="/" aria-label="Christmas Lights Ottawa home">
      <span class="brand-mark" aria-hidden="true"><svg viewBox="0 0 64 64" role="img"><circle cx="32" cy="29" r="18" fill="none" stroke="currentColor" stroke-width="6" stroke-dasharray="4 5"></circle><path d="M24 45l-6 13 14-7 14 7-6-13" fill="#a80f0f"></path></svg></span>
      <span class="brand-text">Christmas<br>Lights Ottawa</span>
    </a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-nav" data-menu-toggle><span class="sr-only">Toggle menu</span><span></span><span></span><span></span></button>
    <nav class="primary-nav" id="primary-nav" aria-label="Primary navigation" data-nav>
      <a href="/">Home</a>
      <a href="/#services">Services</a>
      <a href="/#process">Our Process</a>
      <a href="/#gallery">Gallery</a>
      <a href="/blog">Blog</a>
      <a href="/#faq">FAQ</a>
      <a href="/#contact">Contact</a>
    </nav>
    <a class="button button-primary header-cta" href="/request-a-quote" data-cta="dynamic-header-request-quote">Request a Free Quote</a>
  </header>`;
}

function renderFooter() {
  return `<footer class="site-footer" id="contact">
    <div class="footer-grid">
      <div>
        <h2>Christmas Lights Ottawa</h2>
        <p>${escapeHtml(site.description)}</p>
        <a class="button button-primary" href="/request-a-quote" data-cta="dynamic-footer-request-quote">Request a Free Quote</a>
      </div>
      <div>
        <h3>Quick Links</h3>
        <a href="/">Home</a>
        <a href="/blog">Blog</a>
        <a href="/#services">Services</a>
        <a href="/#faq">FAQ</a>
      </div>
      <div>
        <h3>Services</h3>
        <a href="/#services">Christmas Light Installation Ottawa</a>
        <a href="/blog/lower-level-christmas-lighting-ottawa">Lower-Level Christmas Lighting</a>
        <a href="/blog/christmas-wreaths-garlands-entryway-decorating-ottawa">Wreaths &amp; Garlands</a>
        <a href="/blog/commercial-christmas-decorating-ottawa">Commercial Christmas Decorating</a>
        <a href="/#services">Takedown &amp; Storage</a>
        <a href="/request-a-quote" data-cta="dynamic-footer-service-request-quote">Request a Free Quote</a>
      </div>
      <div>
        <h3>Service Areas</h3>
        ${serviceAreas.slice(0, 6).map((area) => `<a href="/${area.slug}">Christmas light installation ${escapeHtml(area.city)}</a>`).join("")}
      </div>
      <div>
        <h3>Contact</h3>
        <a href="tel:6137447336" data-cta="dynamic-footer-phone">Call or Text: 613-744-7336</a>
        <p>Serving Ottawa and surrounding communities. Email and address need client confirmation.</p>
      </div>
    </div>
    <p class="copyright">&copy; ${new Date().getFullYear()} Christmas Lights Ottawa. All rights reserved.</p>
  </footer>`;
}

function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.businessName,
    telephone: site.phone,
    url: site.canonicalBase,
    image: absoluteUrl(site.image),
    areaServed: ["Ottawa", "Kanata", "Stittsville", "Barrhaven", "Orleans", "Manotick", "Nepean"],
    description: site.description
  };
}

function serviceSchema(name, description) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    serviceType: "Christmas light installation and holiday decorating",
    provider: { "@type": "LocalBusiness", name: site.businessName, telephone: site.phone },
    areaServed: ["Ottawa and surrounding communities"],
    description
  };
}

function faqSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer }
    }))
  };
}

function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.url)
    }))
  };
}

function blogPostingSchema(post) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    image: absoluteUrl(post.image),
    datePublished: post.publishDate,
    dateModified: post.updatedDate,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: site.businessName },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`)
  };
}

function renderFaqs(faqs) {
  return `<section class="section faq-section">
    <div class="section-heading"><div class="ornament-divider" aria-hidden="true"></div><p class="eyebrow">FAQ</p><h2>Common questions</h2></div>
    <div class="faq-grid">${faqs.map((faq) => `<details><summary>${escapeHtml(faq.question)}</summary><p>${escapeHtml(faq.answer)}</p></details>`).join("")}</div>
  </section>`;
}

function renderBlogIndex() {
  const body = `<section class="section"><div class="blog-grid">${blogPosts.map((post) => `
    <article class="blog-card">
      <img src="${escapeHtml(smallImage(post.image))}" srcset="${escapeHtml(imageSrcset(post.image))}" sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1180px) 50vw, 360px" width="640" height="427" alt="${escapeHtml(post.title)}" loading="lazy" decoding="async">
      <div>
        <p class="eyebrow">${escapeHtml(post.primaryKeyword)}</p>
        <h2><a href="/blog/${post.slug}">${escapeHtml(post.title)}</a></h2>
        <p>${escapeHtml(post.excerpt)}</p>
        <a class="text-link" href="/blog/${post.slug}">Read the article</a>
      </div>
    </article>`).join("")}</div></section>`;

  return layout({
    title: "Christmas Lights Ottawa Blog | Holiday Decorating Tips",
    description: "Helpful Ottawa Christmas light installation and holiday decorating guides for homeowners and businesses.",
    canonical: "/blog",
    eyebrow: "Blog",
    h1: "Christmas light installation and holiday decorating guides for Ottawa",
    intro: "Helpful local articles about lower-level Christmas lighting, wreaths, garlands, commercial displays, takedown, storage, and booking professional Christmas light installers in Ottawa.",
    image: "/assets/images/optimized/porch-entry-lighting-1200.jpg",
    body,
    schema: [localBusinessSchema(), breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Blog", url: "/blog" }])]
  });
}

function renderBlogPost(post) {
  const related = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 3);
  const body = `<article class="section article-body">
    <p class="article-meta">Published ${escapeHtml(post.publishDate)} &middot; Updated ${escapeHtml(post.updatedDate)} &middot; ${escapeHtml(post.author)}</p>
    ${post.sections.map((section) => `<h2>${escapeHtml(section.heading)}</h2><p>${escapeHtml(section.body)}</p>`).join("")}
    <div class="article-cta"><h2>Ready to plan your display?</h2><p>Request a Christmas light quote for lower-level holiday decorating, wreaths, garlands, walkways, shrubs, storefronts, takedown, and storage.</p><a class="button button-primary" href="/request-a-quote" data-cta="blog-request-quote">Request a Free Quote</a></div>
    <h2>Related articles</h2>
    <div class="related-grid">${related.map((item) => `<a href="/blog/${item.slug}">${escapeHtml(item.title)}</a>`).join("")}</div>
  </article>
  ${renderFaqs(post.faqs)}`;

  return layout({
    title: post.metaTitle,
    description: post.metaDescription,
    canonical: `/blog/${post.slug}`,
    eyebrow: post.primaryKeyword,
    h1: post.title,
    intro: post.excerpt,
    image: post.image,
    body,
    schema: [
      localBusinessSchema(),
      serviceSchema(post.primaryKeyword, post.metaDescription),
      faqSchema(post.faqs),
      blogPostingSchema(post),
      breadcrumbSchema([{ name: "Home", url: "/" }, { name: "Blog", url: "/blog" }, { name: post.title, url: `/blog/${post.slug}` }])
    ]
  });
}

function renderServiceArea(area) {
  const faqs = [
    ...sharedFaqs,
    {
      question: `Do you offer Christmas light installation in ${area.city}?`,
      answer: `Yes. Christmas Lights Ottawa provides Christmas light installation and holiday decorating in ${area.city}, with a focus on lower-level displays, wreaths, garlands, walkways, shrubs, storefronts, takedown, and storage.`
    }
  ];
  const body = `<section class="section article-body">
    <h2>Holiday decorating services in ${escapeHtml(area.city)}</h2>
    <p>${escapeHtml(area.angle)}</p>
    <p>${escapeHtml(area.detail)}</p>
    <p>Services can include entryway decorating, porch lighting, railings, columns, garage trim, wreaths, garlands, bows, shrubs, walkways, small trees, commercial storefront decorating, takedown, and storage.</p>
    <h2>How it works</h2>
    <p>Send your address and photos, review a tailored lower-level decorating plan, approve the quote, and schedule installation. Maintenance, takedown, and storage can be planned around your season.</p>
    <h2>Local areas served</h2>
    <p>${escapeHtml(area.neighborhoods)}.</p>
    <div class="article-cta"><h2>Request Christmas light installation in ${escapeHtml(area.city)}</h2><p>Tell us what you want decorated and we will help recommend the right holiday decorating package.</p><a class="button button-primary" href="/request-a-quote" data-cta="service-area-request-quote">Request a Free Quote</a></div>
    <p><a class="text-link" href="/#services">View holiday decorating services in Ottawa</a> or read our <a class="text-link" href="/blog">Christmas lighting blog</a>.</p>
  </section>${renderFaqs(faqs)}`;

  return layout({
    title: `Christmas Light Installation ${area.city} | Christmas Lights Ottawa`,
    description: `Christmas light installation and holiday decorating in ${area.city}. Lower-level lighting, wreaths, garlands, walkways, shrubs, storefronts, takedown, and storage.`,
    canonical: `/${area.slug}`,
    eyebrow: `Christmas light installation ${area.city}`,
    h1: `Christmas Light Installation ${area.city}`,
    intro: `Professional holiday decorating in ${area.city} for entryways, porches, railings, wreaths, garlands, walkways, shrubs, small trees, storefronts, takedown, and storage.`,
    image: "/assets/images/optimized/hero-lower-level-lighting-1200.jpg",
    body,
    schema: [
      localBusinessSchema(),
      serviceSchema(`Christmas light installation ${area.city}`, `Holiday decorating and Christmas light installation in ${area.city}.`),
      faqSchema(faqs),
      breadcrumbSchema([{ name: "Home", url: "/" }, { name: `Christmas light installation ${area.city}`, url: `/${area.slug}` }])
    ]
  });
}

function renderSitemap() {
  const urls = [
    "/",
    "/request-a-quote",
    "/blog",
    ...blogPosts.map((post) => `/blog/${post.slug}`),
    ...serviceAreas.map((area) => `/${area.slug}`)
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url><loc>${absoluteUrl(url)}</loc></url>`).join("\n")}
</urlset>`;
}

function send(res, statusCode, body, contentType = "text/plain; charset=utf-8") {
  res.writeHead(statusCode, {
    "Content-Type": contentType,
    "Cache-Control": "no-cache",
    "X-Content-Type-Options": "nosniff"
  });
  res.end(body);
}

function sendJson(res, statusCode, data) {
  send(res, statusCode, JSON.stringify(data), "application/json; charset=utf-8");
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > maxQuoteBodyBytes) {
        reject(new Error("Request body too large."));
        req.destroy();
      }
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error("Invalid JSON body."));
      }
    });
    req.on("error", reject);
  });
}

function clientIp(req) {
  return (req.headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown").toString().split(",")[0].trim();
}

function isRateLimited(req) {
  const ip = clientIp(req);
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const maxRequests = 5;
  const current = quoteRateLimit.get(ip) || [];
  const recent = current.filter((timestamp) => now - timestamp < windowMs);
  recent.push(now);
  quoteRateLimit.set(ip, recent);
  return recent.length > maxRequests;
}

function normalizeQuotePayload(payload) {
  const services = Array.isArray(payload.services) ? payload.services : [payload.services].filter(Boolean);
  const photos = Array.isArray(payload.photos) ? payload.photos : [];
  return {
    name: String(payload.name || "").trim(),
    email: String(payload.email || "").trim(),
    phone: String(payload.phone || "").trim(),
    address: String(payload.address || "").trim(),
    propertyType: String(payload.propertyType || payload["property-type"] || "").trim(),
    preferredContact: String(payload.preferredContact || payload["preferred-contact"] || "").trim(),
    services: services.map((item) => String(item).trim()).filter(Boolean),
    message: String(payload.message || payload.details || "").trim(),
    photos: photos.map((item) => String(item).trim()).filter(Boolean),
    consent: Boolean(payload.consent),
    website: String(payload.website || "").trim()
  };
}

function validateQuotePayload(payload) {
  const errors = {};
  if (payload.website) return { spam: "Spam check failed." };
  if (!payload.name) errors.name = "Full name is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) errors.email = "A valid email is required.";
  if (!payload.phone) errors.phone = "Phone number is required.";
  if (!payload.address) errors.address = "Property address is required.";
  if (!payload.services.length) errors.services = "At least one service is required.";
  if (!payload.consent) errors.consent = "Consent is required.";
  return errors;
}

function quoteEmailText(payload) {
  return [
    "New Christmas Lights Ottawa Quote Request",
    "",
    "Contact Details",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone}`,
    `Preferred Contact: ${payload.preferredContact || "Not provided"}`,
    "",
    "Property Details",
    `Address: ${payload.address}`,
    `Property Type: ${payload.propertyType || "Not provided"}`,
    "",
    "Services Interested In",
    payload.services.map((item) => `- ${item}`).join("\n"),
    "",
    "Project Details",
    payload.message || "Not provided",
    "",
    "Photo Upload Details",
    payload.photos.length ? payload.photos.map((item) => `- ${item}`).join("\n") : "No files listed.",
    "",
    `Consent: ${payload.consent ? "Yes" : "No"}`
  ].join("\n");
}

async function sendQuoteEmail(payload) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.QUOTE_TO_EMAIL;
  const from = process.env.QUOTE_FROM_EMAIL || "Christmas Lights Ottawa <onboarding@resend.dev>";

  if (!apiKey || !to) {
    return { ok: false, setupMissing: true };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: payload.email,
      subject: "New Christmas Lights Ottawa Quote Request",
      text: quoteEmailText(payload)
    })
  });

  if (!response.ok) {
    return { ok: false, status: response.status };
  }

  return { ok: true };
}

async function handleQuoteRequest(req, res) {
  if (req.method !== "POST") {
    sendJson(res, 405, { ok: false, message: "Method not allowed." });
    return;
  }

  if (isRateLimited(req)) {
    sendJson(res, 429, { ok: false, message: "Too many quote requests. Please try again later." });
    return;
  }

  try {
    const payload = normalizeQuotePayload(await readJsonBody(req));
    const errors = validateQuotePayload(payload);
    if (Object.keys(errors).length) {
      sendJson(res, 400, { ok: false, message: "Please review the highlighted fields.", errors });
      return;
    }

    const result = await sendQuoteEmail(payload);
    if (result.setupMissing) {
      sendJson(res, 503, { ok: false, message: "Online quote delivery is not connected yet. Please call or text 613-744-7336." });
      return;
    }

    if (!result.ok) {
      sendJson(res, 502, { ok: false, message: "The quote request could not be sent. Please call or text 613-744-7336." });
      return;
    }

    sendJson(res, 200, { ok: true, message: "Thanks. Your quote request has been received. Christmas Lights Ottawa will contact you shortly." });
  } catch {
    sendJson(res, 400, { ok: false, message: "The quote request could not be processed. Please check the form and try again." });
  }
}

function resolveRequestPath(url) {
  const parsed = new URL(url, `http://localhost:${port}`);
  const decodedPath = decodeURIComponent(parsed.pathname);
  const requestPath = decodedPath === "/" ? "index.html" : decodedPath.replace(/^[/\\]+/, "");
  const normalizedPath = path.normalize(requestPath).replace(/^(\.\.[/\\])+/, "");
  const filePath = path.join(root, normalizedPath);

  if (!filePath.startsWith(root)) {
    return null;
  }

  return filePath;
}

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://localhost:${port}`);
  const pathname = parsedUrl.pathname.replace(/\/$/, "") || "/";

  if (pathname === "/api/quote") {
    handleQuoteRequest(req, res);
    return;
  }

  if (!["GET", "HEAD"].includes(req.method)) {
    send(res, 405, "Method not allowed");
    return;
  }

  if (pathname === "/robots.txt") {
    send(res, 200, `User-agent: *\nAllow: /\nSitemap: ${absoluteUrl("/sitemap.xml")}\n`, "text/plain; charset=utf-8");
    return;
  }

  if (pathname === "/sitemap.xml") {
    send(res, 200, renderSitemap(), "application/xml; charset=utf-8");
    return;
  }

  if (pathname === "/blog") {
    send(res, 200, renderBlogIndex(), "text/html; charset=utf-8");
    return;
  }

  if (pathname.startsWith("/blog/")) {
    const slug = pathname.replace("/blog/", "");
    const post = blogPosts.find((item) => item.slug === slug);
    if (post) {
      send(res, 200, renderBlogPost(post), "text/html; charset=utf-8");
      return;
    }
  }

  const area = serviceAreas.find((item) => pathname === `/${item.slug}`);
  if (area) {
    send(res, 200, renderServiceArea(area), "text/html; charset=utf-8");
    return;
  }

  const filePath = resolveRequestPath(req.url);
  if (!filePath) {
    send(res, 403, "Forbidden");
    return;
  }

  fs.stat(filePath, (statError, stats) => {
    if (!statError && stats.isDirectory()) {
      const indexPath = path.join(filePath, "index.html");
      fs.stat(indexPath, (indexError, indexStats) => {
        if (indexError || !indexStats.isFile()) {
          send(res, 404, "Not found");
          return;
        }

        res.writeHead(200, {
          "Content-Type": contentTypes[".html"],
          "Content-Length": indexStats.size,
          "Cache-Control": "no-cache",
          "X-Content-Type-Options": "nosniff"
        });

        if (req.method === "HEAD") {
          res.end();
          return;
        }

        fs.createReadStream(indexPath).pipe(res);
      });
      return;
    }

    if (statError || !stats.isFile()) {
      send(res, 404, "Not found");
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = contentTypes[ext] || "application/octet-stream";

    res.writeHead(200, {
      "Content-Type": contentType,
      "Content-Length": stats.size,
      "Cache-Control": ext === ".html" ? "no-cache" : "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff"
    });

    if (req.method === "HEAD") {
      res.end();
      return;
    }

    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Christmas Lights Ottawa site running on port ${port}`);
});
