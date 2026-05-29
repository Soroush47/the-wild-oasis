import styled from "styled-components";

import {
    createContext,
    // memo,
    // MouseEvent,
    PointerEvent,
    ReactNode,
    RefObject,
    // useCallback,
    useContext,
    useEffect,
    // useMemo,
    useRef,
    useState,
} from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
import { createPortal } from "react-dom";
import { useOutsideClick } from "../hooks/useOutsideClick";

const Menu = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

const StyledToggle = styled.button`
    background: none;
    border: none;
    padding: 0.4rem;
    border-radius: var(--border-radius-sm);
    transform: translateX(0.8rem);
    transition: all 0.2s;

    &:hover {
        background-color: var(--color-grey-100);
    }

    & svg {
        width: 2.4rem;
        height: 2.4rem;
        color: var(--color-grey-700);
    }
`;

interface StyledListProps {
    position: { x: number; y: number };
}
const StyledList = styled.ul<StyledListProps>`
    position: fixed;

    background-color: var(--color-grey-0);
    box-shadow: var(--shadow-md);
    border-radius: var(--border-radius-md);

    right: ${props => props.position?.x}px;
    top: ${props => props.position?.y}px;
`;

const StyledButton = styled.button`
    width: 100%;
    text-align: left;
    background: none;
    border: none;
    padding: 1.2rem 2.4rem;
    font-size: 1.4rem;
    transition: all 0.2s;

    display: flex;
    align-items: center;
    gap: 1.6rem;

    &:hover {
        background-color: var(--color-grey-50);
    }

    & svg {
        width: 1.6rem;
        height: 1.6rem;
        color: var(--color-grey-400);
        transition: all 0.3s;
    }
`;

interface MenusProps {
    children: ReactNode;
}

type Position = {
    x: number;
    y: number;
};

interface MenusContextType {
    openId: number | null;
    close: () => void;
    open: (id: number, position: Position) => void;
    position: Position | null;
    toggleRef: RefObject<HTMLButtonElement>;
    listRef: RefObject<HTMLUListElement>;
}

const MenusContext = createContext<MenusContextType | undefined>(undefined);

function Menus({ children }: MenusProps) {
    const [openId, setOpenId] = useState<number | null>(null);
    const [position, setPosition] = useState<Position | null>(null);
    // const close = useCallback(() => {
    //     setOpenId(null);
    //     setPosition(null);
    // }, []);
    const close = () => {
        setOpenId(null);
        setPosition(null);
        // console.log("close");
    };
    // const open = useCallback((id: number, position: Position) => {
    //     setPosition(position);
    //     setOpenId(id);
    // }, []);
    const open = (id: number, position: Position) => {
        setPosition(position);
        setOpenId(id);
    };
    const toggleRef = useRef<HTMLButtonElement>(null);
    const listRef = useOutsideClick<HTMLUListElement, HTMLButtonElement>(
        close,
        true,
        toggleRef,
    );

    const contextValue = {
        openId,
        position,
        open,
        close,
        toggleRef,
        listRef,
    };
    return <MenusContext.Provider value={contextValue}>{children}</MenusContext.Provider>;
}

interface ToggleProps {
    id: number;
}

function Toggle({ id }: ToggleProps) {
    const { openId, open, close, toggleRef } = useMenus();

    const handleClick = (e: PointerEvent<HTMLButtonElement>) => {
        const rect = (e.target as Element).closest("button")?.getBoundingClientRect();

        if (!rect) return null;
        console.log(rect, window.innerWidth, window.innerHeight);
        const contextMenuHeight = 120;
        const position = {
            x: window.innerWidth - rect.left + 4,
            y:
                rect.bottom + 4 + contextMenuHeight <= window.innerHeight - 20
                    ? rect.bottom + 4
                    : rect.top - 4 - contextMenuHeight,
        };

        console.log({ openId, id });
        openId === null || openId !== id ? open(id, position) : close();
    };

    return (
        <StyledToggle
            ref={openId === id ? toggleRef : null}
            onPointerDownCapture={handleClick}
        >
            <HiEllipsisVertical />
        </StyledToggle>
    );
}

interface ListProps {
    id: number;
    children: ReactNode;
}
function List({ id, children }: ListProps) {
    const { openId, position, close, listRef } = useMenus();
    // const ref = useOutsideClick<HTMLUListElement>(close, true);

    // console.log(ref);
    // console.log(listRef);
    useEffect(() => {
        const handleClose = () => close();

        window.addEventListener("scroll", handleClose, true);
        return () => window.removeEventListener("scroll", handleClose, true);
    }, [close]);
    // console.log("list");

    if (openId !== id || position === null) return null;

    return createPortal(
        <StyledList position={position} ref={listRef}>
            {children}
        </StyledList>,
        document.body,
    );
}

interface ButtonProps {
    children: ReactNode;
    icon: ReactNode;
    onClick?: () => void;
}
function Button({ icon, children, onClick }: ButtonProps) {
    const { close } = useMenus();
    const handleClick = () => {
        onClick?.();
        close();
    };
    return (
        <li>
            <StyledButton onClick={handleClick}>
                {icon}
                <span>{children}</span>
            </StyledButton>
        </li>
    );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

function useMenus() {
    const context = useContext(MenusContext);
    if (!context) throw new Error("Menu context was used out of the provider");
    return context;
}

export default Menus;
