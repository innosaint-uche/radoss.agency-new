"use client";

import React, { useEffect, useMemo, useState } from "react";

type MotionProps = React.HTMLAttributes<HTMLDivElement> & {
    animate?: unknown;
    exit?: unknown;
    initial?: unknown;
    layoutId?: string;
    transition?: unknown;
    variants?: unknown;
    viewport?: unknown;
    whileHover?: unknown;
    whileInView?: unknown;
};

const MotionDiv = React.forwardRef<HTMLDivElement, MotionProps>(function MotionDiv(props, ref) {
    const {
        animate,
        exit,
        initial,
        layoutId,
        transition,
        variants,
        viewport,
        whileHover,
        whileInView,
        ...rest
    } = props;

    void animate;
    void exit;
    void initial;
    void layoutId;
    void transition;
    void variants;
    void viewport;
    void whileHover;
    void whileInView;

    return <div ref={ref} {...rest} />;
});

export const motion = {
    div: MotionDiv,
};

export function AnimatePresence({ children }: { children: React.ReactNode }) {
    return children as React.ReactElement;
}

type UseInViewOptions = {
    margin?: string;
    once?: boolean;
};

export function useInView<T extends Element>(
    ref: React.RefObject<T | null>,
    options: UseInViewOptions = {}
) {
    const { once = false, margin = "0px" } = options;
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const target = ref.current;
        if (!target || typeof IntersectionObserver === "undefined") {
            setIsInView(true);
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries.some((entry) => entry.isIntersecting);
                if (visible) {
                    setIsInView(true);
                    if (once) observer.disconnect();
                } else if (!once) {
                    setIsInView(false);
                }
            },
            { rootMargin: margin }
        );

        observer.observe(target);
        return () => observer.disconnect();
    }, [ref, margin, once]);

    return isInView;
}

export function useAnimation() {
    return useMemo(
        () => ({
            start: async (_: unknown) => undefined,
        }),
        []
    );
}
