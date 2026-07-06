import styled from "styled-components";
import { useUser } from "./useUser";
import { medias } from "../../styles/medias";

const StyledUserAvatar = styled.div`
    display: flex;
    gap: 1.2rem;
    align-items: center;
    font-weight: 500;
    font-size: 1.4rem;
    color: var(--color-grey-600);
    ${medias.mobile} {
        gap: 0.7rem;
        font-weight: 500;
        font-size: 1.3rem;
    }
`;

const Avatar = styled.img`
    display: block;
    width: 3.6rem;
    aspect-ratio: 1;
    object-fit: cover;
    object-position: center;
    border-radius: 50%;
    outline: 2px solid var(--color-grey-100);

    ${medias.mobile} {
        width: 3.2rem;
    }
`;

function UserAvatar() {
    const { user } = useUser();

    return (
        <StyledUserAvatar>
            <Avatar
                src={user.avatar || "/default-user.jpg"}
                alt={`Avatar of ${user.fullName}`}
            />
            <span>{user.fullName}</span>
        </StyledUserAvatar>
    );
}

export default UserAvatar;
