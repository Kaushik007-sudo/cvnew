import { useEffect } from 'react';
import sewaMartScreen from '../images/sewamart-product-screen.webp';
import allyoScreen from '../images/allyo-product-screen.webp';
import balanceUpScreen from '../images/balanceup-product-screen.webp';
import sewaMartArtwork from '../images/project-sewamart-thumbnail.webp';
import allyoArtwork from '../images/project-allyo-thumbnail.webp';
import balanceUpArtwork from '../images/project-balanceup-thumbnail.webp';

const products = [
  {
    id: 'sewamart',
    index: '01',
    name: 'SewaMart',
    category: 'LOCAL SERVICES MARKETPLACE',
    tagline: 'Trusted local services, closer to home.',
    description: 'Find independent service providers nearby, compare their services, then connect directly to arrange the work. From home repairs and cleaning to tutoring and moving help, SewaMart makes local discovery easier.',
    screen: sewaMartScreen,
    screenAlt: 'SewaMart mobile app screen for finding local service providers',
    artwork: sewaMartArtwork,
    artworkAlt: 'SewaMart project artwork paired with its app screen',
    accent: '#f4a653',
    tint: 'rgba(244, 166, 83, .15)',
    website: 'https://sewamart.com/',
    playStore: 'https://play.google.com/store/apps/details?id=com.sewamart&pcampaignid=web_share',
    source: 'https://www.iencodetech.com/our-products/sewamart',
    features: [
      {
        title: 'Discover what is nearby',
        description: 'Choose a city and search distance, then browse or search services across everyday categories.',
      },
      {
        title: 'Compare before connecting',
        description: 'Review service descriptions, pricing, photos, provider profiles, and customer reviews.',
      },
      {
        title: 'Connect on your terms',
        description: 'Use wallet credits to unlock provider contact details and agree on the work directly.',
      },
    ],
    detail: 'Providers publish and manage their services using the same account as customers. The Android app and website share an account and backend, keeping service listings in sync across both.',
    detailLabel: 'ONE MARKETPLACE. WEB AND ANDROID.',
  },
  {
    id: 'allyo',
    index: '02',
    name: 'Allyo',
    category: 'SOCIAL DISCOVERY & EXPERIENCES',
    tagline: 'Real people. More possibilities.',
    description: 'A people-to-people app for discovering, offering, and booking everyday plans, help, and experiences with people nearby—while keeping your real name private.',
    screen: allyoScreen,
    screenAlt: 'Allyo mobile app screen for discovering people and experiences',
    artwork: allyoArtwork,
    artworkAlt: 'Allyo project artwork paired with an app screen',
    accent: '#c49aff',
    tint: 'rgba(160, 105, 255, .17)',
    website: 'https://allyoapp.com/',
    playStore: 'https://play.google.com/store/apps/details?id=com.allyoapp&hl=en_IN',
    source: 'https://www.iencodetech.com/our-products/allyo',
    features: [
      {
        title: 'Discover more to do',
        description: 'Explore everyday plans and experiences spanning travel, movies, dining, shopping, and more.',
      },
      {
        title: 'Make plans both ways',
        description: 'Discover, offer, and book plans, help, and experiences with people in your area.',
      },
      {
        title: 'Keep your name private',
        description: 'Meet people through the app while your real name stays private.',
      },
    ],
    detail: 'Allyo brings social discovery and real-world activities together in one people-to-people experience, available on the web and Android.',
    detailLabel: 'LOCAL CONNECTIONS. REAL-WORLD PLANS.',
  },
  {
    id: 'balanceup',
    index: '03',
    name: 'BalanceUp',
    category: 'PERSONAL & GROUP FINANCE',
    tagline: 'Split smart. Settle simple.',
    description: 'Track personal spending, keep ledgers for shops, vendors, and friends, or share expenses with a group. Clear dues and know who owes whom—even when offline.',
    screen: balanceUpScreen,
    screenAlt: 'BalanceUp mobile app screen for shared expense tracking',
    artwork: balanceUpArtwork,
    artworkAlt: 'BalanceUp project artwork paired with an expense tracking app screen',
    accent: '#d7f06b',
    tint: 'rgba(173, 213, 95, .15)',
    website: 'https://balanceup.iencodetech.com/',
    playStore: 'https://play.google.com/store/apps/details?id=com.ietbalanceup',
    source: 'https://www.iencodetech.com/our-products/balanceup',
    features: [
      {
        title: 'Keep useful ledgers',
        description: 'Track personal spending and amounts due across separate ledgers for shops, vendors, and friends.',
      },
      {
        title: 'Split any shared expense',
        description: 'Add group members, record who paid, and divide expenses equally or by exact amounts.',
      },
      {
        title: 'Know how to settle up',
        description: 'See each person’s net balance and a simple settlement summary, even when offline.',
      },
    ],
    detail: 'BalanceUp calculates expenses precisely and helps groups see who owes whom. It never moves money; settle up separately using cash, UPI, or a bank transfer.',
    detailLabel: 'SHARED EXPENSES. CLEAR BALANCES.',
  },
];

