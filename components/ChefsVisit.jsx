/* global React */

/* ============ MEET THE CHEFS ============ */
function Chefs() {
  const chefs = [
    {
      name: "Vincenzo DioGuardi",
      role: "Head Chef · Third generation",
      years: "in the kitchen since 1989",
      quote: "My grandfather taught me: if it's not good enough for family, it doesn't leave the kitchen.",
      bg: "var(--tomato)",
      specialty: "Sunday Gravy, Porchetta"
    },
    {
      name: "Maria Russo",
      role: "Pasta & Baking · Sfoglina",
      years: "rolling dough for 22 years",
      quote: "You can feel when it's right. The dough tells you — listen to the dough, always.",
      bg: "var(--teal)",
      specialty: "Hand-cut tagliatelle, focaccia"
    },
    {
      name: "Joey DioGuardi",
      role: "Salumiere · Fourth generation",
      years: "behind the slicer since 2014",
      quote: "Paper thin. Always paper thin. If you can read the newspaper through it, we're close.",
      bg: "var(--mustard)",
      specialty: "Cured meats, cheese pairings"
    },
    {
      name: "Elena Ferraro",
      role: "Pastry · Dolci",
      years: "filling cannoli daily since 2011",
      quote: "I fill them when you order them. A soggy shell is a crime, in my opinion.",
      bg: "var(--olive)",
      specialty: "Cannoli, tiramisù, biscotti"
    }
  ];

  return (
    <section className="section" id="chefs" style={{background: "var(--paper)", position: "relative"}}>
      <div className="wrap">
        <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "end", marginBottom: 40}}>
          <div>
            <div className="mono" style={{color: "var(--tomato-deep)", marginBottom: 6}}>— V · LA FAMIGLIA —</div>
            <h2 className="display" style={{fontSize: 72, margin: 0, lineHeight: 0.95, color: "var(--ink)"}}>
              The people behind <br/>
              <em style={{color: "var(--tomato-deep)"}}>the counter.</em>
            </h2>
          </div>
          <p className="serif" style={{fontSize: 18, color: "var(--ink-soft)", lineHeight: 1.55, textWrap: "pretty"}}>
            A market is only as good as the people in it. Ours showed up as kids, stayed as cousins,
            and kept the recipes their mothers wrote on index cards still taped above the stove.
            Come in long enough and you'll be family too.
          </p>
        </div>

        {/* staggered gallery */}
        <div style={{display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18}}>
          {chefs.map((c, i) => (
            <div key={i} className="chef-card" style={{
              background: "var(--paper)",
              border: "2.5px solid var(--ink)",
              borderRadius: 16,
              overflow: "hidden",
              boxShadow: "5px 5px 0 var(--ink)",
              transform: `translateY(${i % 2 === 0 ? 0 : 24}px)`,
              display: "flex", flexDirection: "column",
              transition: "transform 200ms"
            }}
            onMouseEnter={e => e.currentTarget.style.transform = `translateY(${i % 2 === 0 ? -4 : 20}px)`}
            onMouseLeave={e => e.currentTarget.style.transform = `translateY(${i % 2 === 0 ? 0 : 24}px)`}
            >
              <div style={{background: c.bg, height: 10}}/>
              <div className="ph" style={{height: 260, border: "none", borderBottom: "2px solid var(--ink)", position: "relative"}}>
                <div className="ph-label">portrait: {c.name.split(" ")[0].toLowerCase()}</div>
                {/* ID badge */}
                <div style={{
                  position: "absolute", top: 12, left: 12,
                  background: "var(--paper)",
                  border: "1.5px solid var(--ink)",
                  padding: "4px 10px",
                  borderRadius: 999,
                  fontFamily: "var(--mono)",
                  fontSize: 9,
                  letterSpacing: "0.14em"
                }}>
                  No. {String(i + 1).padStart(2, "0")}
                </div>
              </div>
              <div style={{padding: 18}}>
                <h3 className="display" style={{fontSize: 22, margin: 0, lineHeight: 1.1, color: "var(--ink)"}}>{c.name}</h3>
                <div className="mono" style={{fontSize: 10, color: "var(--tomato-deep)", marginTop: 6}}>{c.role}</div>
                <div className="hand" style={{fontSize: 16, color: "var(--ink-soft)", marginTop: 2}}>{c.years}</div>
                <blockquote style={{
                  fontFamily: "var(--serif)",
                  fontStyle: "italic",
                  fontSize: 14,
                  lineHeight: 1.5,
                  margin: "14px 0 12px",
                  paddingLeft: 12,
                  borderLeft: "3px solid var(--tomato)",
                  color: "var(--ink)"
                }}>
                  "{c.quote}"
                </blockquote>
                <div style={{
                  borderTop: "1px dashed var(--ink)",
                  paddingTop: 10,
                  display: "flex", justifyContent: "space-between", alignItems: "baseline",
                  gap: 8
                }}>
                  <span className="mono" style={{fontSize: 9, color: "var(--ink-soft)"}}>SPECIALTY</span>
                  <span className="serif italic" style={{fontSize: 12, color: "var(--ink)", textAlign: "right"}}>{c.specialty}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Family tree ribbon */}
        <div style={{
          marginTop: 72,
          padding: "28px 36px",
          background: "var(--ink)",
          color: "var(--cream)",
          borderRadius: 18,
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 28,
          position: "relative",
          border: "2px solid var(--ink)",
          boxShadow: "6px 6px 0 var(--tomato)"
        }}>
          {[
            ["1952", "Giuseppe", "opens the market on Cleveland Ave with $400 and a meat slicer."],
            ["1978", "Tony", "adds the wood oven out back. Sunday gravy becomes a thing."],
            ["2004", "Vincenzo", "takes over, keeps the index cards."],
            ["2014", "Joey", "joins the counter. Fourth generation, slicing thin."]
          ].map(([y, n, d], i) => (
            <div key={i} style={{position: "relative", paddingLeft: 14}}>
              <div style={{position: "absolute", left: 0, top: 6, width: 6, height: 6, borderRadius: "50%", background: "var(--tomato)"}}/>
              <div className="display" style={{fontSize: 28, color: "var(--tomato)"}}>{y}</div>
              <div className="display" style={{fontSize: 18, color: "var(--cream)", marginTop: 2}}>{n}</div>
              <div className="serif italic" style={{fontSize: 13, color: "var(--cream)", opacity: 0.8, marginTop: 4, lineHeight: 1.4}}>{d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ FOOTER / VISIT ============ */
function Visit() {
  return (
    <section className="section" id="visit" style={{
      background: "var(--ink)",
      color: "var(--cream)",
      paddingBottom: 48,
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Woodblock countryside placeholder across top */}
      <div className="ph dark" style={{
        height: 180,
        marginBottom: 48,
        borderLeft: "none",
        borderRight: "none",
        borderTop: "none"
      }}>
        <div className="ph-label">woodblock illustration — rolling Italian countryside, cypress trees, hills</div>
      </div>

      <div className="wrap" style={{display: "grid", gridTemplateColumns: "1.3fr 1fr 1fr 1fr", gap: 40}}>
        <div>
          <div className="mono" style={{color: "var(--tomato)", marginBottom: 6}}>— VI · VIENI A TROVARCI —</div>
          <h2 className="display" style={{fontSize: 54, margin: 0, lineHeight: 0.95}}>
            Come say <em style={{color: "var(--teal)"}}>ciao.</em>
          </h2>
          <p className="serif italic" style={{fontSize: 16, marginTop: 14, color: "var(--cream)", opacity: 0.85, maxWidth: 380}}>
            Pull up a stool at the counter. Stay for an espresso. Bring the kids — we've got biscotti with their name on it.
          </p>
          <div style={{marginTop: 22, display: "flex", gap: 10, flexWrap: "wrap"}}>
            <a href="#" className="btn">Get directions →</a>
            <a href="#" className="btn ghost" style={{background: "transparent", color: "var(--cream)", borderColor: "var(--cream)"}}>Catering inquiry</a>
          </div>
        </div>

        <div>
          <div className="mono" style={{color: "var(--teal)", marginBottom: 10, fontSize: 10}}>THE MARKET</div>
          <div className="serif" style={{fontSize: 16, lineHeight: 1.6}}>
            1842 Cleveland Ave NW<br/>
            Canton, Ohio 44703<br/>
            <span className="italic" style={{opacity: 0.75}}>(yellow awning, can't miss us)</span>
          </div>
          <div className="display" style={{fontSize: 22, marginTop: 14, color: "var(--mustard)"}}>(330) 452-0719</div>
        </div>

        <div>
          <div className="mono" style={{color: "var(--teal)", marginBottom: 10, fontSize: 10}}>HOURS</div>
          <table className="serif" style={{fontSize: 15, lineHeight: 1.7, width: "100%", borderCollapse: "collapse"}}>
            <tbody>
              {[
                ["Tue–Fri", "9a–7p"],
                ["Saturday", "8a–6p"],
                ["Sunday", "9a–3p"],
                ["Monday", "chiuso"]
              ].map(([d, h], i) => (
                <tr key={i} style={{borderBottom: "1px dashed rgba(242,231,211,0.2)"}}>
                  <td style={{padding: "4px 0"}}>{d}</td>
                  <td style={{textAlign: "right", opacity: 0.85, fontStyle: d === "chiuso" || h === "chiuso" ? "italic" : "normal"}}>{h}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <div className="mono" style={{color: "var(--teal)", marginBottom: 10, fontSize: 10}}>KEEP IN TOUCH</div>
          <div className="serif italic" style={{fontSize: 14, opacity: 0.85, marginBottom: 12}}>
            Specials, new arrivals, when the porchetta's hot.
          </div>
          <div style={{display: "flex", gap: 6}}>
            <input placeholder="your@email" style={{
              flex: 1, padding: "10px 14px",
              background: "transparent",
              border: "1.5px solid var(--cream)",
              borderRadius: 999,
              color: "var(--cream)",
              fontFamily: "var(--serif)",
              fontSize: 14,
              outline: "none"
            }}/>
            <button className="btn teal" style={{padding: "10px 16px", fontSize: 14}}>→</button>
          </div>
          <div style={{marginTop: 20, display: "flex", gap: 14, fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.14em"}}>
            <a href="#">IG</a>
            <a href="#">FB</a>
            <a href="#">TIKTOK</a>
          </div>
        </div>
      </div>

      <div className="wrap" style={{
        marginTop: 56,
        paddingTop: 22,
        borderTop: "1px solid rgba(242,231,211,0.2)",
        display: "flex", justifyContent: "space-between", fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.14em", opacity: 0.7, flexWrap: "wrap", gap: 10
      }}>
        <span>© 1952–2026 · DIOGUARDI'S ITALIAN MARKET &amp; DELI · CANTON, OHIO</span>
        <span className="italic" style={{textTransform: "none", letterSpacing: 0, fontFamily: "var(--serif)"}}>— made with amore e olio d'oliva —</span>
      </div>
    </section>
  );
}

Object.assign(window, { Chefs, Visit });
