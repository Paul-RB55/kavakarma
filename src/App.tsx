import { useEffect, useState } from "react";

const SHOP_URL = "https://realbotanicals.com/products/kava-tablets";
const HERO_DESKTOP = "https://cdn.shopify.com/s/files/1/0872/0672/3903/files/KavaKarmaLPHero.jpg?v=1786735192";
const HERO_MOBILE = "https://cdn.shopify.com/s/files/1/0872/0672/3903/files/KavaKarmaLPMobileHero.jpg?v=1786735192";
const ROOT_IMAGE = "https://cdn.shopify.com/s/files/1/0872/0672/3903/files/KavaKarmaRoot.jpg?v=1786735786";
const TEA_IMAGE = "https://cdn.shopify.com/s/files/1/0872/0672/3903/files/KavaTea.jpg?v=1786977416";
const LIFESTYLE_IMAGE = "https://cdn.shopify.com/s/files/1/0872/0672/3903/files/KavaBottom.jpg?v=1786978542";

type IconName = "arrow" | "bag" | "check" | "menu" | "close" | "leaf";

function Icon({ name }: { name: IconName }) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    bag: <><path d="M6 8h12l-1 12H7L6 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    menu: <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>,
    close: <><path d="m6 6 12 12" /><path d="m18 6-12 12" /></>,
    leaf: <><path d="M20 4C12 4 6 8 6 15c0 3 2 5 5 5 7 0 9-8 9-16Z" /><path d="M4 21c2-6 6-10 12-13" /></>,
  };
  return <svg viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>;
}

function Brand() {
  return (
    <a className="brand" href="#top" aria-label="Kava Karma home">
      <img src="/kava-karma-logo.png" alt="Kava Karma" />
    </a>
  );
}

