import { useParams } from 'react-router-dom'
import { projects } from '../data'
import { Art, Btn, Lines } from '../ui'
import { TLink } from '../ui'

export default function ProjectPage() {
  const { slug } = useParams()
  const i = projects.findIndex((p) => p.slug === slug)
  if (i < 0) {
    return (
      <section className="section not-found theme-dark">
        <div className="container medium">
          <h1>Project not found</h1>
          <Btn variant="normal" to="/work">All work</Btn>
        </div>
      </section>
    )
  }
  const p = projects[i]
  const next = projects[(i + 1) % projects.length]

  return (
    <>
      <header className="section default-header project-hero theme-dark">
        <div className="container medium">
          <span className="eyebrow">{p.eyebrow}</span>
          <Lines lines={[p.title]} />
          <p className="reveal" style={{ opacity: 0.6, fontSize: '1.2em' }}>{p.tagline}</p>
        </div>
      </header>

      <div className="project-stage theme-dark">
        <div className="container large">
          <div className="project-art reveal"><Art p={p} /></div>
        </div>
      </div>

      <section className="project-body">
        <div className="container medium">
          <div className="row">
            <div className="flex-col meta reveal">
              <h5>Category</h5>
              <p>{p.category}</p>
              <h5 style={{ marginTop: '2em' }}>Built with</h5>
              <ul className="tech-tags" style={{ marginTop: '.8em' }}>
                {p.stack.map((s) => <li key={s}>{s}</li>)}
              </ul>
            </div>
            <div className="flex-col">
              {p.stat && (
                <div className="stat reveal">
                  <span className="big">{p.stat.value}</span>
                  <p>{p.stat.label}</p>
                </div>
              )}
              <ul className="proj-points">
                {p.points.map((t, n) => (
                  <li key={n} className="reveal"><span>0{n + 1}</span>{t}</li>
                ))}
              </ul>
              <div className="proj-actions reveal">
                <Btn variant="normal" href={p.repo} external>View on GitHub</Btn>
                <Btn variant="normal" to="/work">All work</Btn>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="next-project theme-dark">
        <div className="container medium">
          <h5 style={{ marginBottom: '2em' }}>Next project</h5>
          <TLink to={`/work/${next.slug}`}><h2>{next.title}</h2></TLink>
        </div>
      </section>
    </>
  )
}
