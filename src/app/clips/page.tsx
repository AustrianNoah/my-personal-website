"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Eye, ThumbsUp, ExternalLink, Youtube, Twitch, X, Clock, ChevronLeft, ChevronRight, Volume2 } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

// ─── CLIP DATA ───────────────────────────────────────────────────────────────
// plat: "twitch" → slug = Twitch Clip Slug (aus clips.twitch.tv/SLUG)
// plat: "youtube" → slug = YouTube Video ID (aus youtube.com/watch?v=ID)
const clips = [
    { id: 1,  title: "» MC Java & Projekt Planung etc 😁 | Viel Spaß und Unterhaltung 🎉",           views: "67", likes: "0",  dur: "0:29", cat: "Minecraft",  plat: "twitch",  slug: "BetterSassyBaguetteFailFish-v0LiZxg8DQxieR5a", hot: true,  date: "vor 2 Tagen",    hue: 195 },
    /*{ id: 2,  title: "Community Challenge gewonnen 😱",        views: "9.8K",  likes: "654",  dur: "1:23", cat: "Minecraft", plat: "youtube", slug: "dQw4w9WgXcQ",                                         hot: false, date: "vor 5 Tagen",    hue: 140 },
    { id: 3,  title: "Fail-Compilation – absolutes Chaos",     views: "22.1K", likes: "1.4K", dur: "3:15", cat: "Variety",   plat: "youtube", slug: "dQw4w9WgXcQ",                                         hot: true,  date: "vor 1 Woche",    hue: 30  },
    { id: 4,  title: "Ranked Push auf Challenger-Level",       views: "7.3K",  likes: "401",  dur: "0:58", cat: "LoL",       plat: "twitch",  slug: "GoodLookingSpottedPigeonPRChase-bGzlCZKBCeqpEXzA", hot: false, date: "vor 1 Woche",    hue: 260 },
    { id: 5,  title: "Stream Sniper live erwischt 😂",         views: "18.7K", likes: "1.1K", dur: "0:34", cat: "Valorant",  plat: "twitch",  slug: "GoodLookingSpottedPigeonPRChase-bGzlCZKBCeqpEXzA", hot: true,  date: "vor 2 Wochen",   hue: 10  },
    { id: 6,  title: "GTA V Chaos mit der Community",          views: "5.9K",  likes: "330",  dur: "2:05", cat: "GTA V",     plat: "twitch",  slug: "GoodLookingSpottedPigeonPRChase-bGzlCZKBCeqpEXzA", hot: false, date: "vor 2 Wochen",   hue: 50  },
    { id: 7,  title: "Minecraft Hardcore – Run failed",        views: "11.2K", likes: "780",  dur: "1:44", cat: "Minecraft", plat: "youtube", slug: "dQw4w9WgXcQ",                                         hot: false, date: "vor 3 Wochen",   hue: 115 },
    { id: 8,  title: "500 IQ Valorant Fake Out",               views: "8.4K",  likes: "510",  dur: "0:22", cat: "Valorant",  plat: "twitch",  slug: "GoodLookingSpottedPigeonPRChase-bGzlCZKBCeqpEXzA", hot: true,  date: "vor 3 Wochen",   hue: 200 },
    { id: 9,  title: "Late Night uncut — Best Moments",        views: "16.3K", likes: "940",  dur: "5:02", cat: "Variety",   plat: "youtube", slug: "dQw4w9WgXcQ",                                         hot: false, date: "vor 1 Monat",    hue: 280 },*/
];

const cats = ["Alle", "Valorant", "Minecraft", "LoL", "GTA V", "Variety"];

type Clip = typeof clips[0];