function ShopLink({ className = "button primary", children }: { className?: string; children: React.ReactNode }) {
  return <a className={className} data-shop-link href={SHOP_URL}>{children}</a>;
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="announcement">FOR ADULTS 18+ <b>✦</b> FREE SHIPPING $75+</div>
      <header className="header">
        <div className="header-inner">
          <Brand />
          <nav className={open ? "nav open" : "nav"} aria-label="Main navigation">
            <a href="#top" onClick={() => setOpen(false)}>Home</a>
            <a href="#product" onClick={() => setOpen(false)}>Shop</a>
            <a href="#story" onClick={() => setOpen(false)}>Why Kava</a>
            <ShopLink className="nav-shop">Shop Kava Karma</ShopLink>
          </nav>
          <div className="header-actions">
            <ShopLink className="shop-link">Shop <Icon name="bag" /></ShopLink>
            <button className="menu" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle menu">
              <Icon name={open ? "close" : "menu"} />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

const feelings = [
  { title: "The day softens.", copy: "A little space between you and everything asking for your attention.", image: LIFESTYLE_IMAGE, position: "center 58%" },
  { title: "Conversation flows.", copy: "A calmer social ritual when another drink is not the move.", image: HERO_MOBILE, position: "center 72%" },
  { title: "Your head stays here.", copy: "Unwind without making the rest of the evening disappear.", image: ROOT_IMAGE, position: "center" },
  { title: "The ritual gets easier.", copy: "No straining, muddy tea, or cleanup waiting at the end.", image: TEA_IMAGE, position: "center" },
];

const faqs = [
  ["What is Kava Karma?", "Kava Karma is a Mango-flavored chewable tablet with 75mg of noble kava root extract. It contains no kratom, caffeine, or alcohol and needs no mixing or preparation."],
  ["What does kava feel like?", "People commonly describe kava as relaxed and social rather than checked out—the edge comes off while the moment still feels like yours. Individual responses vary."],
  ["How long does it take to feel?", "Onset is commonly around 30 to 40 minutes. Give one tablet time before considering more, and always follow the serving guidance on the label."],
  ["Can I use kava instead of alcohol?", "Many adults choose kava for alcohol-free evenings, after-work decompression, or social plans. Do not combine kava with alcohol."],
  ["Does Kava Karma contain kratom?", "No. Kava and kratom are different plants. Kava Karma contains kava root extract and no kratom or mitragynine."],
  ["Is there anything I should know before taking it?", "Do not combine kava with alcohol, use it if you have liver problems, drive after taking it, or use it while pregnant or nursing. Talk with a healthcare provider before use if you take prescription medication."],
];

export default function Home() {
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    document.querySelectorAll<HTMLAnchorElement>("[data-shop-link]").forEach((link) => {
      const url = new URL(link.href);
      query.forEach((value, key) => {
        if (!url.searchParams.has(key)) url.searchParams.set(key, value);
      });
      link.href = url.toString();
    });
    const onScroll = () => setShowSticky(window.scrollY > 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Kava Karma Tablets",
    brand: { "@type": "Brand", name: "Real Botanicals" },
    url: SHOP_URL,
    image: HERO_DESKTOP,
    description: "Mango-flavored chewable tablets with 75mg of noble kava root extract per tablet.",
  };

  return (
    <div className="site-shell" id="top">
      <Header />
      <main>
        <section className="hero hero-editorial">
          <img className="hero-editorial__palms" src="/Palmtreesides.png" alt="" aria-hidden="true" />

          <h1 className="hero-editorial__headline" aria-label="Good vibes. Good karma.">
            <span className="hero-editorial__phrase hero-editorial__phrase--left">
              <span className="orange">Good</span>
              <span>Vibes</span>
            </span>
            <span className="hero-editorial__phrase hero-editorial__phrase--right">
              <span>Good</span>
              <span className="orange">Karma</span>
            </span>
          </h1>

          <div className="hero-editorial__product">
            <img src="/KavaKarma_75mg_50ct_Bottle_Mango_FRONT.png" alt="Kava Karma 75mg Mango chewable tablets" />
          </div>

          <img className="hero-editorial__yoga" src="/YogaPose.png" alt="Woman seated in a calm meditation pose" />

          <ShopLink className="button hero-editorial__shop">Shop Kava Karma</ShopLink>
          <p className="hero-editorial__description">
            Turn the volume down without checking out. A precisely portioned tablet made for easier evenings and calmer company.
          </p>
        </section>

        <section className="trust-strip" aria-label="Product features">
          {["75mg kava root extract", "Mango chewable", "No mixing or tea", "Third-party tested"].map((item) => <div key={item}><span />{item}</div>)}
        </section>

        <section className="story section" id="story">
          <div className="section-heading">
            <p className="eyebrow"><span /> For lighter evenings</p>
            <h2>All the calm in<br /><em>one easy tablet.</em></h2>
          </div>
          <div className="lifestyle-grid">
            {feelings.map((item) => (
              <article className="lifestyle-card" key={item.title} style={{ backgroundImage: `url("${item.image}")`, backgroundPosition: item.position }}>
                <div><h3>{item.title}</h3><p>{item.copy}</p></div>
              </article>
            ))}
          </div>
        </section>

        <section className="product-section section" id="product">
          <div className="section-heading centered">
            <p className="eyebrow"><span /> Kava, made easy</p>
            <h2>Keep the ritual.<br /><em>Lose the hassle.</em></h2>
            <p>No powder to knead. No bitter, earthy drink to get through. Just a pocket-friendly Mango chew when the day needs a softer landing.</p>
          </div>
          <div className="product-focus">
            <div className="product-image-shell">
              <div className="product-halo" aria-hidden="true" />
              <picture>
                <source media="(max-width: 600px)" srcSet={HERO_MOBILE} />
                <img src={HERO_DESKTOP} alt="Kava Karma product lineup" />
              </picture>
              <span className="product-badge">Mango flavor</span>
            </div>
            <div className="product-copy">
              <p className="eyebrow"><span /> Choose your size</p>
              <h3>Kava Karma <em>tablets</em></h3>
              <p>Available in 10, 20, and 50-count options, from a first try to a fully stocked calm-down drawer.</p>
              <div className="size-grid" aria-label="Available sizes">
                <div><b>10 ct.</b><span>Try it out</span></div>
                <div className="popular"><small>Most popular</small><b>20 ct.</b><span>The regular</span></div>
                <div><b>50 ct.</b><span>Best value</span></div>
              </div>
              <ul className="check-list">
                <li><Icon name="check" />75mg noble kava root extract per tablet</li>
                <li><Icon name="check" />No kratom, alcohol, or caffeine</li>
                <li><Icon name="check" />Made in a GMP-certified U.S. facility</li>
              </ul>
              <ShopLink className="button dark">Shop Kava Karma <Icon name="arrow" /></ShopLink>
              <p className="guarantee">30-day money-back guarantee</p>
            </div>
          </div>
        </section>

        <section className="fits-evening section">
          <div className="fits-copy">
            <p className="eyebrow"><span /> Bring the calm with you</p>
            <h2>Fits into<br /><em>your evening.</em></h2>
            <p>For the after-work exhale, dinner with friends, or the quiet hour when the house finally stops asking questions.</p>
            <ul>
              <li><span>☼</span><div><b>After work.</b><p>Let the day end before bedtime has to do it for you.</p></div></li>
              <li><span>◎</span><div><b>With friends.</b><p>Keep the social ritual without building the night around another round.</p></div></li>
              <li><span>✦</span><div><b>At home.</b><p>Music, a book, a bath—whatever turns the noise down.</p></div></li>
              <li><span>⌁</span><div><b>On the go.</b><p>A small format that fits where a bag of powder never would.</p></div></li>
            </ul>
            <ShopLink>Shop Kava Karma <Icon name="arrow" /></ShopLink>
          </div>
          <div className="fits-image"><img src={LIFESTYLE_IMAGE} alt="Kava Karma in a relaxed evening setting" /></div>
        </section>

        <section className="experience section">
          <div className="experience-image"><img src={TEA_IMAGE} alt="Traditional kava and Kava Karma tablet format" /></div>
          <div className="experience-copy">
            <p className="eyebrow"><span /> Same root. New ritual.</p>
            <h2>Calm should not<br /><em>need a recipe.</em></h2>
            <p>Traditional kava can be a beautiful ritual. Kava Karma keeps the part people come for and removes the straining, cleanup, and muddy-earth taste.</p>
            <ul>
              <li><Icon name="check" />Mango flavor instead of bitter, earthy tea.</li>
              <li><Icon name="check" />Precisely portioned and ready when you are.</li>
              <li><Icon name="check" />Third-party tested every batch.</li>
            </ul>
            <ShopLink>Find your calm <Icon name="arrow" /></ShopLink>
          </div>
        </section>

        <section className="faq section" id="faq">
          <div className="section-heading centered">
            <p className="eyebrow"><span /> The basics</p>
            <h2>Questions,<br /><em>answered.</em></h2>
          </div>
          <div className="faq-list">
            {faqs.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}<span>+</span></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="final-cta section">
          <p className="eyebrow"><span /> Your evening can feel different</p>
          <h2>Turn the volume down.<br /><em>Keep the good part.</em></h2>
          <p>Good vibes are closer than a complicated kava ritual makes them look.</p>
          <ShopLink>Shop Kava Karma <Icon name="arrow" /></ShopLink>
        </section>
      </main>

      <footer>
        <div className="footer-top">
          <Brand />
          <p>Mango-flavored kava root extract tablets for softer evenings and calmer company.</p>
          <a href="https://realbotanicals.com" target="_blank" rel="noreferrer">Real Botanicals ↗</a>
        </div>
        <div className="footer-safety">For adults 18+. Do not combine with alcohol. Do not use if you have liver problems, while pregnant or nursing, or before driving. Consult a healthcare provider before use if you take prescription medication.</div>
        <div className="footer-bottom"><span>© 2026 Real Botanicals</span><span>These statements have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease.</span></div>
      </footer>

      <div className={showSticky ? "sticky-cta visible" : "sticky-cta"}>
        <div><b>Kava Karma</b><span>75mg · Mango</span></div>
        <ShopLink>Shop now <Icon name="arrow" /></ShopLink>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
    </div>
  );
}
