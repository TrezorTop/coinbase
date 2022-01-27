import React, { FC } from "react";

interface IToggleButtonProps {
  primaryTitle: string;
  secondaryTitle: string;
  status: boolean;
  onClick?: () => void;
}

const ToggleButton: FC<IToggleButtonProps> = ({
  status,
  primaryTitle,
  secondaryTitle,
  onClick,
  children,
}) => {
  return <button onClick={onClick}>{status ? primaryTitle : secondaryTitle}</button>;
};

export default ToggleButton;
