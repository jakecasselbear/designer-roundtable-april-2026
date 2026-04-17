/* global React */
const { useState: useStateSB, useMemo: useMemoSB } = React;

/* ============ ISOMETRIC SANDWICH BUILDER ============ */

// Each layer is an isometric "slab" rendered with CSS transforms.
// Ingredients are organized by step; users click to add, which stacks them.

const INGREDIENTS = {
  bread: [
    { id: "ciabatta",  name: "Ciabatta",          hue: "#D6A441", stripe: "#B5802A", note: "Crunchy, airy. Holds oil well.", price: 0 },
    { id: "focaccia",  name: "Rosemary Focaccia", hue: "#D8AC52", stripe: "#A87E2A", note: "Our house-baked, studded w/ rosemary.", price: 1 },
    { id: "sesame",    name: "Sesame Hero",       hue: "#E3B964", stripe: "#9A6F24", note: "For real sub energy.", price: 0 },
    { id: "sourdough", name: "Semolina Loaf",     hue: "#CFA053", stripe: "#8C6A2E", note: "Sliced thick, toasted.", price: 1 },
  ],
  meat: [
    { id: "prosciutto",  name: "Prosciutto di Parma", hue: "#E89BA0", stripe: "#C8302A", note: "Aged 24 mo. Hand-sliced paper thin.", price: 4 },
    { id: "capicola",    name: "Hot Capicola",        hue: "#C46060", stripe: "#8F2422", note: "Calabrian heat, spiced crust.", price: 3 },
    { id: "mortadella",  name: "Mortadella",          hue: "#F4B6B8", stripe: "#A04A4C", note: "With pistachios, from Bologna.", price: 3 },
    { id: "soppressata", name: "Soppressata",         hue: "#A63A36", stripe: "#65201E", note: "Dry-cured, black pepper.", price: 3 },
    { id: "porchetta",   name: "Porchetta",           hue: "#D9A87A", stripe: "#7A4E2A", note: "Slow-roasted, with crackling.", price: 4 },
  ],
  cheese: [
    { id: "provolone",  name: "Sharp Provolone",    hue: "#F3D58A", stripe: "#B5802A", note: "Aged. Bite, but mellow.", price: 2 },
    { id: "mozzarella", name: "Fresh Mozzarella",   hue: "#FBF4E6", stripe: "#C7BDA5", note: "Pulled this morning.", price: 2 },
    { id: "pecorino",   name: "Pecorino Romano",    hue: "#EFE3B8", stripe: "#AE9244", note: "Salty, grassy, grated on.", price: 2 },
    { id: "burrata",    name: "Burrata",            hue: "#F9F1DD", stripe: "#B8AE8C", note: "Creamy core. Eat fast.", price: 3 },
  ],
  veg: [
    { id: "lettuce",  name: "Romaine",         hue: "#5D6A3A", stripe: "#3A4320", note: "Crunch.", price: 0 },
    { id: "tomato",   name: "Beefsteak Tomato",hue: "#C8302A", stripe: "#8B1F1C", note: "Good in July. Always.", price: 0 },
    { id: "onion",    name: "Red Onion",       hue: "#8C5B86", stripe: "#5A3855", note: "Soaked to mellow.", price: 0 },
    { id: "pepper",   name: "Roasted Peppers", hue: "#E07B2E", stripe: "#95401A", note: "Our own, jarred in oil.", price: 1 },
    { id: "giardi",   name: "Giardiniera",     hue: "#D1A83F", stripe: "#7E6418", note: "Hot. You've been warned.", price: 1 },
    { id: "arugula",  name: "Arugula",         hue: "#6B7F3A", stripe: "#3C4A1C", note: "Peppery.", price: 0 },
  ],
  sauce: [
    { id: "evoo",     name: "EVOO + Red Wine Vinegar", hue: "#8B6A1F", stripe: "#3E2E0C", note: "The only dressing that matters.", price: 0 },
    { id: "aioli",    name: "Garlic Aioli",            hue: "#EFDDA0", stripe: "#9A7C2A", note: "House-made. Heavy on garlic.", price: 1 },
    { id: "pesto",    name: "Basil Pesto",             hue: "#5D6A3A", stripe: "#2C3418", note: "Mortar & pestle, basil from the back lot.", price: 1 },
    { id: "calabrian",name: "Calabrian Chili",         hue: "#B63020", stripe: "#6A160E", note: "Smoky, fruity, fiery.", price: 1 },
  ]
};

