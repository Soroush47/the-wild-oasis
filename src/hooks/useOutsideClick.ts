import { useEffect, useRef } from "react";

type Action = () => void;

export function useOutsideClick(action: Action, listenCapturing = true) {
    const ref = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                action();
            }
        };

        document.addEventListener("click", handleClick, listenCapturing);

        return () => document.removeEventListener("click", handleClick, listenCapturing);
    }, [action, listenCapturing]);

    return ref;
}
