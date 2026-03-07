"use client";
import { motion } from "framer-motion";
import { FileText, User, Mail, MapPin, AlertCircle, ExternalLink } from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

function Section({ title, icon: Icon, children }: { title: string; icon: any; children: React.ReactNode }) {
    return (
        <motion.div variants={fadeUp} className="card" style={{ padding: "28px 32px", marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={15} color="var(--accent2)" />
                </div>
                <h2 style={{ fontWeight: 700, fontSize: 16, letterSpacing: "0.02em" }}>{title}</h2>
            </div>
            {children}
        </motion.div>
    );
}

function InfoRow({ label, value }: { label: string; value: string }) {
    return (
        <div style={{ display: "flex", gap: 12, marginBottom: 10, flexWrap: "wrap" }}>
            <span style={{ color: "var(--text3)", fontSize: 14, minWidth: 140, fontFamily: "'JetBrains Mono', monospace" }}>{label}</span>
            <span style={{ color: "var(--text)", fontSize: 14 }}>{value}</span>
        </div>
    );
}

export default function ImpressumPage() {
    return (
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "60px 24px 80px" }}>
            <motion.div initial="hidden" animate="visible" variants={stagger}>
                {/* Header */}
                <motion.div variants={fadeUp} style={{ marginBottom: 48 }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.25)", borderRadius: 6, padding: "6px 14px", marginBottom: 20 }}>
                        <FileText size={13} color="var(--accent2)" />
                        <span style={{ color: "var(--accent3)", fontSize: 12, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.1em" }}>RECHTLICHES</span>
                    </div>
                    <h1 className="font-display" style={{ fontSize: "clamp(36px, 5vw, 60px)", lineHeight: 1, marginBottom: 12 }}>
                        IMPRESSUM
                    </h1>
                    <p style={{ color: "var(--text3)", fontSize: 14, fontFamily: "'JetBrains Mono', monospace" }}>
                        Angaben gemäß § 5 TMG
                    </p>
                </motion.div>

                <Section title="Angaben zum Betreiber" icon={User}>
                    <InfoRow label="Name" value="Marcel Noah Weixelbaum" />
                    <InfoRow label="Anschrift" value="Leo-Mathauser-Gasse 72" />
                    <InfoRow label="PLZ / Ort" value="1230 Wien" />
                    <InfoRow label="Land" value="Österreich" />
                </Section>

                <Section title="Kontakt" icon={Mail}>
                    <InfoRow label="E-Mail" value="marcel.weixelbaum02@gmail.com" />
                    <p style={{ color: "var(--text3)", fontSize: 13, marginTop: 12, lineHeight: 1.6 }}>
                        Eine Kontaktaufnahme ist ausschließlich per E-Mail möglich. Telefonische Anfragen werden nicht beantwortet.
                    </p>
                </Section>

                <Section title="Plattform & Zuständigkeit" icon={MapPin}>
                    <p style={{ color: "var(--text2)", fontSize: 14, lineHeight: 1.7, marginBottom: 14 }}>
                        Diese Website wird privat betrieben und dient ausschließlich der Präsentation meiner Streaming-Aktivitäten auf Twitch und YouTube.
                    </p>
                    <InfoRow label="Twitch" value="twitch.tv/EyNoah" />
                    <InfoRow label="YouTube" value="youtube.com/@EyNoah" />
                </Section>

                <Section title="Haftungsausschluss" icon={AlertCircle}>
                    <div style={{ color: "var(--text2)", fontSize: 14, lineHeight: 1.8 }}>
                        <p style={{ marginBottom: 14 }}>
                            <strong style={{ color: "var(--text)" }}>Haftung für Inhalte:</strong> Als Diensteanbieter bin ich für eigene Inhalte nach den allgemeinen Gesetzen verantwortlich. Eine Pflicht zur Überwachung fremder Informationen besteht jedoch nicht.
                        </p>
                        <p style={{ marginBottom: 14 }}>
                            <strong style={{ color: "var(--text)" }}>Haftung für Links:</strong> Mein Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte ich keinen Einfluss habe. Deshalb kann ich für diese fremden Inhalte auch keine Gewähr übernehmen.
                        </p>
                        <p>
                            <strong style={{ color: "var(--text)" }}>Urheberrecht:</strong> Die durch mich erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und Verwertung bedürfen der schriftlichen Zustimmung.
                        </p>
                    </div>
                </Section>

                <Section title="Datenschutz" icon={FileText}>
                    <p style={{ color: "var(--text2)", fontSize: 14, lineHeight: 1.7, marginBottom: 14 }}>
                        Diese Website nutzt keine Cookies, erhebt keine personenbezogenen Daten und setzt kein Tracking ein.
                    </p>
                    <p style={{ color: "var(--text2)", fontSize: 14, lineHeight: 1.7 }}>
                        Beim Besuch von verlinkten externen Plattformen (Twitch, YouTube, Twitter) gelten die jeweiligen Datenschutzbestimmungen dieser Dienste.
                    </p>
                    <div style={{ display: "flex", gap: 12, marginTop: 16, flexWrap: "wrap" }}>
                        {[
                            { label: "Twitch Datenschutz", href: "https://www.twitch.tv/p/legal/privacy-policy/" },
                            { label: "YouTube Datenschutz", href: "https://policies.google.com/privacy" },
                        ].map(({ label, href }) => (
                            <a key={href} href={href} target="_blank" style={{ display: "inline-flex", alignItems: "center", gap: 5, color: "var(--accent3)", fontSize: 13, textDecoration: "none", fontWeight: 600 }}>
                                {label} <ExternalLink size={11} />
                            </a>
                        ))}
                    </div>
                </Section>

                <motion.p variants={fadeUp} style={{ color: "var(--text3)", fontSize: 12, textAlign: "center", fontFamily: "'JetBrains Mono', monospace", marginTop: 32 }}>
                    Letzte Aktualisierung: {new Date().toLocaleDateString("de-DE", { month: "long", year: "numeric" })}
                </motion.p>
            </motion.div>
        </div>
    );
}
