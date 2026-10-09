import { useEffect } from 'react';
import heroImage from '../images/hero.png';
import { createLuxeCvPdf } from './createLuxeCvPdf.js';
import './luxe.css';

const whatsappLink = 'https://wa.me/918436327900?text=Hello%20Kaushik%2C%20I%27d%20like%20to%20discuss%20a%20hospitality%20opportunity.';
const linkedInLink = 'https://www.linkedin.com/in/luxekaushik';

const strengths = [
  { number: '01', title: 'Guest-first service', text: 'Warm, attentive service that makes guests feel welcomed, heard, and looked after.' },
  { number: '02', title: 'Hospitality sales mindset', text: 'A genuine interest in understanding guest needs, presenting the right experience, and building lasting relationships.' },
  { number: '03', title: 'Smooth operations', text: 'Confident coordination across front office, food and beverage, kitchen, and event teams.' },
  { number: '04', title: 'Digital fluency', text: 'Technology, project coordination, and hotel-management software experience that supports organised service.' },
];

const hospitalityExperience = [
  {
    company: 'Regenta Hotels & Resorts',
    role: 'Food and Beverage Assistant',
    dates: 'October 2019 – March 2020',
    place: 'Bhuj, Gujarat, India',
    description: 'Supported restaurant, dining, banquet, and event operations with a focus on attentive guest service and consistent hotel standards.',
    responsibilities: [
      'Welcomed guests, managed seating, and shared menu information and recommendations.',
      'Took food and beverage orders and coordinated with kitchen colleagues for accurate, timely service.',
      'Served food and beverages while maintaining dining etiquette, service standards, and well-presented tables.',
      'Maintained cleanliness, hygiene, food safety, and proper restaurant and dining-area setup.',
      'Supported banquets, weddings, private parties, and other special events.',
      'Coordinated with kitchen and service teams to keep daily operations running smoothly.',
      'Responded professionally to guest requests and feedback to improve the dining experience.',
    ],
  },
  {
    company: 'Ramada by Wyndham',
    role: 'Industrial Trainee',
    dates: 'June 2019 – October 2019',
    place: 'Khajuraho, Madhya Pradesh, India',
    description: 'Built hands-on experience across front office, reservations, guest relations, and food and beverage operations in a full-service hotel.',
    responsibilities: [
      'Assisted with guest check-ins, check-outs, reservations, and day-to-day front-office operations.',
      'Handled guest bookings and interactions in person and through IDS hotel-management software.',
      'Helped Indian and international guests with enquiries and service requests.',
      'Supported restaurant, wedding, marriage-function, and poolside-party operations.',
      'Helped coordinate hospitality services for weddings, social gatherings, and special events.',
      'Worked with front-office and food-and-beverage teams to support smooth operations and guest satisfaction.',
    ],
    recognition: 'Recognised as Best Trainee for Guest Relations following positive feedback from multiple international guests.',
  },
];

const itExperience = [
  { role: 'Engineering Manager', company: 'Utah Tech Labs', dates: 'June 2023 – Present', place: 'Kolkata, India', text: 'Leads 15 developers across eight concurrent projects with combined budgets of $2M; brings cross-functional team leadership, planning, and stakeholder coordination.' },
  { role: 'Project Coordinator', company: 'iEncode Tech', dates: 'July 2022 – June 2023', place: 'Kolkata, India', text: 'Coordinated project tasks and client communication to keep delivery aligned with product strategy.' },
  { role: 'Project Coordinator', company: 'InfluxIQ Tech', dates: 'December 2020 – July 2022', place: 'Kalyani, India', text: 'Managed project coordination and business-development activities.' },
  { role: 'Computer Faculty', company: 'Chakdaha Model School', dates: 'July 2015 – March 2020', place: 'Chakdaha, India', text: 'Designed and delivered interactive computer-science lessons.' },
  { role: 'Online Bidder', company: 'Kloud Byte', dates: 'March 2014 – July 2016', place: 'Kolkata, India', text: 'Managed online bids and client proposals.' },
  { role: 'HP Technical Support', company: 'Wipro', dates: 'March 2013 – July 2015', place: 'Kolkata, India', text: 'Provided troubleshooting for HP hardware and software.' },
];

