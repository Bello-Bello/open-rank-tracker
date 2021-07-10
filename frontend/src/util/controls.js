import styled from "styled-components";
import { BORDER_RADIUS, COLORS, PAD_XS, PAD_SM } from "./constants";

export const Input = styled.input`
    color: ${COLORS.fg1};
    background-color: ${COLORS.bg4};
    box-sizing: border-box;
    padding: ${PAD_XS} ${PAD_SM};
    outline: none;
    border-radius: ${BORDER_RADIUS};
    border: ${props => props.border || "none"};
`;

export const Button = styled.button`
    background: none;
    border: none;
    border-radius: ${BORDER_RADIUS};
    outline: none;
    cursor: pointer;

    &:disabled {
        filter: brightness(50%);
        cursor: default;
    }
`;

export const PrimaryButton = styled(Button)`
    color: ${COLORS.fg1};
    background-color: ${COLORS.primary1} !important;
    text-transform: uppercase;
    font-weight: 600;
    padding: ${PAD_SM} 0;
`;

export const OutlineButton = styled(Button)`
    color: ${COLORS.fg1};
    border: 1px solid ${COLORS.bg3} !important;
    text-transform: uppercase;
    font-weight: 600;
`;
