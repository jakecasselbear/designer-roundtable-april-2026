/* global React */
const { useState, useEffect, useRef } = React;

/* ============ NAV ============ */
function SandwichIcon({ size = 40 }) {
  // Sandwich-as-hamburger: 3 stacked slices with toppings peeking out
  return (
    <svg viewBox="0 0 80 60" width={size} height={size * 0.75}>
      {/* top bun */}
      <path d="M8 22 Q40 2 72 22 L72 28 L8 28 Z" fill="#D6A441" stroke="#2A1E1A" strokeWidth="2.5" strokeLinejoin="round"/>
      <circle cx="28" cy="14" r="1.5" fill="#2A1E1A"/>
      <circle cx="40" cy="10" r="1.5" fill="#2A1E1A"/>
      <circle cx="52" cy="14" r="1.5" fill="#2A1E1A"/>
      {/* lettuce */}
      <path d="M6 28 Q12 24 18 28 Q24 24 30 28 Q36 24 42 28 Q48 24 54 28 Q60 24 66 28 Q72 24 74 28 L74 34 L6 34 Z" fill="#5D6A3A" stroke="#2A1E1A" strokeWidth="2.5" strokeLinejoin="round"/>
      {/* cheese */}
      <path d="M4 34 L76 34 L76 40 L4 40 Z" fill="#F3D58A" stroke="#2A1E1A" strokeWidth="2.5" strokeLinejoin="round"/>
      {/* meat */}
      <path d="M6 40 L74 40 L74 46 L6 46 Z" fill="#C8302A" stroke="#2A1E1A" strokeWidth="2.5" strokeLinejoin="round"/>
      {/* bottom bun */}
      <path d="M8 46 L72 46 L72 50 Q40 58 8 50 Z" fill="#D6A441" stroke="#2A1E1A" strokeWidth="2.5" strokeLinejoin="round"/>
    </svg>
  );
}

function Nav() {
  return (
    <>
      <div className="ribbon">
        <div className="ribbon-track">
          <span>
            <em>Fresh mozzarella, pulled this morning</em> <span className="dot"/>
            Canton's family market since 1952 <span className="dot"/>
            Sunday gravy — every Sunday, by the quart <span className="dot"/>
            <em>Mangia bene, vivi felice</em> <span className="dot"/>
            Sandwich of the week: The Nonno <span className="dot"/>
          </span>
          <span>
            <em>Fresh mozzarella, pulled this morning</em> <span className="dot"/>
            Canton's family market since 1952 <span className="dot"/>
            Sunday gravy — every Sunday, by the quart <span className="dot"/>
            <em>Mangia bene, vivi felice</em> <span className="dot"/>
            Sandwich of the week: The Nonno <span className="dot"/>
          </span>
        </div>
      </div>
      <nav className="nav">
        <div className="nav-inner">
          <button className="nav-sandwich-btn" aria-label="Menu">
            <SandwichIcon size={42} />
          </button>
          <a href="#" className="nav-logo">
            <span className="mark">D</span>
            <span>DioGuardi's <em style={{fontFamily: "var(--serif)", fontStyle: "italic", opacity: 0.8, fontSize: 15}}>Italian Market &amp; Deli</em></span>
          </a>
          <div className="nav-links" style={{justifySelf: "end"}}>
            <a href="#market">Market</a>
            <a href="#builder">Sandwich Builder</a>
            <a href="#specials">Specials</a>
            <a href="#chefs">Our Chefs</a>
            <a href="#visit">Visit</a>
          </div>
          <div className="nav-phone">
            <span className="mono" style={{marginRight: 8, opacity: 0.7}}>CALL</span>
            (330) 452-0719
          </div>
        </div>
      </nav>
    </>
  );
}

