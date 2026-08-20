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
    title: "The day softens",
    copy: "A little breathing room between you and everything that wanted your attention.",
    image: "/Daysoftens_Cardimage.jpg",
    icon: "/Daysofticon.svg",
    position: "center",
  },
  {
    title: "Conversation comes easier",
    copy: "A calmer way to settle into dinner, friends, or wherever the night takes you.",
    image: "/Conversation_Cardimage.jpg",
    icon: "/Convoicon.svg",
    position: "center",
  },
  {
    title: "You stay present",
    copy: "Made for unwinding without making the rest of your evening disappear.",
    image: "/staypresent_Cardimage.jpg",
    icon: "/StayPresent.svg",
    position: "center",
  },
  {
    title: "The ritual stays simple",
    copy: "One chewable tablet. No mixing, straining, or cleaning up afterward.",
    image: "/Ritualsimple_Cardimage.jpg",
    icon: "/ritualicon.svg",
    position: "center",
  },
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

            <ShopLink className="button hero-editorial__shop">Shop Kava Karma</ShopLink>
            <p className="hero-editorial__description">
              Turn the volume down without checking out. A precisely portioned tablet made for easier evenings and calmer company.
            </p>
          </div>
        </section>

        <section className="trust-strip" aria-label="Product features">
          {["75mg kava root extract", "Mango chewable", "No mixing or tea", "Third-party tested"].map((item) => <div key={item}><span />{item}</div>)}
        </section>

        <section className="story section" id="story">
          <div className="section-heading story-heading">
            <p className="eyebrow"><span /> When work ends but your brain doesn’t</p>
            <h2>Relax into the night<br /><em>Stay in it</em></h2>
            <p className="story-heading__body">
              Kava is known for a relaxed, social kind of unwind. The edge comes off, the day feels farther away, and you still have an evening left to enjoy.
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
            <p className="eyebrow"><span /> Bring the calm with you</p>
            <h2>Fits into<br /><em>your evening</em></h2>
            <p>For the after-work exhale, dinner with friends, or the quiet hour when the house finally stops asking questions.</p>
            <ul>
              <li><span>☼</span><div><b>After work</b><p>Let the day end before bedtime has to do it for you.</p></div></li>
              <li><span>◎</span><div><b>With friends</b><p>Keep the social ritual without building the night around another round.</p></div></li>
              <li><span>✦</span><div><b>At home</b><p>Music, a book, a bath—whatever turns the noise down.</p></div></li>
              <li><span>⌁</span><div><b>On the go</b><p>A small format that fits where a bag of powder never would.</p></div></li>
            </ul>
            <ShopLink>Shop Kava Karma <Icon name="arrow" /></ShopLink>
          </div>
          <div className="fits-image"><img src={LIFESTYLE_IMAGE} alt="Kava Karma in a relaxed evening setting" /></div>
        </section>

        <section className="experience section">
          <div className="experience-image"><img src={TEA_IMAGE} alt="Traditional kava and Kava Karma tablet format" /></div>
          <div className="experience-copy">
            <p className="eyebrow"><span /> Same root. New ritual.</p>
            <h2>Calm should not<br /><em>need a recipe</em></h2>
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
            <h2>Questions,<br /><em>answered</em></h2>
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
          <h2>Turn the volume down<br /><em>Keep the good part</em></h2>
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
