"use client";
import { motion } from "framer-motion";
import { Play, Eye, Clock, ThumbsUp, ExternalLink, Youtube, Twitch, Filter } from "lucide-react";
import { useState } from "react";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.07 } } };

const clips = [
    { id: 1, title: "MEGA CLUTCH – 1v5 Valorant!", views: "14.2K", likes: "892", duration: "0:47", category: "Valorant", platform: "twitch", color: "#9146ff", date: "vor 2 Tagen" },
    { id: 2, title: "Community Challenge gewonnen 😱", views: "9.8K", likes: "654", duration: "1:23", category: "Minecraft", platform: "youtube", color: "#ff0000", date: "vor 5 Tagen" },
    { id: 3, title: "Die lustigste Fail-Compilation ever", views: "22.1K", likes: "1.4K", duration: "3:15", category: "Variety", platform: "youtube", color: "#ff0000", date: "vor 1 Woche" },
    { id: 4, title: "Ranked auf Challenger Push – Kann ich's?", views: "7.3K", likes: "401", duration: "0:58", category: "LoL", platform: "twitch", color: "#9146ff", date: "vor 1 Woche" },
    { id: 5, title: "Stream Sniper erwischt! 😂", views: "18.7K", likes: "1.1K", duration: "0:34", category: "Valorant", platform: "twitch", color: "#9146ff", date: "vor 2 Wochen" },
    { id: 6, title: "Late Night bestmögliches Chaos", views: "5.9K", likes: "330", duration: "2:05", category: "GTA V", platform: "twitch", color: "#9146ff", date: "vor 2 Wochen" },
];

const categories = ["Alle", "Valorant", "Minecraft", "LoL", "GTA V", "Variety"];

export default function ClipsPage() {
    const [active, setActive] = useState("Alle");

    const filtered = active === "Alle" ? clips : clips.filter(c => c.category === active);

    return (
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 24px 80px" }}>
            <motion.div initial="hidden" animate="visible" variants={stagger}>
                {/* Header */}
                <motion.div variants={fadeUp} style={{ marginBottom: 48, textAlign: "center" }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(232,121,249,0.1)", border: "1px solid rgba(232,121,249,0.25)", borderRadius: 6, padding: "6px 14px", marginBottom: 20 }}>
                        <Play size={13} color="var(--neon)" />
                        <span style={{ color: "var(--neon)", fontSize: 12, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.1em" }}>HIGHLIGHTS & CLIPS</span>
                    </div>
                    <h1 className="font-display" style={{ fontSize: "clamp(40px, 6vw, 72px)", lineHeight: 1, marginBottom: 16 }}>
                        BESTE <span style={{ color: "var(--neon)" }}>MOMENTE</span>
                    </h1>
                    <p style={{ color: "var(--text2)", fontSize: 16, maxWidth: 480, margin: "0 auto" }}>
                        Epische Clutches, Fails & Community-Highlights – die unvergesslichsten Stream-Momente.
                    </p>
                </motion.div>

                {/* Filter */}
                <motion.div variants={fadeUp} style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 36, alignItems: "center" }}>
                    <Filter size={14} color="var(--text3)" />
                    {categories.map(cat => (
                        <button key={cat} onClick={() => setActive(cat)}
                                style={{
                                    padding: "7px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer",
                                    background: active === cat ? "linear-gradient(135deg, var(--accent), var(--accent2))" : "var(--surface)",
                                    color: active === cat ? "white" : "var(--text2)",
                                    border: active === cat ? "none" : "1px solid var(--border)",
                                    transition: "all 0.2s",
                                }}>{cat}</button>
                    ))}
                </motion.div>

                {/* Clips Grid */}
                <motion.div layout style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20 }}>
                    {filtered.map((clip, i) => (
                        <motion.div key={clip.id} variants={fadeUp} layout initial="hidden" animate="visible" transition={{ delay: i * 0.06 }}>
                            <motion.div whileHover={{ y: -6 }} className="card" style={{ overflow: "hidden", cursor: "pointer" }}>
                                {/* Thumbnail */}
                                <div style={{
                                    height: 180, background: `linear-gradient(135deg, ${clip.color}18, rgba(5,5,8,0.8))`,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    position: "relative", borderBottom: "1px solid var(--border)"
                                }}>
                                    <motion.div whileHover={{ scale: 1.1 }} style={{
                                        width: 52, height: 52, borderRadius: "50%",
                                        background: "rgba(255,255,255,0.1)", backdropFilter: "blur(10px)",
                                        border: "2px solid rgba(255,255,255,0.2)",
                                        display: "flex", alignItems: "center", justifyContent: "center"
                                    }}>
                                        <Play size={20} color="white" fill="white" />
                                    </motion.div>
                                    {/* Platform badge */}
                                    <div style={{ position: "absolute", top: 10, left: 10, background: clip.color, borderRadius: 6, padding: "3px 8px", display: "flex", alignItems: "center", gap: 4 }}>
                                        {clip.platform === "twitch" ? <Twitch size={11} color="white" /> : <Youtube size={11} color="white" />}
                                        <span style={{ fontSize: 10, color: "white", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.05em" }}>
                      {clip.platform === "twitch" ? "TWITCH" : "YOUTUBE"}
                    </span>
                                    </div>
                                    <div style={{ position: "absolute", bottom: 10, right: 10, background: "rgba(0,0,0,0.7)", borderRadius: 4, padding: "2px 7px" }}>
                                        <span className="font-mono" style={{ fontSize: 11, color: "white" }}>{clip.duration}</span>
                                    </div>
                                    <div style={{ position: "absolute", top: 10, right: 10, background: "rgba(0,0,0,0.5)", borderRadius: 6, padding: "2px 8px" }}>
                                        <span style={{ fontSize: 11, color: "var(--text2)", fontWeight: 600 }}>{clip.category}</span>
                                    </div>
                                </div>

                                {/* Info */}
                                <div style={{ padding: "16px 18px" }}>
                                    <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 10, lineHeight: 1.3 }}>{clip.title}</h3>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <div style={{ display: "flex", gap: 14 }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 4, color: "var(--text3)", fontSize: 12 }}>
                        <Eye size={12} /> {clip.views}
                      </span>
                                            <span style={{ display: "flex", alignItems: "center", gap: 4, color: "var(--text3)", fontSize: 12 }}>
                        <ThumbsUp size={12} /> {clip.likes}
                      </span>
                                        </div>
                                        <span style={{ color: "var(--text3)", fontSize: 11, fontFamily: "'JetBrains Mono', monospace" }}>{clip.date}</span>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* More on YT */}
                <motion.div variants={fadeUp} style={{ textAlign: "center", marginTop: 56 }}>
                    <p style={{ color: "var(--text3)", marginBottom: 16, fontSize: 14 }}>Noch mehr Highlights auf YouTube & Twitch</p>
                    <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                        <a href="https://youtube.com" target="_blank" className="btn-ghost" style={{ padding: "12px 24px", display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none", fontSize: 14 }}>
                            <Youtube size={16} color="#ff0000" /> YouTube <ExternalLink size={12} />
                        </a>
                        <a href="https://twitch.tv" target="_blank" className="btn-ghost" style={{ padding: "12px 24px", display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none", fontSize: 14 }}>
                            <Twitch size={16} color="#9146ff" /> Twitch Clips <ExternalLink size={12} />
                        </a>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
