"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Eye, ThumbsUp, ExternalLink, Youtube, Twitch, X, Clock } from "lucide-react";
import { useState } from "react";

const cats = ["Alle", "Valorant", "Minecraft", "LoL", "GTA V", "Variety"];

const clips = [
    { id: 1, title: "MEGA CLUTCH — 1v5 Valorant!", views: "14.2K", likes: "892", dur: "0:47", cat: "Valorant", plat: "twitch", hue: 195, hot: true, date: "vor 2 Tagen" },
    { id: 2, title: "Community Challenge gewonnen 😱", views: "9.8K", likes: "654", dur: "1:23", cat: "Minecraft", plat: "youtube", hue: 140, hot: false, date: "vor 5 Tagen" },
    { id: 3, title: "Fail-Compilation – absolutes Chaos", views: "22.1K", likes: "1.4K", dur: "3:15", cat: "Variety", plat: "youtube", hue: 30, hot: true, date: "vor 1 Woche" },
    { id: 4, title: "Ranked Push auf Challenger-Level", views: "7.3K", likes: "401", dur: "0:58", cat: "LoL", plat: "twitch", hue: 260, hot: false, date: "vor 1 Woche" },
    { id: 5, title: "Stream Sniper live erwischt 😂", views: "18.7K", likes: "1.1K", dur: "0:34", cat: "Valorant", plat: "twitch", hue: 10, hot: true, date: "vor 2 Wochen" },
    { id: 6, title: "GTA V Chaos mit der Community", views: "5.9K", likes: "330", dur: "2:05", cat: "GTA V", plat: "twitch", hue: 50, hot: false, date: "vor 2 Wochen" },
    { id: 7, title: "Minecraft Hardcore – Run failed", views: "11.2K", likes: "780", dur: "1:44", cat: "Minecraft", plat: "youtube", hue: 115, hot: false, date: "vor 3 Wochen" },
    { id: 8, title: "500 IQ Valorant Fake Out", views: "8.4K", likes: "510", dur: "0:22", cat: "Valorant", plat: "twitch", hue: 200, hot: true, date: "vor 3 Wochen" },
    { id: 9, title: "Late Night uncut — Best Moments", views: "16.3K", likes: "940", dur: "5:02", cat: "Variety", plat: "youtube", hue: 280, hot: false, date: "vor 1 Monat" },
];

