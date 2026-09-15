import { useEffect, useRef, useState } from 'react';

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwLnwb0G1HcwWBbk7NLFdVlcWTyyulxCadTzLbcc-zjwjfoTjowgaPrC6zAhrjjVaH7Uw/exec';
const CHAT_API_URL = `${import.meta.env.VITE_API_BASE_URL || ''}/api/chat`;
const ABUSIVE_WORDS = [
  'asshole', 'bastard', 'bitch', 'bullshit', 'cunt', 'dick', 'fuck', 'motherfucker', 'shit', 'slut', 'whore',
  'bhenchod', 'behenchod', 'bhosdi', 'chudai', 'chutiya', 'gaand', 'gandu', 'harami', 'madarchod', 'randi',
  'বাল', 'চোদা', 'চোদাচুদি', 'চোদন', 'চুত', 'চুতিয়া', 'হারামি', 'খানকি', 'মাদারচোদ', 'শুয়োর',
];

const containsAbusiveLanguage = (text) => {
  const normalizedText = text.toLocaleLowerCase().replace(/[^\p{L}\p{M}\p{N}]+/gu, ' ');
  return ABUSIVE_WORDS.some((word) => normalizedText.split(' ').includes(word));
};

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('skills');
  const [scrolled, setScrolled] = useState(false);
  const [showBackTop, setShowBackTop] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', content: 'Hi, I\'m Kaushik\'s portfolio assistant. Ask me about his experience, skills, or projects.' },
  ]);
  const [formState, setFormState] = useState('idle');
  const [message, setMessage] = useState('');
  const formRef = useRef(null);
  const hiddenFrameRef = useRef(null);
  const submittedAtRef = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const isScrolled = window.scrollY > 40;
      setScrolled(isScrolled);
      setShowBackTop(isScrolled);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!chatOpen) return undefined;
    const closeOnOutsideClick = (event) => {
      if (!event.target.closest('.chatbot-container, .chatbot-btn')) setChatOpen(false);
    };
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setChatOpen(false);
    };
    document.addEventListener('pointerdown', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [chatOpen]);

  useEffect(() => {
    const revealEls = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      revealEls.forEach((el) => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    script.async = true;
    document.head.appendChild(script);
    let resolveReady;
    const ready = new Promise((resolve) => { resolveReady = resolve; });
    const previousReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => { previousReady?.(); resolveReady(); };
    const frames = Array.from(document.querySelectorAll('.yt-frame'));
    const cleanups = frames.map((frame, idx) => {
      const handleClick = async () => {
        const id = frame.dataset.yt;
        const playerId = `yt-player-${idx}`;
        frame.innerHTML = `<div id="${playerId}" style="width:100%;height:100%;"></div>`;
        await ready;
        if (!window.YT?.Player) return;
        new window.YT.Player(playerId, {
          videoId: id,
          playerVars: { autoplay: 1, rel: 0 },
          events: {
            onError: () => {
              frame.innerHTML = `<div class="yt-error"><i class="fa-solid fa-triangle-exclamation"></i><p>This video can't be played here — the owner may have restricted playback on this site.</p><a href="https://www.youtube.com/watch?v=${id}" target="_blank" rel="noopener" class="btn btn-primary btn-sm"><span>Watch on YouTube <i class="fa-solid fa-arrow-up-right-from-square"></i></span></a></div>`;
            }
          }
        });
      };
      frame.addEventListener('click', handleClick, { once: true });
      return () => frame.removeEventListener('click', handleClick);
    });
    return () => {
      cleanups.forEach((cleanup) => cleanup());
      if (document.head.contains(script)) document.head.removeChild(script);
      window.onYouTubeIframeAPIReady = previousReady;
    };
  }, []);

  useEffect(() => {
    const iframe = hiddenFrameRef.current;
    if (!iframe) return;
    const handleLoad = () => {
      if (!submittedAtRef.current) return;
      setMessage("✅ Message sent successfully! I'll get back to you soon.");
      setFormState('success');
      formRef.current?.reset();
      submittedAtRef.current = 0;
      window.setTimeout(() => setMessage(''), 6000);
    };
    iframe.addEventListener('load', handleLoad);
    return () => iframe.removeEventListener('load', handleLoad);
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const openMenu = () => setMenuOpen(true);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const toggleChat = () => setChatOpen((open) => !open);
  const handleChatSubmit = async (event) => {
    event.preventDefault();
    const trimmedInput = chatInput.trim();
    if (!trimmedInput || chatLoading) return;

    setChatInput('');
    if (containsAbusiveLanguage(trimmedInput)) {
      setChatMessages((messages) => [...messages,
        { role: 'user', content: trimmedInput },
        { role: 'assistant', content: 'Please keep the conversation respectful. Abusive language is not allowed.', error: true },
      ]);
      return;
    }
    setChatMessages((messages) => [...messages, { role: 'user', content: trimmedInput }]);
    setChatLoading(true);

    try {
      const response = await fetch(CHAT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmedInput }),
      });
      const responseText = await response.text();
      let data;
      try {
        data = JSON.parse(responseText);
      } catch {
        throw new Error(response.ok
          ? 'The chatbot returned an invalid response. Please try again shortly.'
          : `The chatbot service returned an unexpected response (${response.status}).`);
      }
      if (!response.ok) throw new Error(data.detail || 'The chatbot is temporarily unavailable.');
      setChatMessages((messages) => [...messages, {
        role: 'assistant',
        content: data.answer,
        citations: data.citations,
      }]);
    } catch (error) {
      setChatMessages((messages) => [...messages, {
        role: 'assistant',
        content: error.name === 'TypeError' ? 'The assistant is temporarily offline. Please try again in a moment.' : (error.message || 'I could not reach the chatbot right now. Please try again shortly.'),
        error: true,
      }]);
    } finally {
      setChatLoading(false);
    }
  };
  const handleSubmit = (event) => {
    if (!navigator.onLine) {
      event.preventDefault();
      setMessage('⚠️ You appear to be offline. Please check your connection and try again.');
      return;
    }
    submittedAtRef.current = Date.now();
    setFormState('sending');
  };

  return (
    <>
<div className="grain"></div>
<div className="orb orb-1"></div>
<div className="orb orb-2"></div>
<div className="orb orb-3"></div>

{/* ===================== HEADER ===================== */}
<header id="siteHeader" className={scrolled ? "scrolled" : ""}>
  <div className="container">
    <nav>
      <a href="#" className="logo">Kaushik <span>Das</span></a>
      <ul className={`nav-links${menuOpen ? " open" : ""}`} id="navLinks">
        <li><a href="#about" onClick={closeMenu}>About</a></li>
        <li><a href="#workflow" onClick={closeMenu}>Workflow</a></li>
        <li><a href="#projects" onClick={closeMenu}>Projects</a></li>
        <li><a href="#mlwork" onClick={closeMenu}>ML Work</a></li>
        <li><a href="#contact" onClick={closeMenu}>Contact</a></li>
      </ul>
      <div className="nav-cta">
        <a href="images/cv_kaushik_pm.pdf" download className="btn btn-primary btn-sm"><span><i className="fa-solid fa-download"></i> Download CV</span></a>
        <i className="fa-solid fa-bars burger" onClick={openMenu}></i>
      </div>
    </nav>
  </div>
</header>

{/* ===================== HERO ===================== */}
<section className="hero container">
  <div className="hero-text reveal in">
    <div className="eyebrow"><span className="dot-pulse"></span> OPEN TO NEW PROJECTS</div>
    <h1>Product <span className="grad">Manager</span></h1>
    <p className="hero-sub">Engineering Leader &amp; AI-Augmented Delivery Specialist</p>
    <p className="lead">I'm <b>Kaushik Das</b> — turning complex products into shipped, on-time results, blending Agile delivery with Claude, ChatGPT and other AI tools to plan faster and ship smarter.</p>

    <div className="hero-stats">
      <div><strong>12+</strong><small>Years</small></div>
      <div><strong>15</strong><small>Devs led</small></div>
      <div><strong>$2M+</strong><small>Budgets</small></div>
    </div>

    <div className="hero-ctas">
      <a href="#projects" className="btn btn-primary"><span>View My Work <i className="fa-solid fa-arrow-right"></i></span></a>
      <a href="tel:+918436327900" className="btn btn-ghost"><i className="fa-solid fa-phone"></i> Call Now</a>
    </div>

    <div className="tool-strip">
      <span className="tool-label">Augmented workflow</span>
      <div className="tool-chips">
        <span className="tool-chip"><i className="fa-solid fa-robot"></i> Claude</span>
        <span className="tool-chip"><i className="fa-solid fa-comment-dots"></i> ChatGPT</span>
        <span className="tool-chip"><i className="fa-solid fa-palette"></i> Midjourney</span>
        <span className="tool-chip"><i className="fa-brands fa-figma"></i> Figma</span>
        <span className="tool-chip"><i className="fa-brands fa-jira"></i> Jira</span>
        <span className="tool-chip"><i className="fa-solid fa-chart-simple"></i> Power BI</span>
      </div>
    </div>
  </div>
  <div className="hero-visual reveal in">
    <div className="hero-frame">
      <img src="images/hero.png" alt="Kaushik Das, Product Manager" />
    </div>
    <div className="float-card fc-1"><span className="ic">🏆</span><div><strong>12+ Years</strong><small>Experience</small></div></div>
    <div className="float-card fc-2"><span className="ic">💼</span><div><strong>$2M+ Budgets</strong><small>Managed</small></div></div>
    <div className="float-card fc-3"><span className="ic">🟢</span><div><strong>Available</strong><small>For new work</small></div></div>
  </div>
</section>

{/* ===================== ABOUT ===================== */}
<section id="about">
  <div className="container">
    <div className="about-grid">
      <div className="about-photo reveal">
        <img src="images/about.jpg" alt="Kaushik Das" />
        <div className="stat-strip">
          <div className="stat-box"><strong>12+</strong><small>Years Exp.</small></div>
          <div className="stat-box"><strong>15</strong><small>Devs Led</small></div>
          <div className="stat-box"><strong>$2M+</strong><small>Budgets</small></div>
        </div>
      </div>
      <div className="about-copy reveal">
        <div className="sec-tag">About Me</div>
        <h2 style={{marginBottom: '18px'}}>Clarity and control, end to end</h2>
        <p className="intro">Product &amp; engineering manager leading Agile teams from roadmap to launch — Jira, Figma, Power BI, data-driven decisions.</p>

        <div className="tabs">
          <button className={`tab-btn${activeTab === "skills" ? " active" : ""}`} data-tab="skills" onClick={() => setActiveTab("skills")}>Skills</button>
          <button className={`tab-btn${activeTab === "experience" ? " active" : ""}`} data-tab="experience" onClick={() => setActiveTab("experience")}>Experience</button>
          <button className={`tab-btn${activeTab === "education" ? " active" : ""}`} data-tab="education" onClick={() => setActiveTab("education")}>Education</button>
          <button className={`tab-btn${activeTab === "certification" ? " active" : ""}`} data-tab="certification" onClick={() => setActiveTab("certification")}>Certifications</button>
          <button className={`tab-btn${activeTab === "ml" ? " active" : ""}`} data-tab="ml" onClick={() => setActiveTab("ml")}>ML Projects</button>
        </div>

        <div className={`tab-panel${activeTab === "skills" ? " active" : ""}`} id="skills">
          <div className="chip-label">Project Management</div>
          <div className="chip-cloud">
            <span className="chip">Agile</span><span className="chip">Scrum</span><span className="chip">Kanban</span>
            <span className="chip">Waterfall</span><span className="chip">Resource Allocation</span><span className="chip">Risk Mitigation</span>
          </div>
          <div className="chip-label">Tools & Platforms</div>
          <div className="chip-cloud">
            <span className="chip">Jira</span><span className="chip">Trello</span><span className="chip">Asana</span>
            <span className="chip">Monday.com</span><span className="chip">Figma</span><span className="chip">Miro</span>
            <span className="chip">GitHub</span><span className="chip">Power BI</span><span className="chip">SAP Ariba</span>
          </div>
          <div className="chip-label">Leadership</div>
          <div className="chip-cloud">
            <span className="chip">Cross-Functional Leadership</span><span className="chip">Stakeholder Comms</span>
            <span className="chip">Data-Driven Decisions</span><span className="chip">Conflict Resolution</span>
          </div>
          <div className="achv-card">
            <div className="medal">🏆</div>
            <div><strong>Collaboration Catalyst Award</strong><p>Received within six months of joining Utah Tech Labs for exceptional performance in project management.</p></div>
          </div>
        </div>
        <div className={`tab-panel${activeTab === "experience" ? " active" : ""}`} id="experience">
          <ul className="info-list">
            <li><span className="marker"></span><div><span>Engineering Manager — Utah Tech Labs</span>June 2023 to present, Kolkata. Manages a team of 15 developers across 8 concurrent projects totaling $2M in combined budgets.</div></li>
            <li><span className="marker"></span><div><span>Project Coordinator — iEncode Tech</span>July 2022 to June 2023, Kolkata. Coordinated tasks and client communication to keep delivery aligned with product strategy.</div></li>
            <li><span className="marker"></span><div><span>Project Coordinator — InfluxIQ Tech</span>December 2020 to July 2022, Kalyani. Managed project and business development activities.</div></li>
            <li><span className="marker"></span><div><span>Computer Faculty — Chakdaha Model School</span>July 2015 to March 2020, Chakdaha. Designed and delivered interactive computer-science lessons.</div></li>
            <li><span className="marker"></span><div><span>Online Bidder — Kloud Byte</span>March 2014 to July 2016, Kolkata. Managed online bids and client proposals.</div></li>
            <li><span className="marker"></span><div><span>HP Tech Support — Wipro</span>March 2013 to July 2015, Kolkata. Provided troubleshooting for HP hardware and software.</div></li>
          </ul>
        </div>
        <div className={`tab-panel${activeTab === "education" ? " active" : ""}`} id="education">
          <ul className="info-list">
            <li><span className="marker"></span><div><span>B.Com</span>West Bengal State University</div></li>
            <li><span className="marker"></span><div><span>BCA (Appeared)</span>National Institute of Electronics and Information Technology (NIELIT)</div></li>
            <li><span className="marker"></span><div><span>Class 12th</span>Julian Day School, Kalyani</div></li>
          </ul>
        </div>
        <div className={`tab-panel${activeTab === "certification" ? " active" : ""}`} id="certification">
          <ul className="info-list">
            <li><span className="marker"></span><div><span>Power BI for Beginners</span>Great Learning Academy</div></li>
            <li><span className="marker"></span><div><span>ChatGPT Prompt Engineering for Developers</span>Deep Learning AI &amp; Udemy</div></li>
            <li><span className="marker"></span><div><span>Basics of ChatGPT &amp; AI for Software Engineers</span>Online Certification</div></li>
            <li><span className="marker"></span><div><span>Introduction to IoT</span>Online Certification</div></li>
            <li><span className="marker"></span><div><span>Introduction to Machine Learning</span>Great Learning Academy</div></li>
            <li><span className="marker"></span><div><span>AWS for Beginners</span>Great Learning Academy</div></li>
            <li><span className="marker"></span><div><span>Project Management Foundations: Teams</span>PMI® Registered Education Provider</div></li>
            <li><span className="marker"></span><div><span>Agile Methodology Virtual Experience Program</span>Issued by Forage (Cognizant USA)</div></li>
          </ul>
        </div>
        <div className={`tab-panel${activeTab === "ml" ? " active" : ""}`} id="ml">
          <ul className="info-list">
            <li><span className="marker"></span><div><span>Applied ML Foundations</span>Studying TensorFlow, Pandas, NumPy, OpenCV, Scikit-Learn, and LLM fundamentals.</div></li>
            <li><span className="marker"></span><div><span>Weather Predictor Model</span>Built using classification, regression, clustering and collaborative filtering for high-accuracy prediction.</div></li>
            <li><span className="marker"></span><div><span>Image Recognition Model</span>Analyzes video content and identifies objects for surveillance, tracking and content analysis.</div></li>
            <li><span className="marker"></span><div><span>Profanity Checker</span>Extracts text from images and flags sensitive content automatically.</div></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>

{/* ===================== WORKFLOW ===================== */}
<section id="workflow">
  <div className="container">
    <div className="sec-head reveal">
      <div className="sec-tag">My Workflow</div>
      <h2>Three phases. Zero surprises.</h2>
      <p>A consistent delivery rhythm that keeps every stakeholder aligned from kickoff to launch.</p>
    </div>
    <div className="flow-grid">
      <div className="flow-card reveal">
        <div className="flow-step">PHASE 01</div>
        <div className="ic-wrap"><i className="fa-solid fa-pen-to-square"></i></div>
        <h3>Plan</h3>
        <p>Define objectives, scope and the resources needed to get there.</p>
        <a href="#contact">Learn more <i className="fa-solid fa-arrow-right"></i></a>
      </div>
      <div className="flow-card reveal">
        <div className="flow-step">PHASE 02</div>
        <div className="ic-wrap"><i className="fa-solid fa-laptop-code"></i></div>
        <h3>Execute</h3>
        <p>Phase the work, schedule tasks, and keep delivery on track.</p>
        <a href="#contact">Learn more <i className="fa-solid fa-arrow-right"></i></a>
      </div>
      <div className="flow-card reveal">
        <div className="flow-step">PHASE 03</div>
        <div className="ic-wrap"><i className="fa-solid fa-face-smile"></i></div>
        <h3>Deliver</h3>
        <p>Coordinate teams to land the result on time and on budget.</p>
        <a href="#contact">Learn more <i className="fa-solid fa-arrow-right"></i></a>
      </div>
    </div>
  </div>
</section>

{/* ===================== PROJECTS ===================== */}
<section id="projects">
  <div className="container">
    <div className="sec-head reveal">
      <div className="sec-tag">Portfolio</div>
      <h2>My Work</h2>
      <p>Products and platforms I've helped plan, build and ship.</p>
    </div>
    <div className="work-grid">

      <div className="work-card reveal">
        <img src="images/work-0.jpg" alt="Farmers Market Online" />
        <div className="work-layer">
          <h3>Farmers Market Online</h3>
          <p>Interactive platform for farmers and customers.</p>
          <a className="go" href="#"><i className="fa-solid fa-arrow-up-right-from-square"></i></a>
        </div>
      </div>

      <div className="work-card reveal">
        <img src="images/work-1.jpg" alt="Chase the Zen" />
        <div className="work-layer">
          <h3>Chase the Zen</h3>
          <p>A mindful running app with dynamic audio playback.</p>
          <a className="go" href="#"><i className="fa-solid fa-arrow-up-right-from-square"></i></a>
        </div>
      </div>

      <div className="work-card reveal">
        <img src="images/work-2.jpg" alt="Dream Crazy" />
        <div className="work-layer">
          <h3>Dream Crazy</h3>
          <p>Facilitates users building new habits and maintaining the perfect daily routine.</p>
          <a className="go" href="https://dreamcrazy.app/" target="_blank"><i className="fa-solid fa-arrow-up-right-from-square"></i></a>
        </div>
      </div>

      <div className="work-card reveal">
        <img src="images/work-3.jpg" alt="Inspection-360" />
        <div className="work-layer">
          <h3>Inspection-360</h3>
          <p>Property management platform for owners, renters & maintenance teams.</p>
          <a className="go" href="https://www.360inspectionservicesllc.com/" target="_blank"><i className="fa-solid fa-arrow-up-right-from-square"></i></a>
        </div>
      </div>

      <div className="work-card reveal">
        <img src="images/work-4.jpg" alt="RM-Fantasy" />
        <div className="work-layer">
          <h3>RM-Fantasy</h3>
          <p>Motocross fantasy game platform.</p>
          <a className="go" href="https://www.rmfantasysmx.com/" target="_blank"><i className="fa-solid fa-arrow-up-right-from-square"></i></a>
        </div>
      </div>

      <div className="work-card reveal">
        <img src="images/work-5.jpg" alt="Four Stripes" />
        <div className="work-layer">
          <h3>Four Stripes</h3>
          <p>Interior decoration project management tool.</p>
          <a className="go" href="#"><i className="fa-solid fa-arrow-up-right-from-square"></i></a>
        </div>
      </div>

      <div className="work-card reveal">
        <img src="images/work-6.jpg" alt="Echo" />
        <div className="work-layer">
          <h3>Echo</h3>
          <p>Push-to-talk radio app with hands-free voice commands and overlay controls.</p>
          <a className="go" href="#"><i className="fa-solid fa-arrow-up-right-from-square"></i></a>
        </div>
      </div>

      <div className="work-card reveal">
        <img src="images/work-7.jpg" alt="PECE" />
        <div className="work-layer">
          <h3>PECE</h3>
          <p>Complete solution for ANS testing analytics and encounter form preparation.</p>
          <a className="go" href="https://www.peceportal.com/home" target="_blank"><i className="fa-solid fa-arrow-up-right-from-square"></i></a>
        </div>
      </div>

      <div className="work-card reveal">
        <img src="images/work-8.jpg" alt="Bio-Energetics" />
        <div className="work-layer">
          <h3>Bio-Energetics</h3>
          <p>Advanced treatment management platform for drug-free chronic pain relief.</p>
          <a className="go" href="https://quadrant.betoparedes.com/home" target="_blank"><i className="fa-solid fa-arrow-up-right-from-square"></i></a>
        </div>
      </div>

      <div className="work-card reveal">
        <img src="images/work-8.jpg" alt="Grace Medical" />
        <div className="work-layer">
          <h3>Grace Medical</h3>
          <p>A contact point platform connecting patients with medical service providers.</p>
          <a className="go" href="#"><i className="fa-solid fa-arrow-up-right-from-square"></i></a>
        </div>
      </div>

      <div className="work-card reveal">
        <img src="images/work-8.jpg" alt="Montessori Sprouts" />
        <div className="work-layer">
          <h3>Montessori Sprouts</h3>
          <p>A student management platform for early-years education.</p>
          <a className="go" href="#"><i className="fa-solid fa-arrow-up-right-from-square"></i></a>
        </div>
      </div>

      <div className="work-card reveal">
        <img src="images/work-8.jpg" alt="Transcendent Pagan Institute" />
        <div className="work-layer">
          <h3>Transcendent Pagan Institute</h3>
          <p>A blended mystery school combining online and in-person learning.</p>
          <a className="go" href="#"><i className="fa-solid fa-arrow-up-right-from-square"></i></a>
        </div>
      </div>

    </div>
    <div className="see-more reveal"><a href="#" className="btn btn-ghost">See more</a></div>
  </div>
</section>

{/* ===================== ML / VIDEOS ===================== */}
<section id="mlwork">
  <div className="container">
    <div className="sec-head reveal">
      <div className="sec-tag">ML Work</div>
      <h2>Transforming Ideas with ML</h2>
      <p>A few demos from applied machine-learning experiments and side projects.</p>
    </div>
    <div className="video-grid">
      <div className="video-card reveal">
        <div className="frame yt-frame" data-yt="HXpR7H2gY6I">
          <img className="yt-thumb" src="https://img.youtube.com/vi/HXpR7H2gY6I/hqdefault.jpg" alt="ML Work Demo 1 thumbnail" loading="lazy" />
          <button className="yt-play" aria-label="Play video">▶</button>
        </div>
        <a className="yt-fallback" href="https://www.youtube.com/watch?v=HXpR7H2gY6I" target="_blank" rel="noopener">Watch on YouTube <i className="fa-solid fa-arrow-up-right-from-square"></i></a>
      </div>
      <div className="video-card reveal">
        <div className="frame yt-frame" data-yt="AGElkLJqTvo">
          <img className="yt-thumb" src="https://img.youtube.com/vi/AGElkLJqTvo/hqdefault.jpg" alt="ML Work Demo 2 thumbnail" loading="lazy" />
          <button className="yt-play" aria-label="Play video">▶</button>
        </div>
        <a className="yt-fallback" href="https://www.youtube.com/watch?v=AGElkLJqTvo" target="_blank" rel="noopener">Watch on YouTube <i className="fa-solid fa-arrow-up-right-from-square"></i></a>
      </div>
      <div className="video-card reveal">
        <div className="frame yt-frame" data-yt="9fwzT9Wza3o">
          <img className="yt-thumb" src="https://img.youtube.com/vi/9fwzT9Wza3o/hqdefault.jpg" alt="ML Work Demo 3 thumbnail" loading="lazy" />
          <button className="yt-play" aria-label="Play video">▶</button>
        </div>
        <a className="yt-fallback" href="https://www.youtube.com/watch?v=9fwzT9Wza3o" target="_blank" rel="noopener">Watch on YouTube <i className="fa-solid fa-arrow-up-right-from-square"></i></a>
      </div>
    </div>
  </div>
</section>

{/* ===================== CONTACT ===================== */}
<section id="contact">
  <div className="container">
    <div className="sec-head reveal">
      <div className="sec-tag">Get In Touch</div>
      <h2>Let's build something great</h2>
      <p>Open to new project management and engineering leadership roles — reach out any time.</p>
    </div>
    <div className="contact-grid">
      <div className="contact-card reveal">
        <h2>Contact Me</h2>
        <p>I usually respond within a day. For anything urgent, call directly.</p>
        <div className="contact-row"><span className="ic"><i className="fa-solid fa-paper-plane"></i></span><a href="mailto:connect@thekaushikdas.com">connect@thekaushikdas.com</a></div>
        <div className="contact-row"><span className="ic"><i className="fa-solid fa-phone"></i></span><a href="tel:+918436327900">+91 8436327900</a></div>
        <div className="social-icons">
          <a href="https://www.linkedin.com/in/techgemz" target="_blank"><i className="fa-brands fa-linkedin"></i></a>
          <a href="https://wa.me/+918436327900" target="_blank"><i className="fa-brands fa-whatsapp"></i></a>
        </div>
        <div className="cta-row">
          <a href="images/cv_kaushik_pm.pdf" download className="btn btn-primary"><span><i className="fa-solid fa-download"></i> Download CV</span></a>
          <a href="tel:+918436327900" className="btn btn-ghost"><i className="fa-solid fa-phone"></i> Call Now</a>
        </div>
      </div>

      <div className="form-card reveal">
        <h3>Send a message</h3>
        <form name="submit-to-google-sheet" id="contactForm" target="hidden_iframe" action={SCRIPT_URL} method="POST" ref={formRef} onSubmit={handleSubmit}>
          <div className="field"><label>Your Name</label><input type="text" name="Name" placeholder="Jane Doe" required /></div>
          <div className="field"><label>Your Email</label><input type="email" name="Email" placeholder="jane@email.com" required /></div>
          <div className="field"><label>Your Message</label><textarea name="Message" rows="5" placeholder="Tell me about your project..."></textarea></div>
          <button type="submit" className="btn btn-primary" disabled={formState === "sending"}><span>{formState === "sending" ? <>Sending... <i className="fa-solid fa-spinner fa-spin"></i></> : <>Submit Message <i className="fa-solid fa-paper-plane"></i></>}</span></button>
        </form>
        <iframe name="hidden_iframe" id="hidden_iframe" style={{display: 'none'}} ref={hiddenFrameRef} title="Form submission target" />
        <span id="msg">{message}</span>
      </div>
    </div>
  </div>

  <footer>
    <p>© <span id="year">{new Date().getFullYear()}</span> <span>Kaushik Das</span> — All Rights Reserved</p>
  </footer>
</section>

{/* Back to top */}
<div className={`back-top${showBackTop ? " show" : ""}`} id="backTop" onClick={scrollToTop}><i className="fa-solid fa-arrow-up"></i></div>

{/* Floating Chatbot */}
<button className="chatbot-btn" onClick={toggleChat} aria-label={chatOpen ? 'Close chatbot' : 'Open chatbot'} aria-expanded={chatOpen}>
  <i className={`fa-solid ${chatOpen ? 'fa-xmark' : 'fa-comment-dots'}`}></i>
</button>
{chatOpen && <section className="chatbot-container" id="chatbot" aria-label="Portfolio chatbot">
  <div className="chatbot-header">
    <div><span className="chatbot-status"></span><strong>Ask Kaushik</strong><small>Portfolio assistant</small></div>
    <button className="close-btn" onClick={toggleChat} aria-label="Close chatbot"><i className="fa-solid fa-xmark"></i></button>
  </div>
  <div className="chatbot-messages" aria-live="polite">
    {chatMessages.map((chatMessage, index) => <div className={`chat-message ${chatMessage.role}${chatMessage.error ? ' error' : ''}`} key={`${chatMessage.role}-${index}`}>
      <p>{chatMessage.content}</p>
      {chatMessage.citations?.length > 0 && <div className="chat-citations">
        <span>Sources</span>
        {chatMessage.citations.map((citation, citationIndex) => <small key={`${citation.file_name || 'source'}-${citationIndex}`}>
          {citation.file_name || citation.source || 'Knowledge base'}{citation.page_number ? ` · page ${citation.page_number}` : ''}
        </small>)}
      </div>}
    </div>)}
    {chatLoading && <div className="chat-message assistant typing"><span></span><span></span><span></span></div>}
  </div>
  <form className="chatbot-form" onSubmit={handleChatSubmit}>
    <input value={chatInput} onChange={(event) => setChatInput(event.target.value)} placeholder="Ask about experience or projects" aria-label="Ask the chatbot" maxLength="4000" disabled={chatLoading} />
    <button type="submit" aria-label="Send message" disabled={chatLoading || !chatInput.trim()}><i className="fa-solid fa-arrow-up"></i></button>
  </form>
</section>}
    </>
  );
}
