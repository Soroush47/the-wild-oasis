import { createContext, ReactNode, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

interface DarkModeContextProps {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
}

interface DarkModeProviderProps {
    children: ReactNode;
}

const DarkModeContext = createContext<DarkModeContextProps | undefined>(undefined);

function DarkModeProvider({ children }: DarkModeProviderProps) {
    const [isDarkMode, setIsDarkMode] = useLocalStorageState<boolean>(
        false,
        "isDarkMode",
    );

    useEffect(() => {
        const root = document.documentElement;
        if (isDarkMode) {
            root.classList.add("dark-mode");
            root.classList.remove("light-mode");
        } else {
            root.classList.add("light-mode");
            root.classList.remove("dark-mode");
        }
    }, [isDarkMode]);

    function toggleDarkMode() {
        console.log({ isDarkMode });
        setIsDarkMode((isDark: boolean) => !isDark);
    }

    return (
        <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
}

function useDarkMode() {
    const context = useContext(DarkModeContext);
    if (context === undefined)
        throw new Error("DarkModeContext was used outside of DarkModeProvider");

    return context;
}

export { DarkModeProvider, useDarkMode };
