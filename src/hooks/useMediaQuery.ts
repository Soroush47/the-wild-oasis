import { useEffect, useState } from "react";

export function useMediaQuery(query: string) {
    const getMatches = () => window.matchMedia(query).matches;

    const [matches, setMatches] = useState(getMatches);

    useEffect(() => {
        const mediaQuery = window.matchMedia(query);

        function handleChange(e: MediaQueryListEvent) {
            setMatches(e.matches);
        }

        mediaQuery.addEventListener("change", handleChange);

        return () => {
            mediaQuery.removeEventListener("change", handleChange);
        };
    }, [query]);

    return matches;
}
