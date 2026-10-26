import { useEffect, useRef, useState } from 'react'
import { profile, projects } from './data'
import type { Project } from './data'
import { Art, Arrow, Btn, SocialList, useLocalTime } from './ui'
import { useShell } from './shell'

/* ---------- footer pieces ---------- */
export function BottomFooter() {
  const time = useLocalTime(profile.timezone, profile.tzLabel)
  return (
    <div className="container no-padding">
      <div className="row bottom-footer">
        <div className="flex-col credits">
          <div>
            <h5>Version</h5>
            <p>{new Date().getFullYear()} © Edition</p>
          </div>
          <div>
            <h5>Local time</h5>
            <p>{time}</p>
          </div>
        </div>
        <div className="stripe" />
        <div className="flex-col">
          <div className="socials">
            <h5>Socials</h5>
            <SocialList />
          </div>
        </div>
      </div>
    </div>
  )
}

/* The page scrolls away to reveal this fixed footer underneath. */
export function Footer() {
  const spacer = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const check = () => {
      const r = spacer.current?.getBoundingClientRect()
      if (r) setVisible(r.top < window.innerHeight)
    }
    check()
    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)
    return () => {
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
    }
  }, [])
  return (
    <>
      <div className="footer-rounded-div">
        <div className="rounded-div-wrap"><div className="rounded-div" /></div>
      </div>
      <div className="footer-spacer" ref={spacer} />
      <div className={`footer-wrap theme-dark ${visible ? 'visible' : ''}`}>
        <footer className="section footer theme-dark">
          <div className="container medium">
            <div className="row">
              <div className="flex-col">
                <h2>
                  <span className="line">
                    <span className="profile-picture"><b>{profile.first[0]}{profile.last}</b></span> Let’s work
                  </span>
                  <span className="line">together</span>
                </h2>
              </div>
            </div>
            <div className="row">
              <div className="flex-col">
                <div className="stripe" />
                <div className="btn-fixed">
                  <Btn variant="round" to="/contact">Get in touch</Btn>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="flex-col">
                <Btn variant="normal" href={`mailto:${profile.email}`}>{profile.email}</Btn>
                <Btn variant="normal" href={`tel:${profile.phone.replace(/\s/g, '')}`}>{profile.phone}</Btn>
              </div>
            </div>
          </div>
          <BottomFooter />
        </footer>
        <div className="overlay overlay-gradient" />
      </div>
    </>
  )
}

/* ---------- work list with cursor-following preview ---------- */
export function WorkList({ items, title }: { items: Project[]; title?: string }) {
  const { go } = useShell()
  const [idx, setIdx] = useState(0)
  const [active, setActive] = useState(false)
  const img = useRef<HTMLDivElement>(null)
  const dot = useRef<HTMLDivElement>(null)
  const target = useRef({ x: 0, y: 0 })
  const cur = useRef({ x: 0, y: 0 })
  const activeRef = useRef(false)

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return
    let raf = 0
    const tick = () => {
      cur.current.x += (target.current.x - cur.current.x) * 0.14
      cur.current.y += (target.current.y - cur.current.y) * 0.14
      if (img.current) {
        img.current.style.left = cur.current.x + 'px'
        img.current.style.top = cur.current.y + 'px'
      }
      if (dot.current) {
        dot.current.style.left = target.current.x * 0.5 + cur.current.x * 0.5 + 'px'
        dot.current.style.top = target.current.y * 0.5 + cur.current.y * 0.5 + 'px'
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    const move = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY }
      if (!activeRef.current) cur.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', move)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', move)
    }
  }, [])

  const setOn = (v: boolean) => {
    activeRef.current = v
    setActive(v)
  }

  return (
    <>
      <section className="section large-work-grid work-grid">
        <div className="container">
          {title && (
            <div className="grid-sub-title reveal">
              <h5>{title}</h5>
            </div>
          )}
          <ul className="work-items" onMouseEnter={() => setOn(true)} onMouseLeave={() => setOn(false)}>
            {items.map((p, i) => (
              <li key={p.slug} onMouseEnter={() => setIdx(i)} className="reveal">
                <a href={`/work/${p.slug}`} onClick={(e) => { e.preventDefault(); go(`/work/${p.slug}`) }}>
                  <div className="row">
                    <div className="flex-col"><h4><span>{p.title}</span></h4></div>
                    <div className="flex-col"><p>{p.category}</p></div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <div ref={img} className={`mouse-pos-list-image no-select ${active ? 'active' : ''}`}>
        <div className="float-image-wrap">
          {items.map((p, i) => (
            <div key={p.slug} className={`mouse-pos-list-image-inner ${i === idx ? 'visible' : ''}`}>
              <Art p={p} small />
            </div>
          ))}
        </div>
      </div>
      <div ref={dot} className={`mouse-pos-list-span no-select ${active ? 'active' : ''}`}>
        <p>View</p>
      </div>
    </>
  )
}

/* ---------- tiles (tablet/mobile and grid view) ---------- */
export function Tiles({ items }: { items: Project[] }) {
  const { go } = useShell()
  return (
    <section className="section work-tiles">
      <div className="container">
        <ul>
          {items.map((p) => (
            <li key={p.slug} className="reveal">
              <a href={`/work/${p.slug}`} onClick={(e) => { e.preventDefault(); go(`/work/${p.slug}`) }}>
                <div className="tile-image">
                  <Art p={p} />
                </div>
                <div className="tile-meta">
                  <h4>{p.title}</h4>
                  <div className="stripe" />
                  <div className="row">
                    <p>{p.tagline}</p>
                    <p>{p.short}</p>
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function HeroArrow() {
  return <Arrow />
}

export { projects }
