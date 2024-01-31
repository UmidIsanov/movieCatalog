import React, { ReactNode } from "react";
import "./Button.scss";
import playIcon from "../../../assets/Play.svg";
type ButtonProps = {
  children: ReactNode;
  backgroundColor: string;
  color: string;
  fontSize?: string;
  fontWeight?: number;
  onClick?: () => void;
};

const Button = ({
  children,
  backgroundColor,
  color,
  fontSize,
}: ButtonProps) => {
  const buttonStyle = {
    backgroundColor,
    color,
    fontSize,
  };

  return (
    <div className="Button" style={buttonStyle}>
      <img src={playIcon} alt="ss" />
      {children}
    </div>
  );
};

export default Button;
