import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useMemo,
    useState,
} from "react";

interface SidebarContextProps {
    isSidebarOpen: boolean;
    openSidebar: () => void;
    closeSidebar: () => void;
    toggleSidebar: () => void;
}

interface SidebarProviderProps {
    children: ReactNode;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

function SidebarProvider({ children }: SidebarProviderProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const openSidebar = useCallback(() => {
        console.log("open sidebar");
        setIsSidebarOpen(true);
    }, []);
    const closeSidebar = useCallback(() => {
        // console.log("close sidebar");
        setIsSidebarOpen(false);
    }, []);
    const toggleSidebar = useCallback(() => {
        setIsSidebarOpen(isOpen => !isOpen);
    }, []);

    const value = useMemo(
        () => ({ isSidebarOpen, openSidebar, closeSidebar, toggleSidebar }),
        [isSidebarOpen, openSidebar, closeSidebar, toggleSidebar],
    );

    return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
}

function useSidebar() {
    const context = useContext(SidebarContext);
    if (context === undefined)
        throw new Error("SidebarContext was used outside of SidebarProvider");

    return context;
}

export { SidebarProvider, useSidebar };
