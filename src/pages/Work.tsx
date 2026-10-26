import { useState } from 'react'
import { projects } from '../data'
import { Btn, Lines } from '../ui'
import { Tiles, WorkList } from '../sections'

const FILTERS = ['All', 'AI / ML', 'Full-Stack']

export default function Work() {
  const [filter, setFilter] = useState('All')
  const [list, setList] = useState(false)
  const items = filter === 'All' ? projects : projects.filter((p) => p.filters.includes(filter))
  const count = (f: string) => (f === 'All' ? projects.length : projects.filter((p) => p.filters.includes(f)).length)

  return (
    <>
      <header className="section default-header work-header theme-light" style={{ background: '#fff' }}>
        <div className="container medium">
          <Lines lines={['Practical AI systems,', 'built end to end']} />
        </div>
      </header>

      <section className="section work-filters">
        <div className="container medium">
          <div className="row reveal">
            <div className="filter-list">
              {FILTERS.map((f) => (
                <Btn key={f} variant="normal" active={filter === f} onClick={() => setFilter(f)}>
                  {f}
                  {f !== 'All' && <span className="count-nr">{count(f)}</span>}
                </Btn>
              ))}
            </div>
            <div className="view-toggle">
              <Btn variant="normal" active={list} label="List view" onClick={() => setList(true)}>
                <svg viewBox="0 0 16 16" fill="none" strokeWidth="1"><path d="M2 3h12M2 6h12M2 9h12M2 12h12" /></svg>
              </Btn>
              <Btn variant="normal" active={!list} label="Grid view" onClick={() => setList(false)}>
                <svg viewBox="0 0 16 16" fill="none" strokeWidth="1"><rect x="2" y="2" width="5" height="5" /><rect x="9" y="2" width="5" height="5" /><rect x="2" y="9" width="5" height="5" /><rect x="9" y="9" width="5" height="5" /></svg>
              </Btn>
            </div>
          </div>
        </div>
      </section>

      <div className={`work-page ${list ? 'list' : ''}`} key={filter + String(list)}>
        {list ? <WorkList items={items} /> : <Tiles items={items} />}
        {list && <div className="work-tiles-mobile-wrap"><Tiles items={items} /></div>}
      </div>
    </>
  )
}
