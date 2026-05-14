import { useState, useEffect } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'

// ── SEO helpers ──────────────────────────────────────────────────────────────

function setMeta(name, content) {
  let el = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`)
  if (!el) { el = document.createElement('meta'); document.head.appendChild(el) }
  el.setAttribute(name.startsWith('og:') ? 'property' : 'name', name)
  el.setAttribute('content', content)
}
function setLink(rel, href) {
  let el = document.querySelector(`link[rel="${rel}"]`)
  if (!el) { el = document.createElement('link'); document.head.appendChild(el) }
  el.setAttribute('rel', rel); el.setAttribute('href', href)
}
function injectJsonLd(id, data) {
  let el = document.getElementById(id)
  if (!el) { el = document.createElement('script'); el.id = id; el.type = 'application/ld+json'; document.head.appendChild(el) }
  el.textContent = JSON.stringify(data)
}

function PageHead({ title, description, canonical, jsonLd }) {
  useEffect(() => {
    document.title = title
    setMeta('description', description)
    setMeta('og:title', title)
    setMeta('og:description', description)
    setMeta('og:url', canonical)
    setLink('canonical', canonical)
    if (jsonLd) injectJsonLd('page-jsonld', jsonLd)
  }, [title, description, canonical, jsonLd])
  return null
}

// ── Scroll to top on route change ────────────────────────────────────────────

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

// ── Navbar ───────────────────────────────────────────────────────────────────

function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-logo" onClick={() => setOpen(false)}>
          <img src="/assets/logo-icon.png" alt="ClearMind Finance" />
        </Link>
        <button className="nav-toggle" onClick={() => setOpen(o => !o)} aria-label="Toggle menu">
          <span /><span /><span />
        </button>
        <ul className={`navbar-links ${open ? 'open' : ''}`}>
          <li><Link to="/" onClick={() => setOpen(false)}>Home</Link></li>
          <li><Link to="/about" onClick={() => setOpen(false)}>About</Link></li>
          <li><Link to="/calculator" onClick={() => setOpen(false)}>Calculator</Link></li>
          <li><Link to="/apply" onClick={() => setOpen(false)}>Apply</Link></li>
        </ul>
        <Link to="/apply" className="btn btn-primary navbar-cta">Get Started</Link>
      </div>
    </nav>
  )
}

// ── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <div className="footer-logo">
              <img src="/assets/logo-icon.png" alt="ClearMind Finance" />
            </div>
            <p className="footer-tagline">Educate. Navigate. Elevate.</p>
            <p style={{marginTop:'1rem',fontSize:'0.9rem'}}>
              Smart finance solutions for Australians who deserve better than a bank knockback.
            </p>
          </div>
          <div className="footer-col">
            <h4>Navigate</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/calculator">Calculator</a></li>
              <li><a href="/apply">Apply Now</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Legal</h4>
            <ul>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms of Use</a></li>
            </ul>
            <h4 style={{marginTop:'1.5rem'}}>Contact</h4>
            <ul>
              <li><a href="mailto:hello@clearmindfinance.com.au">hello@clearmindfinance.com.au</a></li>
              <li><a href="tel:0478560696">0478 560 696</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} BrokenMind Software. All rights reserved.</p>
          <p>ClearMind Finance | Australian Credit Licence conditions apply. <a href="/privacy">Privacy Policy</a></p>
        </div>
      </div>
    </footer>
  )
}

// ── JSON-LD schemas ───────────────────────────────────────────────────────────

const businessSchema = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  "name": "ClearMind Finance",
  "url": "https://clearmindfinance.com.au",
  "telephone": "0478560696",
  "email": "hello@clearmindfinance.com.au",
  "description": "Asset finance broker helping Australians secure vehicle, equipment and personal finance with smart automation.",
  "slogan": "Educate. Navigate. Elevate.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Thornlands",
    "addressRegion": "QLD",
    "postalCode": "4164",
    "addressCountry": "AU"
  },
  "areaServed": "AU",
  "priceRange": "Free consultation"
}

// ── Home page ─────────────────────────────────────────────────────────────────

function HomePage() {
  return (
    <>
      <PageHead
        title="ClearMind Finance | Educate. Navigate. Elevate."
        description="ClearMind Finance uses smart automation to get your asset finance approved faster. Vehicle, equipment, self-employed and bad credit finance across Australia."
        canonical="https://clearmindfinance.com.au/"
        jsonLd={businessSchema}
      />

      {/* Hero */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="container hero-grid">
          <div>
            <div className="hero-eyebrow">Smart Finance. Real Results.</div>
            <h1 className="hero-title">
              Finance,<br />
              <span className="blue">without the friction.</span>
            </h1>
            <p className="hero-tagline">Educate. Navigate. Elevate.</p>
            <p className="hero-sub">
              We use intelligent automation to match you with the right lender and get your deal across the line — faster than the old way.
            </p>
            <div className="hero-actions">
              <Link to="/apply" className="btn btn-primary">Apply Now →</Link>
              <Link to="/calculator" className="btn btn-outline">Repayment Calculator</Link>
            </div>
          </div>
          <div className="hero-image-wrap">
            <img
              src="/assets/banner-square.png"
              alt="ClearMind Finance — Educate Navigate Elevate"
              className="hero-image"
            />
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div className="stats-bar">
        <div className="container stats-inner">
          <div className="stat">
            <div className="stat-num">5+</div>
            <div className="stat-label">Years Experience</div>
          </div>
          <div className="stat">
            <div className="stat-num">30+</div>
            <div className="stat-label">Lender Panel</div>
          </div>
          <div className="stat">
            <div className="stat-num">Fast</div>
            <div className="stat-label">Same-Day Assessment</div>
          </div>
          <div className="stat">
            <div className="stat-num">Free</div>
            <div className="stat-label">No Upfront Cost</div>
          </div>
        </div>
      </div>

      {/* How it works */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Simple Process</span>
            <h2>Three steps to approved</h2>
            <p>No paperwork mountains. No waiting weeks. Our automated process does the heavy lifting.</p>
          </div>
          <div className="steps-grid">
            {[
              { n: '1', title: 'Tell us what you need', body: 'Fill in our quick application. Takes 3 minutes. No credit check at this stage.' },
              { n: '2', title: 'We find your match', body: 'Our system cross-checks 30+ lenders against your situation and identifies the best fit.' },
              { n: '3', title: 'Get approved', body: 'We lodge the application, manage the process, and get your answer fast — often same day.' },
            ].map(s => (
              <div key={s.n} className="card">
                <div className="step-num">{s.n}</div>
                <h3>{s.title}</h3>
                <p style={{marginTop:'0.5rem'}}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Finance types */}
      <section className="section" style={{paddingTop:0}}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">What We Finance</span>
            <h2>Whatever you need, we've got a lender for it</h2>
          </div>
          <div className="types-grid">
            {[
              { icon: '🚗', title: 'Vehicle Finance', body: 'Cars, utes, vans, trucks. New or used.' },
              { icon: '🏗️', title: 'Equipment Finance', body: 'Tools, machinery, trailers, yellow goods.' },
              { icon: '🧾', title: 'Self-Employed', body: 'ABN holders, low-doc, sole traders welcome.' },
              { icon: '📉', title: 'Bad Credit', body: "Knockbacks happen. We find lenders who look past them." },
              { icon: '🔄', title: 'Refinance', body: 'Better rate on an existing loan? Let us check.' },
            ].map(t => (
              <Link to="/apply" key={t.title} className="card type-card" style={{textDecoration:'none'}}>
                <span className="type-icon">{t.icon}</span>
                <h3>{t.title}</h3>
                <p>{t.body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ENE Pillars */}
      <section className="section" style={{background:'var(--navy-mid)'}}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Our Philosophy</span>
            <h2>Why ClearMind?</h2>
          </div>
          <div className="pillars-grid">
            <div className="card pillar">
              <div className="pillar-letter">E</div>
              <div className="pillar-word">Educate</div>
              <h3>Know your options</h3>
              <p>We explain what lenders actually look at, what your rate means, and what to expect — in plain English, not banker speak.</p>
            </div>
            <div className="card pillar">
              <div className="pillar-letter">N</div>
              <div className="pillar-word">Navigate</div>
              <h3>Find the right path</h3>
              <p>Not every lender suits every situation. We know the panel, we know the policies, and we know how to get your deal structured correctly.</p>
            </div>
            <div className="card pillar">
              <div className="pillar-letter">E</div>
              <div className="pillar-word">Elevate</div>
              <h3>Get where you want to be</h3>
              <p>Finance is a tool. We help you use it to move forward — whether that's a new vehicle, business equipment, or building your credit history.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to <span className="blue">clear your path?</span></h2>
          <p>Free assessment. No obligation. No credit check to get started.</p>
          <div style={{display:'flex',gap:'1rem',justifyContent:'center',flexWrap:'wrap'}}>
            <Link to="/apply" className="btn btn-primary">Apply Now →</Link>
            <Link to="/about" className="btn btn-outline">Meet Your Broker</Link>
          </div>
        </div>
      </section>
    </>
  )
}

// ── About page ────────────────────────────────────────────────────────────────

function AboutPage() {
  return (
    <>
      <PageHead
        title="About ClearMind Finance | Brisbane Asset Finance Broker"
        description="Meet Josh — asset finance broker with 5+ years experience helping Australians secure vehicle, equipment and business finance. Based in Brisbane, QLD."
        canonical="https://clearmindfinance.com.au/about"
      />
      <div className="page-hero">
        <div className="container">
          <span className="section-tag">Your Broker</span>
          <h1>A broker who actually<br /><span className="blue">picks up the phone.</span></h1>
          <p>ClearMind Finance exists because finance shouldn't be confusing, slow, or full of runaround.</p>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <div className="about-grid">
            <div>
              <img src="/assets/banner-landscape.png" alt="ClearMind Finance" className="about-img" />
            </div>
            <div>
              <h2>Josh Marien<br /><span className="blue" style={{fontSize:'1rem',fontWeight:600}}>Asset Finance Broker</span></h2>
              <p style={{marginTop:'1rem'}}>
                I've been in finance since 2015 — across consumer lending, credit management, and now asset finance broking. I've seen how banks treat people when their situation doesn't fit the box. ClearMind Finance is built on doing it differently.
              </p>
              <p style={{marginTop:'1rem'}}>
                I use technology to speed up the process — automated lender matching, digital doc collection, fast lodgement — but the conversation is always with a real person who knows your file.
              </p>
              <ul className="credential-list" style={{marginTop:'1.5rem'}}>
                <li>Cert IV Finance Broking</li>
                <li>5+ years asset finance experience</li>
                <li>Access to 30+ lender panel</li>
                <li>Vehicle, equipment & personal finance specialist</li>
                <li>Brisbane-based, Australia-wide service</li>
              </ul>
              <Link to="/apply" className="btn btn-primary" style={{marginTop:'2rem'}}>Work with me →</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

// ── Apply page ────────────────────────────────────────────────────────────────

function ApplyPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    const data = Object.fromEntries(new FormData(e.target))
    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, source: 'apply-page' }),
      })
    } catch (_) {}
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <>
      <PageHead
        title="Apply for Finance | ClearMind Finance"
        description="Start your finance application with ClearMind Finance. Free assessment, no obligation, no credit check to get started. Vehicle, equipment and personal finance."
        canonical="https://clearmindfinance.com.au/apply"
      />
      <div className="page-hero">
        <div className="container">
          <span className="section-tag">Get Started</span>
          <h1>Let's find your <span className="blue">finance solution.</span></h1>
          <p>Takes 3 minutes. Free assessment. No credit check at this stage.</p>
        </div>
      </div>
      <section className="section" style={{paddingTop:'2rem'}}>
        <div className="container">
          <div className="form-wrap">
            {submitted ? (
              <div className="card form-success">
                <h3>✓ Application received</h3>
                <p>Thanks for reaching out. I'll review your details and be in touch within 1 business day — usually faster.</p>
                <Link to="/" className="btn btn-outline" style={{marginTop:'1.5rem'}}>Back to Home</Link>
              </div>
            ) : (
              <form className="card" onSubmit={handleSubmit}>
                <div className="form-grid">
                  <div className="form-field">
                    <label>First Name *</label>
                    <input name="firstName" required placeholder="Josh" />
                  </div>
                  <div className="form-field">
                    <label>Last Name *</label>
                    <input name="lastName" required placeholder="Smith" />
                  </div>
                  <div className="form-field">
                    <label>Email *</label>
                    <input name="email" type="email" required placeholder="you@email.com" />
                  </div>
                  <div className="form-field">
                    <label>Phone *</label>
                    <input name="phone" type="tel" required placeholder="04XX XXX XXX" />
                  </div>
                  <div className="form-field full">
                    <label>Finance Type *</label>
                    <select name="financeType" required>
                      <option value="">Select what you need...</option>
                      <option>Vehicle Finance — Car / Ute / Van</option>
                      <option>Equipment Finance</option>
                      <option>Self-Employed / Low Doc</option>
                      <option>Bad Credit Finance</option>
                      <option>Refinance Existing Loan</option>
                      <option>Personal Loan</option>
                      <option>Not sure — need advice</option>
                    </select>
                  </div>
                  <div className="form-field full">
                    <label>Loan Amount (approx)</label>
                    <select name="loanAmount">
                      <option value="">Select range...</option>
                      <option>Under $10,000</option>
                      <option>$10,000 – $25,000</option>
                      <option>$25,000 – $50,000</option>
                      <option>$50,000 – $100,000</option>
                      <option>Over $100,000</option>
                    </select>
                  </div>
                  <div className="form-field full">
                    <label>Employment Status</label>
                    <select name="employment">
                      <option value="">Select...</option>
                      <option>Full-time PAYG</option>
                      <option>Part-time / Casual</option>
                      <option>Self-Employed / ABN</option>
                      <option>Centrelink / Benefits</option>
                      <option>Retired</option>
                    </select>
                  </div>
                  <div className="form-field full">
                    <label>Anything else we should know?</label>
                    <textarea name="notes" placeholder="Bad credit, recent defaults, previous knockbacks — tell me anything relevant. The more I know, the better I can help." />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary form-submit" disabled={loading}>
                  {loading ? 'Sending...' : 'Submit Application →'}
                </button>
                <p style={{textAlign:'center',marginTop:'1rem',fontSize:'0.8rem',color:'var(--text-muted)'}}>
                  No credit check at this stage. Your info is kept private. <a href="/privacy" style={{color:'var(--blue-bright)'}}>Privacy Policy</a>
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

// ── Calculator page ───────────────────────────────────────────────────────────

function CalculatorPage() {
  const [amount, setAmount] = useState(25000)
  const [rate, setRate] = useState(8.5)
  const [term, setTerm] = useState(60)
  const [leadSent, setLeadSent] = useState(false)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')

  const monthly = (() => {
    const r = rate / 100 / 12
    if (r === 0) return amount / term
    return (amount * r * Math.pow(1 + r, term)) / (Math.pow(1 + r, term) - 1)
  })()

  const totalRepay = monthly * term
  const totalInterest = totalRepay - amount

  async function captureEmail(e) {
    e.preventDefault()
    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, source: 'calculator', amount, rate, term, monthly: monthly.toFixed(2) }),
      })
    } catch (_) {}
    setLeadSent(true)
  }

  return (
    <>
      <PageHead
        title="Loan Repayment Calculator | ClearMind Finance"
        description="Calculate your estimated monthly repayments for a car loan, equipment finance or personal loan. Free calculator from ClearMind Finance."
        canonical="https://clearmindfinance.com.au/calculator"
      />
      <div className="page-hero">
        <div className="container">
          <span className="section-tag">Free Tool</span>
          <h1>Repayment <span className="blue">Calculator</span></h1>
          <p>Estimate your monthly repayments in seconds.</p>
        </div>
      </div>
      <section className="section" style={{paddingTop:'2rem'}}>
        <div className="container">
          <div className="calc-wrap">
            <div className="card">
              <div className="form-grid" style={{gap:'1.5rem'}}>
                <div className="form-field full">
                  <label>Loan Amount: <strong style={{color:'var(--blue-bright)'}}>$&thinsp;{amount.toLocaleString()}</strong></label>
                  <input type="range" min="5000" max="200000" step="1000" value={amount} onChange={e => setAmount(Number(e.target.value))}
                    style={{width:'100%',accentColor:'var(--blue)'}} />
                  <div style={{display:'flex',justifyContent:'space-between',fontSize:'0.75rem',color:'var(--text-muted)'}}>
                    <span>$5,000</span><span>$200,000</span>
                  </div>
                </div>
                <div className="form-field full">
                  <label>Interest Rate: <strong style={{color:'var(--blue-bright)'}}>{rate}% p.a.</strong></label>
                  <input type="range" min="4" max="25" step="0.5" value={rate} onChange={e => setRate(Number(e.target.value))}
                    style={{width:'100%',accentColor:'var(--blue)'}} />
                  <div style={{display:'flex',justifyContent:'space-between',fontSize:'0.75rem',color:'var(--text-muted)'}}>
                    <span>4%</span><span>25%</span>
                  </div>
                </div>
                <div className="form-field full">
                  <label>Loan Term: <strong style={{color:'var(--blue-bright)'}}>{term / 12} years ({term} months)</strong></label>
                  <input type="range" min="12" max="84" step="12" value={term} onChange={e => setTerm(Number(e.target.value))}
                    style={{width:'100%',accentColor:'var(--blue)'}} />
                  <div style={{display:'flex',justifyContent:'space-between',fontSize:'0.75rem',color:'var(--text-muted)'}}>
                    <span>1 yr</span><span>7 yrs</span>
                  </div>
                </div>
              </div>

              <div className="calc-result">
                <div className="calc-result-num">${monthly.toFixed(2)}<span style={{fontSize:'1.2rem',fontWeight:400}}>/mo</span></div>
                <div className="calc-result-label">Estimated monthly repayment</div>
                <div style={{display:'flex',justifyContent:'center',gap:'2rem',marginTop:'1rem',flexWrap:'wrap'}}>
                  <div style={{textAlign:'center'}}>
                    <div style={{fontSize:'1.1rem',fontWeight:700,color:'var(--white)'}}>${totalRepay.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div>
                    <div style={{fontSize:'0.75rem',color:'var(--text-muted)'}}>Total Repayable</div>
                  </div>
                  <div style={{textAlign:'center'}}>
                    <div style={{fontSize:'1.1rem',fontWeight:700,color:'var(--white)'}}>${totalInterest.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div>
                    <div style={{fontSize:'0.75rem',color:'var(--text-muted)'}}>Total Interest</div>
                  </div>
                </div>
              </div>

              <p style={{fontSize:'0.75rem',color:'var(--text-muted)',textAlign:'center',marginTop:'1rem'}}>
                Indicative only. Actual rate depends on your profile, lender and product. For a real rate, apply below.
              </p>
            </div>

            {!leadSent ? (
              <div className="card" style={{marginTop:'1.5rem'}}>
                <h3>Get a real quote emailed to you</h3>
                <p style={{marginTop:'0.5rem',fontSize:'0.9rem'}}>Enter your details and I'll follow up with actual rates based on your situation.</p>
                <form onSubmit={captureEmail} style={{marginTop:'1.25rem',display:'flex',flexDirection:'column',gap:'1rem'}}>
                  <div className="form-grid">
                    <div className="form-field">
                      <label>Name</label>
                      <input value={name} onChange={e => setName(e.target.value)} required placeholder="Your name" />
                    </div>
                    <div className="form-field">
                      <label>Email</label>
                      <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@email.com" />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary" style={{alignSelf:'flex-start'}}>Send me real rates →</button>
                </form>
              </div>
            ) : (
              <div className="card" style={{marginTop:'1.5rem',textAlign:'center'}}>
                <p style={{color:'var(--blue-bright)',fontWeight:600}}>✓ Got it — I'll be in touch with real rates shortly.</p>
              </div>
            )}

            <div style={{textAlign:'center',marginTop:'2rem'}}>
              <Link to="/apply" className="btn btn-primary">Ready to apply? →</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

// ── Privacy page ─────────────────────────────────────────────────────────────

function PrivacyPage() {
  return (
    <>
      <PageHead
        title="Privacy Policy | ClearMind Finance"
        description="ClearMind Finance privacy policy. How we collect, use and protect your personal information."
        canonical="https://clearmindfinance.com.au/privacy"
      />
      <div className="page-hero">
        <div className="container"><h1>Privacy Policy</h1><p>Last updated: May 2026</p></div>
      </div>
      <section className="section" style={{paddingTop:'2rem'}}>
        <div className="container prose">
          <h2>1. Information We Collect</h2>
          <p>We collect personal information you provide when completing our application form or contacting us, including name, email, phone number, financial situation details and employment status.</p>
          <h2>2. How We Use Your Information</h2>
          <ul>
            <li>To assess your finance enquiry and match you with suitable lenders</li>
            <li>To contact you regarding your application</li>
            <li>To send you relevant information about finance options (you can unsubscribe at any time)</li>
          </ul>
          <h2>3. Disclosure of Information</h2>
          <p>We may share your information with lenders and credit providers as part of the loan application process, with your consent. We do not sell your data to third parties.</p>
          <h2>4. Data Security</h2>
          <p>Your information is transmitted securely and stored in compliance with Australian Privacy Principles under the Privacy Act 1988.</p>
          <h2>5. Contact Us</h2>
          <p>For privacy enquiries: <a href="mailto:hello@clearmindfinance.com.au" style={{color:'var(--blue-bright)'}}>hello@clearmindfinance.com.au</a></p>
        </div>
      </section>
    </>
  )
}

// ── Terms page ────────────────────────────────────────────────────────────────

function TermsPage() {
  return (
    <>
      <PageHead
        title="Terms of Use | ClearMind Finance"
        description="ClearMind Finance terms of use and service conditions."
        canonical="https://clearmindfinance.com.au/terms"
      />
      <div className="page-hero">
        <div className="container"><h1>Terms of Use</h1><p>Last updated: May 2026</p></div>
      </div>
      <section className="section" style={{paddingTop:'2rem'}}>
        <div className="container prose">
          <h2>1. General</h2>
          <p>By using this website you agree to these terms. ClearMind Finance is a credit assistance provider. We are not a lender.</p>
          <h2>2. Information Only</h2>
          <p>Content on this site is general in nature and does not constitute financial advice. You should consider whether any product is right for your personal circumstances.</p>
          <h2>3. Calculator Disclaimer</h2>
          <p>The repayment calculator provides estimates only. Actual repayments, rates and fees will vary based on your credit profile, the lender and the specific product. This is not a credit quote.</p>
          <h2>4. Limitation of Liability</h2>
          <p>ClearMind Finance is not liable for any loss arising from reliance on information provided on this site.</p>
          <h2>5. Contact</h2>
          <p><a href="mailto:hello@clearmindfinance.com.au" style={{color:'var(--blue-bright)'}}>hello@clearmindfinance.com.au</a></p>
        </div>
      </section>
    </>
  )
}

// ── 404 ───────────────────────────────────────────────────────────────────────

function NotFoundPage() {
  return (
    <div className="page-hero" style={{minHeight:'60vh',display:'flex',alignItems:'center'}}>
      <div className="container" style={{textAlign:'center'}}>
        <div style={{fontSize:'5rem',marginBottom:'1rem'}}>404</div>
        <h2>Page not found</h2>
        <p style={{marginTop:'0.5rem'}}>This page doesn't exist.</p>
        <Link to="/" className="btn btn-primary" style={{marginTop:'2rem'}}>Go Home</Link>
      </div>
    </div>
  )
}

// ── App root ──────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/apply" element={<ApplyPage />} />
          <Route path="/calculator" element={<CalculatorPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
