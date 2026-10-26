import { useEffect, useRef, useState } from 'react'
import type { ReactNode, ElementType } from 'react'
import { socialLinks } from './data'
import type { Project, SocialKey } from './data'
import { useShell } from './shell'

/* ---------- links ---------- */
export function TLink({ to, children, className, onClick }: { to: string; children: ReactNode; className?: string; onClick?: () => void }) {
  const { go } = useShell()
  return (
    <a
      href={to}
      className={className}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey) return
        e.preventDefault()
        onClick?.()
        go(to)
      }}
    >
      {children}
    </a>
  )
}

/* ---------- magnetic buttons ---------- */
function useMagnetic<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(hover: none)').matches) return
    const text = el.querySelector<HTMLElement>('.btn-text')
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      const x = e.clientX - (r.left + r.width / 2)
      const y = e.clientY - (r.top + r.height / 2)
      el.style.transition = 'transform .15s ease-out'
      el.style.transform = `translate(${x * 0.28}px, ${y * 0.28}px) rotate(.001deg)`
      if (text) {
        text.style.transition = 'transform .15s ease-out'
        text.style.transform = `translate(${x * 0.14}px, ${y * 0.14}px) rotate(.001deg)`
      }
    }
    const leave = () => {
      el.style.transition = 'transform .6s cubic-bezier(.34,1.56,.64,1)'
      el.style.transform = ''
      if (text) {
        text.style.transition = 'transform .6s cubic-bezier(.34,1.56,.64,1)'
        text.style.transform = ''
      }
    }
    el.addEventListener('mousemove', move)
    el.addEventListener('mouseleave', leave)
    return () => {
      el.removeEventListener('mousemove', move)
      el.removeEventListener('mouseleave', leave)
    }
  }, [])
  return ref
}

type BtnProps = {
  children: ReactNode
  variant?: 'normal' | 'round' | 'link'
  to?: string
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  active?: boolean
  external?: boolean
  download?: string
  className?: string
  label?: string
}

export function Btn({ children, variant = 'normal', to, href, onClick, type, active, external, download, className = '', label }: BtnProps) {
  const { go } = useShell()
  const ref = useMagnetic<HTMLElement>()
  const inner = (
    <>
      <div className="btn-fill" />
      <div className="btn-text">
        <span className="btn-text-inner">{children}</span>
      </div>
    </>
  )
  const cls = `btn-click magnetic`
  const wrap = `btn btn-${variant} ${active ? 'active' : ''} ${className}`
  if (to) {
    return (
      <div className={wrap}>
        <a
          ref={ref as React.RefObject<HTMLAnchorElement>}
          href={to}
          className={cls}
          aria-label={label}
          onClick={(e) => {
            if (e.metaKey || e.ctrlKey || e.shiftKey) return
            e.preventDefault()
            onClick?.()
            go(to)
          }}
        >
          {inner}
        </a>
      </div>
    )
  }
  if (href) {
    return (
      <div className={wrap}>
        <a
          ref={ref as React.RefObject<HTMLAnchorElement>}
          href={href}
          className={cls}
          aria-label={label}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          {...(download ? { download } : {})}
        >
          {inner}
        </a>
      </div>
    )
  }
  return (
    <div className={wrap}>
      <button ref={ref as React.RefObject<HTMLButtonElement>} type={type ?? 'button'} className={cls} aria-label={label} onClick={onClick}>
        {inner}
      </button>
    </div>
  )
}

/* ---------- text reveal: each line slides up from a mask ---------- */
export function Lines({ lines, as: Tag = 'h1', className = '' }: { lines: string[]; as?: ElementType; className?: string }) {
  return (
    <Tag className={`span-lines ${className}`}>
      {lines.map((l, i) => (
        <span className="span-line" key={i}>
          <span className="span-line-inner" style={{ transitionDelay: `${i * 0.09}s` }}>
            {l}
          </span>
        </span>
      ))}
    </Tag>
  )
}

/* ---------- small pieces ---------- */
export const Arrow = ({ className = '' }: { className?: string }) => (
  <span className={`arrow ${className}`}>
    <svg viewBox="0 0 17 17" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M2 2 L15 15 M15 5 V15 H5" />
    </svg>
  </span>
)

export function Globe() {
  return (
    <div className="digital-ball">
      <div className="overlay" />
      <div className="globe">
        <div className="globe-wrap">
          <div className="circle" />
          <div className="circle" />
          <div className="circle-hor" />
          <div className="circle-hor-middle" />
        </div>
      </div>
    </div>
  )
}