const hospitalitySkills = [
  'Food & beverage service',
  'Restaurant operations',
  'Guest relations',
  'Banquet service',
  'Event support',
  'Customer service',
  'Team coordination',
  'Food safety & hygiene',
];

function LuxeMark() {
  return (
    <svg className="lx-brand-mark" viewBox="0 0 56 56" role="img" aria-label="Kaushik Das monogram">
      <defs>
        <linearGradient id="lx-mark-gradient" x1="5" y1="5" x2="51" y2="51" gradientUnits="userSpaceOnUse">
          <stop stopColor="#9ee6d1" />
          <stop offset=".48" stopColor="#69a9c3" />
          <stop offset="1" stopColor="#c49be6" />
        </linearGradient>
        <linearGradient id="lx-mark-type" x1="16" y1="18" x2="41" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#317f77" />
          <stop offset=".55" stopColor="#7359a5" />
          <stop offset="1" stopColor="#c57b79" />
        </linearGradient>
      </defs>
      <circle cx="28" cy="28" r="27" fill="url(#lx-mark-gradient)" />
      <circle cx="28" cy="28" r="23.5" fill="#fffdf9" stroke="white" strokeOpacity=".9" strokeWidth="1.3" />
      <path d="M19 38V18m0 10 13-11m-13 11 14 10m-2-16h7a5 5 0 0 1 0 10h-7" fill="none" stroke="url(#lx-mark-type)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.7" />
      <circle cx="42.5" cy="13.5" r="3.2" fill="#f1aa91" />
      <circle cx="12.5" cy="39.5" r="2.1" fill="#76b6a4" />
    </svg>
  );
}

