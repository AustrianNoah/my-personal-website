"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Twitch, Youtube, Twitter, Menu, X } from "lucide-react";

const links = [
    { href: "/", label: "Home" },
    { href: "/plan", label: "Schedule" },
    { href: "/clips", label: "Clips" },
    { href: "/impressum", label: "Legal" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", fn);
        return () => window.removeEventListener("scroll", fn);
    }, []);

    return (
        <>
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{
                    position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
                    borderBottom: `1px solid ${scrolled ? "var(--border)" : "transparent"}`,
                    background: scrolled ? "rgba(8,8,9,0.92)" : "transparent",
                    backdropFilter: scrolled ? "blur(24px)" : "none",
                    transition: "all 0.4s ease",
                }}
            >
                <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 32px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    {/* Logo */}
                    <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 12 }}>
                        <motion.div whileHover={{ scale: 1.02 }} style={{ display: "flex", alignItems: "baseline", gap: 1 }}>
                            <span className="f-display" style={{ fontSize: 22, color: "var(--white)", letterSpacing: "0.04em" }}>EY</span>
                            <span className="f-display" style={{ fontSize: 22, color: "var(--cyan)", letterSpacing: "0.04em" }}>NOAH</span>
                            <span className="f-mono" style={{ fontSize: 9, color: "var(--white3)", marginLeft: 8, letterSpacing: "0.1em" }}>v2.0 - Comeback</span>
                        </motion.div>
                    </Link>

                    {/* Center nav */}
                    <nav style={{ display: "flex", gap: 2 }} className="hide-mobile">
                        {links.map(({ href, label }) => {
                            const active = pathname === href;
                            return (
                                <Link key={href} href={href} style={{ textDecoration: "none" }}>
                                    <motion.div
                                        whileHover={{ color: "var(--white)" }}
                                        style={{
                                            padding: "8px 20px",
                                            fontFamily: "'Archivo', sans-serif", fontWeight: 600,
                                            fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase",
                                            color: active ? "var(--white)" : "var(--white3)",
                                            borderBottom: active ? "1px solid var(--cyan)" : "1px solid transparent",
                                            transition: "all 0.2s",
                                        }}
                                    >{label}</motion.div>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Socials */}
                    <div style={{ display: "flex", gap: 16, alignItems: "center" }} className="hide-mobile">
                        {[
                            { Icon: Twitch, href: "https://twitch.tv", col: "#9146ff" },
                            { Icon: Youtube, href: "https://youtube.com", col: "#ff0000" },
                            { Icon: Twitter, href: "https://twitter.com", col: "var(--white)" },
                        ].map(({ Icon, href, col }) => (
                            <motion.a key={href} href={href} target="_blank"
                                      whileHover={{ color: col, scale: 1.15 }}
                                      style={{ color: "var(--white3)", transition: "color 0.2s" }}>
                                <Icon size={16} />
                            </motion.a>
                        ))}
                        <a href="https://twitch.tv" target="_blank" className="btn btn-cyan" style={{ padding: "9px 18px", fontSize: 11 }}>
                            <span className="live-dot" />Live schauen
                        </a>
                    </div>

                    {/* Mobile */}
                    <button onClick={() => setOpen(!open)} style={{ background: "none", border: "none", color: "var(--white)", cursor: "pointer" }} className="show-mobile">
                        {open ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </motion.header>

            {/* Mobile menu */}
            <AnimatePresence>
                {open && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                style={{ position: "fixed", inset: 0, background: "var(--black)", zIndex: 999, display: "flex", flexDirection: "column", justifyContent: "center", padding: 40 }}>
                        <button onClick={() => setOpen(false)} style={{ position: "absolute", top: 20, right: 24, background: "none", border: "none", color: "var(--white)", cursor: "pointer" }}><X size={24} /></button>
                        {links.map(({ href, label }, i) => (
                            <motion.div key={href} initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.07 }}>
                                <Link href={href} onClick={() => setOpen(false)} style={{ display: "block", textDecoration: "none" }}>
                                    <div className="f-display" style={{ fontSize: 48, color: "var(--white)", marginBottom: 16, letterSpacing: "0.03em" }}>{label.toUpperCase()}</div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
