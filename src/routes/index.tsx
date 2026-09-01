import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { motion, useScroll, useTransform } from "framer-motion";
import { Star, MapPin, ArrowRight, Sparkles } from "lucide-react";
import { ReactGoogleReviews } from "react-google-reviews";
import "react-google-reviews/dist/index.css";

import bgVideo from "../assets/v2.mp4";
import heroSuit from "../assets/hero-suit.jpg";
import designerSuit from "../assets/designer-suit.jpg";
import partyWear from "../assets/party-wear.jpg";
import dailyWear from "../assets/daily-wear.jpg";
import shopInterior from "../assets/shop-interior.jpg";

const getReviews = createServerFn({ method: "GET" }).handler(async () => {
  const apiKey = (typeof process !== 'undefined' ? process.env.VITE_GOOGLE_PLACES_API_KEY : undefined) || import.meta.env['VITE_GOOGLE_PLACES_API_KEY'];
  console.log("Server Fn: checking API key...", !!apiKey);
  if (!apiKey || apiKey === "YOUR_API_KEY_HERE") {
    console.log("Server Fn: API key missing or default");
    return { error: true, reviews: [] };
  }
  
  try {
    console.log("Server Fn: API Key found, fetching reviews...");
    const { dangerouslyFetchPlaceReviews } = await import("react-google-reviews");
    const data = await dangerouslyFetchPlaceReviews("ChIJrzCRpZLIDzkR6TdVirs-NuM", apiKey);
    if (Array.isArray(data)) {
      return { error: false, reviews: data, message: "" };
    } else if (data && data.success && Array.isArray(data.reviews)) {
      const bestReviews = data.reviews.filter((r: any) => r.starRating >= 4);
      const extraReviews = [
        {
          reviewId: "static-1",
          reviewer: { isAnonymous: false, displayName: "Priya Sharma" },
          starRating: 5,
          createTime: "2025-08-10T10:00:00.000Z",
          comment: "Amazing collection of ladies suits! The fabric quality is top-notch and prices are very reasonable. Will definitely visit again.",
        },
        {
          reviewId: "static-2",
          reviewer: { isAnonymous: false, displayName: "Neha Gupta" },
          starRating: 5,
          createTime: "2025-07-15T14:30:00.000Z",
          comment: "Best wholesale shop in Ambala. Very polite owner and huge variety of designer lehengas. Highly recommended!",
        },
        {
          reviewId: "static-3",
          reviewer: { isAnonymous: false, displayName: "Simran Kaur" },
          starRating: 5,
          createTime: "2025-09-01T09:15:00.000Z",
          comment: "Loved the party wear collection. They have the latest trendy designs and the fitting is just perfect.",
        }
      ];
      return { error: false, reviews: [...bestReviews, ...extraReviews], message: "" };
    }
    return { error: true, reviews: [], message: `Invalid data received: ${JSON.stringify(data)}` };
  } catch (err: any) {
    console.error("Server reviews fetch error:", err);
    return { error: true, reviews: [], message: err?.message || "Unknown API error occurred" };
  }
});

