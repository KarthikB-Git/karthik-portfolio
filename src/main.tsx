import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight, Command, Moon, Play, Sun, X } from 'lucide-react'
import gsap from 'gsap'
import Lenis from '@studio-freight/lenis'
import './styles.css'

type Project = {
  number: string
  title: string
  tag: string
  color: string
  description: string
}

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

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      cursorX.set(event.clientX)
      cursorY.set(event.clientY)
    }
    window.addEventListener('pointermove', onMove)

    const lenis = new Lenis({ duration: 1.05, smoothWheel: true })
    let frame = 0
    const raf = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-reveal', { y: 72, opacity: 0, rotate: 1 }, { y: 0, opacity: 1, rotate: 0, duration: 1.1, ease: 'power4.out', stagger: 0.12 })
      gsap.fromTo('.project-card', { y: 36, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.1, delay: 0.7 })
    }, root)

    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(frame)
      lenis.destroy()
      ctx.revert()
    }
  }, [cursorX, cursorY])

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div className={light ? 'app light' : 'app'} ref={root}>
      <motion.div className="cursor" style={{ x, y }}><span>+</span></motion.div>
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
          </div>
          <div className="hero-art hero-reveal" aria-label="Abstract Chennai-inspired collage">
            <div className="moon" />
            <div className="blue-arch" />
            <div className="grid-plane" />
            <div className="scribble one">∞</div><div className="scribble two">⌁</div>
            <div className="art-label">CHENNAI<br />13.0827° N</div>
            <div className="scan-card"><span>SYS_01</span><i /><i /><i /></div>
          </div>
          <div className="side-index"><span>01</span><span>05</span><i /></div>
        </section>

        <section className="marquee"><div>FULL STACK <b>✳</b> PRODUCT MINDED <b>✳</b> HUMAN FIRST <b>✳</b> FULL STACK <b>✳</b> PRODUCT MINDED <b>✳</b></div></section>

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

        <section id="notes" className="notes section-shell">
          <p className="eyebrow">Now / uses</p>
          <div className="notes-grid">
            <article><span>01</span><h3>Currently building</h3><p>Five work-worthy projects, one deliberately at a time.</p></article>
            <article><span>02</span><h3>Off-screen</h3><p>Music, books, travel plans, and games that keep the curiosity supplied.</p></article>
            <article className="play-card"><Play size={18} fill="currentColor" /><h3>Playlist energy</h3><p>Warm, weird, and a little louder than necessary.</p></article>
          </div>
        </section>

        <section id="contact" className="contact section-shell">
          <p className="eyebrow">Let’s make something useful</p>
          <h2>Got a difficult<br /><span>problem?</span></h2>
          <a href="mailto:acecoderkarty@gmail.com" className="email-link">acecoderkarty@gmail.com <ArrowUpRight size={32} /></a>
          <p className="contact-note">A proper contact form, résumé, LinkedIn, and phone links will be added when you send the final details.</p>
        </section>
      </main>

      <footer><span>© {new Date().getFullYear()} Karthik B</span><span>Made with intent, not templates.</span><span>Chennai, IN</span></footer>

      <AnimatePresence>{selected && <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)}><motion.div className="project-modal" initial={{ scale: 0.92, y: 24 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, y: 24 }} onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setSelected(null)}><X size={20} /></button><span className="eyebrow">{selected.number} — {selected.tag}</span><h2>{selected.title}</h2><p>{selected.description}</p><div className="modal-line" /><small>This is the shell. The real case study arrives after we build this project.</small></motion.div></motion.div>}</AnimatePresence>
    </div>
  )
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>)