/* Typographic project cards. These are generated artwork, not screenshots of the projects. */
export function Art({ p, small }: { p: Project; small?: boolean }) {
  const stroke = 'rgba(255,255,255,.92)'
  const motif = {
    rag: (
      <svg viewBox="0 0 200 140" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round">
        <rect x="14" y="14" width="64" height="82" rx="4" />
        <path d="M26 34h40M26 48h40M26 62h28M26 76h34" opacity=".7" />
        <path d="M88 55h30" />
        <path d="M112 47l8 8-8 8" />
        <circle cx="150" cy="55" r="26" />
        <path d="M138 55h24M150 43v24" opacity=".7" />
        <path d="M60 118h90" strokeDasharray="3 6" opacity=".7" />
      </svg>
    ),
    traffic: (
      <svg viewBox="0 0 200 140" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round">
        <path d="M10 30h180M10 112h180" opacity=".5" />
        <path d="M10 71h180" strokeDasharray="10 9" opacity=".7" />
        <rect x="26" y="40" width="46" height="24" rx="3" />
        <rect x="104" y="78" width="54" height="26" rx="3" />
        <path d="M150 50h28M170 42l8 8-8 8" />
        <path d="M100 18v104" stroke="#ffd9a8" strokeWidth="2.5" />
      </svg>
    ),
    health: (
      <svg viewBox="0 0 200 140" fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 74h42l14-40 22 84 18-60 14 16h74" />
        <circle cx="168" cy="74" r="4" fill={stroke} />
      </svg>
    ),
    spam: (
      <svg viewBox="0 0 200 140" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="20" y="28" width="96" height="68" rx="5" />
        <path d="M20 36l48 36 48-36" />
        <path d="M134 42h46M134 70h46M134 98h46" opacity=".6" />
        <path d="M146 98l8 8 18-20" stroke="#d9c2ff" strokeWidth="3" />
      </svg>
    ),
  }[p.motif]
  return (
    <div className={`art ${small ? 'small' : ''}`} style={{ background: `linear-gradient(145deg, ${p.hue[0]}, ${p.hue[1]})` }}>
      <span className="art-eyebrow">{p.eyebrow}</span>
      {motif}
      <h3 className="art-title">{p.title}</h3>
    </div>
  )
}

export function useLocalTime(zone: string, label: string) {
  const fmt = () => new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: zone }) + ' ' + label
  const [t, setT] = useState(fmt)
  useEffect(() => {
    const i = setInterval(() => setT(fmt()), 20000)
    return () => clearInterval(i)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return t
}

/* ---------- social icons (inline SVG, no extra dependency) ---------- */
const ICONS: Record<SocialKey, ReactNode> = {
  linkedin: <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11.5H3V9.75Zm6.5 0h3.83v1.57h.06c.53-1 1.84-2.07 3.78-2.07 4.04 0 4.79 2.66 4.79 6.12v5.88h-4v-5.2c0-1.24-.02-2.84-1.73-2.84-1.73 0-2 1.35-2 2.75v5.29h-4V9.75Z" />,
  instagram: <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 1.8A3.7 3.7 0 0 0 3.8 7.5v9a3.7 3.7 0 0 0 3.7 3.7h9a3.7 3.7 0 0 0 3.7-3.7v-9a3.7 3.7 0 0 0-3.7-3.7h-9ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Zm5.25-2.55a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z" />,
  whatsapp: <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.95L2 22l5.2-1.36A9.9 9.9 0 1 0 12.04 2Zm0 1.8a8.1 8.1 0 1 1-4.13 15.07l-.3-.18-3.08.8.83-3-.2-.31A8.1 8.1 0 0 1 12.04 3.8Zm-3.2 3.7c-.2 0-.5.07-.76.35-.26.29-1 1-1 2.43s1.03 2.82 1.17 3.02c.15.2 2.03 3.24 5 4.4 2.47.97 2.97.78 3.5.73.54-.05 1.73-.7 1.97-1.39.25-.68.25-1.27.17-1.39-.07-.12-.27-.2-.56-.34-.3-.15-1.73-.86-2-.96-.27-.1-.46-.15-.66.15-.2.29-.76.95-.93 1.15-.17.2-.34.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.44-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.66-1.6-.91-2.18-.24-.57-.48-.5-.66-.5h-.56Z" />,
  github: <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.64-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.9-1.29 2.74-1.02 2.74-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />,
  email: <path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm1 2.3V17.2h16V7.3l-8 5.7-8-5.7ZM5.6 7 12 11.55 18.4 7H5.6Z" />,
}

export function SocialIcon({ name }: { name: SocialKey }) {
  return (
    <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      {ICONS[name]}
    </svg>
  )
}

/* Social links, styled like the reference's link buttons, with an icon added. */
export function SocialList({ only }: { only?: SocialKey[] }) {
  const items = only ? socialLinks.filter((s) => only.includes(s.key)) : socialLinks
  return (
    <ul className="social-list">
      {items.map((s) => {
        const external = s.href.startsWith('http')
        return (
          <li key={s.key} className="btn btn-link btn-link-external">
            <a
              href={s.href}
              className="btn-click magnetic social-link"
              aria-label={external ? `${s.label} (opens in a new tab)` : s.label}
              title={s.label}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <div className="btn-text">
                <SocialIcon name={s.key} />
                <span className="btn-text-inner">{s.label}</span>
              </div>
            </a>
          </li>
        )
      })}
    </ul>
  )
}