function MyProjectsPage() {
  useEffect(() => {
    document.title = 'My Projects | SewaMart, Allyo & BalanceUp — Kaushik Das';
    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.content = 'Explore SewaMart, Allyo, and BalanceUp: three consumer products for local services, social discovery, and shared expenses.';
    }
  }, []);

  return (
    <main className="my-projects-page" id="top">
      <a className="mp-skip-link" href="#mp-main">Skip to projects</a>
      <header className="mp-header">
        <div className="mp-header-inner">
          <a className="mp-brand" href="/" aria-label="Kaushik Das portfolio home">
            Kaushik <span>Das</span><small>PRODUCT PORTFOLIO</small>
          </a>
          <nav className="mp-nav" aria-label="Project page navigation">
            <a href="#products">Products</a>
            <a href="/" className="mp-nav-home">Back to portfolio <span aria-hidden="true">↗</span></a>
          </nav>
        </div>
      </header>

      <div id="mp-main">
        <section className="mp-hero">
          <div className="mp-hero-grid" aria-hidden="true"></div>
          <div className="mp-hero-inner">
            <div className="mp-hero-copy">
              <div className="mp-eyebrow"><span></span> PRODUCT LEADERSHIP · SELECTED BUILDS</div>
              <h1>Good products make everyday life <em>flow.</em></h1>
              <p>Three products solving everyday needs—from finding a trusted local service to making plans and splitting shared costs.</p>
              <div className="mp-hero-actions">
                <a className="mp-button mp-button-primary" href="#products">Explore the products <span aria-hidden="true">↓</span></a>
                <a className="mp-button mp-button-quiet" href="mailto:connect@thekaushikdas.com">Discuss a product <span aria-hidden="true">↗</span></a>
              </div>
              <div className="mp-proofline">
                <span><strong>03</strong> live products</span>
                <i></i>
                <span>Android apps</span>
                <i></i>
                <span>Companion websites</span>
              </div>
            </div>

            <div className="mp-hero-art" aria-label="Previews of SewaMart, Allyo, and BalanceUp apps">
              <div className="mp-art-orbit mp-art-orbit-one"></div>
              <div className="mp-art-orbit mp-art-orbit-two"></div>
              <div className="mp-art-note"><span>03</span><div>Products<br />in the wild</div></div>
              <div className="mp-device mp-device-back">
                <img src={sewaMartScreen} alt="" />
                <span>SewaMart</span>
              </div>
              <div className="mp-device mp-device-front">
                <img src={allyoScreen} alt="" />
                <span>Allyo</span>
              </div>
              <div className="mp-device mp-device-side">
                <img src={balanceUpScreen} alt="" />
                <span>BalanceUp</span>
              </div>
              <div className="mp-art-index">DESIGNED FOR REAL LIFE <b>↗</b></div>
            </div>
          </div>
          <a className="mp-scroll-cue" href="#products"><span></span> SCROLL TO EXPLORE</a>
        </section>

        <section className="mp-intro" id="products">
          <div className="mp-section-kicker">A PRODUCT PORTFOLIO <span>01 — 03</span></div>
          <div className="mp-intro-row">
            <h2>Different needs.<br /><em>One thoughtful approach.</em></h2>
            <p>Each product starts with a familiar everyday problem and turns it into a focused, useful app experience—on mobile and the web.</p>
          </div>
          <nav className="mp-product-index" aria-label="Jump to a product">
            {products.map((product) => (
              <a href={`#${product.id}`} key={product.id} style={{ '--product-accent': product.accent }}>
                <span>{product.index}</span>{product.name}<b aria-hidden="true">↘</b>
              </a>
            ))}
          </nav>
        </section>

        {products.map((product, index) => (
          <section
            className={`mp-product mp-product-${product.id}${index % 2 === 1 ? ' mp-product-reverse' : ''}`}
            id={product.id}
            key={product.id}
            style={{ '--product-accent': product.accent, '--product-tint': product.tint }}
          >
            <div className="mp-product-inner">
              <div className="mp-product-visual">
                <div className="mp-product-art">
                  <img src={product.artwork} alt={product.artworkAlt} loading="lazy" />
                </div>
                <div className="mp-product-phone">
                  <img src={product.screen} alt={product.screenAlt} loading="lazy" />
                </div>
                <div className="mp-visual-label"><span>{product.index}</span> PRODUCT SCREEN</div>
              </div>

              <div className="mp-product-copy">
                <div className="mp-eyebrow"><span></span> {product.category}</div>
                <h2>{product.name}</h2>
                <h3>{product.tagline}</h3>
                <p className="mp-product-description">{product.description}</p>

                <div className="mp-feature-list">
                  {product.features.map((feature, featureIndex) => (
                    <article className="mp-feature" key={feature.title}>
                      <span className="mp-feature-number">{String(featureIndex + 1).padStart(2, '0')}</span>
                      <div>
                        <h4>{feature.title}</h4>
                        <p>{feature.description}</p>
                      </div>
                    </article>
                  ))}
                </div>

                <p className="mp-product-detail">{product.detail}</p>
                <div className="mp-product-actions">
                  <a className="mp-button mp-button-product" href={product.website} target="_blank" rel="noopener noreferrer">
                    Visit website <span aria-hidden="true">↗</span>
                  </a>
                  <a className="mp-text-link" href={product.playStore} target="_blank" rel="noopener noreferrer">
                    Get the Android app <span aria-hidden="true">↗</span>
                  </a>
                </div>
                <a className="mp-source-link" href={product.source} target="_blank" rel="noopener noreferrer">
                  {product.detailLabel} <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </section>
        ))}

        <section className="mp-contact">
          <div className="mp-contact-inner">
            <div className="mp-eyebrow"><span></span> FROM PRODUCT IDEA TO DELIVERY</div>
            <h2>Have a product worth bringing to life?</h2>
            <p>Let’s talk about building a clear plan, bringing the right team together, and shipping something people can use.</p>
            <a className="mp-button mp-button-primary" href="mailto:connect@thekaushikdas.com">Let’s talk <span aria-hidden="true">↗</span></a>
          </div>
        </section>
      </div>

      <footer className="mp-footer">
        <a className="mp-brand" href="/">Kaushik <span>Das</span><small>PRODUCT PORTFOLIO</small></a>
        <p>Product details: <a href="https://www.iencodetech.com/our-products" target="_blank" rel="noopener noreferrer">iEncode Tech ↗</a></p>
        <a href="#top" onClick={(event) => { event.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Back to top ↑</a>
      </footer>
    </main>
  );
}

export default MyProjectsPage;
