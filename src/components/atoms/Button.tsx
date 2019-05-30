import React from "react";
import styled, { ThemeProvider } from "styled-components";

const Button = (props: Props) => {
  const {
    children,
    onClick,
    style,
    icon,
    iconPosition,
    theme,
    disabled,
    type
  } = props;
  const btnTheme = theme ? themes[theme] : themes.primary;
  const buttonClass = `waves-effect btn`;

  return (
    <ThemeProvider theme={btnTheme}>
      <Btn
        {...type}
        disabled={disabled}
        className={buttonClass}
        style={style}
        onClick={e => onClick && onClick()}
      >
        {(iconPosition == "left" || !iconPosition) &&
          (icon && <IconContainer>{icon}</IconContainer>)}
        {children}
        {iconPosition == "right" && <IconContainer>{icon}</IconContainer>}
      </Btn>
    </ThemeProvider>
  );
};

export default Button;

type Props = {
  children?: any;
  onClick?: Function;
  style?: any;
  color?: string;
  icon?: any;
  iconPosition?: "right" | "left";
  theme?: "primary" | "secondary" | "warning" | "success" | "default";
  disabled?: boolean;
  type?: string;
};

const Btn = styled.button`
  cursor: pointer;
  vertical-align: middle;
  display: inline-block;
  font-weight: 400;
  min-width: 100px;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  padding: ${props => props.theme.padding};
  line-height: 1.5;
  border-radius: 2px;
  transition: font-size 0.5s ease-in-out, padding 0.5s ease-in-out,
    color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  color: ${props =>
    props.theme.background == "transparent" ? "black" : "white"};
  background: ${props => props.theme.background};
  box-shadow: ${props =>
    props.theme.background == "transparent"
      ? ""
      : `0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
    0 3px 1px -2px rgba(0, 0, 0, 0.2)`};
  :hover {
    text-decoration: none;
    outline: 0;
    background: ${props => props.theme.background} !important;
  }
  margin: 5px 10px;
`;

const IconContainer = styled.span`
  margin: 0px 10px;
`;

const themes: any = {
  primary: {
    background: "#375a8c"
  },
  secondary: {
    background: "#5a90dc"
  },
  warning: {
    background: "#c38665"
  },
  success: {
    background: "#517c4f"
  },
  default: {
    background: "transparent"
  }
};
