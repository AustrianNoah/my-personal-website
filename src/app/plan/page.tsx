"use client";
import { motion } from "framer-motion";
import { Calendar, Clock, Gamepad2, Twitch, Bell, ChevronRight } from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const schedule = [
    { day: "Montag", short: "MO", time: "19:00 – 22:00", game: "Variety Gaming", status: "live", color: "#7c3aed" },
    { day: "Dienstag", short: "DI", time: "19:00 – 22:00", game: "FPS / Shooter", status: "live", color: "#a855f7" },
    { day: "Mittwoch", short: "MI", time: "–", game: "Pause", status: "off", color: "#5a5a7a" },
    { day: "Donnerstag", short: "DO", time: "20:00 – 23:00", game: "Community Abend", status: "live", color: "#e879f9" },
    { day: "Freitag", short: "FR", time: "20:00 – 00:00", game: "Late Night Stream", status: "live", color: "#f59e0b" },
    { day: "Samstag", short: "SA", time: "15:00 – 20:00", game: "Ranked / Grind", status: "live", color: "#10b981" },
    { day: "Sonntag", short: "SO", time: "–", game: "Frei / Sonder-Events", status: "maybe", color: "#64748b" },
];

const games = [
    "Valorant", "Minecraft", "League of Legends", "GTA V", "Fortnite", "Elden Ring"
];

export default function PlanPage() {
    const today = new Date().getDay(); // 0=So, 1=Mo
    const dayMap = [6, 0, 1, 2, 3, 4, 5];
    const todayIndex = dayMap[today];

    return (
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "60px 24px 80px" }}>
            <motion.div initial="hidden" animate="visible" variants={stagger}>
                {/* Header */}
                <motion.div variants={fadeUp} style={{ marginBottom: 56, textAlign: "center" }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.25)", borderRadius: 6, padding: "6px 14px", marginBottom: 20 }}>
                        <Calendar size={14} color="var(--accent2)" />
                        <span style={{ color: "var(--accent3)", fontSize: 12, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.1em" }}>STREAM SCHEDULE</span>
                    </div>
                    <h1 className="font-display" style={{ fontSize: "clamp(40px, 6vw, 72px)", lineHeight: 1, marginBottom: 16 }}>
                        WANN BIN ICH <span style={{ color: "var(--accent2)" }}>LIVE?</span>
                    </h1>
                    <p style={{ color: "var(--text2)", fontSize: 16, maxWidth: 500, margin: "0 auto" }}>
                        Hier siehst du alle Stream-Termine der Woche. Verpasse keinen Stream und aktiviere Benachrichtigungen!
                    </p>
                </motion.div>

                {/* Schedule Grid */}
                <motion.div variants={fadeUp} style={{ display: "grid", gap: 12, marginBottom: 56 }}>
                    {schedule.map((item, i) => {
                        const isToday = i === todayIndex;
                        const isLive = item.status === "live";
                        return (
                            <motion.div
                                key={item.day}
                                whileHover={isLive ? { x: 4 } : {}}
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "64px 1fr auto",
                                    alignItems: "center",
                                    gap: 20,
                                    padding: "20px 24px",
                                    borderRadius: 12,
                                    background: isToday ? `${item.color}10` : "var(--surface)",
                                    border: `1px solid ${isToday ? item.color + "40" : "var(--border)"}`,
                                    transition: "all 0.2s",
                                    opacity: item.status === "off" ? 0.5 : 1,
                                }}
                            >
                                {/* Day circle */}
                                <div style={{
                                    width: 52, height: 52, borderRadius: 12,
                                    background: isLive ? `${item.color}20` : "var(--surface2)",
                                    border: `1px solid ${isLive ? item.color + "40" : "var(--border)"}`,
                                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"
                                }}>
                                    <span className="font-mono" style={{ fontSize: 13, fontWeight: 500, color: isLive ? item.color : "var(--text3)" }}>{item.short}</span>
                                </div>

                                <div>
                                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                                        <span style={{ fontWeight: 700, fontSize: 15 }}>{item.day}</span>
                                        {isToday && <span style={{ background: item.color, color: "white", fontSize: 10, fontFamily: "'JetBrains Mono', monospace", padding: "1px 6px", borderRadius: 4, letterSpacing: "0.08em" }}>HEUTE</span>}
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--text3)" }}>
                                        <Gamepad2 size={12} />
                                        <span style={{ fontSize: 13 }}>{item.game}</span>
                                    </div>
                                </div>

                                <div style={{ textAlign: "right" }}>
                                    {item.status === "live" ? (
                                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                            <Clock size={13} color="var(--text3)" />
                                            <span className="font-mono" style={{ fontSize: 13, color: "var(--text)" }}>{item.time}</span>
                                        </div>
                                    ) : (
                                        <span style={{ fontSize: 13, color: "var(--text3)" }}>–</span>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Games Section */}
                <motion.div variants={fadeUp} style={{ marginBottom: 40 }}>
                    <h2 style={{ fontWeight: 800, fontSize: 20, marginBottom: 20 }}>Aktuelle Spiele</h2>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                        {games.map(game => (
                            <motion.div key={game} whileHover={{ scale: 1.05 }} style={{
                                padding: "8px 18px", borderRadius: 8,
                                background: "var(--surface)", border: "1px solid var(--border)",
                                fontSize: 14, fontWeight: 600, color: "var(--text2)",
                                cursor: "default"
                            }}>{game}</motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* CTA */}
                <motion.div variants={fadeUp} className="card glow" style={{ padding: 32, textAlign: "center", background: "linear-gradient(135deg, rgba(124,58,237,0.08), rgba(232,121,249,0.05))" }}>
                    <Bell size={28} color="var(--accent2)" style={{ marginBottom: 12 }} />
                    <h3 style={{ fontWeight: 800, fontSize: 20, marginBottom: 8 }}>Kein Stream verpassen!</h3>
                    <p style={{ color: "var(--text2)", marginBottom: 20, fontSize: 14 }}>Aktiviere Benachrichtigungen auf Twitch, um sofort Bescheid zu bekommen.</p>
                    <a href="https://twitch.tv" target="_blank" className="btn-primary" style={{ padding: "13px 28px", fontSize: 14, display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
                        <Twitch size={16} /> Auf Twitch folgen <ChevronRight size={16} />
                    </a>
                </motion.div>
            </motion.div>
        </div>
    );
}