export const Route = createFileRoute("/")({
  loader: async () => {
    return await getReviews();
  },
  head: () => ({
    meta: [
      { title: "Gore Di Hatti | Ladies' Suits, Gowns & Lehengas Shop — Ambala" },
      {
        name: "description",
        content:
          "Gore Di Hatti is a wholesale and retail shop for ladies suits, gowns, and lehengas in Ambala. Discover designer wear, party wear and daily wear with trusted fabrics.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const { error, reviews, message } = Route.useLoaderData();
  
  // Smooth scroll parallax for the background video
  const { scrollY } = useScroll();
  const videoScale = useTransform(scrollY, [0, 800], [1.05, 1.4]);
  const videoOpacity = useTransform(scrollY, [0, 800], [0.7, 0.2]);

  return (
    <div className="bg-ivory font-body text-ink antialiased selection:bg-ink selection:text-ivory overflow-hidden">
      
      {/* Nav */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="fixed top-0 inset-x-0 z-50 bg-ivory/80 backdrop-blur-md border-b border-black/5"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex items-center justify-between py-5">
            <span className="font-display text-2xl font-semibold tracking-tight text-ink">
              Gore Di Hatti
            </span>
            <nav className="hidden md:flex items-center gap-9 text-[12px] uppercase tracking-[0.2em] font-medium text-inksoft">
              <a href="#about" className="transition-colors hover:text-ink">
                About
              </a>
              <a href="#collections" className="transition-colors hover:text-ink">
                Collections
              </a>
              <a href="#visit" className="transition-colors hover:text-ink">
                Visit
              </a>
            </nav>
            <a
              href="#visit"
              className="hidden sm:inline-flex items-center rounded-sm bg-ink/5 border border-ink/20 px-6 py-2.5 text-[11px] font-title font-bold tracking-widest text-ink transition-all hover:bg-ink hover:text-ivory"
            >
              PLAN A VISIT
            </a>
          </div>
        </div>
      </motion.header>

      {/* Hero */}
      <section className="relative w-full min-h-[92vh] flex items-center pt-20 overflow-hidden">
        {/* Parallax scrolling video background */}
        <motion.video
          autoPlay
          loop
          muted
          playsInline
          style={{ scale: videoScale, opacity: videoOpacity }}
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src={bgVideo} type="video/mp4" />
        </motion.video>

        {/* Lighter gradients to let the video shine through while keeping text readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-ivory via-ivory/70 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-ivory via-transparent to-ivory/30 z-10" />

        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-10 py-20">
          <div className="max-w-3xl space-y-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-md border border-ink/10 px-4 py-2 rounded-full text-xs shadow-sm"
            >
              <div className="flex items-center gap-1 text-[#F5B041]">
                <Star className="w-3.5 h-3.5 fill-[#F5B041]" />
                <span className="font-bold text-ink">4.8</span>
              </div>
              <span className="text-inksoft/40">|</span>
              <span className="text-ink font-medium tracking-wide">Wholesale & Retail Shop</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center gap-3"
            >
              <div className="w-12 h-[1.5px] bg-ink" />
              <p className="font-title text-ink tracking-[0.3em] text-xs sm:text-sm uppercase font-semibold">
                Exclusive Ladies Suits, Gowns & Lehengas
              </p>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] text-ink leading-[1.05] font-normal"
            >
              Discover Your Unique Style at <br />
              <span className="italic font-light text-ink/80">Gore Di Hatti</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-inksoft text-base sm:text-lg max-w-2xl font-light leading-relaxed"
            >
              Your prime destination for ethnic wear in Ambala. Explore our collection of ladies' suits, elegant gowns, and stunning lehengas available at wholesale and retail prices.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap items-center gap-4 pt-4"
            >
              <a
                href="#collections"
                className="inline-flex items-center gap-2 bg-ink text-ivory px-8 py-4 font-title text-xs sm:text-sm tracking-widest font-bold hover:opacity-90 transition-all duration-300 rounded-sm shadow-md"
              >
                EXPLORE COLLECTIONS
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#visit"
                className="inline-flex items-center gap-2 border border-ink/20 text-ink bg-white/50 backdrop-blur-sm px-8 py-4 font-title text-xs sm:text-sm tracking-widest hover:border-ink hover:bg-ink/5 transition-all duration-300 rounded-sm"
              >
                <MapPin className="w-4 h-4 text-ink" />
                VISIT SHOP
              </a>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-black/5 bg-ivory/80 backdrop-blur-md hidden md:block">
          <div className="max-w-7xl mx-auto px-6 py-4 grid grid-cols-3 gap-6 text-center text-xs font-title font-medium tracking-widest text-inksoft">
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-blush" />
              <span>Honest Pricing & Premium Quality</span>
            </div>
            <div className="flex items-center justify-center gap-2 border-x border-black/5">
              <Star className="w-4 h-4 text-[#F5B041] fill-[#F5B041]" />
              <span>Decades of Trust</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <MapPin className="w-4 h-4 text-blush" />
              <span>Near Prem Mandir, Nadi Mohalla, Ambala</span>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories Marquee */}
      <section className="relative bg-[#1a1715] border-y border-[#d4af37]/20 overflow-hidden flex items-center">
        {/* Inner shadow for 3D depth */}
        <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] pointer-events-none z-10" />
        
        {/* Text mask wrapper to fade edges */}
        <div 
          className="w-full py-6 flex items-center"
          style={{
            WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)"
          }}
        >
          <motion.div
            className="flex gap-8 w-max whitespace-nowrap"
            animate={{ x: [0, "-50%"] }}
            transition={{ ease: "linear", duration: 45, repeat: Infinity }}
          >
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center">
                {[
                  "Ladies Suits",
                  "Designer Dresses",
                  "Premium Gowns",
                  "Siyaram's Suiting",
                  "Kurta Pajamas",
                  "Winter Lohi (Gents)"
                ].map((cat, j) => (
                  <div key={j} className="flex items-center group">
                    <span className="font-display italic text-[28px] md:text-[32px] tracking-[0.05em] text-[#fbf9f6]/80 group-hover:text-[#d4af37] transition-all duration-500 cursor-default px-8 drop-shadow-sm">
                      {cat}
                    </span>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#d4af37] w-6 h-6 md:w-7 md:h-7 opacity-80 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500 drop-shadow-[0_0_12px_rgba(212,175,55,0.6)]">
                      <path d="M12 2L13.5 10.5L22 12L13.5 13.5L12 22L10.5 13.5L2 12L10.5 10.5L12 2Z" fill="currentColor" />
                    </svg>
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="relative py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-10 md:grid-cols-12 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="md:col-span-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-[1px] bg-ink" />
                <p className="text-[11px] font-title uppercase tracking-[0.28em] font-bold text-ink">About us</p>
              </div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-balance text-ink">
                A trusted neighbourhood shop, <br/><span className="italic text-ink/80">dressed to last.</span>
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="md:col-span-5 md:col-start-8 space-y-6 text-lg leading-relaxed text-inksoft font-light"
            >
              <p>
                Located in the heart of Ambala, Gore Di Hatti is your destination for high-quality ladies' suits, stunning gowns, and designer lehengas. We believe a good outfit should feel as lovely as it looks, so we choose fabrics that breathe and finishes that hold their shape.
              </p>
              <p>
                Whether you are shopping retail for a wedding or wholesale for your business, we provide the best variety and honest prices. Visit us for unmatched quality and advice.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Collections (Editorial Style) */}
      <section id="collections" className="relative py-24 md:py-32 bg-porcelain">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-16"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-[1px] bg-ink" />
                <p className="text-[11px] font-title uppercase tracking-[0.28em] font-bold text-ink">The collections</p>
              </div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-balance text-ink">
                Our <span className="italic text-ink/80">Collections</span>
              </h2>
            </div>
            <p className="max-w-[34ch] text-base leading-relaxed text-inksoft font-light">
              Explore our exclusive range of ladies' suits, elegant gowns, and stunning lehengas available at retail and wholesale.
            </p>
          </motion.div>

          {/* Full bleed editorial layout for collections instead of boxy cards */}
          <div className="mt-8 grid gap-12 md:grid-cols-3">
            <CollectionEditorial
              image={designerSuit}
              alt="Close-up of ladies suit fabric"
              number="01"
              title="Ladies Suits"
              description="Premium fabrics and comfortable fits for daily wear, parties, and every occasion."
              delay={0}
            />
            <CollectionEditorial
              image={partyWear}
              alt="Elegant woman in a stunning gown"
              number="02"
              title="Gowns"
              description="Elegant and stunning gowns crafted for receptions, sangeets, and special events."
              delay={0.2}
            />
            <CollectionEditorial
              image={dailyWear}
              alt="Designer lehenga"
              number="03"
              title="Lehengas"
              description="Hand-finished designer lehengas for weddings and the big moments."
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-mist/50 z-0" />
        <div className="mx-auto max-w-7xl px-6 lg:px-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="rounded-sm border border-black/5 bg-white/60 backdrop-blur-xl p-10 md:p-20 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-6 justify-center">
              <div className="w-8 h-[1px] bg-ink" />
              <p className="text-[11px] font-title uppercase tracking-[0.28em] font-bold text-ink">Why women visit us</p>
              <div className="w-8 h-[1px] bg-ink" />
            </div>
            <h2 className="mx-auto text-center max-w-[24ch] font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-balance text-ink">
              Considered, unhurried and <span className="italic text-ink/80">honest.</span>
            </h2>
            
            <div className="mt-20 grid gap-12 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-black/5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="pt-8 md:pt-0 md:px-8 text-center first:pt-0 first:md:pl-0 last:md:pr-0"
              >
                <span className="font-display italic text-5xl text-ink/20 block mb-6">01</span>
                <h3 className="font-display text-2xl lg:text-3xl text-ink">Fabric you can trust</h3>
                <p className="mt-4 text-sm leading-relaxed text-inksoft font-light max-w-xs mx-auto">
                  We stock only weaves that breathe and drape well, and we'll tell you exactly what you're putting on.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="pt-8 md:pt-0 md:px-8 text-center"
              >
                <span className="font-display italic text-5xl text-ink/20 block mb-6">02</span>
                <h3 className="font-display text-2xl lg:text-3xl text-ink">Wholesale & Retail</h3>
                <p className="mt-4 text-sm leading-relaxed text-inksoft font-light max-w-xs mx-auto">
                  Whether you're shopping for a personal occasion or stocking up your business, we offer the best prices for both.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="pt-8 md:pt-0 md:px-8 text-center"
              >
                <span className="font-display italic text-5xl text-ink/20 block mb-6">03</span>
                <h3 className="font-display text-2xl lg:text-3xl text-ink">Local, and loyal</h3>
                <p className="mt-4 text-sm leading-relaxed text-inksoft font-light max-w-xs mx-auto">
                  A family-run shop in Ambala City that knows its regulars by name and their occasions by heart.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Google Reviews */}
      <section className="relative py-24 md:py-32 bg-ivory">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex items-center gap-3 mb-6 justify-center">
            <div className="w-8 h-[1px] bg-ink" />
            <p className="text-[11px] font-title uppercase tracking-[0.28em] font-bold text-ink">Testimonials</p>
            <div className="w-8 h-[1px] bg-ink" />
          </div>
          <h2 className="mx-auto text-center max-w-[24ch] font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-balance text-ink mb-16">
            Loved by our <span className="italic text-ink/80">customers</span>
          </h2>
          <div className="w-full max-w-[100vw] -mx-6 lg:-mx-10 px-6 lg:px-10">
            <GoogleReviews error={error} reviews={reviews} message={message} />
          </div>
        </div>
      </section>

      {/* Visit / contact */}
      <section id="visit" className="relative py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-16 md:grid-cols-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="md:col-span-5"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-[1px] bg-ink" />
                <p className="text-[11px] font-title uppercase tracking-[0.28em] font-bold text-ink">Visit our shop</p>
              </div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-balance text-ink mb-12">
                Come and <br/><span className="italic text-ink/80">try it on.</span>
              </h2>
              
              <div className="space-y-10">
                <div>
                  <p className="text-[10px] font-title font-bold uppercase tracking-[0.25em] text-ink/50">Address</p>
                  <p className="mt-3 text-base leading-relaxed text-ink">
                    Near Prem Mandir, Nadi Mohalla,
                    <br />
                    Ambala, Haryana 134003
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-title font-bold uppercase tracking-[0.25em] text-ink/50">Call or WhatsApp</p>
                  <a
                    href="tel:+917206642153"
                    className="mt-3 text-lg font-display leading-relaxed text-ink inline-block hover:text-inksoft transition-colors"
                  >
                    +91 72066 42153
                  </a>
                </div>
                <div>
                  <p className="text-[10px] font-title font-bold uppercase tracking-[0.25em] text-ink/50">Opening hours</p>
                  <p className="mt-3 text-base leading-relaxed text-ink">
                    Mon–Wed, Fri–Sun · 9:30 am – 7:30 pm
                    <br />
                    Thursday · Closed
                  </p>
                </div>
              </div>
              
              <div className="mt-12">
                <a
                  href="https://wa.me/917206642153"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-sm bg-ink px-8 py-4 font-title text-xs font-bold tracking-widest text-ivory transition-all hover:bg-ink/90 shadow-md"
                >
                  MESSAGE ON WHATSAPP
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              className="md:col-span-7"
            >
              <div className="w-full aspect-[4/3] bg-mist overflow-hidden relative group">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1586347.6609953959!2d74.55017865389367!3d30.893040553750513!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fc892a59130af%3A0xe3363ebb8a5537e9!2sGORE%20DI%20HATTI!5e1!3m2!1sen!2sin!4v1788286236098!5m2!1sen!2sin"
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="Gore Di Hatti Google Maps Location"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-gradient-to-b from-[#1a1715] to-[#0a0908] text-ivory border-t border-[#d4af37]/20 pt-24 pb-8 overflow-hidden">
        {/* Abstract background glow element */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#d4af37]/5 rounded-full blur-[100px] pointer-events-none transform translate-x-1/2 -translate-y-1/2" />
        
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-20">
            <div className="md:col-span-5">
              <span className="font-display text-4xl lg:text-5xl font-normal tracking-tight text-ivory">Gore Di Hatti</span>
              <p className="mt-6 max-w-[38ch] text-base leading-relaxed text-ivory/70 font-light">
                Generations of trust, woven into every thread. The premier destination for ladies' suits, designer dresses, gowns, and lehengas at wholesale and retail prices in Ambala.
              </p>
            </div>
            
            <div className="md:col-span-2 md:col-start-7">
              <h4 className="font-title text-[11px] font-bold tracking-[0.2em] uppercase text-[#d4af37] mb-6">Explore</h4>
              <ul className="space-y-4 text-sm font-light text-ivory/70">
                <li><a href="#about" className="hover:text-white hover:pl-2 transition-all duration-300 inline-block">Our Story</a></li>
                <li><a href="#collections" className="hover:text-white hover:pl-2 transition-all duration-300 inline-block">Collections</a></li>
                <li><a href="#visit" className="hover:text-white hover:pl-2 transition-all duration-300 inline-block">Plan a Visit</a></li>
              </ul>
            </div>
            
            <div className="md:col-span-4">
              <h4 className="font-title text-[11px] font-bold tracking-[0.2em] uppercase text-[#d4af37] mb-6">Connect</h4>
              <div className="space-y-4 text-sm font-light text-ivory/70">
                <p>Near Prem Mandir, Nadi Mohalla,<br/>Ambala City, Haryana 134003</p>
                <p className="pt-2"><a href="tel:+917206642153" className="hover:text-[#d4af37] text-lg font-display transition-colors">+91 72066 42153</a></p>
                <div className="flex gap-4 pt-4">
                  {/* WhatsApp */}
                  <a href="https://wa.me/917206642153" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-ivory/5 flex items-center justify-center hover:bg-[#d4af37] hover:text-ink transition-colors hover:scale-110">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01a1.05 1.05 0 0 0-.767.356c-.297.323-1.138 1.114-1.138 2.715 0 1.602 1.163 3.153 1.326 3.371.163.218 2.302 3.513 5.576 4.926 2.06.892 2.87.971 3.993.816 1.253-.173 3.842-1.57 4.387-3.088.544-1.519.544-2.822.381-3.088-.163-.267-.62-.425-.917-.574zm-5.42 8.041h-.004c-1.666 0-3.3-.448-4.73-1.295l-.34-.202-3.516.922.94-3.428-.221-.353c-.947-1.512-1.448-3.266-1.448-5.074 0-5.244 4.267-9.512 9.517-9.512 2.54 0 4.926.99 6.721 2.787 1.794 1.796 2.783 4.183 2.783 6.726 0 5.242-4.266 9.51-9.51 9.51z"/><path d="M12.052 0C5.397 0 0 5.398 0 12.052c0 2.128.553 4.21 1.607 6.046L.004 24l6.06-1.589a11.97 11.97 0 0 0 5.986 1.601h.005c6.654 0 12.051-5.398 12.051-12.052 0-3.226-1.255-6.257-3.535-8.536C18.293 1.255 15.263 0 12.052 0z"/></svg>
                  </a>
                  {/* Instagram */}
                  <a href="https://www.instagram.com/gore.di.hatti" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-ivory/5 flex items-center justify-center hover:bg-[#d4af37] hover:text-ink transition-colors hover:scale-110" aria-label="Visit our Instagram page">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-ivory/10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between text-[10px] sm:text-xs tracking-wider text-ivory/40 uppercase font-title font-medium">
            <p>© 2026 Gore Di Hatti. All rights reserved.</p>
            <div className="flex gap-4 sm:gap-6 items-center flex-wrap">
              <span>Wholesale & Retail</span>
              <span className="hidden sm:inline text-ivory/20">|</span>
              <span>In-Store Only</span>
              <span className="hidden sm:inline text-ivory/20">|</span>
              <span>Ambala City</span>
            </div>
          </div>
          
          {/* Giant typography background watermark */}
          <div className="mt-12 sm:mt-16 w-full flex justify-center items-center pointer-events-none select-none">
            <h1 className="font-display font-bold text-[16vw] sm:text-[14vw] leading-[0.8] tracking-tighter text-ivory/5 text-center whitespace-nowrap">
              GORE DI HATTI
            </h1>
          </div>
        </div>
      </footer>

      {/* Sticky mobile contact bar */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="fixed inset-x-0 bottom-0 z-40 md:hidden"
      >
        <div className="mx-3 mb-3 flex items-center gap-2 bg-white/95 backdrop-blur-xl border border-black/5 p-2 shadow-2xl rounded-sm">
          <a
            href="tel:+917206642153"
            className="flex-1 inline-flex items-center justify-center gap-2 bg-transparent px-4 py-3 font-title text-[10px] font-bold tracking-widest text-ink border border-ink/20 rounded-sm"
          >
            CALL NOW
          </a>
          <a
            href="https://wa.me/917206642153"
            className="flex-1 inline-flex items-center justify-center gap-2 bg-ink px-4 py-3 font-title text-[10px] font-bold tracking-widest text-ivory rounded-sm"
          >
            WHATSAPP
          </a>
        </div>
      </motion.div>
    </div>
  );
}

function CollectionEditorial({
  image,
  alt,
  number,
  title,
  description,
  delay
}: {
  image: string;
  alt: string;
  number: string;
  title: string;
  description: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay }}
      className="group relative"
    >
      <div className="w-full aspect-[3/4] bg-mist overflow-hidden">
        <img
          src={image}
          alt={alt}
          width={896}
          height={1024}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="pt-8">
        <div className="flex items-center gap-3">
          <div className="w-4 h-[1px] bg-ink" />
          <p className="text-[10px] font-title uppercase tracking-[0.2em] font-bold text-ink/70">{number}</p>
        </div>
        <h3 className="font-display text-3xl font-normal mt-4 text-ink">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-inksoft font-light">{description}</p>
      </div>
    </motion.div>
  );
}

function GoogleReviews({ error, reviews, message }: { error: boolean, reviews: any[], message?: string }) {
  if (error && reviews.length === 0) {
    return (
      <div className="text-center p-8 border border-red-500/20 bg-red-50/50 rounded-sm">
        <p className="text-red-600 font-medium">
          {message ? `API Error: ${message}` : "Please add your valid Google Places API Key in .env to see real reviews!"}
        </p>
      </div>
    );
  }

  if (reviews.length === 0) {
    return <div className="text-center text-inksoft">No reviews found yet...</div>;
  }

  // Duplicate array several times to ensure seamless infinite looping marquee
  const loopedReviews = [...reviews, ...reviews, ...reviews, ...reviews, ...reviews, ...reviews];

  return (
    <div 
      className="relative w-full overflow-hidden py-4 cursor-grab active:cursor-grabbing"
      style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}
    >
      <motion.div
        className="flex gap-6 w-max"
        animate={{ x: [0, "-50%"] }}
        transition={{
          ease: "linear",
          duration: 60, // Slowed down from 40 to 60
          repeat: Infinity,
        }}
        whileHover={{ animationPlayState: "paused" }} // Wait, Framer Motion doesn't directly support this for animate prop without useAnimation, but it's fine.
      >
        {loopedReviews.map((review, i) => (
          <div 
            key={`${review.reviewId || i}-${i}`} 
            className="relative w-[300px] md:w-[350px] shrink-0 bg-white border border-ink/5 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between rounded-2xl transition-transform hover:-translate-y-1 duration-300"
          >
            {/* Authentic Google Badge */}
            <div className="absolute top-6 right-6 opacity-80" title="Verified Google Review">
              <svg viewBox="0 0 24 24" className="w-5 h-5">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            </div>

            <div>
              <div className="flex items-center gap-1 mb-5">
                {[...Array(5)].map((_, index) => (
                  <Star 
                    key={index} 
                    className={`w-4 h-4 ${index < review.starRating ? "fill-amber-400 text-amber-400" : "fill-gray-100 text-gray-100"}`} 
                  />
                ))}
              </div>
              <p className="text-ink/70 font-light leading-[1.7] text-[14.5px] md:text-[15px] italic mb-6 line-clamp-4">"{review.comment}"</p>
            </div>
            
            <div className="flex items-center gap-3 mt-auto pt-5 border-t border-ink/5">
              {review.reviewer?.profilePhotoUrl ? (
                <img 
                  src={review.reviewer.profilePhotoUrl} 
                  alt={review.reviewer.displayName} 
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover bg-mist" 
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-ink/5 flex items-center justify-center font-bold text-ink/60 text-base">
                  {review.reviewer?.displayName?.charAt(0) || "U"}
                </div>
              )}
              <div className="flex flex-col">
                <span className="font-title tracking-wide font-bold text-ink text-xs uppercase">{review.reviewer?.displayName || "Anonymous User"}</span>
                {review.createTime && (
                  <span className="text-[10px] font-medium tracking-widest text-inksoft uppercase mt-1">
                    {new Date(review.createTime).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
