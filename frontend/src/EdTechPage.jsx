import { useEffect, useState } from 'react';
import { pptxToHtml } from '@jvmr/pptx-to-html';
import aboutPortrait from '../images/about.jpg';
import cvDocument from '../images/cv_kaushik_pm.pdf';
import './edtech.css';

const teachingVideos = [
  'QP3drkCvryw',
  'oKzqZfa0apQ',
  'ld5sOAh6i-U',
  'FlM1cm-iRh4',
  '66e8_LhwLB4',
  'KIV8LYQTB58',
  'l8vknu678OA',
];

const teachingPresentations = [
  {
    title: 'Types of Computers',
    subtitle: 'Meet the four computer friends',
    file: '/demo/Types_of_Computers.pptx',
  },
  {
    title: 'Parts of a Computer',
    subtitle: 'Get to know the essential parts',
    file: '/demo/Parts_of_a_Computer.pptx',
  },
  {
    title: 'Hardware and Software',
    subtitle: 'What can we touch, and what can’t we?',
    file: '/demo/Hardware_and_Software.pptx',
  },
  {
    title: 'Operating Systems',
    subtitle: 'Explore Windows, Linux, and the OS',
    file: '/demo/Operating_Systems.pptx',
  },
  {
    title: 'The Internet',
    subtitle: 'Discover how the world connects',
    file: '/demo/The_Internet.pptx',
  },
];

const teachingPrinciples = [
  {
    number: '01',
    title: 'Make the concept visible',
    description: 'Break a topic into clear steps, connect it to a practical example, and build understanding before moving on.',
  },
  {
    number: '02',
    title: 'Learn by doing',
    description: 'Give learners room to practise, make mistakes, ask questions, and gain confidence through guided application.',
  },
  {
    number: '03',
    title: 'Meet learners where they are',
    description: 'Use patient explanations and a supportive classroom approach so students can progress at a steady pace.',
  },
];

const futureReadyPrinciples = [
  {
    number: '01',
    title: 'Academic insight, backed by IT',
    description: 'Bring academic faculty experience together with hands-on IT, technology, and project work to make learning practical and relevant.',
  },
  {
    number: '02',
    title: 'A culture of innovation',
    description: 'Make room for creativity, experimentation, and distinctive student-led projects across the school.',
  },
  {
    number: '03',
    title: 'Learning by doing',
    description: 'Connect classroom concepts to real-world IT applications, projects, and problem-solving.',
  },
  {
    number: '04',
    title: 'AI and agentic technology',
    description: 'Introduce AI, Generative AI, Agentic AI, large language models, and the emerging tools shaping the future.',
  },
  {
    number: '05',
    title: 'IoT and smart projects',
    description: 'Use IoT experience to explore automation, sensors, and smart technology through hands-on projects.',
  },
  {
    number: '06',
    title: 'Technical and human skills',
    description: 'Develop communication, teamwork, presentation, leadership, and problem-solving alongside academic skills.',
  },
  {
    number: '07',
    title: 'Project management for students',
    description: 'Teach planning, execution, collaboration, deadlines, and how to deliver a project from idea to outcome.',
  },
  {
    number: '08',
    title: 'A bridge to industry',
    description: 'Connect school learning with technology-industry needs and give students early exposure to future careers.',
  },
];

