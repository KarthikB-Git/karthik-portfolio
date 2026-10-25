import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight, BriefcaseBusiness, Command, FileText, MapPin, MessageCircle, Moon, Play, Sparkles, Sun, X } from 'lucide-react'
import gsap from 'gsap'
import './styles.css'

type Project = {
  number: string
  title: string
  tag: string
  color: string
  description: string
}

type SkillCluster = {
  name: string
  level: string
  description: string
  tools: string[]
  example: string
}

const marqueeItems = ['FULL STACK', 'PRODUCT MINDED', 'HUMAN FIRST']

const skillClusters: SkillCluster[] = [
  { name: 'Frontend product', level: 'Core', description: 'Interfaces that make complex workflows feel direct and usable.', tools: ['Angular', 'TypeScript', 'React', 'Responsive UI'], example: 'Systems, not screens — a planned Angular and .NET product experience.' },
  { name: 'Backend systems', level: 'Core', description: 'The dependable layers behind useful product experiences.', tools: ['.NET', 'REST APIs', 'C#', 'Authentication'], example: 'The first good problem — a full-stack build from research through implementation.' },
  { name: 'Data & workflows', level: 'Growing', description: 'Turning dense information and repetitive processes into clear decisions.', tools: ['SQL Server', 'Data modelling', 'Query design', 'Dashboards'], example: 'Data with a pulse — a SQL-led product exploration in progress.' },
  { name: 'Product thinking', level: 'Always on', description: 'Starting with the problem, the person using it, and the smallest useful version.', tools: ['Research', 'Information architecture', 'Iteration', 'UX writing'], example: 'Every project begins with a real workflow, not a technology checklist.' },
]

const guideOptions = [
  { label: 'Experience', answer: 'I’m a full stack developer focused on Angular, .NET, SQL Server, and product-minded delivery. I bring 2.5 years of experience turning complex work into clearer experiences.', target: 'quick-scan' },
  { label: 'How I work', answer: 'I start by understanding the real workflow, build the smallest version that earns its place, then refine the parts people actually use.', target: 'how-i-work' },
  { label: 'Projects', answer: 'The current portfolio is being built deliberately: each project becomes a proper case study with the problem, decisions, stack, and outcome.', target: 'work' },
  { label: 'Skills', answer: 'My core toolkit spans Angular, .NET, SQL Server, REST APIs, and product thinking—with an emphasis on making systems feel simple.', target: 'skills' },
]

const projects: Project[] = [
  { number: '01', title: 'The first good problem', tag: 'In progress', color: 'blue', description: 'A full-stack product case study currently being shaped from research through implementation.' },
  { number: '02', title: 'Systems, not screens', tag: 'Next build', color: 'lime', description: 'An Angular and .NET experience designed to demonstrate clean information architecture and product thinking.' },
  { number: '03', title: 'Data with a pulse', tag: 'Next build', color: 'paper', description: 'A SQL-led product exploration focused on turning dense workflows into a clear, useful interface.' },
  { number: '04', title: 'Something worth using', tag: 'Next build', color: 'blue', description: 'A practical product made for a real audience, with the details that make it feel considered.' },
  { number: '05', title: 'One wild card', tag: 'Next build', color: 'lime', description: 'A creatively ambitious experiment—because technical work can still have a point of view.' },
]

