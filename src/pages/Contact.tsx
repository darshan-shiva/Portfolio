import { useState } from 'react'
import { profile } from '../data'
import { Arrow, Btn, Lines, SocialList } from '../ui'
import { BottomFooter } from '../sections'

const SERVICES = ['Computer vision', 'RAG / LLM systems', 'Full-stack AI app', 'Something else']

export default function Contact() {
  const [v, setV] = useState({ name: '', email: '', org: '', service: '', message: '' })
  const set = (k: keyof typeof v) => (e: { target: { value: string } }) => setV({ ...v, [k]: e.target.value })
  const [sent, setSent] = useState(false)

  // There is no backend: the form opens a pre-filled email in the visitor's mail app.
  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const body = `Name: ${v.name}\nEmail: ${v.email}\nOrganisation: ${v.org}\nLooking for: ${v.service}\n\n${v.message}`
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(`Portfolio enquiry from ${v.name}`)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  const row = (n: string, q: string, input: React.ReactNode, filled: boolean) => (
    <div className={`form-col ${filled ? 'not-empty' : ''}`}>
      <h5>{n}</h5>
      <label className="label">{q}</label>
      {input}
    </div>
  )

  return (
    <>
      <header className="section default-header contact-header theme-dark">
        <div className="container medium">
          <Lines lines={['Let’s start a', 'project together']} />
        </div>
      </header>

      <section className="contact-page theme-dark">
        <div className="container medium">
          <div className="row">
            <div className="flex-col reveal">
              <form className="form" onSubmit={submit}>
                {row('01', 'What’s your name?', <input className="field" required placeholder="John Doe *" value={v.name} onChange={set('name')} />, !!v.name)}
                {row('02', 'What’s your email?', <input className="field" required type="email" placeholder="john@doe.com *" value={v.email} onChange={set('email')} />, !!v.email)}
                {row('03', 'What’s the name of your organization?', <input className="field" placeholder="John & Doe ®" value={v.org} onChange={set('org')} />, !!v.org)}
                {row(
                  '04',
                  'What are you looking for?',
                  <div className="radio-group">
                    {SERVICES.map((s) => (
                      <label className="checkbox-button" key={s}>
                        <input type="radio" name="service" checked={v.service === s} onChange={() => setV({ ...v, service: s })} />
                        <div className="custom-radio" />
                        <span>{s}</span>
                      </label>
                    ))}
                  </div>,
                  false,
                )}
                {row('05', 'Your message', <textarea className="field" required rows={2} placeholder="Hello Darshan, can you help me with…*" value={v.message} onChange={set('message')} />, !!v.message)}
                <div className="form-send">
                  <div className="btn-contact-send">
                    <Btn variant="round" type="submit">{sent ? 'Opening mail…' : 'Send it!'}</Btn>
                  </div>
                </div>
                <p className="contact-note small">Sending opens a pre-filled email in your mail app.</p>
              </form>
            </div>

            <div className="flex-col contact-side reveal">
              <span className="profile-picture"><b>{profile.first[0]}{profile.last}</b></span>
              <Arrow className="big" />
              <h5>Contact details</h5>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <a href={`tel:${profile.phone.replace(/\s/g, '')}`}>{profile.phone}</a>
              <h5>Business details</h5>
              <p>{profile.name}</p>
              <p>Location: {profile.location[2]}</p>
              <h5>Socials</h5>
              <SocialList />
            </div>
          </div>
        </div>
        <div style={{ marginTop: 'calc(var(--section-padding)*.6)' }}>
          <BottomFooter />
        </div>
      </section>
    </>
  )
}
