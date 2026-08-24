import { useEffect, useMemo, useState } from "react";

const PRODUCT_PAGE_URL = "/product";
const SHOPIFY_STORE_URL = "https://realbotanicals.com";
const DEFAULT_VARIANT_ID = "55100370485567";
const PRODUCT_IMAGE = "/KavaKarma_75mg_50ct_Bottle_Mango_FRONT.png";

// Launch-day product settings live here so prices, IDs, and imagery can be swapped in one place.
const PRODUCT_VARIANTS = [
  { id: "55100370452799", count: 10, price: 14.99, note: "Try it out", badge: "", image: PRODUCT_IMAGE },
  { id: "55100370485567", count: 20, price: 26.99, note: "The regular", badge: "Most popular", image: PRODUCT_IMAGE },
  { id: "55100370518335", count: 50, price: 59.99, note: "Best value", badge: "Best value", image: PRODUCT_IMAGE },
] as const;
const ROOT_IMAGE = "/KavaKarmaRoot.jpg";
const TEA_IMAGE = "/Labverify.jpg";
const LIFESTYLE_IMAGE = "/NoAlcohol.jpg";

type IconName = "arrow" | "bag" | "check" | "menu" | "close" | "leaf" | "moon" | "users" | "home" | "pin";

function Icon({ name }: { name: IconName }) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    bag: <><path d="M6 8h12l-1 12H7L6 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    menu: <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>,
    close: <><path d="m6 6 12 12" /><path d="m18 6-12 12" /></>,
    leaf: <><path d="M20 4C12 4 6 8 6 15c0 3 2 5 5 5 7 0 9-8 9-16Z" /><path d="M4 21c2-6 6-10 12-13" /></>,
    moon: <path d="M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z" />,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
    home: <><path d="m3 11 9-8 9 8" /><path d="M5 10v11h14V10M9 21v-7h6v7" /></>,
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
  };
  return <svg viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>;
}

function Brand() {
  return (
    <a className="brand" href="/" aria-label="Kava Karma home">
      <img src="/kava-karma-logo.png" alt="Kava Karma" />
    </a>
  );
}

function ShopLink({ className = "button primary", children }: { className?: string; children: React.ReactNode }) {
  return <a className={className} data-shop-link href={`${PRODUCT_PAGE_URL}?variant=${DEFAULT_VARIANT_ID}`}>{children}</a>;
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
            <a href="/" onClick={() => setOpen(false)}>Home</a>
            <a href={`${PRODUCT_PAGE_URL}?variant=${DEFAULT_VARIANT_ID}`} onClick={() => setOpen(false)}>Shop</a>
            <a href="/#story" onClick={() => setOpen(false)}>Why Kava</a>
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
  {
    title: "Unwind",
    copy: "Ease out of work mode.",
    image: "/Daysoftens_Cardimage.jpg",
    icon: "/Daysofticon.svg",
    position: "center",
  },
  {
    title: "Stay present",
    copy: "Wind down without checking out of your evening.",
    image: "/staypresent_Cardimage.jpg",
    icon: "/StayPresent.svg",
    position: "center",
  },
  {
    title: "Feel social",
    copy: "Made for conversation, connection and whatever comes next.",
    image: "/Conversation_Cardimage.jpg",
    icon: "/Convoicon.svg",
    position: "center",
  },
];

const occasions = [
  { icon: "moon" as const, title: "After work", copy: "Close the laptop, change gears, and give the day a clear ending." },
  { icon: "users" as const, title: "Dinner & friends", copy: "A relaxed, alcohol-free option for nights when you still want to be part of the moment." },
  { icon: "home" as const, title: "At home", copy: "Music, gaming, dinner, the couch or whatever your evening looks like, Kava Karma fits without turning it into an event." },
];

const kavaPoints = [
  { title: "South Pacific origin", copy: "A long tradition centered around gathering, conversation, and connection." },
  { title: "Noble kava root", copy: "Made exclusively with noble kava root extract." },
  { title: "No traditional prep", copy: "No powder, straining, mixing, or earthy cup of tea." },
];

