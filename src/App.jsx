import { useEffect, useRef } from 'react'
import photo from './photo.jpg'

const SKILLS = [
  { lab: 'Langages', tag: '// code', items: ['HTML', 'CSS', 'JavaScript', 'PHP'] },
  { lab: 'Frameworks', tag: '// ui', items: ['Bootstrap', 'React'] },
  { lab: 'CMS', tag: '// platforms', items: ['WordPress', 'Shopify', 'PrestaShop'] },
  { lab: 'Outils IA', tag: '// gen', items: ['Cursor', 'ChatGPT', 'Claude Code', 'Vercel v0'] },
  { lab: 'Design', tag: '// proto', items: ['Figma', 'Canva', 'Photoshop'] },
  { lab: 'Bases de données', tag: '// data', items: ['SQL'] },
]

const PROJECTS = [
  { id: 'P-01', url: 'https://kosmos-3d.fr', name: 'kosmos-3d.fr', type: 'Site vitrine', badge: 'WordPress', cls: 'b-wp' },
  { id: 'P-02', url: 'https://www.carresol-parquet.com', name: 'carresol-parquet.com', type: 'Boutique · refonte complète', badge: 'PrestaShop', cls: 'b-ps' },
  { id: 'P-03', url: 'https://www.welfaire.com', name: 'welfaire.com', type: 'Site vitrine', badge: 'WordPress', cls: 'b-wp' },
  { id: 'P-04', url: 'https://frenchica.com', name: 'frenchica.com', type: 'E-commerce', badge: 'WordPress', cls: 'b-wp' },
]

export default function App() {
  const hudRef = useRef(null)

  // Inspector HUD : suit le curseur sur les éléments .inspect
  useEffect(() => {
    const hud = hudRef.current
    const els = Array.from(document.querySelectorAll('.inspect'))
    const onMove = (el) => (e) => {
      hud.textContent = el.dataset.tag || el.tagName.toLowerCase()
      hud.style.left = e.clientX + 'px'
      hud.style.top = e.clientY + 'px'
      hud.style.opacity = '1'
    }
    const onLeave = () => { hud.style.opacity = '0' }
    const handlers = els.map((el) => {
      const move = onMove(el)
      el.addEventListener('mousemove', move)
      el.addEventListener('mouseleave', onLeave)
      return { el, move }
    })
    return () => handlers.forEach(({ el, move }) => {
      el.removeEventListener('mousemove', move)
      el.removeEventListener('mouseleave', onLeave)
    })
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

  return (
    <>
      <div id="hud" ref={hudRef} />

      <div className="topbar">
        <span className="dots">
          <i className="dot" style={{ background: '#ff5f57' }} />
          <i className="dot" style={{ background: '#febc2e' }} />
          <i className="dot" style={{ background: '#28c840' }} />
        </span>
        <span className="url mono">https://noutcha.dev/cv — front-end-cms</span>
        <span className="stat mono">● online</span>
      </div>

      <div className="wrap">
        {/* HERO */}
        <header className="hero">
          <img className="avatar inspect" data-tag="img.avatar" src={photo} alt="Noutcha Tchatat" />
          <div className="eyebrow">
            <span className="blink" />&lt;dev role="front-end"&gt; <span className="tag">// CMS specialist · Paris</span>
          </div>
          <h1 className="inspect" data-tag="h1#name">Noutcha<br /><span className="l2">Tchatat.</span></h1>
          <p className="role">Intégrateur web → <b>Développeur Front-End CMS</b> · <b>6 ans</b> en agence · <b>100+ projets</b></p>
          <p className="intro inspect" data-tag="p.intro">
            J'intègre et développe des front-ends <strong>pixel-perfect</strong> sur WordPress, Shopify et PrestaShop,
            en collaboration avec des équipes design, SEO et marketing. Je cherche un poste à <strong>plus de responsabilités</strong>,
            pour continuer à progresser techniquement sur des projets ambitieux.
          </p>
          <div className="hero-meta">
            <span className="chip mono"><span className="k">@</span><a href="mailto:noutcha.tchatat@gmail.com">noutcha.tchatat@gmail.com</a></span>
            <span className="chip mono"><span className="k">tel</span><a href="tel:0786109127">07 86 10 91 27</a></span>
            <span className="chip mono"><span className="k">geo</span>Paris · Pantin, FR</span>
            <span className="chip mono"><span className="k">lang</span>Anglais — courant</span>
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
              <span className="when mono">02/2019 — 09/2025</span>
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
                  <li><b>Chrome DevTools</b> — tests responsive</li>
                  <li>WordPress · Shopify · PrestaShop</li>
                </ul>
              </div>
            </div>
          </article>
        </section>

        {/* SKILLS */}
        <section id="skills">
          <div className="sec-head reveal">
            <span className="sec-num mono">02</span>
            <h2>Compétences</h2>
            <span className="meta mono">stack.json</span>
          </div>
          <div className="skills-grid">
            {SKILLS.map((s) => (
              <div className="skcard inspect reveal" data-tag="div.skill" key={s.lab}>
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
            <span className="sec-num mono">03</span>
            <h2>Projets</h2>
            <span className="meta mono">4 sélectionnés</span>
          </div>
          <div className="proj">
            {PROJECTS.map((p) => (
              <a className="pcard reveal" href={p.url} target="_blank" rel="noopener" key={p.id}>
                <span className="go">↗</span>
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
            <span className="sec-num mono">04</span>
            <h2>Formation &amp; profil</h2>
          </div>
          <div className="two">
            <div className="minicard inspect reveal" data-tag="div.education">
              <div className="lab">Formation</div>
              <h3>Master — Manager de la communication numérique</h3>
              <p>Pôle Universitaire Léonard de Vinci · Institut de l'Internet et du Multimédia — La Défense, France</p>
              <div className="yr mono">2017 — 2021</div>
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
          <a className="cta" href="mailto:noutcha.tchatat@gmail.com">$ contact --now <span>→</span></a>
          <div className="links">
            <a href="mailto:noutcha.tchatat@gmail.com">noutcha.tchatat@gmail.com</a>
            <a href="tel:0786109127">07 86 10 91 27</a>
          </div>
          <div className="small">Noutcha Tchatat — Développeur Front-End CMS · Paris, FR</div>
        </footer>
      </div>
    </>
  )
}
