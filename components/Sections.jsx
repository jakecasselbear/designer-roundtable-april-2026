/* global React */

/* ============ MARKET STRIP (between hero and specials) ============ */
function MarketStrip() {
  const counters = [
    { name: "Salumeria", sub: "Prosciutto di Parma, sopressata, 'nduja, hand-cut at the slicer", color: "var(--tomato)" },
    { name: "Latticini", sub: "Mozzarella pulled fresh, ricotta, stracciatella, parm wheels", color: "var(--teal)" },
    { name: "Panetteria", sub: "Crusty loaves, focaccia, semolina, taralli by the bag", color: "var(--mustard)" },
    { name: "Dolci", sub: "Cannoli filled to order, sfogliatelle, pignoli, biscotti", color: "var(--olive)" },
  ];

  return (
    <section className="section" id="market" style={{padding: "40px 0 60px", background: "var(--cream)", borderTop: "3px solid var(--ink)", borderBottom: "3px solid var(--ink)"}}>
      <div className="wrap">
        <div style={{display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 20, marginBottom: 28, flexWrap: "wrap"}}>
          <div>
            <div className="mono" style={{color: "var(--tomato-deep)", marginBottom: 6}}>— II · IL MERCATO —</div>
            <h2 className="display" style={{fontSize: 56, margin: 0, lineHeight: 1, color: "var(--ink)"}}>
              Four counters. <em style={{color: "var(--tomato-deep)"}}>One family.</em>
            </h2>
          </div>
          <div className="serif italic" style={{maxWidth: 380, fontSize: 17, color: "var(--ink-soft)"}}>
            Walk in and take a number. Or don't — Joey will wave you over. We've been doing it the same way since grandpa opened the doors on Cleveland Avenue.
          </div>
        </div>

        <div style={{display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18}}>
          {counters.map((c, i) => (
            <div key={i} style={{
              background: "var(--paper)",
              border: "2px solid var(--ink)",
              borderRadius: 14,
              overflow: "hidden",
              boxShadow: "4px 4px 0 var(--ink)",
              display: "flex", flexDirection: "column"
            }}>
              <div style={{background: c.color, height: 10, borderBottom: "2px solid var(--ink)"}}/>
              <div className="ph" style={{height: 160, border: "none", borderBottom: "2px solid var(--ink)"}}>
                <div className="ph-label">{c.name.toLowerCase()} counter</div>
              </div>
              <div style={{padding: "16px 18px 20px"}}>
                <div className="mono" style={{fontSize: 10, color: "var(--ink-soft)", marginBottom: 4}}>COUNTER {String(i + 1).padStart(2, "0")}</div>
                <div className="display" style={{fontSize: 26, color: "var(--ink)", lineHeight: 1}}>{c.name}</div>
                <p className="serif" style={{fontSize: 14, marginTop: 10, marginBottom: 0, color: "var(--ink-soft)", lineHeight: 1.45}}>
                  {c.sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ SPECIALS (chalkboard) ============ */
function Specials() {
  const specials = [
    { name: "The Nonno", price: "14", desc: "Capicola, soppressata, mortadella, sharp provolone, giardiniera, rosemary focaccia.", tag: "SANDWICH OF THE WEEK" },
    { name: "Sunday Gravy", price: "18 / qt", desc: "Plum tomatoes, pork neck, meatballs, basil. Simmered from dawn. Bring your own pot.", tag: "SUNDAYS ONLY" },
    { name: "Burrata Plate", price: "13", desc: "A whole ball, torn focaccia, Calabrian chili oil, sea salt, mint. Eat it with your hands.", tag: "NEW" },
    { name: "Porchetta Hot", price: "16", desc: "Slow-roasted pork shoulder, crackling, rabe, aioli, ciabatta, straight from the oven.", tag: "FRIDAYS" },
    { name: "Limoncello Tiramisù", price: "8", desc: "Mascarpone, lemon curd, savoiardi soaked in our cellar limoncello. Not Nonna's — but close.", tag: "DOLCE" },
    { name: "Pasta al Forno", price: "11", desc: "Rigatoni, Sunday gravy, three cheeses, baked in the wood oven. Family-tray available.", tag: "HOT CASE" }
  ];

  return (
    <section className="section" id="specials" style={{
      background: "var(--ink)",
      color: "var(--chalk)",
      position: "relative"
    }}>
      {/* Chalkboard inner panel */}
      <div className="wrap" style={{position: "relative"}}>
        <div style={{
          background: "linear-gradient(180deg, #2e241f 0%, #251a16 100%)",
          border: "8px solid #6B4E2E",
          borderRadius: 6,
          padding: "48px 48px 56px",
          position: "relative",
          boxShadow: "inset 0 0 80px rgba(0,0,0,0.5)"
        }}>
          {/* chalk dust */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "radial-gradient(ellipse at 20% 15%, rgba(247,240,224,0.08), transparent 50%), radial-gradient(ellipse at 80% 85%, rgba(247,240,224,0.06), transparent 50%)"
          }}/>

          <div style={{display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32, flexWrap: "wrap", gap: 16}}>
            <div>
              <div className="mono" style={{color: "var(--teal)", marginBottom: 8}}>— III · OGGI AL MERCATO —</div>
              <h2 className="hand" style={{fontSize: 88, margin: 0, lineHeight: 0.9, color: "var(--chalk)"}}>Today's Specials</h2>
              <div className="hand" style={{fontSize: 28, color: "#D6A441", marginTop: 4}}>Thursday, April 17th</div>
            </div>
            <div style={{textAlign: "right"}}>
              <div className="hand" style={{fontSize: 24, color: "var(--chalk)", opacity: 0.85, maxWidth: 260, lineHeight: 1.2}}>
                "If it's not on the board, <br/>ask — we probably have it."
              </div>
              <div className="mono" style={{fontSize: 10, marginTop: 8, opacity: 0.6}}>— Chef Vincenzo</div>
            </div>
          </div>

          <div style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 36}}>
            {specials.map((s, i) => (
              <div key={i} className="spec-card" style={{
                borderTop: "1px dashed rgba(247,240,224,0.3)",
                paddingTop: 18
              }}>
                <div style={{display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10}}>
                  <h3 className="hand" style={{margin: 0, fontSize: 40, color: "var(--chalk)", lineHeight: 1}}>
                    {s.name}
                  </h3>
                  <span className="display" style={{fontSize: 28, color: "#E8B84A"}}>${s.price}</span>
                </div>
                <div className="mono" style={{fontSize: 10, color: "var(--teal)", marginTop: 6}}>{s.tag}</div>
                <p className="serif italic" style={{fontSize: 15, marginTop: 10, marginBottom: 0, color: "var(--chalk)", opacity: 0.82, lineHeight: 1.5}}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>

          {/* corner chalk scribbles */}
          <div className="hand" style={{position: "absolute", top: 18, right: 30, fontSize: 36, color: "var(--tomato)", transform: "rotate(-6deg)"}}>
            Mangia!
          </div>
          <div className="hand" style={{position: "absolute", bottom: 14, left: 40, fontSize: 22, color: "var(--teal)", opacity: 0.9}}>
            ★ ask about the cannoli ★
          </div>
        </div>

        {/* price sticker */}
        <div style={{
          position: "absolute", top: -24, left: 40,
          background: "var(--tomato)",
          color: "var(--cream)",
          padding: "10px 22px",
          border: "3px solid var(--chalk)",
          borderRadius: 999,
          transform: "rotate(-3deg)",
          fontFamily: "var(--display)",
          fontSize: 18,
          letterSpacing: "0.05em",
          boxShadow: "3px 3px 0 rgba(0,0,0,0.4)"
        }}>
          LA LAVAGNA
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { MarketStrip, Specials });