const STEPS = [
  { key: "bread",  label: "Il Pane",       title: "Pick your bread" },
  { key: "meat",   label: "La Carne",      title: "Add some meat", multi: true },
  { key: "cheese", label: "Il Formaggio",  title: "Choose cheese",  multi: true },
  { key: "veg",    label: "La Verdura",    title: "Pile on veg",    multi: true },
  { key: "sauce",  label: "La Salsa",      title: "Finish with sauce", multi: true }
];

// Render an isometric slab for a single layer
function IsoSlab({ color, stripe, idx, kind, name, offsetY, onRemove }) {
  const depth = kind === "bread" ? 24 : (kind === "meat" ? 10 : (kind === "cheese" ? 8 : (kind === "veg" ? 12 : 5)));
  const wavy = kind === "meat" || kind === "veg";
  const width = 240;
  return (
    <div
      className="iso-slab"
      style={{
        position: "absolute",
        left: "50%",
        bottom: `${offsetY}px`,
        transform: "translateX(-50%)",
        width: `${width}px`,
        height: `${depth + 90}px`,
        pointerEvents: "auto",
        animation: "layerDrop 320ms cubic-bezier(.2,1.4,.4,1)"
      }}
      title={name}
      onClick={onRemove}
    >
      {/* top face */}
      <div style={{
        position: "absolute",
        left: 0, top: 0,
        width: `${width}px`,
        height: "90px",
        background: color,
        transform: "rotateX(60deg) rotateZ(-45deg)",
        transformOrigin: "top left",
        border: "2px solid var(--ink)",
        borderRadius: wavy ? 18 : 6,
        boxShadow: "inset 0 0 0 3px rgba(255,255,255,0.12)",
      }}>
        <div style={{
          position: "absolute", inset: 6,
          borderRadius: wavy ? 14 : 3,
          background: `repeating-linear-gradient(45deg, ${stripe}22 0 6px, transparent 6px 14px)`
        }}/>
      </div>
    </div>
  );
}

// A simpler "pancake stack" isometric: use a skew + scale to fake 3D on each slab
function IsoStack({ layers, onRemove }) {
  // stack top→down, each layer shifts up by some px
  const layerHeight = { bread: 28, meat: 14, cheese: 12, veg: 16, sauce: 8 };

  return (
    <div style={{
      position: "relative",
      width: 440,
      height: 360,
      margin: "0 auto",
      perspective: "1000px",
      perspectiveOrigin: "50% 60%"
    }}>
      {/* Plate */}
      <div style={{
        position: "absolute",
        left: "50%", bottom: 30,
        transform: "translateX(-50%) rotateX(62deg)",
        width: 340, height: 340,
        borderRadius: "50%",
        background: "radial-gradient(circle at 40% 30%, #fff 0%, #EFE4CC 45%, #D3C4A4 100%)",
        border: "2px solid var(--ink)",
        boxShadow: "0 24px 0 rgba(0,0,0,0.12)",
      }}/>
      <div style={{
        position: "absolute",
        left: "50%", bottom: 24,
        transform: "translateX(-50%) rotateX(62deg)",
        width: 260, height: 260,
        borderRadius: "50%",
        border: "1.5px dashed rgba(42,30,26,0.5)",
        pointerEvents: "none"
      }}/>

      {/* Stack */}
      {(() => {
        let y = 60;
        const nodes = layers.map((L, i) => {
          const h = layerHeight[L.kind] || 12;
          const node = (
            <div key={L.uid} className="sandwich-layer" style={{
              position: "absolute",
              left: "50%",
              bottom: `${y}px`,
              transform: `translateX(-50%) rotateX(62deg) rotateZ(-8deg)`,
              width: L.kind === "bread" ? 300 : (L.kind === "sauce" ? 260 : 280),
              height: 150,
              borderRadius: L.kind === "bread" ? 20 : (L.kind === "veg" || L.kind === "meat" ? 36 : 10),
              background: L.hue,
              border: "2.5px solid var(--ink)",
              boxShadow: `0 ${h}px 0 ${L.stripe}, 0 ${h + 1}px 0 var(--ink)`,
              cursor: "pointer",
              transition: "transform 180ms",
              animation: "layerDrop 360ms cubic-bezier(.2,1.4,.4,1)"
            }}
            onClick={() => onRemove(L.uid)}
            title={`Click to remove ${L.name}`}
            >
              {/* texture */}
              <div style={{
                position: "absolute", inset: 10,
                borderRadius: "inherit",
                background: L.kind === "bread"
                  ? `radial-gradient(circle at 20% 30%, ${L.stripe}66 0 3px, transparent 4px), radial-gradient(circle at 60% 50%, ${L.stripe}55 0 2px, transparent 3px), radial-gradient(circle at 40% 70%, ${L.stripe}77 0 3px, transparent 4px), radial-gradient(circle at 80% 20%, ${L.stripe}55 0 2.5px, transparent 3px)`
                  : L.kind === "cheese"
                  ? `radial-gradient(circle at 30% 40%, #ffffff55 0 6px, transparent 8px), radial-gradient(circle at 70% 60%, #ffffff44 0 5px, transparent 7px)`
                  : L.kind === "meat"
                  ? `repeating-linear-gradient(40deg, ${L.stripe}55 0 4px, transparent 4px 10px)`
                  : L.kind === "veg"
                  ? `radial-gradient(circle at 25% 40%, ${L.stripe}66 0 4px, transparent 6px), radial-gradient(circle at 70% 30%, ${L.stripe}44 0 3px, transparent 5px), radial-gradient(circle at 55% 70%, ${L.stripe}77 0 5px, transparent 7px)`
                  : `linear-gradient(90deg, transparent 0%, ${L.stripe}55 50%, transparent 100%)`,
                opacity: 0.9
              }}/>
              {/* label bubble */}
              <div style={{
                position: "absolute",
                left: L.kind === "bread" ? -90 : 100,
                top: L.kind === "bread" ? -8 : -4,
                background: "var(--paper)",
                border: "1.5px solid var(--ink)",
                padding: "3px 9px",
                borderRadius: 999,
                fontFamily: "var(--mono)",
                fontSize: 9,
                letterSpacing: "0.1em",
                color: "var(--ink)",
                whiteSpace: "nowrap",
                transform: "rotateX(-62deg) rotateZ(8deg)",
                transformOrigin: "center",
                opacity: 0.95
              }}>
                {L.name}
              </div>
            </div>
          );
          y += h + 6;
          return node;
        });
        return nodes;
      })()}

      {/* Empty state */}
      {layers.length === 0 && (
        <div style={{
          position: "absolute", left: "50%", top: "50%",
          transform: "translate(-50%,-50%)",
          textAlign: "center",
          color: "var(--ink-soft)"
        }}>
          <div className="hand" style={{fontSize: 42, color: "var(--tomato-deep)"}}>Start with bread →</div>
          <div className="mono" style={{marginTop: 6, opacity: 0.7}}>PLATE IS EMPTY</div>
        </div>
      )}
    </div>
  );
}

