"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Twitch, Youtube, Twitter } from "lucide-react";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/plan", label: "Stream Plan" },
    { href: "/clips", label: "Clips" },
    { href: "/impressum", label: "Impressum" },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <motion.header
            initial={{ y: -80 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
                position: "sticky",
                top: 0,
                zIndex: 100,
                borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
                background: scrolled ? "rgba(5,5,8,0.9)" : "transparent",
                backdropFilter: scrolled ? "blur(20px)" : "none",
                transition: "all 0.3s ease",
            }}
        >
            <nav style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
                {/* Logo */}
                <Link href="/" style={{ textDecoration: "none" }}>
                    <motion.div whileHover={{ scale: 1.03 }} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{
                            width: 36, height: 36, borderRadius: 8,
                            background: "linear-gradient(135deg, var(--accent), var(--neon))",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, color: "white",
                            boxShadow: "0 0 20px rgba(124,58,237,0.5)"
                        }}>EY</div>
                        <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, letterSpacing: "0.05em", color: "var(--text)" }}>
              Ey<span style={{ color: "var(--accent2)" }}>Noah</span>
            </span>
                    </motion.div>
                </Link>

                {/* Desktop Nav */}
                <div style={{ display: "flex", alignItems: "center", gap: 4 }} className="hidden-mobile">
                    {navLinks.map((link) => (
                        <Link key={link.href} href={link.href} style={{ textDecoration: "none" }}>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                style={{
                                    padding: "8px 16px", borderRadius: 8,
                                    color: pathname === link.href ? "var(--text)" : "var(--text2)",
                                    background: pathname === link.href ? "rgba(124,58,237,0.12)" : "transparent",
                                    border: pathname === link.href ? "1px solid rgba(124,58,237,0.3)" : "1px solid transparent",
                                    fontWeight: 600, fontSize: 14, letterSpacing: "0.03em",
                                    transition: "all 0.2s",
                                }}
                            >
                                {link.label}
                            </motion.div>
                        </Link>
                    ))}
                </div>

                {/* Social Icons */}
                <div style={{ display: "flex", alignItems: "center", gap: 8 }} className="hidden-mobile">
                    {[
                        { Icon: Twitch, href: "https://twitch.tv", color: "#9146ff" },
                        { Icon: Youtube, href: "https://youtube.com", color: "#ff0000" },
                        { Icon: Twitter, href: "https://twitter.com", color: "#1da1f2" },
                    ].map(({ Icon, href, color }) => (
                        <motion.a key={href} href={href} target="_blank" whileHover={{ scale: 1.15, color }} style={{ color: "var(--text3)", transition: "color 0.2s" }}>
                            <Icon size={18} />
                        </motion.a>
                    ))}
                </div>

                {/* Mobile menu btn */}
                <button onClick={() => setOpen(!open)} style={{ background: "none", border: "none", color: "var(--text)", cursor: "pointer" }} className="show-mobile">
                    {open ? <X size={22} /> : <Menu size={22} />}
                </button>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{ borderTop: "1px solid var(--border)", background: "rgba(5,5,8,0.97)", backdropFilter: "blur(20px)" }}
                    >
                        {navLinks.map((link, i) => (
                            <motion.div key={link.href} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.05 }}>
                                <Link href={link.href} onClick={() => setOpen(false)} style={{
                                    display: "block", padding: "14px 24px", color: pathname === link.href ? "var(--accent3)" : "var(--text2)",
                                    textDecoration: "none", fontWeight: 600, borderBottom: "1px solid var(--border)"
                                }}>
                                    {link.label}
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
        @media (max-width: 768px) { .hidden-mobile { display: none !important; } }
        @media (min-width: 769px) { .show-mobile { display: none !important; } }
      `}</style>
        </motion.header>
    );
}