function LuxePage() {
  const downloadCv = () => {
    const pdf = createLuxeCvPdf();
    const url = URL.createObjectURL(pdf);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Kaushik-Das-Hospitality-CV.pdf';
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  useEffect(() => {
    document.title = 'Kaushik Das | Hospitality, Guest Relations & Sales';
    const description = document.querySelector('meta[name="description"]');
    const updateMeta = (selector, value) => {
      const element = document.querySelector(selector);
      if (element) element.setAttribute('content', value);
    };
    if (description) {
      description.content = 'Meet Kaushik Das: a guest-focused hospitality professional with hotel operations, guest relations, event support, and a strong interest in hospitality sales.';
    }
    updateMeta('meta[property="og:title"]', document.title);
    updateMeta('meta[property="og:description"]', description?.content || '');
    updateMeta('meta[property="og:url"]', 'https://luxe.thekaushikdas.com/');
    updateMeta('meta[property="og:image"]', 'https://www.thekaushikdas.com/images/hero.png');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('lx-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.lx-reveal').forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="luxe-page" id="top">
      <a className="lx-skip-link" href="#lx-main">Skip to content</a>
      <header className="lx-header">
        <div className="lx-header-inner">
          <a className="lx-brand" href="#top" aria-label="Kaushik Das hospitality profile">
            <LuxeMark />
            <span className="lx-brand-text"><span className="lx-brand-name">KAUSHIK DAS</span><small>HOSPITALITY · GUEST EXPERIENCE</small></span>
          </a>
          <nav className="lx-nav" aria-label="Main navigation">
            <a href="#profile">Profile</a>
            <a href="#experience">Experience</a>
            <a className="lx-nav-cta" href={whatsappLink} target="_blank" rel="noopener noreferrer">Let’s talk <span aria-hidden="true">↗</span></a>
          </nav>
        </div>
      </header>

      <div id="lx-main">
        <section className="lx-hero">
          <div className="lx-hero-glow" aria-hidden="true"></div>
          <div className="lx-hero-inner">
            <div className="lx-hero-copy lx-reveal">
              <div className="lx-availability"><span></span> OPEN TO HOSPITALITY OPPORTUNITIES</div>
              <p className="lx-overline">SERVICE WITH PURPOSE. EXPERIENCES THAT STAY.</p>
              <h1>Hospitality is<br />how people <em>feel.</em></h1>
              <p className="lx-hero-lead">I’m Kaushik Das — a guest-focused hospitality professional with hands-on hotel experience and a genuine enthusiasm for hospitality sales.</p>
              <p className="lx-hero-sub">From thoughtful guest service to confident team coordination, I help turn every interaction into a reason to return.</p>
              <div className="lx-hero-actions">
                <a className="lx-button lx-button-dark" href={whatsappLink} target="_blank" rel="noopener noreferrer">Let’s talk about a role <span aria-hidden="true">↗</span></a>
                <button className="lx-button lx-button-light" type="button" onClick={downloadCv}><span aria-hidden="true">↓</span> Download CV</button>
              </div>
              <div className="lx-hero-proof"><span>GUEST RELATIONS</span><i></i><span>FOOD &amp; BEVERAGE</span><i></i><span>SALES ENTHUSIAST</span></div>
            </div>

            <div className="lx-hero-visual lx-reveal" aria-label="Portrait of Kaushik Das">
              <div className="lx-portrait-orbit lx-portrait-orbit-one" aria-hidden="true"></div>
              <div className="lx-portrait-orbit lx-portrait-orbit-two" aria-hidden="true"></div>
              <div className="lx-photo-frame">
                <img src={heroImage} alt="Kaushik Das" fetchPriority="high" />
                <div className="lx-photo-shade"></div>
                <div className="lx-photo-caption"><span>KAUSHIK DAS</span><small>Hospitality · Guest Experience</small></div>
              </div>
              <div className="lx-floating-note"><span className="lx-note-icon">✦</span><span><strong>Guest-first,</strong><small>always</small></span></div>
              <div className="lx-portrait-stamp"><span>THE ART OF</span><strong>Hospitality</strong><i>✦</i></div>
              <div className="lx-photo-index"><span>01</span> / GUEST EXPERIENCE</div>
            </div>
          </div>
          <a className="lx-scroll-hint" href="#profile"><span></span> DISCOVER MY APPROACH</a>
        </section>

        <section className="lx-intro lx-section" id="profile">
          <div className="lx-intro-inner">
            <div className="lx-section-label lx-reveal"><span>THE GUEST EXPERIENCE, FIRST</span><i>01 — 03</i></div>
            <div className="lx-intro-grid">
              <h2 className="lx-reveal">Great service feels personal.<br /><em>Great sales do, too.</em></h2>
              <div className="lx-intro-copy lx-reveal">
                <p>My foundation is in hotel operations: welcoming guests, understanding what they need, and coordinating the details that make a stay or event feel seamless.</p>
                <p>I’m now excited to bring that service mindset into hospitality sales—building relationships, presenting the right experience, and helping guests choose to come back.</p>
                <a className="lx-inline-link" href={linkedInLink} target="_blank" rel="noopener noreferrer">Connect on LinkedIn <span aria-hidden="true">↗</span></a>
              </div>
            </div>
            <div className="lx-strength-grid">
              {strengths.map((strength, index) => (
                <article className="lx-strength lx-reveal" key={strength.number} style={{ '--lx-delay': `${index * 90}ms` }}>
                  <span className="lx-strength-number">{strength.number}</span>
                  <h3>{strength.title}</h3>
                  <p>{strength.text}</p>
                  <span className="lx-strength-arrow" aria-hidden="true">↗</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="lx-hospitality lx-section" id="experience">
          <div className="lx-content-width">
            <div className="lx-section-label lx-reveal"><span>HOSPITALITY EXPERIENCE</span><i>02 — 03</i></div>
            <div className="lx-experience-heading lx-reveal">
              <div><p className="lx-overline">SERVICE. OPERATIONS. RELATIONSHIPS.</p><h2>Where the guest<br /><em>comes first.</em></h2></div>
              <p>Practical experience across food and beverage, guest relations, front office, reservations, and special events.</p>
            </div>
            <div className="lx-hospitality-list">
              {hospitalityExperience.map((job, index) => (
                <article className="lx-hotel-role lx-reveal" key={job.company} style={{ '--lx-delay': `${index * 120}ms` }}>
                  <div className="lx-role-aside"><span>{String(index + 1).padStart(2, '0')}</span><i></i><small>{job.dates}</small></div>
                  <div className="lx-role-content">
                    <div className="lx-role-topline"><div><h3>{job.role}</h3><p className="lx-company">{job.company}</p></div><span className="lx-role-location">{job.place}</span></div>
                    <p className="lx-role-summary">{job.description}</p>
                    <ul className="lx-responsibility-list">
                      {job.responsibilities.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                    {job.recognition && <div className="lx-recognition"><span aria-hidden="true">✦</span><p><strong>Best Trainee — Guest Relations</strong>{job.recognition.replace('Recognised as Best Trainee for Guest Relations ', '')}</p></div>}
                  </div>
                </article>
              ))}
            </div>
            <div className="lx-skills-band lx-reveal">
              <span className="lx-skills-label">HOSPITALITY SKILLS</span>
              <div className="lx-skill-chips">{hospitalitySkills.map((skill) => <span key={skill}>{skill}</span>)}</div>
            </div>
          </div>
        </section>

        <section className="lx-transfer lx-section">
          <div className="lx-transfer-inner">
            <div className="lx-transfer-copy lx-reveal">
              <div className="lx-section-label"><span>THE SKILLS BEHIND THE SERVICE</span><i>03 — 03</i></div>
              <p className="lx-overline">A BROADER PROFESSIONAL FOUNDATION</p>
              <h2>People skills.<br /><em>Operational thinking.</em></h2>
              <p>My work in technology and project coordination has strengthened the same skills great hospitality depends on: clear communication, reliable follow-through, thoughtful problem-solving, and attention to the details behind a smooth experience.</p>
              <button className="lx-text-button" type="button" onClick={downloadCv}>See my complete experience <span aria-hidden="true">↓</span></button>
            </div>
            <div className="lx-transfer-list">
              {itExperience.map((job, index) => (
                <article className="lx-transfer-role lx-reveal" key={`${job.company}-${job.role}`} style={{ '--lx-delay': `${Math.min(index, 4) * 75}ms` }}>
                  <span className="lx-transfer-index">{String(index + 1).padStart(2, '0')}</span>
                  <div><h3>{job.role}</h3><p className="lx-transfer-company">{job.company}<span>{job.dates}</span></p><p className="lx-transfer-description">{job.text}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="lx-contact">
          <div className="lx-contact-inner lx-reveal">
            <p className="lx-overline">LOOKING FOR A GUEST-FIRST PROFESSIONAL?</p>
            <h2>Let’s create stays<br />worth <em>remembering.</em></h2>
            <p className="lx-contact-copy">I’m enthusiastic about bringing my hotel experience and relationship-first approach to a hospitality sales team. I’d love to hear what your guests need next.</p>
            <div className="lx-contact-actions">
              <a className="lx-button lx-button-cream" href={whatsappLink} target="_blank" rel="noopener noreferrer">Message me on WhatsApp <span aria-hidden="true">↗</span></a>
              <a className="lx-contact-link" href={linkedInLink} target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
              <button className="lx-contact-link" type="button" onClick={downloadCv}>Download CV <span aria-hidden="true">↓</span></button>
            </div>
          </div>
          <div className="lx-contact-watermark" aria-hidden="true">KD</div>
        </section>
      </div>

      <footer className="lx-footer">
        <a className="lx-brand" href="#top"><LuxeMark /><span className="lx-brand-text"><span className="lx-brand-name">KAUSHIK DAS</span><small>HOSPITALITY · GUEST EXPERIENCE</small></span></a>
        <span>Attentive service. Thoughtful experiences.</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}

export default LuxePage;
