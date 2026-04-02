import { useState, useEffect, useRef } from "react";

const MATCHES = [
  {
    id: 1,
    league: "Ligue 1",
    leagueFlag: "🇫🇷",
    status: "live",
    minute: 67,
    home: { name: "PSG", logo: "🔵🔴", score: 2, form: ["W","W","D","W","W"] },
    away: { name: "Marseille", logo: "🔵⚪", score: 1, form: ["L","W","W","D","L"] },
    prediction: { homeWin: 72, draw: 16, awayWin: 12 },
    events: [
      { minute: 23, team: "home", type: "goal", player: "Mbappé" },
      { minute: 41, team: "away", type: "goal", player: "Aubameyang" },
      { minute: 58, team: "home", type: "goal", player: "Asensio" },
      { minute: 62, team: "away", type: "yellow", player: "Guendouzi" },
    ],
    stadium: "Parc des Princes"
  },
  {
    id: 2,
    league: "Premier League",
    leagueFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    status: "live",
    minute: 34,
    home: { name: "Arsenal", logo: "🔴⚪", score: 1, form: ["W","W","W","D","W"] },
    away: { name: "Man City", logo: "🔵⚪", score: 1, form: ["W","D","W","W","L"] },
    prediction: { homeWin: 38, draw: 29, awayWin: 33 },
    events: [
      { minute: 11, team: "home", type: "goal", player: "Saka" },
      { minute: 28, team: "away", type: "goal", player: "Haaland" },
    ],
    stadium: "Emirates Stadium"
  },
  {
    id: 3,
    league: "La Liga",
    leagueFlag: "🇪🇸",
    status: "upcoming",
    kickoff: "21:00",
    home: { name: "Real Madrid", logo: "⚪🟡", score: null, form: ["W","W","W","W","D"] },
    away: { name: "Barcelona", logo: "🔵🔴", score: null, form: ["W","W","L","W","W"] },
    prediction: { homeWin: 44, draw: 23, awayWin: 33 },
    events: [],
    stadium: "Santiago Bernabéu"
  },
  {
    id: 4,
    league: "Champions League",
    leagueFlag: "⭐",
    status: "finished",
    home: { name: "Bayern", logo: "🔴⚪", score: 3, form: ["W","W","D","W","W"] },
    away: { name: "Dortmund", logo: "🟡⚫", score: 2, form: ["L","W","W","D","L"] },
    prediction: { homeWin: 61, draw: 18, awayWin: 21 },
    events: [
      { minute: 7, team: "home", type: "goal", player: "Kane" },
      { minute: 19, team: "away", type: "goal", player: "Fullkrug" },
      { minute: 44, team: "home", type: "goal", player: "Sané" },
      { minute: 67, team: "away", type: "goal", player: "Adeyemi" },
      { minute: 81, team: "home", type: "goal", player: "Kane" },
    ],
    stadium: "Allianz Arena"
  },
  {
    id: 5,
    league: "Ligue 1",
    leagueFlag: "🇫🇷",
    status: "upcoming",
    kickoff: "19:00",
    home: { name: "Monaco", logo: "🔴⚪", score: null, form: ["W","D","W","W","L"] },
    away: { name: "Lyon", logo: "🔵⚪", score: null, form: ["D","W","L","W","D"] },
    prediction: { homeWin: 51, draw: 25, awayWin: 24 },
    events: [],
    stadium: "Stade Louis-II"
  },
  {
    id: 6,
    league: "Serie A",
    leagueFlag: "🇮🇹",
    status: "live",
    minute: 89,
    home: { name: "Inter Milan", logo: "⚫🔵", score: 2, form: ["W","W","W","D","W"] },
    away: { name: "Juventus", logo: "⚫⚪", score: 2, form: ["D","W","W","L","W"] },
    prediction: { homeWin: 55, draw: 27, awayWin: 18 },
    events: [
      { minute: 22, team: "home", type: "goal", player: "Lautaro" },
      { minute: 38, team: "away", type: "goal", player: "Vlahovic" },
      { minute: 71, team: "home", type: "goal", player: "Thuram" },
      { minute: 85, team: "away", type: "goal", player: "Chiesa" },
    ],
    stadium: "San Siro"
  },
];

