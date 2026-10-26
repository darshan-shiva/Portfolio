import type { ReactNode } from 'react'
import { certifications, coursework, education, experience, services, skills } from '../data'
import { Arrow, Globe, Lines } from '../ui'

function Split({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="container medium">
      <div className="row about-split">
        <div className="flex-col"><Lines as="h3" lines={title.split('|')} /></div>
        <div className="flex-col reveal">{children}</div>
      </div>
    </div>
  )
}

export default function About() {
  return (
    <>
      <header className="section default-header about-header theme-light">
        <div className="container medium">
          <Lines lines={['Building AI that is', 'measurable and reliable']} />
        </div>
        <div className="line-globe"><Globe /></div>
      </header>

      <section className="section about-lead">
        <div className="container medium">
          <div className="row">
            <div className="flex-col reveal">
              <Arrow className="big" />
              <p className="lead">
                I’m an AI &amp; Machine Learning undergraduate focused on practical systems — computer vision for geospatial property analysis, document-grounded RAG, and the full-stack applications around them.
              </p>
              <p className="dim">Currently learning at M S Ramaiah University of Applied Sciences</p>
            </div>
            <div className="flex-col">
              <h2 className="reveal">I can help you with …</h2>
              <div className="about-services">
                {services.map((s) => (
                  <div className="item reveal" key={s.n}>
                    <span className="n">{s.n}</span>
                    <div className="stripe" />
                    <h4>{s.title}</h4>
                    <p>{s.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section about-bg">
        <Split title="Education &|Background">
          <p>
            I’m pursuing a B.Tech in Artificial Intelligence &amp; Machine Learning, with coursework spanning machine learning, deep learning, computer vision and NLP. I like building systems end to end and measuring whether they actually work.
          </p>
          <div className="detail-block" style={{ marginTop: '3em' }}>
            <ul className="detail-list">
              {education.map((e) => (
                <li key={e.title}>
                  <h5>{e.label}</h5>
                  <div className="detail-title">{e.title}</div>
                  <div className="detail-sub">{e.sub}</div>
                  <div className="detail-meta">{e.meta}</div>
                </li>
              ))}
            </ul>
          </div>
          <div className="tech-group">
            <span className="tech-label">Coursework</span>
            <ul className="tech-tags">{coursework.map((c) => <li key={c}>{c}</li>)}</ul>
          </div>
        </Split>

        <div className="wide">
          <Split title="Experience">
            {experience.map((x) => (
              <div key={x.company} className="detail-block">
                <div className="detail-title">{x.role}</div>
                <div className="detail-sub">{x.company} · {x.place}</div>
                <div className="detail-meta">{x.period}</div>
                <ul className="exp-points">{x.points.map((p) => <li key={p}>{p}</li>)}</ul>
              </div>
            ))}
          </Split>
        </div>

        <div className="wide">
          <Split title="Technical|Skills">
            {skills.map((g) => (
              <div className="tech-group" key={g.label}>
                <span className="tech-label">{g.label}</span>
                <ul className="tech-tags">{g.items.map((s) => <li key={s}>{s}</li>)}</ul>
              </div>
            ))}
          </Split>
        </div>

        <div className="wide">
          <Split title="Certifications">
            <ul className="cert-list">
              {certifications.map((c) => (
                <li key={c.title}>
                  <span>{c.title}</span>
                  <span>{c.by}</span>
                </li>
              ))}
            </ul>
          </Split>
        </div>
      </section>
    </>
  )
}