const faqs = [
  ["What is Kava Karma?", "Kava Karma is a Mango-flavored chewable tablet with 75mg of noble kava root extract. It contains no kratom, caffeine, or alcohol and needs no mixing or preparation."],
  ["What does kava feel like?", "People commonly describe kava as relaxed and social rather than checked out—the edge comes off while the moment still feels like yours. Individual responses vary."],
  ["How long does it take to feel?", "Onset is commonly around 30 to 40 minutes. Give one tablet time before considering more, and always follow the serving guidance on the label."],
  ["Can I use kava instead of alcohol?", "Many adults choose kava for alcohol-free evenings, after-work decompression, or social plans. Do not combine kava with alcohol."],
  ["Does Kava Karma contain kratom?", "No. Kava and kratom are different plants. Kava Karma contains kava root extract and no kratom or mitragynine."],
  ["Is there anything I should know before taking it?", "Do not combine kava with alcohol, use it if you have liver problems, drive after taking it, or use it while pregnant or nursing. Talk with a healthcare provider before use if you take prescription medication."],
];

function Home() {
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
    url: `${PRODUCT_PAGE_URL}?variant=${DEFAULT_VARIANT_ID}`,
    image: "/KavaProductHero.jpg",
    description: "Mango-flavored chewable tablets with 75mg of noble kava root extract per tablet.",
  };

  return (
    <div className="site-shell" id="top">
      <Header />
      <main>
        <section className="hero hero-editorial">
          <img className="hero-editorial__palms" src="/Palmtreesides.png" alt="" aria-hidden="true" />
          <div className="hero-editorial__stage">
            <h1 className="hero-editorial__headline" aria-label="Good vibes Good karma">
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

            <ShopLink className="button hero-editorial__shop">Try Kava Karma</ShopLink>
            <p className="hero-editorial__description">
              An easy, alcohol-free way to leave work mode behind with noble kava root extract.
              <strong>Unwind. Stay in the moment.</strong>
            </p>
          </div>
        </section>

        <section className="trust-strip" aria-label="Product features">
          {["75mg noble kava root extract", "Mango chewable", "Third-party lab tested", "Zero alcohol"].map((item) => <div key={item}><span />{item}</div>)}
        </section>

        <section className="story section" id="story">
          <div className="section-heading story-heading">
            <p className="eyebrow"><span /> What everyone wants to know</p>
            <h2>How does Kava Karma<br /><em>feel?</em></h2>
            <p className="story-heading__body">
              Kava is often described as relaxed, social, and present. Kava Karma is made for a lighter kind of wind-down. Less checking out and more leaving the workday behind.
            </p>
          </div>
          <div className="lifestyle-grid">
            {feelings.map((item) => (
              <article className="lifestyle-card" key={item.title}>
                <div className="lifestyle-card__surface" style={{ backgroundImage: `url("${item.image}")`, backgroundPosition: item.position }}>
                  <div className="lifestyle-card__content"><h3>{item.title}</h3><p>{item.copy}</p></div>
                </div>
                <span className="lifestyle-card__badge">
                  <img src={item.icon} alt="" aria-hidden="true" />
                </span>
              </article>
            ))}
          </div>
        </section>

        <section className="occasions-section section" aria-labelledby="occasions-title">
          <div className="section-heading centered occasions-heading">
            <p className="eyebrow"><span /> Made for real evenings</p>
            <h2 id="occasions-title">Where Kava Karma<br /><em>fits</em></h2>
            <p>No special occasion or complicated routine required. Reach for Kava Karma when you want an easier transition into whatever comes after the workday.</p>
          </div>
          <div className="occasion-grid">
            {occasions.map((occasion, index) => (
              <article className="occasion-card" key={occasion.title}>
                <span className={index === 1 ? "occasion-icon occasion-icon--warm" : "occasion-icon"} aria-hidden="true"><Icon name={occasion.icon} /></span>
                <h3>{occasion.title}</h3>
                <p>{occasion.copy}</p>
              </article>
            ))}
          </div>
          <ShopLink className="button occasions-cta">Try Kava Karma <Icon name="arrow" /></ShopLink>
        </section>

        <section className="kava-origin section" aria-labelledby="kava-origin-title">
          <div className="kava-origin__copy">
            <p className="eyebrow"><span /> A South Pacific root</p>
            <h2 id="kava-origin-title">What is kava,<br /><em>anyway?</em></h2>
            <p>Kava comes from the root of Piper methysticum, a South Pacific plant traditionally shared around conversation, ceremony, and community. Its naturally occurring compounds are called kavalactones.</p>
            <p>Kava Karma puts that traditional botanical into a simple 75mg noble kava extract chewable—mango flavored, portable, and ready when the workday is done.</p>
            <div className="kava-origin__points">
              {kavaPoints.map((point) => (
                <article key={point.title}><h3>{point.title}</h3><p>{point.copy}</p></article>
              ))}
            </div>
          </div>
          <div className="kava-origin__image"><img src={ROOT_IMAGE} alt="Kava root and ground kava powder" /></div>
        </section>

        <section className="product-section section" id="product">
          <div className="section-heading centered">
            <p className="eyebrow"><span /> Kava, made easy</p>
            <h2>Skip the process<br /><em>Keep the kava</em></h2>
            <p>
              Traditional kava can mean root powder, a strainer bag, cleanup, and an earthy taste that takes some getting used to. Kava Karma puts 75mg of noble kava root extract into a pocket-friendly Mango chewable.
              <span>No muddy tea. No complicated preparation. No guessing what is in each tablet.</span>
            </p>
          </div>
          <div className="product-focus">
            <div className="product-image-shell">
              <div className="product-halo" aria-hidden="true" />
              <img className="product-focus-image" src="/KavaProductHero.jpg" alt="Kava Karma Mango chewable tablets on a beach" />
              <span className="product-badge">Mango flavor</span>
            </div>
            <div className="product-copy">
              <p className="eyebrow"><span /> Get the vibes</p>
              <h3>Kava Karma</h3>
              <p>Whether you are trying kava for the first time or making it part of your evening routine, there is a size that fits.</p>
              <ul className="check-list">
                <li><Icon name="check" />75mg noble kava root extract per tablet</li>
                <li><Icon name="check" />Seven &amp; Alcohol Free</li>
                <li><Icon name="check" />Made in a GMP-certified U.S. facility</li>
              </ul>
              <ShopLink className="button dark">Shop Kava Karma <Icon name="arrow" /></ShopLink>
              <p className="guarantee">30-day money-back guarantee</p>
            </div>
          </div>
        </section>

        <section className="fits-evening section">
          <div className="fits-copy">
            <p className="eyebrow"><span /> Another way to unwind</p>
            <h2>Keep the night<br /><em>Skip the drink</em></h2>
            <p>You do not have to swear off alcohol to want another option sometimes. Kava Karma fits the nights when you want to unwind or be social without making a drink the center of the evening.</p>
            <ul>
              <li><span>◎</span><div><b>A lighter kind of social</b><p>Kava has a long tradition around conversation and community. People commonly describe the experience as relaxed, open, and present.</p></div></li>
              <li><span>☼</span><div><b>The evening stays yours</b><p>Reach for it after work, with friends, or during a quiet night at home.</p></div></li>
              <li><span>✦</span><div><b>No big declaration</b><p>No cocktail to mix and no lifestyle change to announce. Just another alcohol-free option when it suits you.</p></div></li>
            </ul>
            <ShopLink>Shop Kava Karma <Icon name="arrow" /></ShopLink>
          </div>
          <div className="fits-image"><img src={LIFESTYLE_IMAGE} alt="Friends enjoying a relaxed evening together at the beach" /></div>
        </section>

        <section className="experience section">
          <div className="experience-image"><img src={TEA_IMAGE} alt="Independent laboratory testing in a modern quality-control facility" /></div>
          <div className="experience-copy">
            <p className="eyebrow"><span /> The Real Botanicals standard</p>
            <h2>Plant-based<br /><em>Proof-backed</em></h2>
            <p>Natural wellness still deserves modern quality control. Every batch of Kava Karma is made in a GMP-certified U.S. facility and independently tested so you can see exactly what is inside each tablet.</p>
            <ul>
              <li><Icon name="check" />Noble kava root extract</li>
              <li><Icon name="check" />Third-party tested every batch</li>
              <li><Icon name="check" />GMP-certified U.S. manufacturing</li>
              <li><Icon name="check" />Clearly listed ingredients</li>
            </ul>
            <ShopLink>Shop Kava Karma <Icon name="arrow" /></ShopLink>
          </div>
        </section>

        <section className="faq section" id="faq">
          <div className="section-heading centered">
            <p className="eyebrow"><span /> Kava Karma FAQs</p>
            <h2>Start with<br /><em>the basics</em></h2>
            <p>You do not need to become a kava expert before trying it. These are the questions worth answering first.</p>
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
          <p className="eyebrow final-cta__eyebrow"><span /><b>Good vibes<br />Good karma</b></p>
          <h2>Ready to leave<br /><em>work mode behind?</em></h2>
          <p>75mg of noble kava root extract. Mango chewable. Zero alcohol. An easier way to settle into the rest of your evening.</p>
          <ShopLink>Try Kava Karma <Icon name="arrow" /></ShopLink>
          <small>30-day money-back guarantee</small>
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

function ProductPage() {
  const requestedVariant = new URLSearchParams(window.location.search).get("variant");
  const initialVariant = PRODUCT_VARIANTS.find((variant) => variant.id === requestedVariant) ?? PRODUCT_VARIANTS[1];
  const [selectedId, setSelectedId] = useState(initialVariant.id);
  const [quantity, setQuantity] = useState(1);
  const selected = PRODUCT_VARIANTS.find((variant) => variant.id === selectedId) ?? PRODUCT_VARIANTS[1];
  const total = useMemo(() => (selected.price * quantity).toFixed(2), [selected.price, quantity]);

  const checkoutUrl = useMemo(() => {
    const passthrough = new URLSearchParams(window.location.search);
    passthrough.delete("variant");
    const suffix = passthrough.toString();
    return `${SHOPIFY_STORE_URL}/cart/${selected.id}:${quantity}?checkout${suffix ? `&${suffix}` : ""}`;
  }, [selected.id, quantity]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Kava Karma Mango Chewable Tablets";
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("variant", selected.id);
    window.history.replaceState({}, "", url);
  }, [selected.id]);

  return (
    <div className="site-shell product-page" id="top">
      <Header />
      <main className="pdp-main">
        <section className="pdp-hero" aria-labelledby="product-title">
          <div className="pdp-gallery">
            <div className="pdp-gallery__frame">
              <span className="pdp-gallery__test">75mg per tablet</span>
              <div className="pdp-gallery__sun" aria-hidden="true" />
              <img src={selected.image} alt={`Kava Karma ${selected.count}-count Mango chewable tablets`} />
              <span className="pdp-gallery__count">{selected.count} count</span>
            </div>
            <div className="pdp-gallery__thumbs" aria-label="Product highlights">
              <button className="active" type="button"><img src={selected.image} alt="Front of Kava Karma bottle" /></button>
              <button type="button" aria-label="Mango flavor"><span className="pdp-thumb-mango">Mango</span></button>
              <button type="button" aria-label="75 milligrams per tablet"><span className="pdp-thumb-dose">75<small>mg</small></span></button>
            </div>
          </div>

          <div className="pdp-buybox">
            <p className="pdp-kicker">Noble kava · Mango chewables</p>
            <h1 id="product-title">Kava Karma</h1>
            <p className="pdp-intro">A precisely portioned kava tablet for taking the edge off the day without checking out of the evening.</p>

            <div className="pdp-selection-heading">
              <span>Choose your size</span>
              <b>{selected.count} tablets</b>
            </div>
            <div className="pdp-variants" role="radiogroup" aria-label="Choose tablet count">
              {PRODUCT_VARIANTS.map((variant) => (
                <button
                  key={variant.id}
                  type="button"
                  role="radio"
                  aria-checked={selected.id === variant.id}
                  className={selected.id === variant.id ? "selected" : ""}
                  onClick={() => setSelectedId(variant.id)}
                >
                  {variant.badge && <small>{variant.badge}</small>}
                  <strong>{variant.count}</strong>
                  <span>ct.</span>
                  <em>${variant.price.toFixed(2)}</em>
                </button>
              ))}
            </div>

            <div className="pdp-purchase-option">
              <span className="pdp-radio" aria-hidden="true" />
              <div><strong>One-time purchase</strong><small>{selected.note}</small></div>
              <b>${selected.price.toFixed(2)}</b>
            </div>

            <div className="pdp-actions">
              <div className="pdp-quantity" aria-label="Quantity selector">
                <button type="button" aria-label="Decrease quantity" onClick={() => setQuantity((value) => Math.max(1, value - 1))}>−</button>
                <output aria-live="polite">{quantity}</output>
                <button type="button" aria-label="Increase quantity" onClick={() => setQuantity((value) => Math.min(10, value + 1))}>+</button>
              </div>
              <a className="pdp-checkout" href={checkoutUrl}>Checkout <span>${total}</span></a>
            </div>

            <div className="pdp-trust" aria-label="Purchase benefits">
              <div><span>✦</span><b>Free shipping</b><small>On orders over $75</small></div>
              <div><span>✓</span><b>Quality tested</b><small>Every batch</small></div>
              <div><span>↺</span><b>30-day returns</b><small>Money-back guarantee</small></div>
            </div>

            <div className="pdp-details">
              <details>
                <summary>Product details <span>+</span></summary>
                <p>Each Mango-flavored chewable tablet contains 75mg of noble kava root extract. No mixing, straining, or cleaning up afterward.</p>
              </details>
              <details>
                <summary>What’s inside <span>+</span></summary>
                <p>Kava root extract in a convenient chewable format. No kratom, caffeine, or alcohol.</p>
              </details>
              <details>
                <summary>Safety profile <span>+</span></summary>
                <p>For adults 18+. Do not combine with alcohol, use before driving, or use while pregnant or nursing. Consult a healthcare provider before use if you take prescription medication.</p>
              </details>
            </div>
          </div>
        </section>

        <section className="pdp-benefits" aria-labelledby="pdp-benefits-title">
          <p className="eyebrow"><span /> Kava, made easy</p>
          <h2 id="pdp-benefits-title">The unwind you wanted<br /><em>None of the prep</em></h2>
          <div>
            <article><b>75mg</b><h3>Precisely portioned</h3><p>A consistent serving in every Mango chewable tablet.</p></article>
            <article><b>01</b><h3>One simple ritual</h3><p>No powder to knead, tea to strain, or cup to clean.</p></article>
            <article><b>☼</b><h3>Made for evenings</h3><p>A relaxed, social kind of unwind that leaves the night yours.</p></article>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-top">
          <Brand />
          <p>Mango-flavored kava root extract tablets for softer evenings and calmer company.</p>
          <a href="https://realbotanicals.com" target="_blank" rel="noreferrer">Real Botanicals ↗</a>
        </div>
        <div className="footer-safety">For adults 18+. Do not combine with alcohol. Do not use if you have liver problems, while pregnant or nursing, or before driving. Consult a healthcare provider before use if you take prescription medication.</div>
      </footer>

      <div className="pdp-mobile-bar">
        <div><b>{selected.count} count</b><span>${selected.price.toFixed(2)}</span></div>
        <a href={checkoutUrl}>Checkout · ${total}</a>
      </div>
    </div>
  );
}

export default function App() {
  return window.location.pathname.replace(/\/+$/, "") === PRODUCT_PAGE_URL ? <ProductPage /> : <Home />;
}
