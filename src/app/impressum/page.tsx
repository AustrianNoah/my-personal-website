"use client";
import { motion } from "framer-motion";
import { FileText, User, Mail, Shield, ExternalLink, AlertTriangle } from "lucide-react";

const sections = [
    {
        id: "01", title: "Angaben gemäß § 5 TMG", icon: User,
        content: [
            { label: "Name", val: "Marcel Noah Weixelbaum" },
            { label: "Straße", val: "Leo-Mathauser-gasse 72" },
            { label: "PLZ / Ort", val: "1230 Wien" },
            { label: "Land", val: "Österreich" },
        ]
    },
    {
        id: "02", title: "Kontakt", icon: Mail,
        content: [{ label: "E-Mail", val: "marcel.weixelbaum02@gmail.com" }]
    },
    {
        id: "03", title: "Plattformen", icon: ExternalLink,
        content: [
            { label: "Twitch", val: "twitch.tv/EyNoah" },
            { label: "YouTube", val: "youtube.com/@TypischNoaahCTF" },
            { label: "Twitter / X", val: "@NoahLikesPMMP" },
        ]
    },
];

export default function ImpressumPage() {
    return (
        <div style={{ paddingTop: 64 }}>
            {/* Header */}
            <div style={{ borderBottom: "1px solid var(--border)", padding: "80px 32px 56px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, var(--cyan), transparent)" }} />
                <div style={{ maxWidth: 900, margin: "0 auto" }}>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="f-mono" style={{ fontSize: 10, color: "var(--cyan)", letterSpacing: "0.15em", marginBottom: 20 }}>// RECHTLICHES / LEGAL</motion.p>
                    <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16,1,0.3,1] }}
                               className="f-display" style={{ fontSize: "clamp(52px, 8vw, 100px)", lineHeight: 0.9, marginBottom: 20 }}>
                        IMPRESSUM
                    </motion.h1>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                              className="f-mono" style={{ fontSize: 12, color: "var(--white3)" }}>Stand: {new Date().toLocaleDateString("de-DE", { month: "long", year: "numeric" })}</motion.p>
                </div>
            </div>

            <div style={{ maxWidth: 900, margin: "0 auto", padding: "64px 32px 100px" }}>
                {/* Info sections */}
                {sections.map(({ id, title, icon: Icon, content }, si) => (
                    <motion.div key={id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: si * 0.1 }}
                                style={{ borderBottom: "1px solid var(--border)", padding: "40px 0", display: "grid", gridTemplateColumns: "280px 1fr", gap: 40, alignItems: "start" }}>
                        <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                            <span className="f-mono" style={{ fontSize: 11, color: "var(--white3)", minWidth: 24 }}>{id}</span>
                            <div>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                                    <Icon size={14} color="var(--cyan)" />
                                </div>
                                <p style={{ fontWeight: 700, fontSize: 15, color: "var(--white2)" }}>{title}</p>
                            </div>
                        </div>
                        <div>
                            {content.map(({ label, val }) => (
                                <div key={label} style={{ display: "flex", gap: 24, marginBottom: 12 }}>
                                    <span className="f-mono" style={{ fontSize: 12, color: "var(--white3)", minWidth: 120 }}>{label}</span>
                                    <span style={{ fontSize: 14, color: "var(--white)" }}>{val}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}

                {/* Text sections */}
                {[
                    {
                        id: "04", icon: AlertTriangle, title: "Haftung für Inhalte",
                        text: "Als Diensteanbieter bin ich gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG bin ich als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen."
                    },
                    {
                        id: "05", icon: ExternalLink, title: "Haftung für Links",
                        text: "Mein Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte ich keinen Einfluss habe. Deshalb kann ich für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter verantwortlich."
                    },
                    {
                        id: "06", icon: Shield, title: "Urheberrecht",
                        text: "Die durch mich erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors."
                    },
                    {
                        id: "07", icon: Shield, title: "Datenschutz",
                        text: "Diese Website erhebt und speichert keine personenbezogenen Daten. Es werden keine Cookies gesetzt und kein Tracking durchgeführt. Beim Besuch externer Plattformen gelten die jeweiligen Datenschutzrichtlinien von Twitch (Amazon), Google (YouTube) und Twitter / X Corp."
                    },
                ].map(({ id, icon: Icon, title, text }, si) => (
                    <motion.div key={id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: si * 0.05 }}
                                style={{ borderBottom: "1px solid var(--border)", padding: "40px 0", display: "grid", gridTemplateColumns: "280px 1fr", gap: 40, alignItems: "start" }}>
                        <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                            <span className="f-mono" style={{ fontSize: 11, color: "var(--white3)", minWidth: 24 }}>{id}</span>
                            <div>
                                <div style={{ marginBottom: 6 }}><Icon size={14} color="var(--cyan)" /></div>
                                <p style={{ fontWeight: 700, fontSize: 15, color: "var(--white2)" }}>{title}</p>
                            </div>
                        </div>
                        <p style={{ color: "var(--white3)", fontSize: 14, lineHeight: 1.8 }}>{text}</p>
                    </motion.div>
                ))}

                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                            style={{ marginTop: 48, padding: "24px 32px", border: "1px solid var(--border)", borderLeft: "3px solid var(--cyan)", borderRadius: 3, background: "var(--black2)" }}>
                    <p className="f-mono" style={{ fontSize: 11, color: "var(--white3)", lineHeight: 1.8 }}>
                        Für Fragen zum Impressum oder Datenschutz bitte direkt per E-Mail melden.<br />
                        <span style={{ color: "var(--cyan)" }}>[deine@email.de]</span>
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