const TICKER_ITEMS = [
  "⚽ PSG 2-1 Marseille (67') — Asensio double la mise !",
  "🔴 Arsenal 1-1 Man City (34') — Haaland égalise sur penalty",
  "⭐ Bayern 3-2 Dortmund (FT) — Kane double buteur, les Bavarois s'imposent",
  "🔮 PRÉVISION: Real vs Barça ce soir — El Clasico attendu avec 44% faveur Madrid",
  "⚽ Inter 2-2 Juventus (89') — Derby électrique, 6 mins additionnel annoncées !",
  "📊 Ligue 1: Monaco favori à 51% contre Lyon ce soir",
];

function PredictionBar({ home, draw, away }) {
  return (
    <div style={{ marginTop: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#94a3b8", marginBottom: 3, fontFamily: "'Space Mono', monospace", letterSpacing: 1 }}>
        <span>DOM {home}%</span>
        <span>NUL {draw}%</span>
        <span>{away}% EXT</span>
      </div>
      <div style={{ display: "flex", height: 6, borderRadius: 3, overflow: "hidden", gap: 1 }}>
        <div style={{ width: `${home}%`, background: "linear-gradient(90deg, #3b82f6, #60a5fa)", borderRadius: "3px 0 0 3px", transition: "width 1s ease" }} />
        <div style={{ width: `${draw}%`, background: "#475569" }} />
        <div style={{ width: `${away}%`, background: "linear-gradient(90deg, #f97316, #fb923c)", borderRadius: "0 3px 3px 0", transition: "width 1s ease" }} />
      </div>
      <div style={{ textAlign: "center", fontSize: 9, color: "#64748b", marginTop: 2, fontFamily: "'Space Mono', monospace" }}>
        PRÉVISION IA
      </div>
    </div>
  );
}

function FormDots({ form }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {form.map((r, i) => (
        <div key={i} style={{
          width: 7, height: 7, borderRadius: "50%",
          background: r === "W" ? "#22c55e" : r === "D" ? "#eab308" : "#ef4444",
          opacity: 0.8
        }} />
      ))}
    </div>
  );
}

function LiveDot({ minute }) {
  const [bright, setBright] = useState(true);
  useEffect(() => {
    const t = setInterval(() => setBright(b => !b), 600);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
      <div style={{
        width: 8, height: 8, borderRadius: "50%",
        background: bright ? "#ef4444" : "#7f1d1d",
        boxShadow: bright ? "0 0 8px #ef4444" : "none",
        transition: "all 0.3s"
      }} />
      <span style={{ fontSize: 10, color: "#ef4444", fontFamily: "'Space Mono', monospace", fontWeight: 700, letterSpacing: 1 }}>
        LIVE {minute}'
      </span>
    </div>
  );
}

function MatchCard({ match, selected, onClick }) {
  const isLive = match.status === "live";
  const isFinished = match.status === "finished";
  const isUpcoming = match.status === "upcoming";

  return (
    <div onClick={onClick} style={{
      background: selected
        ? "linear-gradient(135deg, rgba(59,130,246,0.12), rgba(99,102,241,0.08))"
        : "rgba(15,23,42,0.7)",
      border: selected ? "1px solid rgba(59,130,246,0.5)" : "1px solid rgba(255,255,255,0.06)",
      borderRadius: 12,
      padding: "14px 16px",
      cursor: "pointer",
      transition: "all 0.25s ease",
      boxShadow: selected ? "0 0 20px rgba(59,130,246,0.15)" : "none",
      transform: selected ? "translateY(-1px)" : "none",
    }}>
      {/* League */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <span style={{ fontSize: 10, color: "#64748b", fontFamily: "'Space Mono', monospace", letterSpacing: 1 }}>
          {match.leagueFlag} {match.league.toUpperCase()}
        </span>
        {isLive && <LiveDot minute={match.minute} />}
        {isFinished && <span style={{ fontSize: 10, color: "#475569", fontFamily: "'Space Mono', monospace", letterSpacing: 1 }}>TERMINÉ</span>}
        {isUpcoming && <span style={{ fontSize: 10, color: "#f59e0b", fontFamily: "'Space Mono', monospace", letterSpacing: 1 }}>⏰ {match.kickoff}</span>}
      </div>

      {/* Teams & Score */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#f1f5f9", fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 2 }}>
            {match.home.name}
          </div>
          <FormDots form={match.home.form} />
        </div>

        <div style={{ textAlign: "center", padding: "0 14px" }}>
          {isUpcoming ? (
            <div style={{ fontSize: 13, color: "#475569", fontFamily: "'Space Mono', monospace" }}>vs</div>
          ) : (
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span style={{
                fontSize: 28, fontWeight: 900, fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 2,
                color: isLive ? "#f1f5f9" : "#94a3b8"
              }}>{match.home.score}</span>
              <span style={{ color: "#334155", fontSize: 16 }}>—</span>
              <span style={{
                fontSize: 28, fontWeight: 900, fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 2,
                color: isLive ? "#f1f5f9" : "#94a3b8"
              }}>{match.away.score}</span>
            </div>
          )}
        </div>

        <div style={{ flex: 1, textAlign: "right" }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#f1f5f9", fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 2 }}>
            {match.away.name}
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <FormDots form={match.away.form} />
          </div>
        </div>
      </div>

      <PredictionBar
        home={match.prediction.homeWin}
        draw={match.prediction.draw}
        away={match.prediction.awayWin}
      />
    </div>
  );
}

function EventTimeline({ events, homeName, awayName }) {
  if (!events.length) return (
    <div style={{ textAlign: "center", color: "#334155", fontSize: 12, padding: "30px 0", fontFamily: "'Space Mono', monospace" }}>
      Aucun événement encore
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: "10px 0" }}>
      {[...events].reverse().map((ev, i) => {
        const isHome = ev.team === "home";
        return (
          <div key={i} style={{
            display: "flex",
            alignItems: "center",
            justifyContent: isHome ? "flex-start" : "flex-end",
            gap: 8,
            animation: "fadeIn 0.3s ease"
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              flexDirection: isHome ? "row" : "row-reverse"
            }}>
              <div style={{
                background: ev.type === "goal" ? "rgba(34,197,94,0.15)" : ev.type === "yellow" ? "rgba(234,179,8,0.15)" : "rgba(239,68,68,0.15)",
                border: `1px solid ${ev.type === "goal" ? "#22c55e" : ev.type === "yellow" ? "#eab308" : "#ef4444"}33`,
                borderRadius: 6,
                padding: "4px 10px",
                fontSize: 11,
                fontFamily: "'Space Mono', monospace",
                color: ev.type === "goal" ? "#22c55e" : ev.type === "yellow" ? "#eab308" : "#ef4444",
              }}>
                {ev.type === "goal" ? "⚽" : ev.type === "yellow" ? "🟨" : "🟥"} {ev.player}
              </div>
              <span style={{ fontSize: 10, color: "#475569", fontFamily: "'Space Mono', monospace", minWidth: 24, textAlign: "center" }}>
                {ev.minute}'
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function DetailPanel({ match }) {
  const dominant = match.prediction.homeWin > match.prediction.awayWin ? match.home.name : match.away.name;
  const dominantPct = Math.max(match.prediction.homeWin, match.prediction.awayWin);

  return (
    <div style={{
      background: "rgba(2,6,23,0.85)",
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: 16,
      padding: 24,
      backdropFilter: "blur(20px)",
    }}>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 11, color: "#3b82f6", fontFamily: "'Space Mono', monospace", letterSpacing: 2, marginBottom: 4 }}>
          {match.leagueFlag} {match.league.toUpperCase()} · {match.stadium}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 26, fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 3, color: "#f1f5f9" }}>
            {match.home.name}
          </span>
          {match.status !== "upcoming" && (
            <span style={{ fontSize: 36, fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 4, color: "#f1f5f9" }}>
              {match.home.score} — {match.away.score}
            </span>
          )}
          {match.status === "upcoming" && (
            <span style={{ fontSize: 18, fontFamily: "'Space Mono', monospace", color: "#f59e0b" }}>
              {match.kickoff}
            </span>
          )}
          <span style={{ fontSize: 26, fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 3, color: "#f1f5f9" }}>
            {match.away.name}
          </span>
        </div>
      </div>

      <div style={{ width: "100%", height: 1, background: "rgba(255,255,255,0.05)", marginBottom: 20 }} />

      {/* AI Prediction Detail */}
      <div style={{
        background: "linear-gradient(135deg, rgba(59,130,246,0.08), rgba(139,92,246,0.05))",
        border: "1px solid rgba(59,130,246,0.2)",
        borderRadius: 12,
        padding: 16,
        marginBottom: 20
      }}>
        <div style={{ fontSize: 10, color: "#3b82f6", fontFamily: "'Space Mono', monospace", letterSpacing: 2, marginBottom: 12 }}>
          🔮 ANALYSE IA
        </div>
        <div style={{ display: "flex", justifyContent: "space-around", marginBottom: 14 }}>
          {[
            { label: match.home.name, value: match.prediction.homeWin, color: "#3b82f6" },
            { label: "Nul", value: match.prediction.draw, color: "#64748b" },
            { label: match.away.name, value: match.prediction.awayWin, color: "#f97316" },
          ].map((item, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{
                fontSize: 28, fontWeight: 900, fontFamily: "'Bebas Neue', sans-serif",
                color: item.color, letterSpacing: 2
              }}>{item.value}%</div>
              <div style={{ fontSize: 10, color: "#64748b", fontFamily: "'Space Mono', monospace" }}>
                {item.label.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 11, color: "#94a3b8", fontFamily: "'Space Mono', monospace", lineHeight: 1.6 }}>
          {match.status === "upcoming"
            ? `L'IA prédit une victoire probable de ${dominant} (${dominantPct}%). Basé sur la forme récente, les confrontations directes et les statistiques de la saison.`
            : match.status === "live"
            ? `En cours : ${dominant} reste favori à ${dominantPct}% malgré le score actuel. La probabilité évolue en temps réel.`
            : `Résultat confirmé. La prévision initiale donnait ${dominant} favori à ${dominantPct}%.`
          }
        </div>
      </div>

      {/* Form comparison */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
        {[
          { team: match.home, align: "left" },
          { team: match.away, align: "right" },
        ].map(({ team, align }, i) => (
          <div key={i} style={{ textAlign: align }}>
            <div style={{ fontSize: 10, color: "#64748b", fontFamily: "'Space Mono', monospace", letterSpacing: 1, marginBottom: 6 }}>
              FORME RÉCENTE
            </div>
            <div style={{ display: "flex", gap: 3, justifyContent: align === "right" ? "flex-end" : "flex-start" }}>
              {team.form.map((r, j) => (
                <div key={j} style={{
                  width: 20, height: 20, borderRadius: 4,
                  background: r === "W" ? "rgba(34,197,94,0.25)" : r === "D" ? "rgba(234,179,8,0.25)" : "rgba(239,68,68,0.25)",
                  border: `1px solid ${r === "W" ? "#22c55e" : r === "D" ? "#eab308" : "#ef4444"}44`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 9, fontWeight: 700, fontFamily: "'Space Mono', monospace",
                  color: r === "W" ? "#22c55e" : r === "D" ? "#eab308" : "#ef4444"
                }}>{r}</div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div>
        <div style={{ fontSize: 10, color: "#475569", fontFamily: "'Space Mono', monospace", letterSpacing: 2, marginBottom: 10 }}>
          ÉVÉNEMENTS
        </div>
        <EventTimeline events={match.events} homeName={match.home.name} awayName={match.away.name} />
      </div>
    </div>
  );
}

function Ticker({ items }) {
  const [pos, setPos] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const anim = () => {
      setPos(p => {
        if (ref.current && -p > ref.current.scrollWidth / 2) return 0;
        return p - 0.5;
      });
      reqRef.current = requestAnimationFrame(anim);
    };
    const reqRef = { current: null };
    reqRef.current = requestAnimationFrame(anim);
    return () => cancelAnimationFrame(reqRef.current);
  }, []);

  const repeated = [...items, ...items];

  return (
    <div style={{
      background: "rgba(239,68,68,0.12)",
      borderTop: "1px solid rgba(239,68,68,0.3)",
      borderBottom: "1px solid rgba(239,68,68,0.3)",
      overflow: "hidden",
      height: 32,
      display: "flex",
      alignItems: "center",
      position: "relative"
    }}>
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: 80,
        background: "linear-gradient(90deg, #020617, transparent)",
        zIndex: 1
      }} />
      <div style={{
        position: "absolute", left: 0, background: "#ef4444",
        padding: "0 12px", height: "100%", display: "flex", alignItems: "center",
        fontSize: 10, fontWeight: 900, fontFamily: "'Bebas Neue', sans-serif",
        letterSpacing: 2, color: "white", zIndex: 2
      }}>
        DIRECT
      </div>
      <div ref={ref} style={{
        display: "flex",
        transform: `translateX(${pos + 90}px)`,
        whiteSpace: "nowrap",
        gap: 48,
        paddingLeft: 20
      }}>
        {repeated.map((item, i) => (
          <span key={i} style={{
            fontSize: 11, color: "#cbd5e1", fontFamily: "'Space Mono', monospace",
            letterSpacing: 0.5
          }}>{item}</span>
        ))}
      </div>
    </div>
  );
}

export default function FlashResultats() {
  const [selected, setSelected] = useState(MATCHES[0]);
  const [filter, setFilter] = useState("all");
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const filtered = filter === "all" ? MATCHES
    : MATCHES.filter(m => m.status === filter);

  const liveCount = MATCHES.filter(m => m.status === "live").length;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#020617",
      backgroundImage: "radial-gradient(ellipse at 20% 20%, rgba(59,130,246,0.06) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(139,92,246,0.04) 0%, transparent 50%)",
      fontFamily: "sans-serif",
      color: "#f1f5f9",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />

      {/* Top Bar */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "0 24px", height: 52,
        background: "rgba(2,6,23,0.95)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        position: "sticky", top: 0, zIndex: 100
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            fontSize: 22, fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 4,
            color: "#f1f5f9"
          }}>⚡ FAST</div>
          <div style={{
            fontSize: 22, fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 4,
            color: "#3b82f6"
          }}>SCORE</div>
          <div style={{
            background: "rgba(239,68,68,0.15)",
            border: "1px solid rgba(239,68,68,0.4)",
            borderRadius: 4, padding: "2px 8px",
            fontSize: 9, color: "#ef4444",
            fontFamily: "'Space Mono', monospace", letterSpacing: 1
          }}>
            {liveCount} EN DIRECT
          </div>
        </div>
        <div style={{
          fontSize: 12, fontFamily: "'Space Mono', monospace", color: "#475569", letterSpacing: 1
        }}>
          {time.toLocaleTimeString("fr-FR")}
        </div>
      </div>

      {/* Ticker */}
      <Ticker items={TICKER_ITEMS} />

      {/* Filter tabs */}
      <div style={{
        display: "flex", gap: 2, padding: "12px 24px 0",
        borderBottom: "1px solid rgba(255,255,255,0.05)"
      }}>
        {[
          { id: "all", label: "Tous" },
          { id: "live", label: "🔴 En direct" },
          { id: "upcoming", label: "⏰ À venir" },
          { id: "finished", label: "✓ Terminés" },
        ].map(tab => (
          <button key={tab.id} onClick={() => setFilter(tab.id)} style={{
            background: filter === tab.id ? "rgba(59,130,246,0.15)" : "transparent",
            border: filter === tab.id ? "1px solid rgba(59,130,246,0.4)" : "1px solid transparent",
            color: filter === tab.id ? "#60a5fa" : "#475569",
            padding: "6px 14px",
            borderRadius: "8px 8px 0 0",
            fontSize: 11, cursor: "pointer",
            fontFamily: "'Space Mono', monospace",
            letterSpacing: 1,
            transition: "all 0.2s"
          }}>{tab.label.toUpperCase()}</button>
        ))}
      </div>

      {/* Main content */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "340px 1fr",
        gap: 16,
        padding: 20,
        maxWidth: 1100,
        margin: "0 auto",
        minHeight: "calc(100vh - 120px)"
      }}>
        {/* Match list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {filtered.map(match => (
            <MatchCard
              key={match.id}
              match={match}
              selected={selected?.id === match.id}
              onClick={() => setSelected(match)}
            />
          ))}
          {filtered.length === 0 && (
            <div style={{
              textAlign: "center", color: "#334155", padding: 40,
              fontFamily: "'Space Mono', monospace", fontSize: 12
            }}>
              Aucun match dans cette catégorie
            </div>
          )}
        </div>

        {/* Detail */}
        <div>
          {selected ? (
            <DetailPanel match={selected} />
          ) : (
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              height: "100%", color: "#334155",
              fontFamily: "'Space Mono', monospace", fontSize: 13
            }}>
              Sélectionnez un match
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        * { box-sizing: border-box; }
        button { cursor: pointer; }
      `}</style>
    </div>
  );
}
