"use client";
import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
    const dotX = useMotionValue(-100);
    const dotY = useMotionValue(-100);
    const ringX = useSpring(dotX, { stiffness: 100, damping: 20 });
    const ringY = useSpring(dotY, { stiffness: 100, damping: 20 });

    useEffect(() => {
        const move = (e: MouseEvent) => { dotX.set(e.clientX); dotY.set(e.clientY); };
        window.addEventListener("mousemove", move);
        return () => window.removeEventListener("mousemove", move);
    }, [dotX, dotY]);

    return (
        <>
            <motion.div className="cursor cursor-ring" style={{ left: ringX, top: ringY, position: "fixed" }} />
            <motion.div className="cursor cursor-dot" style={{ left: dotX, top: dotY, position: "fixed" }} />
        </>
    );
}