export default function ClipsPage() {
    const [active, setActive] = useState("Alle");
    const [lightbox, setLightbox] = useState<number | null>(null);

    const filtered = active === "Alle" ? clips : clips.filter(c => c.cat === active);
    const lb = lightbox !== null ? clips.find(c => c.id === lightbox) : null;

    return (
        <div style={{ paddingTop: 64 }}>
            {/* Header */}
            <div style={{ borderBottom: "1px solid var(--border)", padding: "80px 32px 56px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, var(--cyan), transparent)" }} />
                <div style={{ maxWidth: 1400, margin: "0 auto" }}>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="f-mono" style={{ fontSize: 10, color: "var(--cyan)", letterSpacing: "0.15em", marginBottom: 20 }}>// HIGHLIGHTS & CLIPS</motion.p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24 }}>
                        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16,1,0.3,1] }}
                                   className="f-display" style={{ fontSize: "clamp(52px, 8vw, 100px)", lineHeight: 0.9 }}>
                            BESTE<br /><span style={{ color: "transparent", WebkitTextStroke: "2px var(--cyan)" }}>MOMENTE.</span>
                        </motion.h1>
                        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                            <a href="https://youtube.com" target="_blank" className="btn btn-outline" style={{ display: "inline-flex" }}>
                                <Youtube size={14} color="#ff0000" /> YouTube <ExternalLink size={12} />
                            </a>
                            <a href="https://twitch.tv" target="_blank" className="btn btn-outline" style={{ display: "inline-flex" }}>
                                <Twitch size={14} color="#9146ff" /> Twitch <ExternalLink size={12} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filter bar */}
            <div style={{ borderBottom: "1px solid var(--border)", padding: "0 32px", background: "var(--black2)", overflowX: "auto" }}>
                <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", gap: 0 }}>
                    {cats.map(cat => (
                        <button key={cat} onClick={() => setActive(cat)} style={{
                            padding: "18px 24px", fontFamily: "'Archivo', sans-serif",
                            fontWeight: 700, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase",
                            background: "none", border: "none", cursor: "pointer",
                            color: active === cat ? "var(--white)" : "var(--white3)",
                            borderBottom: active === cat ? "2px solid var(--cyan)" : "2px solid transparent",
                            whiteSpace: "nowrap", transition: "all 0.2s",
                        }}>{cat}</button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            <div style={{ maxWidth: 1400, margin: "0 auto", padding: "48px 32px 80px" }}>
                <motion.div layout style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 20 }}>
                    <AnimatePresence>
                        {filtered.map((clip) => (
                            <motion.div key={clip.id} layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.94 }} transition={{ duration: 0.2 }}>
                                <motion.div whileHover={{ y: -4 }} onClick={() => setLightbox(clip.id)} style={{ cursor: "pointer" }}>
                                    {/* Thumbnail */}
                                    <div className="scanlines" style={{
                                        aspectRatio: "16/9",
                                        background: `linear-gradient(135deg, hsl(${clip.hue}deg 40% 10%) 0%, var(--black) 100%)`,
                                        border: "1px solid var(--border)", borderRadius: "3px 3px 0 0",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        position: "relative", overflow: "hidden",
                                    }}>
                                        <motion.div whileHover={{ scale: 1.15 }} style={{
                                            width: 52, height: 52, borderRadius: "50%",
                                            border: "1.5px solid rgba(245,244,240,0.25)", background: "rgba(8,8,9,0.7)",
                                            backdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center",
                                        }}><Play size={18} color="white" fill="white" /></motion.div>

                                        {/* Platform */}
                                        <div style={{ position: "absolute", top: 12, left: 12, display: "flex", alignItems: "center", gap: 5, background: "rgba(8,8,9,0.75)", backdropFilter: "blur(8px)", padding: "4px 9px", borderRadius: 2 }}>
                                            {clip.plat === "twitch" ? <Twitch size={10} color="#9146ff" /> : <Youtube size={10} color="#ff0000" />}
                                            <span className="f-mono" style={{ fontSize: 9, color: "var(--white2)", letterSpacing: "0.1em" }}>{clip.plat.toUpperCase()}</span>
                                        </div>

                                        {clip.hot && <div style={{ position: "absolute", top: 12, right: 12 }}><span className="tag tag-cyan" style={{ fontSize: 8 }}>HOT</span></div>}
                                        <span className="f-mono" style={{ position: "absolute", bottom: 10, right: 12, fontSize: 10, color: "var(--white2)", background: "rgba(8,8,9,0.7)", padding: "2px 7px", borderRadius: 2 }}>{clip.dur}</span>
                                    </div>

                                    {/* Info */}
                                    <div style={{ padding: "14px 16px", border: "1px solid var(--border)", borderTop: "none", borderRadius: "0 0 3px 3px", background: "var(--black2)" }}>
                                        <p style={{ fontWeight: 600, fontSize: 14, lineHeight: 1.35, marginBottom: 10 }}>{clip.title}</p>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                            <div style={{ display: "flex", gap: 14 }}>
                                                <span className="f-mono" style={{ fontSize: 10, color: "var(--white3)", display: "flex", alignItems: "center", gap: 4 }}><Eye size={10} />{clip.views}</span>
                                                <span className="f-mono" style={{ fontSize: 10, color: "var(--white3)", display: "flex", alignItems: "center", gap: 4 }}><ThumbsUp size={10} />{clip.likes}</span>
                                            </div>
                                            <span className="f-mono" style={{ fontSize: 10, color: "var(--white3)" }}>{clip.date}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {lb && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                onClick={() => setLightbox(null)}
                                style={{ position: "fixed", inset: 0, background: "rgba(8,8,9,0.95)", zIndex: 9000, display: "flex", alignItems: "center", justifyContent: "center", padding: 24, cursor: "pointer" }}>
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={e => e.stopPropagation()}
                                    style={{ maxWidth: 800, width: "100%", cursor: "default" }}>
                            <div style={{ aspectRatio: "16/9", background: `linear-gradient(135deg, hsl(${lb.hue}deg 40% 12%), var(--black))`, border: "1px solid var(--border2)", borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                                <Play size={64} color="var(--white)" style={{ opacity: 0.3 }} />
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                                <div>
                                    <p style={{ fontWeight: 700, fontSize: 20, marginBottom: 8 }}>{lb.title}</p>
                                    <div style={{ display: "flex", gap: 16 }}>
                                        <span className="f-mono" style={{ fontSize: 11, color: "var(--white3)" }}><Eye size={11} style={{ display: "inline", marginRight: 4 }} />{lb.views}</span>
                                        <span className="f-mono" style={{ fontSize: 11, color: "var(--white3)" }}><Clock size={11} style={{ display: "inline", marginRight: 4 }} />{lb.dur}</span>
                                        <span className="tag tag-white">{lb.cat}</span>
                                    </div>
                                </div>
                                <button onClick={() => setLightbox(null)} style={{ background: "none", border: "1px solid var(--border)", borderRadius: 3, color: "var(--white)", cursor: "pointer", padding: "8px 10px" }}><X size={16} /></button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
