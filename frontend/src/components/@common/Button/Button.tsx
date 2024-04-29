import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { IconType } from 'react-icons';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  width?: string;
  height?: string;
  backgroundColor?: string;
  fontWeight?: string;
  textColor?: string;
  textSize?: string;
  hoverBackgroundColor?: string;
  hoverTextColor?: string;
  borderColor?: string;
  borderRadius?: string;
  padding?: string;
  cursorPointer?: string;
  outline?: string;
  icon?: IconType;
  iconColor?: string;
  iconSize?: number;
  visible?: boolean;
}

const Button = ({
  text,
  visible = true,
  width = "w-44",
  height = "h-10",
  backgroundColor = "bg-MAIN_GREEN",
  fontWeight = "font-bold",
  textColor = "text-white",
  textSize = "text-sm",
  hoverTextColor,
  hoverBackgroundColor = "hover:bg-[#145031]",
  borderColor,
  borderRadius = "rounded-lg",
  padding,
  cursorPointer = 'cursor-pointer',
  outline = 'outline-none',
  icon: Icon,
  iconColor = "white",
  iconSize = 25,
  children,
  ...props
}: PropsWithChildren<IButtonProps>) => {
  return (
    <button
      className={`
        ${visible ? 'block' : 'hidden'}
        text-center ${fontWeight} ${width} ${height} ${backgroundColor}
        ${borderColor} ${borderRadius} ${hoverBackgroundColor} ${hoverTextColor}
        ${textColor} ${textSize} ${cursorPointer} ${outline}
      `}
      {...props}
    >
      {Icon && (
        <Icon
          className="inline flex-shrink-0 mr-2"
          size={iconSize}
          color={iconColor}
        />
      )}
      {text}
      {children}
    </button>
  );
};
export default Button;
