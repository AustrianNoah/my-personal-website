"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Twitch, Youtube, ArrowRight, Play, TrendingUp, Eye } from "lucide-react";
import Link from "next/link";
import TwitchStats from "@/components/TwitchStats";

const games = ["VALORANT","MINECRAFT","LEAGUE OF LEGENDS","GTA V","FORTNITE","ELDEN RING","VALORANT","MINECRAFT","LEAGUE OF LEGENDS","GTA V","FORTNITE","ELDEN RING"];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
      <div>
        {/* ─── HERO ─── */}
        <section ref={heroRef} style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", position: "relative", overflow: "hidden", paddingBottom: 80 }}>
          {/* BG ghost text */}
          <motion.div style={{ y: heroY, opacity: heroOpacity, position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
            <div className="f-display" style={{ fontSize: "clamp(200px, 40vw, 480px)", color: "transparent", WebkitTextStroke: "1px rgba(245,244,240,0.03)", userSelect: "none", letterSpacing: "-0.02em", lineHeight: 1 }}>
              EN
            </div>
          </motion.div>

          {/* Top accent line */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, var(--cyan), transparent)" }} />

          {/* Content */}
          <motion.div style={{ y: heroY, maxWidth: 1400, margin: "0 auto", padding: "120px 32px 0", position: "relative", zIndex: 1, width: "100%" }}>

            {/* Big headline */}
            <div style={{ overflow: "hidden", marginBottom: 8 }}>
              <motion.h1 initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                         className="f-display" style={{ fontSize: "clamp(64px, 12vw, 160px)", lineHeight: 0.9, letterSpacing: "-0.01em", color: "var(--white)" }}>
                EY
              </motion.h1>
            </div>
            <div style={{ overflow: "hidden", marginBottom: 56 }}>
              <motion.h1 initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
                         className="f-display" style={{ fontSize: "clamp(64px, 12vw, 160px)", lineHeight: 0.9, letterSpacing: "-0.01em", color: "transparent", WebkitTextStroke: "2px var(--cyan)" }}>
                NOAH.
              </motion.h1>
            </div>

            {/* Description + CTA */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.6 }}
                        style={{ display: "flex", gap: 48, alignItems: "flex-start", flexWrap: "wrap", marginBottom: 56 }}>
              <div style={{ maxWidth: 360 }}>
                <p style={{ color: "var(--white2)", fontSize: 16, lineHeight: 1.75, marginBottom: 28 }}>
                  Streamer, Gamer & Content Creator — täglich live mit der Community. Kein Skip, kein Filter. Nur echtes Gaming.
                </p>
                <div style={{ display: "flex", gap: 12 }}>
                  <a href="https://twitch.tv/eynoah" target="_blank" className="btn btn-cyan">
                    <Twitch size={15} /> Live schauen
                  </a>
                  <Link href="/clips" className="btn btn-outline">
                    <Play size={15} /> Clips
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* ── TWITCH LIVE STATS ── */}
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65, duration: 0.6 }}>
              <div style={{ borderTop: "1px solid var(--border)", paddingTop: 32 }}>
                <p className="f-mono" style={{ fontSize: 9, color: "var(--white3)", letterSpacing: "0.2em", marginBottom: 20 }}>// ECHTZEIT TWITCH STATS</p>
                <TwitchStats />
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* ─── MARQUEE ─── */}
        <div style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "18px 0", overflow: "hidden", background: "var(--black2)" }}>
          <div className="marquee-track">
            {games.map((g, i) => (
                <div key={i} className="f-mono" style={{ display: "flex", alignItems: "center", gap: 32, paddingRight: 32, fontSize: 11, letterSpacing: "0.15em", color: i % 3 === 0 ? "var(--cyan)" : "var(--white3)" }}>
                  {g} <span style={{ opacity: 0.3 }}>◆</span>
                </div>
            ))}
          </div>
        </div>

        {/* ─── SCHEDULE PREVIEW ─── */}
        <section style={{ maxWidth: 1400, margin: "0 auto", padding: "120px 32px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
            <div>
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <p className="f-mono" style={{ fontSize: 10, color: "var(--white3)", letterSpacing: "0.15em", marginBottom: 20 }}>// SCHEDULE</p>
                <h2 className="f-display" style={{ fontSize: "clamp(40px, 5vw, 72px)", lineHeight: 1, marginBottom: 24 }}>
                  WANN BIN<br />ICH <span style={{ color: "var(--cyan)" }}>LIVE?</span>
                </h2>
                <p style={{ color: "var(--white3)", fontSize: 15, lineHeight: 1.7, maxWidth: 320, marginBottom: 32 }}>
                  Von Montag bis Samstag – mit Late Night Streams, Community Events und Ranked Grind.
                </p>
                <Link href="/plan" className="btn btn-outline" style={{ display: "inline-flex" }}>
                  Zum Spielplan <ArrowRight size={15} />
                </Link>
              </motion.div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {[
                { d: "MO", label: "Montag", time: "19–22", game: "Variety", live: true },
                { d: "DI", label: "Dienstag", time: "19–22", game: "FPS / Shooter", live: true },
                { d: "MI", label: "Mittwoch", time: "—", game: "Pause", live: false },
                { d: "DO", label: "Donnerstag", time: "20–23", game: "Community Abend", live: true },
                { d: "FR", label: "Freitag", time: "20–00", game: "Late Night", live: true },
                { d: "SA", label: "Samstag", time: "15–20", game: "Ranked Grind", live: true },
              ].map(({ d, label, time, game, live }, i) => (
                  <motion.div key={d}
                              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                              style={{
                                display: "grid", gridTemplateColumns: "48px 1fr auto",
                                alignItems: "center", gap: 20, padding: "16px 20px",
                                background: "var(--black2)", border: "1px solid var(--border)",
                                borderLeft: live ? "2px solid var(--cyan)" : "2px solid var(--black2)",
                                opacity: live ? 1 : 0.4, transition: "background 0.2s",
                              }}
                              whileHover={{ background: "var(--black3)" }}
                  >
                    <span className="f-mono" style={{ fontSize: 11, color: live ? "var(--cyan)" : "var(--white3)", letterSpacing: "0.1em" }}>{d}</span>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>{label}</p>
                      <p className="f-mono" style={{ fontSize: 10, color: "var(--white3)" }}>{game}</p>
                    </div>
                    <span className="f-mono" style={{ fontSize: 11, color: "var(--white3)" }}>{time} Uhr</span>
                  </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CLIPS PREVIEW ─── */}
        <section style={{ background: "var(--black2)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "120px 32px" }}>
          <div style={{ maxWidth: 1400, margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 56, flexWrap: "wrap", gap: 20 }}>
              <div>
                <p className="f-mono" style={{ fontSize: 10, color: "var(--white3)", letterSpacing: "0.15em", marginBottom: 16 }}>// HIGHLIGHTS</p>
                <h2 className="f-display" style={{ fontSize: "clamp(36px, 4vw, 60px)", lineHeight: 1 }}>
                  BESTE <span style={{ color: "var(--cyan)" }}>CLIPS</span>
                </h2>
              </div>
              <Link href="/clips" className="btn btn-outline" style={{ display: "inline-flex" }}>
                Alle ansehen <ArrowRight size={15} />
              </Link>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
              {[
                { title: "MEGA CLUTCH — 1v5 Valorant!", views: "14.2K", duration: "0:47", hot: true },
                { title: "Die lustigste Fail-Compilation", views: "22.1K", duration: "3:15", hot: true },
                { title: "Stream Sniper erwischt 😂", views: "18.7K", duration: "0:34", hot: false },
              ].map((clip, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                    <motion.div whileHover={{ scale: 1.02 }} className="scanlines" style={{
                      aspectRatio: "16/9", background: `linear-gradient(135deg, hsl(${190 + i * 20}deg 60% 8%), var(--black))`,
                      border: "1px solid var(--border)", borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center",
                      position: "relative", cursor: "pointer", overflow: "hidden",
                    }}>
                      <motion.div whileHover={{ scale: 1.1 }} style={{
                        width: 48, height: 48, borderRadius: "50%", border: "1.5px solid rgba(245,244,240,0.3)",
                        display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(8,8,9,0.6)", backdropFilter: "blur(8px)"
                      }}>
                        <Play size={18} color="var(--white)" fill="var(--white)" />
                      </motion.div>
                      {clip.hot && <div style={{ position: "absolute", top: 10, left: 10 }}><span className="tag tag-cyan">HOT</span></div>}
                      <span className="f-mono" style={{ position: "absolute", bottom: 10, right: 10, fontSize: 10, color: "var(--white2)", background: "rgba(8,8,9,0.7)", padding: "2px 7px", borderRadius: 2 }}>{clip.duration}</span>
                    </motion.div>
                    <div style={{ padding: "14px 4px 0" }}>
                      <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 6, lineHeight: 1.3 }}>{clip.title}</p>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <span className="f-mono" style={{ fontSize: 10, color: "var(--white3)" }}><Eye size={10} style={{ display: "inline", marginRight: 4 }} />{clip.views} views</span>
                        <TrendingUp size={10} color="var(--cyan)" />
                      </div>
                    </div>
                  </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section style={{ maxWidth: 1400, margin: "0 auto", padding: "120px 32px" }}>
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                      style={{ border: "1px solid var(--border)", borderRadius: 3, padding: "80px 64px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent 0%, var(--cyan) 50%, transparent 100%)" }} />
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 0%, rgba(0,229,255,0.05) 0%, transparent 60%)", pointerEvents: "none" }} />
            <div style={{ maxWidth: 600, position: "relative" }}>
              <p className="f-mono" style={{ fontSize: 10, color: "var(--cyan)", letterSpacing: "0.15em", marginBottom: 20 }}>// JOIN THE COMMUNITY</p>
              <h2 className="f-display" style={{ fontSize: "clamp(36px, 5vw, 64px)", lineHeight: 1, marginBottom: 24 }}>
                KEIN STREAM MEHR VERPASSEN.
              </h2>
              <p style={{ color: "var(--white3)", fontSize: 15, lineHeight: 1.7, marginBottom: 40 }}>
                Folge auf Twitch und YouTube – aktiviere Benachrichtigungen und sei beim nächsten Stream mit dabei.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a href="https://twitch.tv/eynoah" target="_blank" className="btn btn-cyan"><Twitch size={15} /> Twitch folgen</a>
                <a href="https://youtube.com" target="_blank" className="btn btn-outline"><Youtube size={15} /> YouTube abonnieren</a>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
  );
}