function SandwichBuilder() {
  const [layers, setLayers] = useStateSB([]);
  const [active, setActive] = useStateSB("bread");
  const [name, setName] = useStateSB("The Nonno's Nephew");

  const totalPrice = useMemoSB(() => {
    return layers.reduce((acc, l) => acc + (l.price || 0), 8); // $8 base
  }, [layers]);

  const hasBread = layers.some(l => l.kind === "bread");
  const breadCount = layers.filter(l => l.kind === "bread").length;

  function add(kind, ing) {
    // bread only once (base) — but bottom bread
    const uid = `${ing.id}-${Date.now()}-${Math.random().toString(36).slice(2,6)}`;
    const step = STEPS.find(s => s.key === kind);
    if (!step.multi) {
      // replace any existing of this kind
      setLayers(prev => [...prev.filter(l => l.kind !== kind), { uid, kind, ...ing }]);
    } else {
      setLayers(prev => [...prev, { uid, kind, ...ing }]);
    }
  }

  function remove(uid) {
    setLayers(prev => prev.filter(l => l.uid !== uid));
  }

  function topBun() {
    // add a second bread on top (same as first if there's one)
    const bread = layers.find(l => l.kind === "bread");
    if (bread) {
      setLayers(prev => [...prev, { ...bread, uid: `${bread.id}-top-${Date.now()}` }]);
    }
  }

  function clear() { setLayers([]); setActive("bread"); }

  const currentIngs = INGREDIENTS[active];
  const stepIdx = STEPS.findIndex(s => s.key === active);

  return (
    <section className="section" id="builder" style={{
      background: "var(--cream)",
      borderTop: "3px solid var(--ink)",
      borderBottom: "3px solid var(--ink)",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* checker corner accents */}
      <div className="checker" style={{position: "absolute", top: 0, left: 0, width: 120, height: 56, opacity: 0.7, borderBottom: "2px solid var(--ink)", borderRight: "2px solid var(--ink)"}}/>
      <div className="checker" style={{position: "absolute", bottom: 0, right: 0, width: 180, height: 56, opacity: 0.7, borderTop: "2px solid var(--ink)", borderLeft: "2px solid var(--ink)"}}/>

      <div className="wrap">
        <div style={{display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 30, flexWrap: "wrap", gap: 16}}>
          <div>
            <div className="mono" style={{color: "var(--tomato-deep)", marginBottom: 6}}>— IV · COSTRUISCI IL PANINO —</div>
            <h2 className="display" style={{fontSize: 64, margin: 0, lineHeight: 1, color: "var(--ink)"}}>
              Build your own <em style={{color: "var(--tomato-deep)"}}>panino.</em>
            </h2>
            <p className="serif italic" style={{fontSize: 18, marginTop: 10, maxWidth: 560, color: "var(--ink-soft)"}}>
              Stack it how Nonna would've — or how she wouldn't, we won't tell. Click ingredients to pile on; click a layer to remove it.
            </p>
          </div>
          <div style={{textAlign: "right"}}>
            <div className="mono" style={{fontSize: 10, color: "var(--ink-soft)"}}>YOUR PANINO</div>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              className="hand"
              style={{
                fontSize: 34,
                background: "transparent",
                border: "none",
                borderBottom: "2px dashed var(--ink)",
                color: "var(--tomato-deep)",
                outline: "none",
                textAlign: "right",
                width: 320
              }}
            />
          </div>
        </div>

        <div style={{display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 28, alignItems: "stretch"}}>
          {/* LEFT — ingredient panel */}
          <div style={{
            background: "var(--paper)",
            border: "2.5px solid var(--ink)",
            borderRadius: 18,
            boxShadow: "6px 6px 0 var(--ink)",
            padding: 24,
            display: "flex", flexDirection: "column"
          }}>
            {/* Steps */}
            <div style={{display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap"}}>
              {STEPS.map((s, i) => (
                <button
                  key={s.key}
                  onClick={() => setActive(s.key)}
                  className="builder-step"
                  style={{
                    display: "flex", alignItems: "center", gap: 8,
                    padding: "8px 14px",
                    borderRadius: 999,
                    border: "2px solid var(--ink)",
                    background: active === s.key ? "var(--tomato)" : "var(--paper)",
                    color: active === s.key ? "var(--cream)" : "var(--ink)",
                    fontFamily: "var(--serif)",
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer"
                  }}>
                  <span className="mono" style={{fontSize: 9, opacity: 0.8}}>{String(i+1).padStart(2,"0")}</span>
                  {s.label}
                </button>
              ))}
            </div>

            <div style={{
              borderTop: "1.5px dashed var(--ink)",
              paddingTop: 18,
              flex: 1
            }}>
              <h3 className="display" style={{margin: 0, fontSize: 26, color: "var(--ink)"}}>
                {STEPS[stepIdx].title}
              </h3>
              <div className="hand" style={{fontSize: 20, color: "var(--tomato-deep)", marginBottom: 14}}>
                {active === "bread" ? "basta — pick one" : "as much as you want"}
              </div>
              <div style={{display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10}}>
                {currentIngs.map(ing => {
                  const selected = layers.some(l => l.id === ing.id);
                  return (
                    <button
                      key={ing.id}
                      onClick={() => add(active, ing)}
                      className="builder-item"
                      style={{
                        display: "flex", alignItems: "flex-start", gap: 12,
                        padding: 12,
                        background: "var(--paper)",
                        border: `2px solid ${selected ? "var(--tomato)" : "var(--ink)"}`,
                        borderRadius: 12,
                        textAlign: "left",
                        cursor: "pointer",
                        transition: "transform 120ms, box-shadow 120ms",
                        position: "relative",
                        boxShadow: selected ? "2px 2px 0 var(--tomato-deep)" : "2px 2px 0 var(--ink)"
                      }}
                      onMouseEnter={e => e.currentTarget.style.transform = "translate(-1px,-1px)"}
                      onMouseLeave={e => e.currentTarget.style.transform = "translate(0,0)"}
                    >
                      <div style={{
                        width: 44, height: 44, flexShrink: 0,
                        borderRadius: 8,
                        background: ing.hue,
                        border: "1.5px solid var(--ink)",
                        position: "relative",
                        overflow: "hidden"
                      }}>
                        <div style={{position: "absolute", inset: 0, background: `repeating-linear-gradient(45deg, ${ing.stripe}44 0 4px, transparent 4px 9px)`}}/>
                      </div>
                      <div style={{flex: 1, minWidth: 0}}>
                        <div style={{display: "flex", justifyContent: "space-between", gap: 8, alignItems: "baseline"}}>
                          <div className="display" style={{fontSize: 17, color: "var(--ink)", lineHeight: 1.1}}>{ing.name}</div>
                          {ing.price > 0 && <span className="mono" style={{fontSize: 10, color: "var(--tomato-deep)"}}>+${ing.price}</span>}
                        </div>
                        <div className="serif italic" style={{fontSize: 12, color: "var(--ink-soft)", marginTop: 2, lineHeight: 1.35}}>
                          {ing.note}
                        </div>
                      </div>
                      {selected && (
                        <div style={{
                          position: "absolute",
                          top: -8, right: -8,
                          background: "var(--tomato)",
                          color: "var(--cream)",
                          width: 22, height: 22,
                          borderRadius: "50%",
                          border: "2px solid var(--paper)",
                          display: "grid", placeItems: "center",
                          fontSize: 12, fontWeight: 700
                        }}>✓</div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div style={{
              marginTop: 18,
              paddingTop: 14,
              borderTop: "1.5px dashed var(--ink)",
              display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, flexWrap: "wrap"
            }}>
              <button onClick={clear} className="btn ghost" style={{padding: "10px 18px", fontSize: 14}}>Start over</button>
              {hasBread && breadCount < 2 && (
                <button onClick={topBun} className="btn teal" style={{padding: "10px 18px", fontSize: 14}}>Add top bun →</button>
              )}
              {stepIdx < STEPS.length - 1 && (
                <button onClick={() => setActive(STEPS[stepIdx + 1].key)} className="btn" style={{padding: "10px 18px", fontSize: 14}}>
                  Next: {STEPS[stepIdx + 1].label} →
                </button>
              )}
            </div>
          </div>

          {/* RIGHT — isometric sandwich */}
          <div style={{
            background: "var(--paper)",
            border: "2.5px solid var(--ink)",
            borderRadius: 18,
            boxShadow: "6px 6px 0 var(--ink)",
            padding: 24,
            display: "flex", flexDirection: "column",
            position: "relative",
            overflow: "hidden"
          }}>
            {/* Subtle tablecloth in background */}
            <div className="checker" style={{position: "absolute", inset: 0, opacity: 0.14}}/>

            <div style={{position: "relative", zIndex: 1, display: "flex", justifyContent: "space-between", alignItems: "flex-start"}}>
              <div>
                <div className="mono" style={{fontSize: 10, color: "var(--ink-soft)"}}>VISTA ISOMETRICA</div>
                <div className="hand" style={{fontSize: 30, color: "var(--tomato-deep)", lineHeight: 1}}>"{name}"</div>
              </div>
              <div style={{textAlign: "right"}}>
                <div className="mono" style={{fontSize: 10, color: "var(--ink-soft)"}}>LAYERS</div>
                <div className="display" style={{fontSize: 36, color: "var(--ink)", lineHeight: 1}}>
                  {String(layers.length).padStart(2, "0")}
                </div>
              </div>
            </div>

            <div style={{flex: 1, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 1, minHeight: 380}}>
              <IsoStack layers={layers} onRemove={remove}/>
            </div>

            {/* Receipt */}
            <div style={{
              position: "relative", zIndex: 1,
              background: "var(--paper)",
              border: "1.5px solid var(--ink)",
              borderRadius: 8,
              padding: "14px 18px",
              marginTop: 8,
              fontFamily: "var(--mono)",
              fontSize: 11
            }}>
              <div style={{display: "flex", justifyContent: "space-between", marginBottom: 8}}>
                <span>DIOGUARDI'S · ORDER TICKET</span>
                <span>#{String(Math.floor(Math.random()*9000)+1000)}</span>
              </div>
              <div style={{borderTop: "1px dashed var(--ink)", paddingTop: 8, display: "flex", flexDirection: "column", gap: 3}}>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                  <span>BASE PANINO</span><span>$8.00</span>
                </div>
                {layers.map((l, i) => (
                  <div key={l.uid} style={{display: "flex", justifyContent: "space-between", opacity: 0.85}}>
                    <span>+ {l.name.toUpperCase()}</span>
                    <span>{l.price > 0 ? `$${l.price.toFixed(2)}` : "—"}</span>
                  </div>
                ))}
                <div style={{display: "flex", justifyContent: "space-between", marginTop: 8, paddingTop: 8, borderTop: "1px dashed var(--ink)", fontWeight: 700, fontSize: 14}}>
                  <span>TOTALE</span><span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div style={{display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap"}}>
              <button className="btn" style={{flex: 1}} disabled={layers.length < 2}>Order it →</button>
              <button className="btn ghost">Save for later</button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes layerDrop {
          0% { opacity: 0; transform: translateX(-50%) rotateX(62deg) rotateZ(-8deg) translateY(-40px); }
          100% { opacity: 1; transform: translateX(-50%) rotateX(62deg) rotateZ(-8deg) translateY(0); }
        }
      `}</style>
    </section>
  );
}

Object.assign(window, { SandwichBuilder });
