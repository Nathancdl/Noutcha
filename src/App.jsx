import { useEffect, useRef } from 'react'
import photo from './photo.jpg'

// Contact — source unique de vérité (tel au format international pour que la
// numérotation fonctionne depuis un mobile ou l'étranger).
const EMAIL = 'noutcha.tchatat@gmail.com'
const TEL_DISPLAY = '07 86 10 91 27'
const TEL_HREF = '+33786109127'

const SKILLS = [
  { lab: 'Langages', tag: '// code', items: ['HTML', 'CSS', 'JavaScript', 'PHP'] },
  { lab: 'Frameworks', tag: '// ui', items: ['Bootstrap', 'React'] },
  { lab: 'CMS', tag: '// platforms', items: ['WordPress', 'Shopify', 'PrestaShop'] },
  { lab: 'Outils IA', tag: '// daily', items: ['Claude Code', 'Cursor', 'ChatGPT', 'Vercel v0'] },
  { lab: 'Design', tag: '// proto', items: ['Figma', 'Canva', 'Photoshop'] },
  { lab: 'Bases de données', tag: '// data', items: ['SQL'] },
]

const PROJECTS = [
  { id: 'P-01', url: 'https://kosmos-3d.fr', name: 'kosmos-3d.fr', type: 'Site vitrine', badge: 'WordPress', cls: 'b-wp' },
  { id: 'P-02', url: 'https://www.carresol-parquet.com', name: 'carresol-parquet.com', type: 'Boutique · refonte complète', badge: 'PrestaShop', cls: 'b-ps' },
  { id: 'P-03', url: 'https://www.welfaire.com', name: 'welfaire.com', type: 'Site vitrine', badge: 'WordPress', cls: 'b-wp' },
  { id: 'P-04', url: 'https://frenchica.com', name: 'frenchica.com', type: 'E-commerce', badge: 'WordPress', cls: 'b-wp' },
]

// Terminal animé : un objet de config JS (identité dev, pas de roleplay)
const CONFIG = [
  { k: 'stack',     v: "['WordPress', 'Shopify', 'PrestaShop']" },
  { k: 'ia',        v: "['Claude Code', 'Cursor', 'ChatGPT']" },
  { k: 'je_pilote', v: "['archi', 'logique métier', 'revue']" },
  { k: 'garantie',  v: "'du code que je comprends à 100%'" },
]

const AI_POINTS = [
  { h: 'Je garde le contrôle', d: 'Chaque ligne générée est relue, comprise et refactorée. Je ne livre que du code que je maîtrise.' },
  { h: 'Plus vite sur le répétitif', d: 'L\'IA absorbe le boilerplate et la doc. J\'investis ce temps dans l\'archi, la perf et l\'intégration.' },
  { h: 'Debug augmenté', d: 'J\'explore les pistes avec Claude Code et Cursor, mais le diagnostic et la décision restent les miens.' },
]