// ─── PLAYER IFRAME ────────────────────────────────────────────────────────────
function ClipPlayer({ clip }: { clip: Clip }) {
    const [host, setHost] = useState("localhost");

    useEffect(() => {
        setHost(window.location.hostname || "localhost");
    }, []);

    if (clip.plat === "twitch") {
        return (
            <iframe
                key={clip.slug}
                src={`https://clips.twitch.tv/embed?clip=${clip.slug}&parent=${host}&autoplay=true`}
                style={{ width: "100%", height: "100%", border: "none", display: "block" }}
                allowFullScreen
            />
        );
    }

    // YouTube
    return (
        <iframe
            key={clip.slug}
            src={`https://www.youtube.com/embed/${clip.slug}?autoplay=1&rel=0&modestbranding=1&color=white`}
            style={{ width: "100%", height: "100%", border: "none", display: "block" }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        />
    );
}

// ─── CLIP CARD ────────────────────────────────────────────────────────────────
function ClipCard({ clip, onClick }: { clip: Clip; onClick: () => void }) {
    const [hovered, setHovered] = useState(false);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.2 }}
        >
            <motion.div
                whileHover={{ y: -5 }}
                onClick={onClick}
                onHoverStart={() => setHovered(true)}
                onHoverEnd={() => setHovered(false)}
                style={{ cursor: "pointer" }}
            >
                {/* Thumbnail */}
                <div style={{
                    aspectRatio: "16/9",
                    background: `linear-gradient(135deg, hsl(${clip.hue}deg 40% 10%) 0%, var(--black) 100%)`,
                    border: "1px solid var(--border)",
                    borderRadius: "3px 3px 0 0",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    position: "relative", overflow: "hidden",
                }}>
                    {/* Scanlines */}
                    <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)", pointerEvents: "none" }} />

                    {/* Play button */}
                    <motion.div
                        animate={{ scale: hovered ? 1.12 : 1 }}
                        transition={{ duration: 0.2 }}
                        style={{
                            width: 56, height: 56, borderRadius: "50%",
                            border: `1.5px solid ${hovered ? "rgba(0,229,255,0.6)" : "rgba(245,244,240,0.25)"}`,
                            background: hovered ? "rgba(0,229,255,0.12)" : "rgba(8,8,9,0.7)",
                            backdropFilter: "blur(12px)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            transition: "border-color 0.2s, background 0.2s",
                            boxShadow: hovered ? "0 0 20px rgba(0,229,255,0.2)" : "none",
                        }}
                    >
                        <Play size={20} color={hovered ? "var(--cyan)" : "white"} fill={hovered ? "var(--cyan)" : "white"} />
                    </motion.div>

                    {/* Platform badge */}
                    <div style={{
                        position: "absolute", top: 12, left: 12,
                        display: "flex", alignItems: "center", gap: 5,
                        background: "rgba(8,8,9,0.8)", backdropFilter: "blur(8px)",
                        padding: "4px 9px", borderRadius: 2,
                        border: clip.plat === "twitch" ? "1px solid rgba(145,70,255,0.3)" : "1px solid rgba(255,0,0,0.3)",
                    }}>
                        {clip.plat === "twitch"
                            ? <Twitch size={10} color="#9146ff" />
                            : <Youtube size={10} color="#ff0000" />
                        }
                        <span className="f-mono" style={{ fontSize: 9, color: "var(--white2)", letterSpacing: "0.1em" }}>
              {clip.plat === "twitch" ? "TWITCH CLIP" : "YOUTUBE"}
            </span>
                    </div>

                    {/* HOT badge */}
                    {clip.hot && (
                        <div style={{ position: "absolute", top: 12, right: 12 }}>
                            <span className="tag tag-cyan" style={{ fontSize: 8, padding: "3px 8px" }}>🔥 HOT</span>
                        </div>
                    )}

                    {/* Duration */}
                    <span className="f-mono" style={{
                        position: "absolute", bottom: 10, right: 12,
                        fontSize: 10, color: "var(--white2)",
                        background: "rgba(8,8,9,0.75)", padding: "2px 7px", borderRadius: 2,
                    }}>{clip.dur}</span>

                    {/* Hover overlay */}
                    <motion.div
                        animate={{ opacity: hovered ? 1 : 0 }}
                        style={{ position: "absolute", inset: 0, background: "rgba(0,229,255,0.04)", pointerEvents: "none" }}
                    />
                </div>

                {/* Info bar */}
                <div style={{
                    padding: "14px 16px",
                    border: "1px solid var(--border)", borderTop: "none",
                    borderRadius: "0 0 3px 3px",
                    background: hovered ? "var(--black3)" : "var(--black2)",
                    transition: "background 0.2s",
                }}>
                    <p style={{ fontWeight: 600, fontSize: 14, lineHeight: 1.35, marginBottom: 10, color: "var(--white)" }}>
                        {clip.title}
                    </p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ display: "flex", gap: 14 }}>
              <span className="f-mono" style={{ fontSize: 10, color: "var(--white3)", display: "flex", alignItems: "center", gap: 4 }}>
                <Eye size={10} />{clip.views}
              </span>
                            <span className="f-mono" style={{ fontSize: 10, color: "var(--white3)", display: "flex", alignItems: "center", gap: 4 }}>
                <ThumbsUp size={10} />{clip.likes}
              </span>
                            <span className="f-mono" style={{
                                fontSize: 9, padding: "1px 6px", borderRadius: 2,
                                background: clip.plat === "twitch" ? "rgba(145,70,255,0.12)" : "rgba(255,0,0,0.1)",
                                color: clip.plat === "twitch" ? "#9146ff" : "#ff4444",
                            }}>{clip.cat}</span>
                        </div>
                        <span className="f-mono" style={{ fontSize: 10, color: "var(--white3)" }}>{clip.date}</span>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

