import styled from "styled-components";

import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";
import ButtonIcon from "./ButtonIcon";
import { HiBars3 } from "react-icons/hi2";
import { useSidebar } from "../context/SidebarContext";
import { medias } from "../styles/medias";

const StyledHeader = styled.header`
    background-color: var(--color-grey-0);
    padding: 1.2rem 4.8rem;
    border-bottom: 1px solid var(--color-grey-100);

    display: flex;
    gap: 2.4rem;
    align-items: center;
    justify-content: flex-end;

    ${medias.laptop} {
        padding: 1.2rem 2rem;
        justify-content: space-between;
    }
`;

const MenuButton = styled(ButtonIcon)`
    display: none;

    ${medias.laptop} {
        display: flex;
    }
`;

const RightSection = styled.div`
    display: flex;
    align-items: center;
    gap: 2.4rem;
`;

function Header() {
    const { openSidebar } = useSidebar();
    return (
        <StyledHeader>
            <MenuButton onClick={openSidebar} aria-label="Open navigation menu">
                {<HiBars3 />}
            </MenuButton>
            <RightSection>
                <UserAvatar />
                <HeaderMenu />
            </RightSection>
        </StyledHeader>
    );
}

export default Header;