export default function App() {
  const hudRef = useRef(null)

  // Inspector HUD : suit le curseur sur les éléments .inspect.
  // Désactivé sur appareils tactiles (pas de curseur) et limité à 1 maj/frame.
  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    if (!fine) return
    const hud = hudRef.current
    const els = Array.from(document.querySelectorAll('.inspect'))
    let frame = 0
    const onMove = (el) => (e) => {
      const { clientX, clientY } = e
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        hud.textContent = el.dataset.tag || el.tagName.toLowerCase()
        hud.style.left = clientX + 'px'
        hud.style.top = clientY + 'px'
        hud.style.opacity = '1'
      })
    }
    const onLeave = () => { hud.style.opacity = '0' }
    const handlers = els.map((el) => {
      const move = onMove(el)
      el.addEventListener('mousemove', move)
      el.addEventListener('mouseleave', onLeave)
      return { el, move }
    })
    return () => {
      cancelAnimationFrame(frame)
      handlers.forEach(({ el, move }) => {
        el.removeEventListener('mousemove', move)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  // Scroll reveal
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target) }
      })
    }, { threshold: 0.12 })
    document.querySelectorAll('.reveal').forEach((el, i) => {
      el.style.transitionDelay = (i % 4 * 60) + 'ms'
      io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  // Spotlight + aurores : la position de la souris pilote des variables CSS
  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return
    const root = document.documentElement
    let frame = 0
    const onMove = (e) => {
      const { clientX, clientY } = e
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        root.style.setProperty('--mx', clientX + 'px')
        root.style.setProperty('--my', clientY + 'px')
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => { cancelAnimationFrame(frame); window.removeEventListener('mousemove', onMove) }
  }, [])

  // Tilt 3D sur les cartes
  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return
    const cards = Array.from(document.querySelectorAll('.tilt'))
    const onMove = (el) => (e) => {
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width - 0.5
      const py = (e.clientY - r.top) / r.height - 0.5
      el.style.setProperty('--rx', (py * -7).toFixed(2) + 'deg')
      el.style.setProperty('--ry', (px * 9).toFixed(2) + 'deg')
      el.style.setProperty('--gx', (px * 100 + 50).toFixed(1) + '%')
      el.style.setProperty('--gy', (py * 100 + 50).toFixed(1) + '%')
    }
    const onLeave = (el) => () => { el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg') }
    const handlers = cards.map((el) => {
      const move = onMove(el), leave = onLeave(el)
      el.addEventListener('mousemove', move)
      el.addEventListener('mouseleave', leave)
      return { el, move, leave }
    })
    return () => handlers.forEach(({ el, move, leave }) => {
      el.removeEventListener('mousemove', move)
      el.removeEventListener('mouseleave', leave)
    })
  }, [])

  // Terminal IA : les lignes apparaissent une à une au scroll
  useEffect(() => {
    const term = document.querySelector('.terminal')
    if (!term) return
    const lines = Array.from(term.querySelectorAll('.term-line'))
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) { lines.forEach((l) => l.classList.add('lit')); return }
    const timers = []
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          lines.forEach((l, i) => timers.push(setTimeout(() => l.classList.add('lit'), i * 360)))
          io.disconnect()
        }
      })
    }, { threshold: 0.4 })
    io.observe(term)
    return () => { io.disconnect(); timers.forEach(clearTimeout) }
  }, [])

  // Compteurs animés (réveillés au scroll)
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const els = Array.from(document.querySelectorAll('[data-count]'))
    if (reduce) { els.forEach((el) => { el.textContent = el.dataset.count + (el.dataset.suffix || '') }); return }
    const run = (el) => {
      const end = Number(el.dataset.count), suffix = el.dataset.suffix || ''
      const dur = 1100, t0 = performance.now()
      const tick = (t) => {
        const p = Math.min((t - t0) / dur, 1)
        const eased = 1 - Math.pow(1 - p, 3)
        el.textContent = Math.round(end * eased) + suffix
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { run(en.target); io.unobserve(en.target) } })
    }, { threshold: 0.6 })
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <>
      <div id="spotlight" aria-hidden="true" />
      <div id="hud" ref={hudRef} />

      <div className="topbar">
        <span className="dots">
          <i className="dot" style={{ background: '#ff5f57' }} />
          <i className="dot" style={{ background: '#febc2e' }} />
          <i className="dot" style={{ background: '#28c840' }} />
        </span>
        <span className="url mono">https://noutcha.dev/cv · front-end-cms</span>
        <span className="stat mono">● online</span>
      </div>

      <div className="wrap">
        {/* HERO */}
        <header className="hero">
          <img className="avatar inspect" data-tag="img.avatar" src={photo} alt="Portrait de Noutcha Tchatat" width="150" height="150" fetchPriority="high" decoding="async" />
          <div className="eyebrow">
            <span className="blink" />&lt;dev role="front-end"&gt; <span className="tag">// CMS · AI-augmented · Paris</span>
          </div>
          <h1 className="inspect" data-tag="h1#name">Noutcha<br /><span className="l2 glitch" data-text="Tchatat.">Tchatat.</span></h1>
          <p className="role">Intégrateur web → <b>Développeur Front-End CMS</b> · <b>6 ans</b> en agence · <b>100+ projets</b></p>
          <p className="intro inspect" data-tag="p.intro">
            J'intègre et développe des front-ends <strong>pixel-perfect</strong> sur WordPress, Shopify et PrestaShop.
            Je code en <strong>binôme avec l'IA</strong> (Claude Code, Cursor) pour livrer <strong>plus vite </strong>
            sans jamais rogner sur la qualité. En quête d'un poste à <strong>plus de responsabilités</strong>,
            sur des projets ambitieux.
          </p>
          <div className="stats">
            <div className="stat-box">
              <span className="num mono"><span data-count="6" data-suffix="">0</span></span>
              <span className="lab mono">ans d'expérience</span>
            </div>
            <div className="stat-box">
              <span className="num mono"><span data-count="100" data-suffix="+">0</span></span>
              <span className="lab mono">projets livrés</span>
            </div>
            <div className="stat-box">
              <span className="num mono"><span data-count="3" data-suffix="">0</span></span>
              <span className="lab mono">CMS maîtrisés</span>
            </div>
          </div>

          <div className="hero-meta">
            <a className="chip mono" href={`mailto:${EMAIL}`} aria-label={`Envoyer un email à ${EMAIL}`}>
              <span className="k">@</span>{EMAIL}
            </a>
            <a className="chip mono" href={`tel:${TEL_HREF}`} aria-label={`Appeler le ${TEL_DISPLAY}`}>
              <span className="k">tel</span>{TEL_DISPLAY}
            </a>
            <span className="chip mono"><span className="k">geo</span>Paris · Pantin, FR</span>
            <span className="chip mono"><span className="k">lang</span>Anglais courant</span>
          </div>
        </header>

        {/* EXPERIENCE */}
        <section id="exp">
          <div className="sec-head reveal">
            <span className="sec-num mono">01</span>
            <h2>Expérience</h2>
            <span className="meta mono">1 poste · 6 ans</span>
          </div>
          <article className="exp inspect reveal" data-tag="article.experience">
            <div className="exp-top">
              <h3>Intégrateur Web</h3><span className="co">@ Solead Agency</span>
              <span className="when mono">02/2019 → 09/2025</span>
            </div>
            <div className="exp-loc mono">Paris, France · agence web</div>
            <div className="cols">
              <div>
                <h4>Intégration &amp; front-end</h4>
                <ul>
                  <li>Intégration depuis maquettes <b>Figma, Zeplin, Photoshop</b></li>
                  <li>Composants animés : <b>sliders, menus, transitions</b></li>
                  <li>IA générative : ChatGPT, Cursor, Claude, Vercel v0</li>
                  <li>Garantie du <b>pixel-perfect</b> &amp; guidelines UI</li>
                  <li>Optimisation <b>SEO technique</b> &amp; performance</li>
                </ul>
              </div>
              <div>
                <h4>Projet &amp; collaboration</h4>
                <ul>
                  <li>Réunions de conception &amp; <b>échanges directs clients</b></li>
                  <li>Estimation des charges &amp; choix technos</li>
                  <li><b>Encadrement d'alternants</b> : formation, suivi, feedback</li>
                </ul>
              </div>
              <div>
                <h4>Environnement</h4>
                <ul>
                  <li><b>Git</b> au quotidien</li>
                  <li><b>Chrome DevTools</b> · tests responsive</li>
                  <li>WordPress · Shopify · PrestaShop</li>
                </ul>
              </div>
            </div>
          </article>
        </section>

        {/* AI WORKFLOW */}
        <section id="ai">
          <div className="sec-head reveal">
            <span className="sec-num mono">02</span>
            <h2>Dev augmenté par l'IA</h2>
            <span className="meta mono">human-in-the-loop</span>
          </div>
          <p className="ai-lead reveal">
            Je ne me contente pas de générer du code, je l'<b>orchestre</b>. L'IA absorbe le répétitif ;
            je garde la main sur l'<b>architecture</b>, la <b>performance</b> et la <b>qualité</b>.
            Résultat : je livre <b>plus vite</b>, sans jamais sacrifier la maîtrise.
          </p>
          <div className="ai-grid">
            <div className="terminal reveal" data-tag="div.terminal">
              <div className="term-bar">
                <span className="dots">
                  <i className="dot" style={{ background: '#ff5f57' }} />
                  <i className="dot" style={{ background: '#febc2e' }} />
                  <i className="dot" style={{ background: '#28c840' }} />
                </span>
                <span className="term-title mono">noutcha@agency: ~/profile</span>
              </div>
              <div className="term-body mono">
                <div className="term-line cmd"><span className="prompt">$</span> cat noutcha.config.js</div>
                <div className="term-line code"><span className="kw">const</span> <span className="fn">noutcha</span> = {'{'}</div>
                {CONFIG.map((c) => (
                  <div className="term-line code" key={c.k}>
                    {'  '}<span className="key">{c.k}</span>: <span className="str">{c.v}</span>,
                  </div>
                ))}
                <div className="term-line code">{'}'}</div>
                <div className="term-line cmt"># l'IA assiste, je reste l'auteur</div>
                <div className="term-line cmd"><span className="prompt">$</span> <span className="caret" /></div>
              </div>
            </div>
            <div className="ai-points">
              {AI_POINTS.map((p) => (
                <div className="ai-point inspect reveal" data-tag="div.ai-point" key={p.h}>
                  <h4>{p.h}</h4>
                  <p>{p.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills">
          <div className="sec-head reveal">
            <span className="sec-num mono">03</span>
            <h2>Compétences</h2>
            <span className="meta mono">stack.json</span>
          </div>
          <div className="skills-grid">
            {SKILLS.map((s) => (
              <div className="skcard tilt inspect reveal" data-tag="div.skill" key={s.lab}>
                <div className="lab">{s.lab} <span>{s.tag}</span></div>
                <div className="tagrow">
                  {s.items.map((it) => <span className="t" key={it}>{it}</span>)}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects">
          <div className="sec-head reveal">
            <span className="sec-num mono">04</span>
            <h2>Projets</h2>
            <span className="meta mono">4 sélectionnés</span>
          </div>
          <div className="proj">
            {PROJECTS.map((p) => (
              <a className="pcard tilt reveal" href={p.url} target="_blank" rel="noopener noreferrer" key={p.id} aria-label={`Voir le projet ${p.name} (nouvel onglet)`}>
                <span className="go" aria-hidden="true">↗</span>
                <span className="num mono">{p.id}</span>
                <h3>{p.name}</h3>
                <span className="type mono">{p.type}</span>
                <br />
                <span className={`badge ${p.cls} mono`}>{p.badge}</span>
              </a>
            ))}
          </div>
        </section>

        {/* EDU / LANG */}
        <section id="more">
          <div className="sec-head reveal">
            <span className="sec-num mono">05</span>
            <h2>Formation &amp; profil</h2>
          </div>
          <div className="two">
            <div className="minicard inspect reveal" data-tag="div.education">
              <div className="lab">Formation</div>
              <h3>Master · Manager de la communication numérique</h3>
              <p>Pôle Universitaire Léonard de Vinci · Institut de l'Internet et du Multimédia · La Défense, France</p>
              <div className="yr mono">2017 → 2021</div>
            </div>
            <div className="minicard reveal">
              <div className="lab">Langues &amp; intérêts</div>
              <div className="langrow"><span className="nm">Français</span><span className="bar"><i style={{ width: '100%' }} /></span></div>
              <div className="langrow"><span className="nm">Anglais</span><span className="bar"><i style={{ width: '78%' }} /></span></div>
              <p style={{ marginTop: '18px' }}><span className="mono" style={{ color: 'var(--cyan)' }}>⚽</span> Football</p>
            </div>
          </div>
        </section>

        <footer>
          <a className="cta" href={`mailto:${EMAIL}`}>$ contact --now <span>→</span></a>
          <div className="links">
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <a href={`tel:${TEL_HREF}`}>{TEL_DISPLAY}</a>
          </div>
          <div className="small">Noutcha Tchatat · Développeur Front-End CMS · Paris, FR</div>
        </footer>
      </div>
    </>
  )
}