// ─── LIGHTBOX / PLAYER MODAL ─────────────────────────────────────────────────
function Lightbox({ clip, allClips, onClose, onNav }: {
    clip: Clip;
    allClips: Clip[];
    onClose: () => void;
    onNav: (id: number) => void;
}) {
    const idx = allClips.findIndex(c => c.id === clip.id);
    const prev = allClips[idx - 1] ?? null;
    const next = allClips[idx + 1] ?? null;

    // Keyboard navigation
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft" && prev) onNav(prev.id);
            if (e.key === "ArrowRight" && next) onNav(next.id);
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [prev, next, onClose, onNav]);

    const externalUrl = clip.plat === "twitch"
        ? `https://clips.twitch.tv/${clip.slug}`
        : `https://www.youtube.com/watch?v=${clip.slug}`;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
                position: "fixed", inset: 0, zIndex: 9900,
                background: "rgba(8,8,9,0.97)",
                backdropFilter: "blur(20px)",
                display: "flex", alignItems: "center", justifyContent: "center",
                padding: "24px",
            }}
        >
            <motion.div
                initial={{ scale: 0.93, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.93, opacity: 0, y: 10 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                onClick={e => e.stopPropagation()}
                style={{ width: "100%", maxWidth: 900, position: "relative" }}
            >
                {/* Top bar */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12, gap: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
                        {/* Platform icon */}
                        <div style={{
                            display: "flex", alignItems: "center", gap: 6,
                            padding: "5px 10px", borderRadius: 3,
                            background: clip.plat === "twitch" ? "rgba(145,70,255,0.12)" : "rgba(255,0,0,0.1)",
                            border: clip.plat === "twitch" ? "1px solid rgba(145,70,255,0.25)" : "1px solid rgba(255,0,0,0.2)",
                            flexShrink: 0,
                        }}>
                            {clip.plat === "twitch"
                                ? <><Twitch size={12} color="#9146ff" /><span className="f-mono" style={{ fontSize: 9, color: "#9146ff", letterSpacing: "0.1em" }}>TWITCH CLIP</span></>
                                : <><Youtube size={12} color="#ff4444" /><span className="f-mono" style={{ fontSize: 9, color: "#ff4444", letterSpacing: "0.1em" }}>YOUTUBE</span></>
                            }
                        </div>
                        <p style={{ fontWeight: 700, fontSize: 15, color: "var(--white)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {clip.title}
                        </p>
                    </div>

                    {/* Actions */}
                    <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                        <a href={externalUrl} target="_blank" title="Extern öffnen"
                           style={{ display: "flex", alignItems: "center", gap: 5, padding: "7px 12px", borderRadius: 3, border: "1px solid var(--border)", background: "var(--black2)", color: "var(--white2)", textDecoration: "none", fontSize: 12 }}>
                            <ExternalLink size={13} />
                            <span className="f-mono" style={{ fontSize: 10 }}>ORIGINAL</span>
                        </a>
                        <motion.button
                            onClick={onClose}
                            whileHover={{ scale: 1.05, borderColor: "var(--white)" }}
                            whileTap={{ scale: 0.95 }}
                            title="Schließen (ESC)"
                            style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, background: "var(--black2)", border: "1px solid var(--border)", borderRadius: 3, color: "var(--white)", cursor: "pointer" }}
                        >
                            <X size={15} />
                        </motion.button>
                    </div>
                </div>

                {/* Player */}
                <div style={{
                    aspectRatio: "16/9",
                    background: "var(--black)",
                    border: "1px solid var(--border2)",
                    borderRadius: 4,
                    overflow: "hidden",
                    position: "relative",
                }}>
                    <ClipPlayer clip={clip} />
                </div>

                {/* Bottom bar */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", marginTop: 14, gap: 12 }}>
                    {/* Prev */}
                    <div>
                        {prev && (
                            <motion.button
                                onClick={() => onNav(prev.id)}
                                whileHover={{ x: -2 }}
                                style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "1px solid var(--border)", borderRadius: 3, padding: "8px 14px", cursor: "pointer", color: "var(--white2)" }}
                            >
                                <ChevronLeft size={14} />
                                <span style={{ fontSize: 12, fontWeight: 600, maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{prev.title}</span>
                            </motion.button>
                        )}
                    </div>

                    {/* Meta */}
                    <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <span className="f-mono" style={{ fontSize: 10, color: "var(--white3)", display: "flex", alignItems: "center", gap: 4 }}>
              <Eye size={10} />{clip.views}
            </span>
                        <span className="f-mono" style={{ fontSize: 10, color: "var(--white3)", display: "flex", alignItems: "center", gap: 4 }}>
              <Clock size={10} />{clip.dur}
            </span>
                        <span className="f-mono" style={{ fontSize: 10, color: "var(--white3)" }}>
              {idx + 1} / {allClips.length}
            </span>
                    </div>

                    {/* Next */}
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        {next && (
                            <motion.button
                                onClick={() => onNav(next.id)}
                                whileHover={{ x: 2 }}
                                style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "1px solid var(--border)", borderRadius: 3, padding: "8px 14px", cursor: "pointer", color: "var(--white2)" }}
                            >
                                <span style={{ fontSize: 12, fontWeight: 600, maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{next.title}</span>
                                <ChevronRight size={14} />
                            </motion.button>
                        )}
                    </div>
                </div>

                {/* Keyboard hint */}
                <p className="f-mono" style={{ fontSize: 9, color: "var(--white3)", opacity: 0.4, textAlign: "center", marginTop: 10, letterSpacing: "0.08em" }}>
                    ESC schließen · ← → navigieren
                </p>
            </motion.div>
        </motion.div>
    );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function ClipsPage() {
    const [active, setActive] = useState("Alle");
    const [openId, setOpenId] = useState<number | null>(null);

    const filtered = active === "Alle" ? clips : clips.filter(c => c.cat === active);
    const openClip = openId !== null ? clips.find(c => c.id === openId) ?? null : null;

    const handleNav = useCallback((id: number) => setOpenId(id), []);
    const handleClose = useCallback(() => setOpenId(null), []);

    return (
        <div style={{ paddingTop: 64 }}>
            {/* ── HEADER ── */}
            <div style={{ borderBottom: "1px solid var(--border)", padding: "80px 32px 56px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, var(--cyan), transparent)" }} />
                <div style={{ maxWidth: 1400, margin: "0 auto" }}>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                              className="f-mono" style={{ fontSize: 10, color: "var(--cyan)", letterSpacing: "0.15em", marginBottom: 20 }}>
                        // HIGHLIGHTS & CLIPS
                    </motion.p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24 }}>
                        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                                   className="f-display" style={{ fontSize: "clamp(52px, 8vw, 100px)", lineHeight: 0.9 }}>
                            BESTE<br />
                            <span style={{ color: "transparent", WebkitTextStroke: "2px var(--cyan)" }}>MOMENTE.</span>
                        </motion.h1>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                                    style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                            <a href="https://youtube.com/@eynoah" target="_blank" className="btn btn-outline" style={{ display: "inline-flex" }}>
                                <Youtube size={14} color="#ff0000" /> YouTube <ExternalLink size={11} />
                            </a>
                            <a href="https://twitch.tv/eynoah" target="_blank" className="btn btn-outline" style={{ display: "inline-flex" }}>
                                <Twitch size={14} color="#9146ff" /> Twitch Clips <ExternalLink size={11} />
                            </a>
                        </motion.div>
                    </div>

                    {/* Stats row */}
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                                style={{ display: "flex", gap: 24, marginTop: 32, flexWrap: "wrap" }}>
                        {[
                            { label: "CLIPS GESAMT", val: clips.length.toString() },
                            { label: "TWITCH CLIPS", val: clips.filter(c => c.plat === "twitch").length.toString() },
                            { label: "YOUTUBE CLIPS", val: clips.filter(c => c.plat === "youtube").length.toString() },
                            { label: "🔥 HOT CLIPS", val: clips.filter(c => c.hot).length.toString() },
                        ].map(({ label, val }) => (
                            <div key={label}>
                                <span className="f-display" style={{ fontSize: 28, color: "var(--white)", display: "block", lineHeight: 1 }}>{val}</span>
                                <span className="f-mono" style={{ fontSize: 9, color: "var(--white3)", letterSpacing: "0.12em" }}>{label}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* ── FILTER BAR ── */}
            <div style={{ borderBottom: "1px solid var(--border)", background: "var(--black2)", overflowX: "auto" }}>
                <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 32px", display: "flex", gap: 0 }}>
                    {/* Platform filter */}
                    {["Alle", "Twitch", "YouTube"].map(p => {
                        const isPlatFilter = p !== "Alle";
                        return null; // merged into cats below
                    })}
                    {cats.map(cat => (
                        <button key={cat} onClick={() => setActive(cat)} style={{
                            padding: "18px 24px",
                            fontFamily: "'Archivo', sans-serif", fontWeight: 700, fontSize: 12,
                            letterSpacing: "0.1em", textTransform: "uppercase",
                            background: "none", border: "none", cursor: "pointer",
                            color: active === cat ? "var(--white)" : "var(--white3)",
                            borderBottom: active === cat ? "2px solid var(--cyan)" : "2px solid transparent",
                            whiteSpace: "nowrap", transition: "color 0.2s, border-color 0.2s",
                        }}>
                            {cat}
                        </button>
                    ))}
                    <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 2, padding: "0 0 0 24px", borderLeft: "1px solid var(--border)" }}>
                        {[
                            { key: "twitch-only", label: "Twitch", icon: <Twitch size={11} color="#9146ff" /> },
                            { key: "youtube-only", label: "YouTube", icon: <Youtube size={11} color="#ff0000" /> },
                        ].map(({ key, label, icon }) => (
                            <button key={key} onClick={() => setActive(key)} style={{
                                display: "flex", alignItems: "center", gap: 6,
                                padding: "8px 14px", borderRadius: 3, cursor: "pointer",
                                background: active === key ? "var(--black3)" : "none",
                                border: active === key ? "1px solid var(--border2)" : "1px solid transparent",
                                color: "var(--white2)", fontSize: 11, fontWeight: 600, fontFamily: "'Archivo',sans-serif",
                                margin: "auto 0",
                            }}>
                                {icon}{label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── GRID ── */}
            <div style={{ maxWidth: 1400, margin: "0 auto", padding: "48px 32px 80px" }}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={active}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 20 }}
                    >
                        {(active === "twitch-only" ? clips.filter(c => c.plat === "twitch")
                                : active === "youtube-only" ? clips.filter(c => c.plat === "youtube")
                                    : filtered
                        ).map(clip => (
                            <ClipCard
                                key={clip.id}
                                clip={clip}
                                onClick={() => setOpenId(clip.id)}
                            />
                        ))}
                    </motion.div>
                </AnimatePresence>

                {filtered.length === 0 && (
                    <div style={{ textAlign: "center", padding: "80px 0", color: "var(--white3)" }}>
                        <p className="f-mono" style={{ fontSize: 12 }}>Keine Clips in dieser Kategorie.</p>
                    </div>
                )}
            </div>

            {/* ── LIGHTBOX PLAYER ── */}
            <AnimatePresence>
                {openClip && (
                    <Lightbox
                        clip={openClip}
                        allClips={clips}
                        onClose={handleClose}
                        onNav={handleNav}
                    />
                )}
            </AnimatePresence>

            {/* Custom style for no-scroll when lightbox open */}
            <style>{openClip ? "body { overflow: hidden; }" : ""}</style>
        </div>
    );
}
