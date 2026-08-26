import { useEffect, useMemo, useState } from "react";

const PRODUCT_PAGE_URL = "/product";
const SHOPIFY_STORE_URL = "https://realbotanicals.com";
const DEFAULT_VARIANT_ID = "55100370485567";
const SELLING_PLAN_ID = "8277295423";
const SUBSCRIPTION_DISCOUNT = 0.15;

// Launch-day product settings live here so prices, IDs, and imagery can be swapped in one place.
const PRODUCT_VARIANTS = [
  { id: "55100370452799", count: 10, price: 14.99, badge: "", image: "/Kava-Karma_75mg_10ct-contents.webp" },
  { id: "55100370485567", count: 20, price: 26.99, badge: "Most popular", image: "/Kava-Karma_75mg_20ct-contents.webp" },
  { id: "55100370518335", count: 50, price: 59.99, badge: "Best value", image: "/Kava-Karma_75mg_50ct-contents.webp" },
] as const;
const SHARED_PRODUCT_IMAGES = [
  { src: "/Kava-Karma_75mg_benefits.webp", alt: "Kava Karma focus, chill, and mood benefits" },
  { src: "/Kava-Karma_75mg_dosage.webp", alt: "Kava Karma tablet and suggested use" },
  { src: "/Kava-Karma_75mg_review.webp", alt: "Five-star Kava Karma customer review" },
  { src: "/Kava-Karma_75mg_USPS.webp", alt: "Kava Karma quality and manufacturing standards" },
] as const;
const ROOT_IMAGE = "/KavaKarmaRoot.jpg";
const TEA_IMAGE = "/Labverify.jpg";
const LIFESTYLE_IMAGE = "/NoAlcohol.jpg";

type IconName = "arrow" | "bag" | "check" | "menu" | "close";

function Icon({ name }: { name: IconName }) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    bag: <><path d="M6 8h12l-1 12H7L6 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    menu: <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>,
    close: <><path d="m6 6 12 12" /><path d="m18 6-12 12" /></>,
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
    occasion: "After work",
    title: "Unwind",
    copy: "Close the laptop, leave work mode behind, and give the evening a chance to begin.",
    image: "/Daysoftens_Cardimage.jpg",
    icon: "/Daysofticon.svg",
    position: "center",
  },
  {
    occasion: "At home",
    title: "Settle In",
    copy: "Get comfortable, slow things down, and make the most of your time at home.",
    image: "/staypresent_Cardimage.jpg",
    icon: "/StayPresent.svg",
    position: "center",
  },
  {
    occasion: "Dinner & friends",
    title: "Feel social",
    copy: "A relaxed, alcohol-free option for conversation, connection, and whatever comes next.",
    image: "/Conversation_Cardimage.jpg",
    icon: "/Convoicon.svg",
    position: "center",
  },
];

const kavaPoints = [
  { title: "South Pacific origin", copy: "A long tradition centered around gathering, conversation, and connection." },
  { title: "Noble kava root", copy: "Made exclusively with noble kava root extract." },
  { title: "No traditional prep", copy: "No powder, straining, mixing, or earthy cup of tea." },
];

const reviews = [
  {
    name: "Tim J.",
    copy: "Perfect for winding down after work without feeling checked out. Really like the mango flavor too.",
  },
  {
    name: "Paul J.",
    copy: "I was new to kava and this made it super easy. Definitely a nice way to relax at the end of the day.",
  },
  {
    name: "Dave M.",
    copy: "Love these for nights when I want to unwind but don’t feel like drinking. Easy, convenient, and they taste great.",
  },
];

const faqs = [
  ["What is Kava Karma?", "Kava Karma is a Mango-flavored chewable tablet with 75mg of noble kava root extract. It contains no kratom, caffeine, or alcohol and needs no mixing or preparation."],
  ["What does kava feel like?", "People commonly describe kava as relaxed and social rather than checked out—the edge comes off while the moment still feels like yours. Individual responses vary."],
  ["How long does it take to feel?", "Onset is commonly around 30 to 40 minutes. Give one tablet time before considering more, and always follow the serving guidance on the label."],
  ["Can I use kava instead of alcohol?", "Many adults choose kava for alcohol-free evenings, after-work decompression, or social plans. Do not combine kava with alcohol."],
  ["Is there anything I should know before taking it?", "Do not combine kava with alcohol, use it if you have liver problems, drive after taking it, or use it while pregnant or nursing. Talk with a healthcare provider before use if you take prescription medication."],
];

