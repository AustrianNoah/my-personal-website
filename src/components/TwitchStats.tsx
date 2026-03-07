"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Twitch, Users, Eye, Radio, Clock, Wifi, WifiOff, RefreshCw, Gamepad2, ExternalLink } from "lucide-react";

interface TwitchData {
    configured: boolean;
    isLive: boolean;
    followers: number;
    viewers: number;
    streamTitle: string | null;
    game: string | null;
    thumbnail: string | null;
    startedAt: string | null;
    login: string;
    error?: string;
}

function formatUptime(startedAt: string): string {
    const diff = Math.floor((Date.now() - new Date(startedAt).getTime()) / 1000);
    const h = Math.floor(diff / 3600);
    const m = Math.floor((diff % 3600) / 60);
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

function formatNum(n: number): string {
    if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
    if (n >= 1000) return (n / 1000).toFixed(1) + "K";
    return n.toString();
}

// Animated number
function AnimNum({ value }: { value: number }) {
    const [display, setDisplay] = useState(0);
    useEffect(() => {
        let start = 0;
        const steps = 40;
        const inc = value / steps;
        const timer = setInterval(() => {
            start += inc;
            if (start >= value) { setDisplay(value); clearInterval(timer); }
            else setDisplay(Math.floor(start));
        }, 20);
        return () => clearInterval(timer);
    }, [value]);
    return <>{formatNum(display)}</>;
}

export default function TwitchStats() {
    const [data, setData] = useState<TwitchData | null>(null);
    const [loading, setLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
    const [refreshing, setRefreshing] = useState(false);

    const fetch_ = useCallback(async (silent = false) => {
        if (!silent) setLoading(true);
        else setRefreshing(true);
        try {
            const res = await fetch("/api/twitch", { cache: "no-store" });
            const json = await res.json();
            setData(json);
            setLastUpdated(new Date());
        } catch {
            setData(prev => prev ?? { configured: false, isLive: false, followers: 0, viewers: 0, streamTitle: null, game: null, thumbnail: null, startedAt: null, login: "eynoah" });
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    useEffect(() => {
        fetch_();
        // Poll every 60 seconds
        const interval = setInterval(() => fetch_(true), 60_000);
        return () => clearInterval(interval);
    }, [fetch_]);

    if (loading) {
        return (
            <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
                {[0, 1, 2].map(i => (
                    <div key={i} style={{ width: 120, height: 52, background: "var(--black2)", border: "1px solid var(--border)", borderRadius: 3, animation: "pulse 1.5s ease-in-out infinite", animationDelay: `${i * 0.2}s` }} />
                ))}
                <style>{`@keyframes pulse { 0%,100% { opacity:0.4 } 50% { opacity:0.8 } }`}</style>
            </div>
        );
    }

    if (!data) return null;

    return (
        <div>
            {/* ── LIVE BANNER ── */}
            <AnimatePresence>
                {data.isLive && (
                    <motion.div
                        key="live-banner"
                        initial={{ opacity: 0, y: -8, scaleY: 0.8 }}
                        animate={{ opacity: 1, y: 0, scaleY: 1 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            marginBottom: 32,
                            border: "1px solid rgba(0,229,255,0.35)",
                            borderLeft: "3px solid var(--cyan)",
                            borderRadius: 3,
                            background: "rgba(0,229,255,0.04)",
                            overflow: "hidden",
                            position: "relative",
                        }}
                    >
                        {/* Scan line shimmer */}
                        <motion.div
                            animate={{ x: ["−100%", "200%"] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
                            style={{
                                position: "absolute", inset: 0,
                                background: "linear-gradient(90deg, transparent 0%, rgba(0,229,255,0.06) 50%, transparent 100%)",
                                pointerEvents: "none",
                            }}
                        />

                        {/* Thumbnail + Info */}
                        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 0, alignItems: "stretch" }}>
                            {/* Thumb */}
                            {data.thumbnail ? (
                                <div style={{ width: 160, aspectRatio: "16/9", overflow: "hidden", flexShrink: 0 }}>
                                    <img src={data.thumbnail} alt="Stream thumbnail" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", opacity: 0.85 }} />
                                </div>
                            ) : (
                                <div style={{ width: 160, background: "var(--black3)", display: "flex", alignItems: "center", justifyContent: "center", aspectRatio: "16/9" }}>
                                    <Radio size={24} color="var(--cyan)" style={{ opacity: 0.4 }} />
                                </div>
                            )}

                            {/* Stream info */}
                            <div style={{ padding: "14px 20px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 6 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 2 }}>
                                    <span className="live-dot" />
                                    <span className="f-mono" style={{ fontSize: 10, color: "var(--cyan)", letterSpacing: "0.15em" }}>JETZT LIVE</span>
                                </div>
                                <p style={{ fontWeight: 700, fontSize: 15, lineHeight: 1.3, color: "var(--white)" }}>
                                    {data.streamTitle ?? "Stream läuft..."}
                                </p>
                                <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
                                    {data.game && (
                                        <span style={{ display: "flex", alignItems: "center", gap: 5, color: "var(--white3)", fontSize: 12 }}>
                      <Gamepad2 size={11} />{data.game}
                    </span>
                                    )}
                                    {data.startedAt && (
                                        <span style={{ display: "flex", alignItems: "center", gap: 5, color: "var(--white3)", fontSize: 12 }}>
                      <Clock size={11} />Seit {formatUptime(data.startedAt)}
                    </span>
                                    )}
                                    <span style={{ display: "flex", alignItems: "center", gap: 5, color: "var(--cyan)", fontSize: 12, fontWeight: 700 }}>
                    <Eye size={11} />{data.viewers.toLocaleString("de-DE")} Zuschauer
                  </span>
                                </div>
                            </div>

                            {/* CTA */}
                            <div style={{ padding: "14px 20px", display: "flex", alignItems: "center" }}>
                                <a href={`https://twitch.tv/${data.login}`} target="_blank" className="btn btn-cyan" style={{ whiteSpace: "nowrap", padding: "10px 18px", fontSize: 12 }}>
                                    <Twitch size={13} />Jetzt schauen <ExternalLink size={11} />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── OFFLINE BANNER (subtle) ── */}
            <AnimatePresence>
                {!data.isLive && (
                    <motion.div
                        key="offline"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            marginBottom: 32, display: "flex", alignItems: "center", gap: 10,
                            padding: "10px 16px", border: "1px solid var(--border)", borderRadius: 3,
                            background: "var(--black2)", width: "fit-content",
                        }}
                    >
                        <div style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--white3)" }} />
                        <span className="f-mono" style={{ fontSize: 10, color: "var(--white3)", letterSpacing: "0.1em" }}>AKTUELL OFFLINE</span>
                        <span className="f-mono" style={{ fontSize: 10, color: "var(--white3)", opacity: 0.5 }}>—</span>
                        <span className="f-mono" style={{ fontSize: 10, color: "var(--white3)" }}>Nächster Stream laut Plan</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── STATS ROW ── */}
            <div style={{ display: "flex", alignItems: "stretch", gap: 1, flexWrap: "wrap" }}>
                {[
                    {
                        icon: Users,
                        label: "FOLLOWER",
                        value: data.followers,
                        highlight: false,
                        sub: "auf Twitch",
                    },
                    {
                        icon: Eye,
                        label: "LIVE ZUSCHAUER",
                        value: data.viewers,
                        highlight: data.isLive,
                        sub: data.isLive ? "gerade dabei" : "stream offline",
                    },
                    {
                        icon: Zap_,
                        label: "STATUS",
                        value: null,
                        highlight: data.isLive,
                        sub: null,
                        custom: (
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                {data.isLive
                                    ? <><span className="live-dot" /><span className="f-display" style={{ fontSize: 22, color: "var(--cyan)" }}>LIVE</span></>
                                    : <><div style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--white4)" }} /><span className="f-display" style={{ fontSize: 22, color: "var(--white3)" }}>OFFLINE</span></>
                                }
                            </div>
                        ),
                    },
                ].map(({ icon: Icon, label, value, highlight, sub, custom }, i) => (
                    <motion.div
                        key={label}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.07 }}
                        style={{
                            padding: "18px 24px",
                            background: highlight ? "rgba(0,229,255,0.04)" : "var(--black2)",
                            border: `1px solid ${highlight ? "rgba(0,229,255,0.2)" : "var(--border)"}`,
                            borderRadius: 3,
                            minWidth: 140,
                            flex: "0 0 auto",
                        }}
                    >
                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                            <Icon size={11} color={highlight ? "var(--cyan)" : "var(--white3)"} />
                            <span className="f-mono" style={{ fontSize: 9, letterSpacing: "0.15em", color: highlight ? "var(--cyan)" : "var(--white3)" }}>{label}</span>
                        </div>
                        {custom ?? (
                            <div>
                <span className="stat-num" style={{ fontSize: 28 }}>
                  {value !== null ? <AnimNum value={value} /> : "–"}
                </span>
                                {sub && <p className="f-mono" style={{ fontSize: 9, color: "var(--white3)", marginTop: 4 }}>{sub}</p>}
                            </div>
                        )}
                    </motion.div>
                ))}

                {/* Refresh + last updated */}
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "14px 16px", marginLeft: 8 }}>
                    <motion.button
                        onClick={() => fetch_(true)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        style={{ background: "none", border: "1px solid var(--border)", borderRadius: 3, padding: "6px 8px", cursor: "pointer", color: "var(--white3)" }}
                    >
                        <motion.div animate={refreshing ? { rotate: 360 } : { rotate: 0 }} transition={{ duration: 0.5 }}>
                            <RefreshCw size={13} />
                        </motion.div>
                    </motion.button>
                    {lastUpdated && (
                        <span className="f-mono" style={{ fontSize: 9, color: "var(--white3)", opacity: 0.5, letterSpacing: "0.05em" }}>
              {lastUpdated.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })}
            </span>
                    )}
                </div>
            </div>

            {/* Connection status */}
            <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 6 }}>
                {data.configured
                    ? <><Wifi size={10} color="var(--white3)" /><span className="f-mono" style={{ fontSize: 9, color: "var(--white3)", opacity: 0.6 }}>Twitch API verbunden · auto-refresh alle 60s</span></>
                    : <><WifiOff size={10} color="var(--white3)" /><span className="f-mono" style={{ fontSize: 9, color: "var(--white3)", opacity: 0.6 }}>Demo-Modus · API-Keys in .env.local eintragen</span></>
                }
            </div>
        </div>
    );
}

// local alias to avoid re-import collision
function Zap_({ size, color }: { size: number; color: string }) {
    return <Zap size={size} color={color} />;
}
function Zap({ size, color }: { size: number; color: string }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
        </svg>
    );
}
