import { useEffect, useRef, useState } from 'react'
import { profile, projects, resume } from '../data'
import { Btn, Globe, Lines } from '../ui'
import { Tiles, WorkList } from '../sections'

const IMAGE = '/profile.png'

function useImage(src: string) {
  const [ok, setOk] = useState(false)
  useEffect(() => {
    const i = new Image()
    i.onload = () => setOk(true)
    i.src = src
  }, [src])
  return ok
}

export default function Home() {
  const hasPhoto = useImage(IMAGE)
  const name = useRef<HTMLDivElement>(null)

  /* the big name drifts sideways as the page scrolls */
  useEffect(() => {
    let raf = 0
    let x = 0
    const tick = () => {
      const target = -window.scrollY * 0.45
      x += (target - x) * 0.12
      if (name.current) name.current.style.transform = `translate3d(${x}px,0,0)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const Name = () => (
    <div className="name-wrap">
      <h1>{profile.name}</h1>
      <h1 className="spacer">—</h1>
    </div>
  )

  return (
    <>
      <header className="section home-header theme-dark" id="home">
        <div className="hero-scale">
          <div className="personal-image-wrap">
            {hasPhoto ? <div className="overlay-image" style={{ backgroundImage: `url(${IMAGE})` }} /> : <div className="hero-ghost" aria-hidden>DS</div>}
          </div>
          <div className="overlay get-height">
            <div className="hanger">
              <svg viewBox="0 0 250 100" aria-hidden>
                <path d="M0 0H200a50 50 0 0 1 0 100H0Z" fill="#0f1012" />
              </svg>
              <p>
                {profile.location.map((l) => (
                  <span key={l}>{l}</span>
                ))}
              </p>
              <div className="line-globe"><Globe /></div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="flex-col">
                <div className="header-above-h4">
                  <svg viewBox="0 0 17 17" fill="none" stroke="#fff" strokeWidth="1.2"><path d="M2 2 L15 15 M15 5 V15 H5" /></svg>
                </div>
                <h4>
                  {profile.role.map((r) => (
                    <span key={r}>{r}</span>
                  ))}
                </h4>
                <div className="hero-cta">
                  <Btn variant="normal" href={resume.href} download={resume.filename}>Download Resume</Btn>
                </div>
              </div>
            </div>
          </div>
          <div className="big-name">
            <div className="name-h1" ref={name}>
              <Name />
              <Name />
              <Name />
            </div>
          </div>
        </div>
      </header>

      <section className="section home-intro">
        <div className="container medium">
          <div className="row">
            <div className="flex-col">
              <Lines as="h4" lines={['Practical AI, built to be', 'measurable and reliable.']} />
            </div>
            <div className="flex-col">
              <div className="text-wrap reveal">
                <p>
                  I’m an AI &amp; Machine Learning undergraduate building computer vision systems for geospatial property analysis and document-grounded RAG applications — with a focus on cost optimisation, reliable retrieval and observability.
                </p>
              </div>
              <div className="btn-wrap-intro reveal">
                <Btn variant="round" to="/about">About Me</Btn>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-wrap-work">
        <WorkList items={projects} title="Recent work" />
        <Tiles items={projects} />
        <section className="section center-grid-btn">
          <div className="container">
            <div className="grid-after-btn reveal">
              <Btn variant="normal" to="/work">
                More work<span className="count-nr">{projects.length}</span>
              </Btn>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