/* ============ HERO ============ */
function Hero() {
  return (
    <section className="section" style={{paddingTop: 48, paddingBottom: 32}}>
      <div className="wrap" style={{display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 40, alignItems: "stretch"}}>
        {/* LEFT: editorial copy */}
        <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
          <div>
            <div style={{display: "flex", alignItems: "center", gap: 12, marginBottom: 18}}>
              <span className="mono" style={{background: "var(--ink)", color: "var(--cream)", padding: "6px 12px", borderRadius: 999}}>EST. 1952 · CANTON, OHIO</span>
              <span className="hand" style={{fontSize: 26, color: "var(--tomato-deep)"}}>— three generations deep —</span>
            </div>
            <h1 className="display" style={{
              fontSize: "clamp(54px, 7vw, 104px)",
              lineHeight: 0.95,
              margin: "8px 0 18px",
              color: "var(--ink)",
              textWrap: "balance"
            }}>
              Come in, <em style={{color: "var(--tomato-deep)", fontFamily: "var(--display)"}}>sit</em>,<br/>
              have a little <span style={{color: "var(--teal-deep)"}}>something</span>.
            </h1>
            <p className="serif" style={{fontSize: 20, maxWidth: 520, color: "var(--ink-soft)", lineHeight: 1.5, textWrap: "pretty"}}>
              A proper Italian market in the heart of Canton — hand-cut prosciutto, mozzarella pulled this morning,
              sandwiches stacked by people who learned at the elbow of their nonna. <em>Benvenuti in famiglia.</em>
            </p>
          </div>

          <div style={{display: "flex", gap: 14, marginTop: 28, flexWrap: "wrap"}}>
            <a href="#builder" className="btn">Build your sandwich →</a>
            <a href="#specials" className="btn ghost">Today's specials</a>
          </div>

          {/* marquee stats strip */}
          <div style={{
            marginTop: 32,
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            borderTop: "2px solid var(--ink)",
            borderBottom: "2px solid var(--ink)",
            background: "var(--cream)"
          }}>
            {[
              ["74", "years, same family"],
              ["18", "kinds of cured meat"],
              ["1", "wood oven out back"],
              ["∞", "cannoli available"]
            ].map(([n, l], i) => (
              <div key={i} style={{
                padding: "14px 14px",
                borderRight: i < 3 ? "1.5px dashed var(--ink)" : "none",
                textAlign: "center"
              }}>
                <div className="display" style={{fontSize: 34, lineHeight: 1, color: "var(--tomato-deep)"}}>{n}</div>
                <div className="mono" style={{fontSize: 10, marginTop: 6, color: "var(--ink-soft)"}}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: layered hero photo + stickers */}
        <div style={{position: "relative", minHeight: 560}}>
          <div className="ph" style={{
            position: "absolute",
            inset: 0,
            borderRadius: 6,
            border: "3px solid var(--ink)",
            boxShadow: "10px 10px 0 var(--ink)"
          }}>
            <div className="ph-label">HERO PHOTO — storefront on Cleveland Ave, evening light, window full of prosciutto</div>
          </div>

          {/* polaroid top-right */}
          <div style={{
            position: "absolute", top: -18, right: -10,
            width: 180, transform: "rotate(6deg)",
            background: "var(--paper)", padding: 8, paddingBottom: 28,
            border: "1.5px solid var(--ink)", boxShadow: "4px 4px 0 var(--ink)",
            zIndex: 2
          }}>
            <div className="ph" style={{height: 140, border: "1px solid var(--ink)"}}>
              <div className="ph-label">nonna &amp; dough</div>
            </div>
            <div className="hand" style={{textAlign: "center", marginTop: 6, fontSize: 18, color: "var(--ink-soft)"}}>
              Nonna Rosa, 1974
            </div>
          </div>

          {/* stamp bottom-left */}
          <div style={{
            position: "absolute", bottom: -20, left: -20,
            width: 140, height: 140,
            borderRadius: "50%",
            background: "var(--tomato)",
            color: "var(--cream)",
            border: "3px solid var(--ink)",
            display: "grid", placeItems: "center",
            transform: "rotate(-12deg)",
            boxShadow: "5px 5px 0 var(--ink)",
            zIndex: 3
          }}>
            <div style={{textAlign: "center", lineHeight: 1.05}}>
              <div className="display" style={{fontSize: 20}}>VOTED</div>
              <div className="display" style={{fontSize: 40, lineHeight: 1}}>#1</div>
              <div className="mono" style={{fontSize: 9}}>DELI · STARK CO.</div>
              <div className="hand" style={{fontSize: 14}}>2019–2025</div>
            </div>
          </div>

          {/* little teal tag */}
          <div style={{
            position: "absolute", bottom: 40, right: -14,
            background: "var(--teal)", color: "var(--cream)",
            padding: "10px 16px",
            border: "2px solid var(--ink)",
            borderRadius: 999,
            transform: "rotate(4deg)",
            boxShadow: "3px 3px 0 var(--ink)",
            zIndex: 3
          }}>
            <span className="hand" style={{fontSize: 22}}>Fresh mozz daily!</span>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Nav, Hero, SandwichIcon });
