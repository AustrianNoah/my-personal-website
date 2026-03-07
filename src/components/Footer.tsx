"use client";
import Link from "next/link";
import { Twitch, Youtube, Twitter, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
    return (
        <footer style={{ borderTop: "1px solid var(--border)", background: "var(--black)", padding: "64px 32px 40px" }}>
            <div style={{ maxWidth: 1400, margin: "0 auto" }}>
                <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 64 }}>
                    <div>
                        <div className="f-display" style={{ fontSize: 36, letterSpacing: "0.04em", marginBottom: 16 }}>
                            EY<span style={{ color: "var(--cyan)" }}>NOAH</span>
                        </div>
                        <p style={{ color: "var(--white3)", fontSize: 14, lineHeight: 1.8, maxWidth: 280 }}>
                            Live Streamer aus Deutschland. Gaming, Entertainment & echte Community – täglich auf Twitch.
                        </p>
                    </div>
                    <div>
                        <p className="f-mono" style={{ fontSize: 10, color: "var(--white3)", letterSpacing: "0.15em", marginBottom: 20 }}>NAVIGATION</p>
                        {[{ href: "/", l: "Home" }, { href: "/plan", l: "Schedule" }, { href: "/clips", l: "Clips" }, { href: "/impressum", l: "Legal" }].map(({ href, l }) => (
                            <Link key={href} href={href} style={{ display: "block", color: "var(--white2)", fontSize: 14, fontWeight: 500, textDecoration: "none", marginBottom: 10, transition: "color 0.2s" }}
                                  onMouseEnter={e => (e.currentTarget.style.color = "var(--white)")}
                                  onMouseLeave={e => (e.currentTarget.style.color = "var(--white2)")}>{l}</Link>
                        ))}
                    </div>
                    <div>
                        <p className="f-mono" style={{ fontSize: 10, color: "var(--white3)", letterSpacing: "0.15em", marginBottom: 20 }}>PLATTFORMEN</p>
                        {[{ href: "https://twitch.tv", l: "Twitch", Icon: Twitch }, { href: "https://youtube.com", l: "YouTube", Icon: Youtube }, { href: "https://twitter.com", l: "Twitter / X", Icon: Twitter }].map(({ href, l, Icon }) => (
                            <a key={href} href={href} target="_blank" style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--white2)", fontSize: 14, fontWeight: 500, textDecoration: "none", marginBottom: 10 }}>
                                <Icon size={13} />{l} <ArrowUpRight size={11} style={{ opacity: 0.4 }} />
                            </a>
                        ))}
                    </div>
                    <div>
                        <p className="f-mono" style={{ fontSize: 10, color: "var(--white3)", letterSpacing: "0.15em", marginBottom: 20 }}>STREAM ZEITEN</p>
                        <p style={{ color: "var(--white2)", fontSize: 13, lineHeight: 2 }}>Mo–Di: 19–22 Uhr<br />Do: 20–23 Uhr<br />Fr: 20–00 Uhr<br />Sa: 15–20 Uhr</p>
                    </div>
                </div>
                <div style={{ borderTop: "1px solid var(--border)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                    <p className="f-mono" style={{ fontSize: 11, color: "var(--white3)", letterSpacing: "0.05em" }}>© 2025 EyNoah. All rights reserved.</p>
                    <p className="f-mono" style={{ fontSize: 11, color: "var(--white3)" }}>Made for the community ↗</p>
                </div>
            </div>
        </footer>
    );
}
