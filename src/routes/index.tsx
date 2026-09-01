import { createFileRoute } from "@tanstack/react-router";

import heroSuit from "../assets/hero-suit.jpg";
import designerSuit from "../assets/designer-suit.jpg";
import partyWear from "../assets/party-wear.jpg";
import dailyWear from "../assets/daily-wear.jpg";
import shopInterior from "../assets/shop-interior.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gore Di Hatti | Ladies' Suits Boutique — Ambala City" },
      {
        name: "description",
        content:
          "Gore Di Hatti is a boutique ladies' suits shop in Ambala City. Discover designer, party wear and daily wear salwar kameez suits with patient fittings and trusted fabrics.",
      },
      {
        property: "og:title",
        content: "Gore Di Hatti | Ladies' Suits Boutique — Ambala City",
      },
      {
        property: "og:description",
        content:
          "Boutique ladies' suits in Ambala City. Designer, party wear and daily wear suits, tailored with care.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: heroSuit },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Gore Di Hatti | Ladies' Suits Boutique — Ambala City" },
      {
        name: "twitter:description",
        content:
          "Boutique ladies' suits in Ambala City. Designer, party wear and daily wear suits, tailored with care.",
      },
      { name: "twitter:image", content: heroSuit },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="bg-ivory font-body text-ink antialiased">
      {/* Nav */}
      <header className="relative z-30">
        <div className="mx-auto max-w-[1180px] px-6 lg:px-10">
          <div className="flex items-center justify-between py-6">
            <span className="font-display text-2xl font-semibold tracking-tight">
              Gore Di Hatti
            </span>
            <nav className="hidden md:flex items-center gap-9 text-[13px] uppercase tracking-[0.18em] text-inksoft">
              <a href="#about" className="transition-opacity hover:text-ink">
                About
              </a>
              <a href="#collections" className="transition-opacity hover:text-ink">
                Collections
              </a>
              <a href="#visit" className="transition-opacity hover:text-ink">
                Visit
              </a>
            </nav>
            <a
              href="#visit"
              className="hidden sm:inline-flex items-center rounded-full bg-ink px-5 py-2.5 text-[13px] font-medium text-ivory ring-1 ring-ink transition-opacity hover:opacity-90"
            >
              Plan a visit
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="mx-auto max-w-[1180px] px-6 lg:px-10 pt-6 pb-20 md:pb-28">
          <div className="grid items-end gap-10 md:grid-cols-12">
            <div className="md:col-span-5 order-2 md:order-1">
              <p className="gd-fade text-[12px] uppercase tracking-[0.28em] text-blush">
                Ladies' Suits · Ambala City
              </p>
              <h1 className="gd-fade gd-d1 mt-6 font-display text-6xl md:text-7xl leading-[0.95] text-balance">
                Gore Di Hatti
              </h1>
              <p className="gd-fade gd-d2 mt-6 max-w-[38ch] text-lg leading-relaxed text-inksoft text-pretty">
                A boutique for every occasion — designer, party and daily suits, cut to sit beautifully on you.
              </p>
              <div className="gd-fade gd-d3 mt-9 flex flex-wrap items-center gap-4">
                <a
                  href="#visit"
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-ivory ring-1 ring-ink transition-opacity hover:opacity-90"
                >
                  Find the shop
                </a>
                <a
                  href="#collections"
                  className="inline-flex items-center gap-2 rounded-full px-2 py-3 text-sm font-medium text-ink transition-opacity hover:opacity-70"
                >
                  View collections →
                </a>
              </div>
            </div>
            <div className="md:col-span-7 order-1 md:order-2">
              <div className="w-full aspect-[4/5] rounded-[min(1vw,12px)] bg-mist overflow-hidden">
                <img
                  src={heroSuit}
                  alt="Elegant woman wearing an ivory and blush designer salwar kameez suit"
                  width={1080}
                  height={1320}
                  className="w-full h-full object-cover"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="relative py-20 md:py-28">
        <div className="mx-auto max-w-[1180px] px-6 lg:px-10">
          <div className="grid gap-10 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-5">
              <p className="text-[12px] uppercase tracking-[0.28em] text-blush">About us</p>
              <h2 className="mt-5 font-display text-4xl md:text-5xl leading-[1.02] text-balance">
                A neighbourhood boutique, dressed to last.
              </h2>
            </div>
            <div className="md:col-span-6 md:col-start-7">
              <p className="text-lg leading-relaxed text-inksoft text-pretty">
                Tucked into the heart of Ambala City, Gore Di Hatti has dressed women for weddings, festivals and everyday life for years. We believe a good suit should feel as lovely as it looks — so we choose fabrics that breathe, silhouettes that flatter, and finishes that hold their shape long after the event.
              </p>
              <p className="mt-6 text-lg leading-relaxed text-inksoft text-pretty">
                Come in for a quiet fitting, honest advice and a cup of chai. There is no pressure, no queue — just a considered wardrobe, built one suit at a time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Collections */}
      <section id="collections" className="relative py-20 md:py-28">
        <div className="mx-auto max-w-[1180px] px-6 lg:px-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-[12px] uppercase tracking-[0.28em] text-blush">The collections</p>
              <h2 className="mt-5 font-display text-4xl md:text-5xl leading-[1.02] text-balance">
                Three ways to wear it.
              </h2>
            </div>
            <p className="max-w-[34ch] text-base leading-relaxed text-inksoft text-pretty">
              Each edit is curated for a different moment in your week — from the grandest table to the quietest morning.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            <CollectionCard
              image={designerSuit}
              alt="Close-up of embroidered designer lehenga suit fabric with fine threadwork"
              number="01"
              title="Designer Suits"
              description="Hand-finished lehengas and anarkalis for weddings and the big moments."
            />
            <CollectionCard
              image={partyWear}
              alt="Elegant woman in a shimmering party-wear anarkali suit"
              number="02"
              title="Party Wear"
              description="Glowing fabrics and bold draping for receptions, sangeets and celebrations."
            />
            <CollectionCard
              image={dailyWear}
              alt="Woman wearing a comfortable cotton daily-wear salwar kameez suit"
              number="03"
              title="Daily Wear"
              description="Light, breathable suiting that feels as good as it looks, day to day."
            />
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="relative py-16 md:py-24">
        <div className="mx-auto max-w-[1180px] px-6 lg:px-10">
          <div className="rounded-[min(1.5vw,22px)] bg-white/55 backdrop-blur-md ring-1 ring-black/5 p-8 md:p-14">
            <p className="text-[12px] uppercase tracking-[0.28em] text-blush">Why women visit us</p>
            <h2 className="mt-5 max-w-[20ch] font-display text-4xl md:text-5xl leading-[1.02] text-balance">
              Considered, unhurried and honest.
            </h2>
            <div className="mt-12 grid gap-10 md:grid-cols-3">
              <div>
                <span className="font-display text-3xl text-blush">01</span>
                <h3 className="mt-3 font-display text-2xl font-medium">Fabric you can trust</h3>
                <p className="mt-2 text-sm leading-relaxed text-inksoft text-pretty">
                  We stock only weaves that breathe and drape well, and we'll tell you exactly what you're putting on.
                </p>
              </div>
              <div>
                <span className="font-display text-3xl text-blush">02</span>
                <h3 className="mt-3 font-display text-2xl font-medium">Fits that flatter</h3>
                <p className="mt-2 text-sm leading-relaxed text-inksoft text-pretty">
                  A patient in-store fitting, tailored to your frame — never rushed, never one-size-fits-all.
                </p>
              </div>
              <div>
                <span className="font-display text-3xl text-blush">03</span>
                <h3 className="mt-3 font-display text-2xl font-medium">Local, and loyal</h3>
                <p className="mt-2 text-sm leading-relaxed text-inksoft text-pretty">
                  A family-run shop in Ambala City that knows its regulars by name and their occasions by heart.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visit / contact */}
      <section id="visit" className="relative py-20 md:py-28">
        <div className="mx-auto max-w-[1180px] px-6 lg:px-10">
          <div className="grid gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-5">
              <p className="text-[12px] uppercase tracking-[0.28em] text-blush">Visit the boutique</p>
              <h2 className="mt-5 font-display text-4xl md:text-5xl leading-[1.02] text-balance">
                Come and try it on.
              </h2>
              <div className="mt-10 space-y-7">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-inksoft/70">Address</p>
                  <p className="mt-2 text-base leading-relaxed text-ink">
                    Shop No. 14, Main Bazaar Road,
                    <br />
                    Ambala City, Haryana 134003
                  </p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-inksoft/70">Call or WhatsApp</p>
                  <a
                    href="tel:+919812345670"
                    className="mt-2 text-base leading-relaxed text-ink inline-block hover:text-blush transition-colors"
                  >
                    +91 98123 45670
                  </a>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-inksoft/70">Opening hours</p>
                  <p className="mt-2 text-base leading-relaxed text-ink">
                    Mon – Sat · 10:30 am – 8:30 pm
                    <br />
                    Sunday · 11:00 am – 6:00 pm
                  </p>
                </div>
              </div>
              <a
                href="https://wa.me/919812345670"
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-blush px-6 py-3 text-sm font-medium text-ivory ring-1 ring-blush transition-opacity hover:opacity-90"
              >
                Message on WhatsApp
              </a>
            </div>
            <div className="md:col-span-7">
              <div className="w-full aspect-[4/3] rounded-[min(1vw,12px)] bg-mist overflow-hidden">
                <img
                  src={shopInterior}
                  alt="Warm interior of the Gore Di Hatti boutique in Ambala City"
                  width={1200}
                  height={900}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative">
        <div className="mx-auto max-w-[1180px] px-6 lg:px-10 py-14">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="font-display text-3xl font-semibold tracking-tight">Gore Di Hatti</span>
              <p className="mt-3 max-w-[36ch] text-sm leading-relaxed text-inksoft text-pretty">
                Ladies' suits, tailored with care in the heart of Ambala City.
              </p>
            </div>
            <div className="text-sm leading-relaxed text-inksoft">
              <p>Ambala City, Haryana</p>
              <p>+91 98123 45670</p>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-black/5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs tracking-wide text-inksoft/70">© 2026 Gore Di Hatti · Ambala City</p>
            <p className="text-xs tracking-wide text-inksoft/70">Visit us in-store · No online checkout</p>
          </div>
        </div>
      </footer>

      {/* Sticky mobile contact bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 md:hidden">
        <div className="mx-3 mb-3 flex items-center gap-2 rounded-2xl bg-white/70 backdrop-blur-md ring-1 ring-black/5 p-2 shadow-sm">
          <a
            href="tel:+919812345670"
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-4 py-3 text-sm font-medium text-ivory ring-1 ring-ink"
          >
            Call now
          </a>
          <a
            href="https://wa.me/919812345670"
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-blush px-4 py-3 text-sm font-medium text-ivory ring-1 ring-blush"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

function CollectionCard({
  image,
  alt,
  number,
  title,
  description,
}: {
  image: string;
  alt: string;
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="gd-card rounded-[min(1.2vw,18px)] bg-porcelain p-3 ring-1 ring-black/5">
      <div className="w-full aspect-[4/5] rounded-[min(1vw,12px)] bg-mist overflow-hidden">
        <img
          src={image}
          alt={alt}
          width={896}
          height={1024}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="px-3 pt-6 pb-3">
        <p className="text-[10px] uppercase tracking-[0.2em] text-blush">{number}</p>
        <h3 className="font-display text-2xl font-medium mt-1">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-inksoft text-pretty">{description}</p>
      </div>
    </div>
  );
}