function App() {
  const root = useRef<HTMLDivElement>(null)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const x = useSpring(cursorX, { damping: 24, stiffness: 360 })
  const y = useSpring(cursorY, { damping: 24, stiffness: 360 })
  const [selected, setSelected] = useState<Project | null>(null)
  const [light, setLight] = useState(false)
  const [activeSkill, setActiveSkill] = useState(skillClusters[0])
  const [guide, setGuide] = useState(guideOptions[0])

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      cursorX.set(event.clientX)
      cursorY.set(event.clientY)
    }
    window.addEventListener('pointermove', onMove)

    const ctx = gsap.context(() => {
      gsap.fromTo('.project-card', { y: 36, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.1, delay: 0.7 })
    }, root)

    return () => {
      window.removeEventListener('pointermove', onMove)
      ctx.revert()
    }
  }, [cursorX, cursorY])

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div className={light ? 'app light' : 'app'} ref={root}>
      <motion.div className="cursor-ring" style={{ x, y }} aria-hidden="true" />
      <motion.div className="cursor-dot" style={{ x: cursorX, y: cursorY }} aria-hidden="true" />
      <div className="noise" aria-hidden="true" />

      <header className="nav">
        <button className="brand" onClick={() => scrollTo('top')} aria-label="Back to top">KB<span>°</span></button>
        <nav aria-label="Primary navigation">
          <button onClick={() => scrollTo('work')}>Work</button>
          <button onClick={() => scrollTo('about')}>About</button>
          <button onClick={() => scrollTo('notes')}>Notes</button>
          <button onClick={() => scrollTo('contact')}>Contact</button>
        </nav>
        <button className="theme-toggle" onClick={() => setLight(!light)} aria-label="Toggle color theme">{light ? <Moon size={15} /> : <Sun size={15} />}</button>
      </header>

      <main id="top">
        <section className="hero section-shell">
          <div className="hero-copy">
            <p className="eyebrow hero-reveal"><span className="signal" /> Chennai, India <span className="slash">/</span> available for the right role</p>
            <h1 aria-label="Karthik B, Full Stack Developer">
              <span className="hero-reveal">KARTHIK</span>
              <span className="hero-reveal offset">B<span className="blue-dot">.</span></span>
            </h1>
            <div className="hero-bottom hero-reveal">
              <p>Full stack developer making useful things with <strong>Angular, .NET & SQL Server.</strong> Equal parts systems thinker and curious maker.</p>
              <button className="circle-cta" onClick={() => scrollTo('work')}><ArrowDownRight size={29} /><span>Explore<br />work</span></button>
            </div>
            <aside className="status-card hero-reveal" aria-label="Availability status">
              <span className="status-live"><i /> Available</span>
              <strong>Open to the<br />right full-time role.</strong>
              <span><MapPin size={12} /> Chennai · Remote</span>
            </aside>
          </div>
          <div className="hero-art hero-reveal" aria-label="Abstract Chennai-inspired collage">
            <div className="moon" />
            <div className="blue-arch" />
            <div className="grid-plane" />
            <div className="scribble one">∞</div><div className="scribble two">⌁</div>
            <div className="art-label">CHENNAI<br />13.0827° N</div>
            {/* <div className="scan-card"><span>SYS_01</span><i /><i /><i /></div> */}
          </div>
          <div className="side-index"><span>01</span><span>05</span><i /></div>
        </section>

        <section className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {[0, 1].map((copy) => (
              <div className="marquee-group" key={copy}>
                {}
                {[...Array(3)].flatMap((_, r) =>
                  marqueeItems.map((text) => (
                    <span className="marquee-item" key={`${r}-${text}`}>
                      {text} <b>✳</b>
                    </span>
                  ))
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="portfolio-guide section-shell" aria-labelledby="guide-title">
          <div className="guide-intro"><p className="eyebrow">Portfolio guide</p><h2 id="guide-title">Start where<br /><em>you’re curious.</em></h2><p>A quick, no-typing-needed way to get the context you came for.</p></div>
          <div className="guide-console">
            <div className="guide-console-bar"><span><Sparkles size={14} /> KB / GUIDE</span><span>ONLINE</span></div>
            <p className="guide-response">{guide.answer}</p>
            <div className="guide-options">
              {guideOptions.map((option) =>
                <button key={option.label}
                  className={guide.label === option.label ? 'active' : ''}
                  onClick={() => { setGuide(option); scrollTo(option.target) }}>
                  {option.label}
                  <ArrowDownRight size={14} />
                </button>)}
            </div>
          </div>
        </section>

        <section id="work" className="work section-shell">
          <div className="section-heading"><p className="eyebrow">Selected work</p><h2>Built with intent.<br /><em>More coming soon.</em></h2><p>Drag the cards. Each one becomes a proper case study as we build it.</p></div>
          <div className="project-rail">
            {projects.map((project) => (
              <motion.article key={project.number} drag dragConstraints={{ left: -55, right: 55, top: -16, bottom: 16 }} dragElastic={0.14} className={`project-card ${project.color}`} onClick={() => setSelected(project)} whileHover={{ y: -10, rotate: project.number === '02' ? -2 : 2 }}>
                <div className="project-top"><span>{project.number}</span><span>{project.tag}</span></div>
                <div className="project-visual"><div className="card-orb" /><div className="card-window" /><div className="card-scratch" /></div>
                <div className="project-meta"><h3>{project.title}</h3><button aria-label={`Open ${project.title}`}><ArrowUpRight size={18} /></button></div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="about" className="about section-shell">
          <div className="big-number">02</div>
          <div className="about-copy"><p className="eyebrow">The human bit</p><h2>2.5 years of turning complex work into <span>clearer experiences.</span></h2><p>I’m a full stack developer with a healthy obsession for how a product feels—not only how it functions. I bring research, product sense, and a willingness to learn the unfamiliar.</p><div className="chips"><span>Angular</span><span>.NET</span><span>SQL Server</span><span>REST APIs</span><span>Product thinking</span></div></div>
          <div className="about-sticker"><Command size={28} /><span>keep<br />exploring</span></div>
        </section>

        <section id="skills" className="skills section-shell" aria-labelledby="skills-title">
          <div className="skills-heading"><p className="eyebrow">Skill constellation</p><h2 id="skills-title">The tools behind<br /><em>the thinking.</em></h2><p>Choose a cluster to see where it shows up in the work.</p></div>
          <div className="skill-layout">
            <div className="skill-list">{skillClusters.map((cluster, index) => <button key={cluster.name} onClick={() => setActiveSkill(cluster)} className={activeSkill.name === cluster.name ? 'active' : ''}><span>0{index + 1}</span><strong>{cluster.name}</strong><em>{cluster.level}</em></button>)}</div>
            <article className="skill-detail">
              <p className="eyebrow">Focused cluster / {activeSkill.level}</p><h3>{activeSkill.name}</h3><p>{activeSkill.description}</p>
              <div className="tool-tags">{activeSkill.tools.map((tool) => <span key={tool}>{tool}</span>)}</div>
              <div className="skill-example"><span>RELATED WORK</span><p>{activeSkill.example}</p></div>
            </article>
          </div>
        </section>

        <section id="how-i-work" className="process section-shell" aria-labelledby="process-title">
          <div className="process-intro"><p className="eyebrow">How I work</p><h2 id="process-title">Useful before<br /><em>impressive.</em></h2></div>
          <div className="process-steps">
            <article><span>01 / Understand</span><h3>Find the real problem.</h3><p>I get close to the workflow, the friction, and the people using it before deciding what needs to be built.</p></article>
            <article><span>02 / Build</span><h3>Make the first useful version.</h3><p>I shape the flow, connect the systems, and keep the implementation focused on the job it needs to do.</p></article>
            <article><span>03 / Refine</span><h3>Learn from the edges.</h3><p>I test the details, clarify the confusing parts, and improve what real use reveals—not just what looked good on day one.</p></article>
          </div>
        </section>

        <section id="quick-scan" className="quick-scan section-shell" aria-labelledby="scan-title">
          <div className="scan-heading">
            <p className="eyebrow">Recruiter quick scan</p>
            <h2 id="scan-title">The direct<br /><em>version.</em></h2>
            <p>Dates, focus, and useful links—without the scrolling scavenger hunt.</p>
          </div>
          <div className="scan-table">
            <div><span>Role</span><strong>Full stack developer</strong><p>Product-minded developer building clear, useful software.</p></div>
            <div><span>Experience</span><strong>2.5 years</strong><p>Turning complex work into clearer product experiences.</p></div>
            <div><span>Core stack</span><strong>Angular · .NET · SQL Server</strong><p>Also TypeScript, REST APIs, and responsive UI.</p></div>
            <div><span>Looking for</span><strong>The right full-time role</strong><p>Chennai-based, open to remote opportunities.</p></div>
          </div>
          <div className="scan-links">
            <a href="mailto:acecoderkarty@gmail.com?subject=Karthik%20B%20-%20Role%20opportunity">
              <BriefcaseBusiness size={16} />
              Discuss a role</a>
            <a href="#work" onClick={(event) => { event.preventDefault(); scrollTo('work') }}>
              <FileText size={16} />
              View projects
            </a>
          </div>
        </section>

        <section id="notes" className="notes section-shell">
          <p className="eyebrow">Now / uses</p>
          <div className="notes-grid">
            <article><span>01</span><h3>Currently building</h3><p>Five work-worthy projects, one deliberately at a time.</p></article>
            <article><span>02</span><h3>Off-screen</h3><p>Music, books, travel plans, and games that keep the curiosity supplied.</p></article>
            <article className="play-card"><Play size={18} fill="currentColor" /><h3>Playlist energy</h3><p>Warm, weird, and a little louder than necessary.</p></article>
          </div>
        </section>

        <section id="contact" className="contact section-shell">
          <div className="contact-layout">
            <div className="contact-title">
          <p className="eyebrow">Let’s make something useful</p>
              <h2><span className="contact-question">Got a difficult</span><br /><span>problem?</span></h2>
            </div>
            <div className="contact-actions">
              <a href="mailto:acecoderkarty@gmail.com" className="email-link">acecoderkarty@gmail.com <ArrowUpRight size={23} /></a>
              <div className="contact-choices">
                <a href="mailto:acecoderkarty@gmail.com?subject=Karthik%20B%20-%20Full-time%20role">
                  <BriefcaseBusiness size={17} />
                  Discuss a full-time role
                  <ArrowUpRight size={15} />
                </a>
                <a href="mailto:acecoderkarty@gmail.com?subject=Karthik%20B%20-%20Product%20collaboration">
                  <MessageCircle size={17} />
                  Collaborate on a product
                  <ArrowUpRight size={15} />
                </a>
                <a href="mailto:acecoderkarty@gmail.com?subject=Karthik%20B%20-%20Portfolio%20question">
                  <Sparkles size={17} />
                  Ask about a project
                  <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <span>© {new Date().getFullYear()} Karthik B</span>
        <span>Designed and built from scratch, not templates.</span>
        <span>Chennai, IN</span>
      </footer>

      <AnimatePresence>{selected && <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)}><motion.div className="project-modal" initial={{ scale: 0.92, y: 24 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, y: 24 }} onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setSelected(null)}><X size={20} /></button><span className="eyebrow">{selected.number} — {selected.tag}</span><h2>{selected.title}</h2><p>{selected.description}</p><div className="modal-line" /><small>This is the shell. The real case study arrives after we build this project.</small></motion.div></motion.div>}</AnimatePresence>
    </div>
  )
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>)
