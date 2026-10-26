import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Lenis from 'lenis'
import { loaderWords, profile, projects, resume } from './data'
import { ShellContext } from './shell'
import { Btn, SocialList, TLink } from './ui'
import { Footer } from './sections'
import Home from './pages/Home'
import Work from './pages/Work'
import About from './pages/About'
import Contact from './pages/Contact'
import ProjectPage from './pages/Project'

type Phase = 'cover' | 'out' | 'idle' | 'in'

const labelFor = (path: string) => {
  if (path === '/') return 'Home'
  if (path === '/work') return 'Work'
  if (path === '/about') return 'About'
  if (path === '/contact') return 'Contact'
  const p = projects.find((x) => path === `/work/${x.slug}`)
  return p ? p.title : 'Darshan S'
}

const titleFor = (path: string) => {
  const l = labelFor(path)
  return l === 'Home' ? `${profile.name} — AI/ML Engineer` : `${l} — ${profile.name}`
}

export default function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const [phase, setPhase] = useState<Phase>('cover')
  const [word, setWord] = useState(loaderWords[0])
  const [label, setLabel] = useState('')
  const [ready, setReady] = useState(false)
  const [navOpen, setNavOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const lenis = useRef<Lenis | null>(null)
  const busy = useRef(true)
  const path = location.pathname

  /* smooth scrolling */
  useEffect(() => {
    const l = new Lenis({ lerp: 0.1, wheelMultiplier: 1 })
    lenis.current = l
    let raf = 0
    const tick = (t: number) => {
      l.raf(t)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.08)
    l.on('scroll', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      l.destroy()
    }
  }, [])

  useEffect(() => {
    document.documentElement.classList.add('js')
    window.history.scrollRestoration = 'manual'
  }, [])

  /* loader: cycle greetings, then lift the curtain */
  useEffect(() => {
    let i = 0
    let t: ReturnType<typeof setTimeout>
    const step = () => {
      i++
      if (i < loaderWords.length) {
        setWord(loaderWords[i])
        t = setTimeout(step, 190)
      } else {
        t = setTimeout(() => {
          setPhase('out')
          setTimeout(() => document.body.classList.add('hero-reveal'), 250)
          setTimeout(() => setReady(true), 450)
          setTimeout(() => {
            setPhase('idle')
            busy.current = false
          }, 1200)
        }, 250)
      }
    }
    t = setTimeout(step, 700)
    return () => clearTimeout(t)
  }, [])

  /* page transition: curtain rises, route swaps, curtain leaves */
  const go = useCallback(
    (to: string) => {
      setNavOpen(false)
      if (busy.current) return
      if (to === path) {
        lenis.current?.scrollTo(0)
        return
      }
      busy.current = true
      setLabel(labelFor(to))
      setPhase('in')
      setTimeout(() => {
        navigate(to)
        lenis.current?.scrollTo(0, { immediate: true, force: true })
        window.scrollTo(0, 0)
        setPhase('out')
        setTimeout(() => {
          setPhase('idle')
          busy.current = false
        }, 1150)
      }, 900)
    },
    [navigate, path],
  )

  useEffect(() => {
    document.title = titleFor(path)
  }, [path])

  /* scroll-triggered reveals */
  useEffect(() => {
    if (!ready) return
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in-view')
            io.unobserve(e.target)
          }
        }),
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )
    const observeAll = () =>
      document.querySelectorAll('.reveal:not(.in-view),.span-lines:not(.in-view)').forEach((el) => io.observe(el))
    const t = setTimeout(observeAll, 80)
    // pick up elements that mount later (filters, route changes)
    const mo = new MutationObserver(() => setTimeout(observeAll, 30))
    mo.observe(document.body, { childList: true, subtree: true })
    return () => {
      clearTimeout(t)
      mo.disconnect()
      io.disconnect()
    }
  }, [ready])

  /* lock scroll while the menu is open */
  useEffect(() => {
    if (navOpen) lenis.current?.stop()
    else lenis.current?.start()
  }, [navOpen])

  const api = useMemo(() => ({ go, pathname: path }), [go, path])
  const dark = path === '/' || path === '/contact' || path.startsWith('/work/')
  const navLinks = [
    ['/work', 'Work'],
    ['/about', 'About'],
    ['/contact', 'Contact'],
  ]
  const hasFooter = path !== '/contact'

  return (
    <ShellContext.Provider value={api}>
      <div className={`curtain ${phase}`} aria-hidden>
        <div className="curtain-words">
          <h2>
            <span className="dot" />
            {phase === 'cover' || phase === 'out' ? word : label}
          </h2>
        </div>
      </div>

      <main className={`main ${scrolled ? 'scrolled' : ''} ${navOpen ? 'nav-active' : ''}`}>
        <div className={`btn btn-hamburger ${navOpen ? 'active' : ''}`}>
          <button className="btn-click magnetic" aria-label="Menu" onClick={() => setNavOpen(!navOpen)}>
            <div className="btn-fill" />
            <div className="btn-text">
              <div className="btn-bars" />
            </div>
          </button>
        </div>

        <div className={`nav-bar ${dark ? 'theme-dark' : 'theme-light'}`}>
          <div className="credits-top">
            <div className="btn btn-link btn-left-top">
              <a href="/" className="btn-click magnetic" onClick={(e) => { e.preventDefault(); go('/') }}>
                <div className="btn-text credit-wrap" style={{ color: dark ? '#fff' : undefined }}>
                  <span className="credit"><span>©</span></span>
                  <span className="cbd">
                    <span className="code-by">Code by </span>
                    <span className="author">{profile.first}</span>
                    <span className="author-last"> {profile.last}</span>
                  </span>
                </div>
              </a>
            </div>
          </div>
          <ul className="links-wrap">
            {navLinks.map(([to, text]) => (
              <li key={to} className={`btn btn-link ${path.startsWith(to) ? 'active' : ''}`}>
                <a href={to} className="btn-click magnetic" onClick={(e) => { e.preventDefault(); go(to) }}>
                  <div className="btn-text"><span className="btn-text-inner">{text}</span></div>
                </a>
              </li>
            ))}
            <li className="btn btn-link">
              <a href={resume.href} download={resume.filename} className="btn-click magnetic">
                <div className="btn-text"><span className="btn-text-inner">Resume</span></div>
              </a>
            </li>
            <li className="btn btn-link btn-menu">
              <button className="btn-click magnetic" onClick={() => setNavOpen(true)}>
                <div className="btn-text"><span className="btn-text-inner">Menu</span></div>
              </button>
            </li>
          </ul>
        </div>

        <div className="fixed-nav-back" onClick={() => setNavOpen(false)} />
        <div className="fixed-nav theme-dark">
          <div className="fixed-nav-rounded-div">
            <div className="rounded-div-wrap"><div className="rounded-div" /></div>
          </div>
          <div className="fixed-nav-inner">
            <div className="row nav-row" style={{ display: 'block' }}>
              <h5>Navigation</h5>
              <div className="stripe" />
              <ul className="links-wrap">
                {[['/', 'Home'], ...navLinks].map(([to, text]) => (
                  <li key={to} className={`btn btn-link ${path === to ? 'active' : ''}`}>
                    <a href={to} className="btn-click" onClick={(e) => { e.preventDefault(); go(to) }}>
                      <div className="btn-text"><span className="btn-text-inner">{text}</span></div>
                    </a>
                  </li>
                ))}
                <li className="btn btn-link">
                  <a href={resume.href} download={resume.filename} className="btn-click" onClick={() => setNavOpen(false)}>
                    <div className="btn-text"><span className="btn-text-inner">Resume</span></div>
                  </a>
                </li>
              </ul>
            </div>
            <div className="row social-row" style={{ display: 'block' }}>
              <div className="stripe" />
              <div className="socials">
                <h5>Socials</h5>
                <SocialList />
              </div>
            </div>
          </div>
        </div>

        <div className="main-wrap">
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/work/:slug" element={<ProjectPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="*"
              element={
                <section className="section not-found theme-dark">
                  <div className="container medium">
                    <h1>Page not found</h1>
                    <Btn variant="normal" to="/">Back home</Btn>
                  </div>
                </section>
              }
            />
          </Routes>
        </div>
        {hasFooter && <Footer />}
      </main>
    </ShellContext.Provider>
  )
}

export { TLink }