function EdTechPage() {
  const [activePresentation, setActivePresentation] = useState(teachingPresentations[0]);
  const [presentationSlides, setPresentationSlides] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [presentationLoading, setPresentationLoading] = useState(true);
  const [presentationError, setPresentationError] = useState('');

  useEffect(() => {
    document.title = 'Teaching with Tech | Kaushik Das — Computer Faculty';
    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.content = 'Computer education experience and teaching portfolio of Kaushik Das, including classroom presentations and videos.';
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function loadPresentation() {
      setPresentationLoading(true);
      setPresentationError('');
      setPresentationSlides([]);
      setActiveSlide(0);

      try {
        const response = await fetch(activePresentation.file, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Could not load presentation (${response.status}).`);
        }

        const slides = await pptxToHtml(await response.arrayBuffer(), {
          width: 960,
          height: 540,
          scaleToFit: true,
          letterbox: true,
        });

        if (!controller.signal.aborted) {
          setPresentationSlides(slides);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          setPresentationError(error instanceof Error ? error.message : 'The presentation could not be displayed.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setPresentationLoading(false);
        }
      }
    }

    loadPresentation();
    return () => controller.abort();
  }, [activePresentation]);

  return (
    <div className="edtech-page">
      <a className="edtech-skip-link" href="#edtech-main">Skip to content</a>
      <header className="edtech-header">
        <div className="edtech-header-inner">
          <a className="edtech-brand" href="/" aria-label="Teaching with Tech — Kaushik Das home">Teaching <span>with Tech</span></a>
          <nav className="edtech-nav" aria-label="EdTech page navigation">
            <a href="/">Portfolio home</a>
            <a href="#experience">Teaching experience</a>
            <a href="#presentations">Classroom slides</a>
            <a className="edtech-nav-cta" href="#videos">Watch lessons <span aria-hidden="true">↘</span></a>
          </nav>
        </div>
      </header>

      <main id="edtech-main">
        <section className="edtech-hero">
          <div className="edtech-hero-inner">
            <div className="edtech-hero-copy">
              <div className="edtech-eyebrow"><span /> COMPUTER EDUCATION · TEACHING PORTFOLIO</div>
              <h1>Technology makes learning <em>limitless</em></h1>
              <p className="edtech-hero-lead">I’m Kaushik Das, a computer educator who helps learners move from curiosity to confident, practical understanding.</p>
              <div className="edtech-hero-actions">
                <a className="edtech-button edtech-button-primary" href="#videos">Explore teaching videos <span aria-hidden="true">↓</span></a>
                <a className="edtech-button edtech-button-quiet" href={cvDocument} target="_blank" rel="noreferrer">View my CV <span aria-hidden="true">↗</span></a>
              </div>
              <div className="edtech-proof-line"><strong>5 years</strong><span>Computer Faculty</span><i aria-hidden="true" /><span>Chakdaha Model School</span></div>
            </div>
            <div className="edtech-hero-visual">
              <div className="edtech-image-frame">
                <img src={aboutPortrait} alt="Kaushik Das" />
                <div className="edtech-image-caption"><span>EDUCATION, WITH PURPOSE</span><b>Curiosity → capability</b></div>
              </div>
              <div className="edtech-orbit-note"><span className="edtech-orbit-mark" aria-hidden="true">K</span><span>Computer<br />Faculty</span></div>
              <div className="edtech-image-index">01 <span>/ 03</span></div>
            </div>
          </div>
          <div className="edtech-hero-baseline" aria-hidden="true"><span>TEACH</span><span>DEMONSTRATE</span><span>EMPOWER</span></div>
        </section>

        <section className="edtech-experience" id="experience" aria-labelledby="experience-heading">
          <div className="edtech-section-heading">
            <div>
              <div className="edtech-kicker">THE CLASSROOM YEARS</div>
              <h2 id="experience-heading">Experience built<br />around the learner.</h2>
            </div>
            <p>Five years in a school setting shaped a simple belief: strong computer education is clear, hands-on, and welcoming to every question.</p>
          </div>
          <article className="edtech-role">
            <div className="edtech-role-date"><span>JUL 2015</span><i aria-hidden="true" /><span>MAR 2020</span></div>
            <div className="edtech-role-main">
              <div className="edtech-role-heading"><div><span className="edtech-kicker">CHAKDAHA · WEST BENGAL</span><h3>Computer Faculty</h3><p>Chakdaha Model School</p></div><strong className="edtech-tenure">05 <span>YEARS</span></strong></div>
              <div className="edtech-role-details">
                <p>Designed and delivered interactive computer-science lessons, helping students build practical familiarity with technology and foundational concepts.</p>
                <div className="edtech-tags"><span>Computer education</span><span>Concept-led lessons</span><span>Guided practice</span></div>
              </div>
            </div>
          </article>
        </section>

        <section className="edtech-approach" aria-labelledby="approach-heading">
          <div className="edtech-approach-intro">
            <div className="edtech-kicker">A PRACTICAL TEACHING APPROACH</div>
            <h2 id="approach-heading">Clarity first.<br /><em>Confidence follows.</em></h2>
            <p>Good teaching is not about making technology feel complicated. It is about giving each learner a clear next step.</p>
          </div>
          <div className="edtech-principles">
            {teachingPrinciples.map((principle) => (
              <article className="edtech-principle" key={principle.number}>
                <span className="edtech-principle-number">{principle.number}</span>
                <div><h3>{principle.title}</h3><p>{principle.description}</p></div>
                <span className="edtech-principle-arrow" aria-hidden="true">↗</span>
              </article>
            ))}
          </div>
        </section>

        <section className="edtech-future" aria-labelledby="future-heading">
          <div className="edtech-future-heading">
            <div className="edtech-kicker">A VISION FOR TOMORROW’S CLASSROOM</div>
            <h2 id="future-heading">How Can I Integrate Technology, Education &amp; Innovation to Create Future-Ready Learning?</h2>
            <p>Connect strong teaching with real technology practice, so students leave school ready to keep learning, creating, and contributing.</p>
          </div>
          <div className="edtech-future-grid">
            {futureReadyPrinciples.map((principle) => (
              <article className="edtech-future-card" key={principle.number}>
                <span className="edtech-future-number">{principle.number}</span>
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="edtech-videos" id="videos" aria-labelledby="videos-heading">
          <div className="edtech-section-heading edtech-video-heading">
            <div><div className="edtech-kicker">TEACHING IN ACTION</div><h2 id="videos-heading">Watch. Learn.<br />Try it yourself.</h2></div>
            <p>A selection of teaching and demonstration videos. Choose a lesson to play here, or open it on YouTube.</p>
          </div>
          <div className="edtech-video-grid">
            {teachingVideos.map((videoId, index) => (
              <article className={`edtech-video-card${index === 0 ? ' edtech-video-featured' : ''}`} key={videoId}>
                <div className="edtech-video-frame">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`}
                    title={`Computer teaching video ${String(index + 1).padStart(2, '0')}`}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
                <div className="edtech-video-meta"><span>LESSON {String(index + 1).padStart(2, '0')}</span><a href={`https://youtu.be/${videoId}`} target="_blank" rel="noreferrer">Open on YouTube <span aria-hidden="true">↗</span></a></div>
              </article>
            ))}
          </div>
        </section>

        <section className="edtech-presentations" id="presentations" aria-labelledby="presentations-heading">
          <div className="edtech-section-heading">
            <div>
              <div className="edtech-kicker">CLASSROOM RESOURCES</div>
              <h2 id="presentations-heading">Computer lessons,<br />ready to explore.</h2>
            </div>
            <p>Browse these classroom presentations in the local slide viewer. Choose a topic, then move through its slides.</p>
          </div>
          <div className="edtech-presentation-layout">
            <div className="edtech-presentation-list" role="group" aria-label="Choose a classroom presentation">
              {teachingPresentations.map((presentation, index) => (
                <button
                  className={`edtech-presentation-choice${activePresentation.file === presentation.file ? ' is-active' : ''}`}
                  type="button"
                  key={presentation.file}
                  aria-pressed={activePresentation.file === presentation.file}
                  onClick={() => setActivePresentation(presentation)}
                >
                  <span className="edtech-presentation-number">{String(index + 1).padStart(2, '0')}</span>
                  <span className="edtech-presentation-label"><strong>{presentation.title}</strong><small>{presentation.subtitle}</small></span>
                  <span className="edtech-presentation-arrow" aria-hidden="true">↗</span>
                </button>
              ))}
            </div>
            <div className="edtech-presentation-panel">
              <div className="edtech-presentation-panel-heading">
                <div><span className="edtech-kicker">NOW VIEWING</span><h3>{activePresentation.title}</h3></div>
                <div className="edtech-presentation-actions">
                  <a href={activePresentation.file} target="_blank" rel="noreferrer">Open file <span aria-hidden="true">↗</span></a>
                  <a href={activePresentation.file} download>Download <span aria-hidden="true">↓</span></a>
                </div>
              </div>
              <div className="edtech-presentation-viewer" aria-live="polite">
                {presentationLoading && <p className="edtech-presentation-status">Loading presentation…</p>}
                {!presentationLoading && presentationError && <p className="edtech-presentation-status edtech-presentation-error" role="alert">{presentationError}</p>}
                {!presentationLoading && !presentationError && presentationSlides.length > 0 && (
                  <>
                    <div className="edtech-rendered-slide" dangerouslySetInnerHTML={{ __html: presentationSlides[activeSlide] }} />
                    <div className="edtech-slide-controls">
                      <button type="button" onClick={() => setActiveSlide((slide) => Math.max(0, slide - 1))} disabled={activeSlide === 0}>← Previous</button>
                      <span>Slide {activeSlide + 1} of {presentationSlides.length}</span>
                      <button type="button" onClick={() => setActiveSlide((slide) => Math.min(presentationSlides.length - 1, slide + 1))} disabled={activeSlide === presentationSlides.length - 1}>Next →</button>
                    </div>
                  </>
                )}
              </div>
              <p className="edtech-presentation-note">Slides are rendered in your browser from the local presentation file.</p>
            </div>
          </div>
        </section>

        <section className="edtech-contact">
          <div><div className="edtech-kicker">READY FOR THE NEXT CLASSROOM</div><h2>Let’s make learning<br />click.</h2></div>
          <div className="edtech-contact-action"><p>For a computer faculty opportunity or an interview conversation, I’d be glad to connect.</p><a className="edtech-button edtech-button-primary" href="https://wa.me/918436327900" target="_blank" rel="noreferrer">Start a conversation <span aria-hidden="true">↗</span></a></div>
        </section>
      </main>

      <footer className="edtech-footer"><a className="edtech-brand" href="/">Kaushik <span>Das</span></a><span>Computer Education · Chakdaha Model School · 2015–2020</span><a href="/">Back to portfolio <span aria-hidden="true">↑</span></a></footer>
    </div>
  );
}

export default EdTechPage;
