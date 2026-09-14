import { animate } from "framer-motion";
import React, { useEffect, useRef } from "react";

/**
 * Animates a numeric text node from its previous value to `value` whenever
 * it changes (count-up/down). Renders a plain <span> — framer-motion's
 * `animate()` drives the text via imperative DOM updates on each frame.
 */
export default function AnimatedNumber({ value, decimals = 2, duration = 0.6 }) {
    const nodeRef = useRef(null);
    const prevValueRef = useRef(value);

    useEffect(() => {
        const from = prevValueRef.current ?? 0;
        const to = value ?? 0;
        const node = nodeRef.current;

        if (!node) return;

        const controls = animate(from, to, {
            duration,
            ease: "easeOut",
            onUpdate: (latest) => {
                node.textContent = latest.toFixed(decimals);
            },
        });

        prevValueRef.current = to;
        return () => controls.stop();
    }, [value, decimals, duration]);

    return <span ref={nodeRef}>{(value ?? 0).toFixed(decimals)}</span>;
}
