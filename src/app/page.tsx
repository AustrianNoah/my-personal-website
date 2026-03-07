"use client";
import { motion } from "framer-motion";
import { Twitch, Youtube, Twitter, Users, Eye, Zap, ChevronRight, Play, Calendar, Gamepad2, Star } from "lucide-react";
import Link from "next/link";

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

export default function HomePage() {
  return (
      <div>
        {/* HERO */}
        <section style={{ minHeight: "90vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", padding: "80px 24px" }}>
          {/* BG Orbs */}
          <div style={{ position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: "20%", right: "10%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(232,121,249,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />

          <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
            <motion.div variants={stagger} initial="hidden" animate="visible">
              <motion.div variants={fadeUp} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.3)", borderRadius: 6, padding: "6px 14px", marginBottom: 24 }}>
                <span className="live-badge">LIVE</span>
                <span style={{ color: "var(--text2)", fontSize: 13, fontFamily: "'JetBrains Mono', monospace" }}>Mo–Fr ab 19:00 Uhr</span>
              </motion.div>

              <motion.h1 variants={fadeUp} className="font-display" style={{ fontSize: "clamp(56px, 8vw, 96px)", lineHeight: 1, letterSpacing: "0.02em", marginBottom: 20 }}>
                HEY MEIN NAME IST{" "}
                <span style={{ color: "transparent", WebkitTextStroke: "2px var(--accent2)", display: "block" }} className="glow-text">
                EYNOAH
              </span>
              </motion.h1>

              <motion.p variants={fadeUp} style={{ color: "var(--text2)", fontSize: 17, lineHeight: 1.7, marginBottom: 36, maxWidth: 460 }}>
                Streamer, Gamer & Content Creator. Jeden Abend live mit der Community – komm vorbei und sei dabei!
              </motion.p>

              <motion.div variants={fadeUp} style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a href="https://twitch.tv/Labynoah" target="_blank" className="btn-primary" style={{ padding: "14px 28px", fontSize: 15, display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
                  <Twitch size={18} /> Jetzt live schauen
                </a>
                <Link href="/clips" className="btn-ghost" style={{ padding: "14px 28px", fontSize: 15, display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
                  <Play size={18} /> Clips ansehen
                </Link>
              </motion.div>

              <motion.div variants={fadeUp} style={{ display: "flex", gap: 32, marginTop: 48 }}>
                {[{ label: "Follower", val: "124", Icon: Users }, { label: "Zuschauer Ø", val: "2", Icon: Eye }, { label: "Streams", val: "7+", Icon: Zap }].map(({ label, val, Icon }) => (
                    <div key={label}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--accent3)", marginBottom: 2 }}>
                        <Icon size={14} />
                        <span className="font-mono" style={{ fontSize: 22, fontWeight: 500, color: "var(--text)" }}>{val}</span>
                      </div>
                      <span style={{ color: "var(--text3)", fontSize: 12, letterSpacing: "0.08em" }}>{label}</span>
                    </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Avatar Card */}
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} style={{ display: "flex", justifyContent: "center" }}>
              <div className="float" style={{ position: "relative" }}>
                <div className="glow" style={{
                  width: 320, height: 320, borderRadius: 24,
                  background: "linear-gradient(135deg, var(--surface2) 0%, var(--surface) 100%)",
                  border: "1px solid var(--border)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  position: "relative", overflow: "hidden"
                }}>
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(124,58,237,0.1), rgba(232,121,249,0.05))" }} />
                  <div className="font-display" style={{ fontSize: 120, color: "transparent", WebkitTextStroke: "2px rgba(124,58,237,0.4)", position: "relative", zIndex: 1 }}>EN</div>
                  <div style={{ position: "absolute", bottom: 20, left: 0, right: 0, textAlign: "center" }}>
                    <span className="live-badge">● ONLINE</span>
                  </div>
                </div>
                {/* Floating badges */}
                <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                            style={{ position: "absolute", top: -16, right: -16, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, padding: "8px 14px", display: "flex", alignItems: "center", gap: 6 }}>
                  <Gamepad2 size={14} color="var(--accent2)" />
                  <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text)" }}>Gaming</span>
                </motion.div>
                <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
                            style={{ position: "absolute", bottom: -16, left: -16, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, padding: "8px 14px", display: "flex", alignItems: "center", gap: 6 }}>
                  <Star size={14} color="gold" />
                  <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text)" }}>Community</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* QUICK LINKS */}
        <section style={{ padding: "80px 24px", maxWidth: 1200, margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
                      style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            {[
              { href: "/plan", icon: Calendar, label: "Stream Plan", desc: "Wann bin ich live? Alle Termine auf einen Blick.", color: "var(--accent)" },
              { href: "/clips", icon: Play, label: "Beste Clips", desc: "Die lustigsten & epischsten Momente.", color: "var(--neon)" },
              { href: "https://twitch.tv", icon: Twitch, label: "Twitch", desc: "Folge mir auf Twitch und verpasse keinen Stream.", color: "#9146ff", external: true },
            ].map(({ href, icon: Icon, label, desc, color, external }) => (
                <motion.div key={href} variants={fadeUp}>
                  <Link href={href} target={external ? "_blank" : undefined} style={{ textDecoration: "none" }}>
                    <motion.div whileHover={{ y: -4, borderColor: color }} className="card" style={{ padding: 28, cursor: "pointer", transition: "all 0.3s", display: "block" }}>
                      <div style={{ width: 44, height: 44, borderRadius: 10, background: `${color}1a`, border: `1px solid ${color}30`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                        <Icon size={20} color={color} />
                      </div>
                      <h3 style={{ fontWeight: 700, fontSize: 17, marginBottom: 6, color: "var(--text)" }}>{label}</h3>
                      <p style={{ color: "var(--text3)", fontSize: 14, lineHeight: 1.5 }}>{desc}</p>
                      <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 14, color, fontSize: 13, fontWeight: 600 }}>
                        Mehr erfahren <ChevronRight size={14} />
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
            ))}
          </motion.div>
        </section>
      </div>
  );
}