function HomeCheckoutPanel() {
  const [selectedId, setSelectedId] = useState(DEFAULT_VARIANT_ID);
  const [purchaseType, setPurchaseType] = useState<"one-time" | "subscription">("one-time");
  const selected = PRODUCT_VARIANTS.find((variant) => variant.id === selectedId) ?? PRODUCT_VARIANTS[1];
  const subscriptionPrice = Math.round(selected.price * (1 - SUBSCRIPTION_DISCOUNT) * 100) / 100;
  const checkoutPrice = purchaseType === "subscription" ? subscriptionPrice : selected.price;
  const oneTimeCheckoutUrl = `${SHOPIFY_STORE_URL}/cart/${selected.id}:1?checkout`;

  return (
    <div className="home-checkout">
      <div className="pdp-selection-heading">
        <span>Choose your size</span>
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

      <fieldset className="pdp-purchase-options home-purchase-options">
        <legend>Purchase options</legend>
        <div className="pdp-purchase-options__choices">
          <label className={purchaseType === "one-time" ? "selected" : ""}>
            <input type="radio" name="home-purchase-type" value="one-time" checked={purchaseType === "one-time"} onChange={() => setPurchaseType("one-time")} />
            <span className="pdp-radio" aria-hidden="true" />
            <strong>One-time purchase</strong>
            <b>${selected.price.toFixed(2)}</b>
          </label>
          <label className={purchaseType === "subscription" ? "selected" : ""}>
            <input type="radio" name="home-purchase-type" value="subscription" checked={purchaseType === "subscription"} onChange={() => setPurchaseType("subscription")} />
            <span className="pdp-radio" aria-hidden="true" />
            <span className="pdp-subscribe-title"><strong>Subscribe &amp; save</strong><em>Save 15%</em></span>
            <b>${subscriptionPrice.toFixed(2)}</b>
            <span className="pdp-subscribe-details">
              <span>Deliver once a month</span>
              <small>✓ Save 15% on every order</small>
              <small>✓ Cancel or pause anytime</small>
            </span>
          </label>
        </div>
      </fieldset>

      {purchaseType === "subscription" ? (
        <form className="home-buy-form" method="post" action={`${SHOPIFY_STORE_URL}/cart/add`}>
          <input type="hidden" name="form_type" value="product" />
          <input type="hidden" name="id" value={selected.id} />
          <input type="hidden" name="quantity" value="1" />
          <input type="hidden" name="selling_plan" value={SELLING_PLAN_ID} />
          <input type="hidden" name="return_to" value="/checkout" />
          <button className="button home-buy-now" type="submit">Buy now <span>${checkoutPrice.toFixed(2)}</span></button>
        </form>
      ) : (
        <a className="button home-buy-now" data-shop-link href={oneTimeCheckoutUrl}>Buy now <span>${checkoutPrice.toFixed(2)}</span></a>
      )}
    </div>
  );
}

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
          <picture className="hero-editorial__background" aria-hidden="true">
            <source media="(max-width: 600px)" srcSet="/MobilePoolBackground.jpg" />
            <img src="/DesktopPoolBackground.jpg" alt="" />
          </picture>
          <div className="hero-editorial__shade" aria-hidden="true" />
          <div className="hero-editorial__stage">
            <h1 className="hero-editorial__headline">
              <span className="hero-editorial__desktop-title">A new way to <em>clock out</em></span>
              <span className="hero-editorial__mobile-title">
                <span>Work</span><span>Mode</span><span>Ends</span><span>Here</span>
              </span>
            </h1>
            <p className="hero-editorial__description">
              An easy, alcohol-free way to leave work mode behind with noble kava root extract.
              <strong>Unwind. Stay in the moment.</strong>
            </p>
            <ShopLink className="button hero-editorial__shop">Try Kava Karma</ShopLink>
            <img className="hero-editorial__floater" src="/MobilePoolFloater.png" alt="" aria-hidden="true" />
          </div>
        </section>

        <section className="trust-strip" aria-label="Product features">
          {["75mg noble kava root extract", "Mango chewable", "Third-party lab tested", "Zero alcohol"].map((item) => <div key={item}><span />{item}</div>)}
        </section>

        <section className="story section" id="story">
          <div className="section-heading story-heading">
            <p className="eyebrow"><span /> Made for real evenings</p>
            <h2>How does Kava Karma<br /><em>feel?</em></h2>
            <p className="story-heading__body">
              Kava is often described as relaxed, social, and present. Kava Karma brings that lighter kind of wind-down into whatever comes after the workday.
            </p>
          </div>
          <div className="lifestyle-grid">
            {feelings.map((item) => (
              <article className="lifestyle-card" key={item.title}>
                <div className="lifestyle-card__surface" style={{ backgroundImage: `url("${item.image}")`, backgroundPosition: item.position }}>
                  <div className="lifestyle-card__content">
                    <span className="lifestyle-card__occasion">{item.occasion}</span>
                    <h3>{item.title}</h3>
                    <p>{item.copy}</p>
                  </div>
                </div>
                <span className="lifestyle-card__badge">
                  <img src={item.icon} alt="" aria-hidden="true" />
                </span>
              </article>
            ))}
          </div>
          <ShopLink className="button story-cta">Try Kava Karma <Icon name="arrow" /></ShopLink>
        </section>

        <section className="kava-origin section" aria-labelledby="kava-origin-title">
          <div className="kava-origin__copy">
            <p className="eyebrow"><span /> A South Pacific root</p>
            <h2 id="kava-origin-title">What is kava,<br /><em>anyway?</em></h2>
            <p>Kava is a South Pacific root traditionally shared around conversation and community. Kava Karma brings that tradition into a simple extract chewable.</p>
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
              <HomeCheckoutPanel />
              <ul className="check-list">
                <li><Icon name="check" />75mg noble kava root extract per tablet</li>
                <li><Icon name="check" />Natural Alcohol Alternative</li>
                <li><Icon name="check" />Made in a GMP-certified U.S. facility</li>
              </ul>
              <p className="guarantee">30-day money-back guarantee</p>
            </div>
          </div>
        </section>

        <section className="reviews section" aria-labelledby="reviews-title">
          <div className="section-heading centered reviews-heading">
            <p className="eyebrow"><span /> Kava Karma reviews</p>
            <h2 id="reviews-title">Good vibes<br /><em>from real people</em></h2>
          </div>
          <div className="reviews-grid">
            {reviews.map((review) => (
              <article className="review-card" key={review.name}>
                <div className="review-card__stars" aria-label="5 out of 5 stars">★★★★★</div>
                <blockquote>“{review.copy}”</blockquote>
                <p>{review.name}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="fits-evening section">
          <div className="fits-copy">
            <p className="eyebrow"><span /> Another way to unwind</p>
            <h2>Keep the night<br /><em>Skip the drink</em></h2>
            <p>You do not have to swear off alcohol to want another option sometimes. Kava Karma fits the nights when you want to unwind or be social without making a drink the center of the evening.</p>
            <ul>
              <li><span>◎</span><div><b>Keep The Wind-Down Ritual</b><p>Something intentional to reach for when you are ready to shift out of work mode and into your evening.</p></div></li>
              <li><span>☼</span><div><b>Rooted In Tradition</b><p>Kava has long been shared across South Pacific communities around conversation, gathering, and connection.</p></div></li>
              <li><span>✦</span><div><b>Zero Alcohol. Still a Moment</b><p>No cocktail to mix and no lifestyle change to announce. Just another alcohol-free option when it suits you.</p></div></li>
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
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [purchaseType, setPurchaseType] = useState<"one-time" | "subscription">("one-time");
  const selected = PRODUCT_VARIANTS.find((variant) => variant.id === selectedId) ?? PRODUCT_VARIANTS[1];
  const galleryImages = useMemo(() => [
    { src: selected.image, alt: `Kava Karma ${selected.count}-count Mango chewable tablets` },
    ...SHARED_PRODUCT_IMAGES,
  ], [selected.count, selected.image]);
  const subscriptionPrice = useMemo(
    () => Math.round(selected.price * (1 - SUBSCRIPTION_DISCOUNT) * 100) / 100,
    [selected.price],
  );
  const unitPrice = purchaseType === "subscription" ? subscriptionPrice : selected.price;
  const total = useMemo(() => (unitPrice * quantity).toFixed(2), [unitPrice, quantity]);

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
              <img className="pdp-gallery__main-image" src={galleryImages[galleryIndex].src} alt={galleryImages[galleryIndex].alt} />
            </div>
            <div className="pdp-gallery__thumbs" aria-label="Product gallery">
              {galleryImages.map((image, index) => (
                <button
                  className={galleryIndex === index ? "active" : ""}
                  type="button"
                  aria-label={`View image ${index + 1}: ${image.alt}`}
                  aria-pressed={galleryIndex === index}
                  onClick={() => setGalleryIndex(index)}
                  key={image.src}
                >
                  <img src={image.src} alt="" />
                </button>
              ))}
            </div>
          </div>

          <div className="pdp-buybox">
            <p className="pdp-kicker">Noble kava · Mango chewables</p>
            <h1 id="product-title">Kava Karma</h1>
            <p className="pdp-intro">A precisely portioned kava tablet for taking the edge off the day without checking out of the evening.</p>

            <div className="pdp-selection-heading">
              <span>Choose your size</span>
            </div>
            <div className="pdp-variants" role="radiogroup" aria-label="Choose tablet count">
              {PRODUCT_VARIANTS.map((variant) => (
                <button
                  key={variant.id}
                  type="button"
                  role="radio"
                  aria-checked={selected.id === variant.id}
                  className={selected.id === variant.id ? "selected" : ""}
                  onClick={() => {
                    setSelectedId(variant.id);
                    setGalleryIndex(0);
                  }}
                >
                  {variant.badge && <small>{variant.badge}</small>}
                  <strong>{variant.count}</strong>
                  <span>ct.</span>
                  <em>${variant.price.toFixed(2)}</em>
                </button>
              ))}
            </div>

            <fieldset className="pdp-purchase-options">
              <legend>Purchase options</legend>
              <div className="pdp-purchase-options__choices">
                <label className={purchaseType === "one-time" ? "selected" : ""}>
                  <input type="radio" name="purchase-type" value="one-time" checked={purchaseType === "one-time"} onChange={() => setPurchaseType("one-time")} />
                  <span className="pdp-radio" aria-hidden="true" />
                  <strong>One-time purchase</strong>
                  <b>${selected.price.toFixed(2)}</b>
                </label>
                <label className={purchaseType === "subscription" ? "selected" : ""}>
                  <input type="radio" name="purchase-type" value="subscription" checked={purchaseType === "subscription"} onChange={() => setPurchaseType("subscription")} />
                  <span className="pdp-radio" aria-hidden="true" />
                  <span className="pdp-subscribe-title"><strong>Subscribe &amp; save</strong><em>Save 15%</em></span>
                  <b>${subscriptionPrice.toFixed(2)}</b>
                  <span className="pdp-subscribe-details">
                    <span>Deliver once a month</span>
                    <small>✓ Save 15% on every order</small>
                    <small>✓ Cancel or pause anytime</small>
                  </span>
                </label>
              </div>
            </fieldset>

            <div className="pdp-actions">
              <div className="pdp-quantity" aria-label="Quantity selector">
                <button type="button" aria-label="Decrease quantity" onClick={() => setQuantity((value) => Math.max(1, value - 1))}>−</button>
                <output aria-live="polite">{quantity}</output>
                <button type="button" aria-label="Increase quantity" onClick={() => setQuantity((value) => Math.min(10, value + 1))}>+</button>
              </div>
              {purchaseType === "subscription" ? (
                <form className="pdp-checkout-form" method="post" action={`${SHOPIFY_STORE_URL}/cart/add`}>
                  <input type="hidden" name="form_type" value="product" />
                  <input type="hidden" name="id" value={selected.id} />
                  <input type="hidden" name="quantity" value={quantity} />
                  <input type="hidden" name="selling_plan" value={SELLING_PLAN_ID} />
                  <input type="hidden" name="return_to" value="/checkout" />
                  <button className="pdp-checkout" type="submit">Checkout <span>${total}</span></button>
                </form>
              ) : (
                <a className="pdp-checkout" href={checkoutUrl}>Checkout <span>${total}</span></a>
              )}
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

        <section className="reviews section pdp-reviews" aria-labelledby="pdp-reviews-title">
          <div className="section-heading centered reviews-heading">
            <p className="eyebrow"><span /> Kava Karma reviews</p>
            <h2 id="pdp-reviews-title">Good vibes<br /><em>from real people</em></h2>
          </div>
          <div className="reviews-grid">
            {reviews.map((review) => (
              <article className="review-card" key={review.name}>
                <div className="review-card__stars" aria-label="5 out of 5 stars">★★★★★</div>
                <blockquote>“{review.copy}”</blockquote>
                <p>{review.name}</p>
              </article>
            ))}
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
        <div><b>{selected.count} count</b><span>{purchaseType === "subscription" ? "Monthly · " : ""}${total}</span></div>
        {purchaseType === "subscription" ? (
          <form method="post" action={`${SHOPIFY_STORE_URL}/cart/add`}>
            <input type="hidden" name="form_type" value="product" />
            <input type="hidden" name="id" value={selected.id} />
            <input type="hidden" name="quantity" value={quantity} />
            <input type="hidden" name="selling_plan" value={SELLING_PLAN_ID} />
            <input type="hidden" name="return_to" value="/checkout" />
            <button type="submit">Checkout · ${total}</button>
          </form>
        ) : (
          <a href={checkoutUrl}>Checkout · ${total}</a>
        )}
      </div>
    </div>
  );
}

export default function App() {
  return window.location.pathname.replace(/\/+$/, "") === PRODUCT_PAGE_URL ? <ProductPage /> : <Home />;
}
