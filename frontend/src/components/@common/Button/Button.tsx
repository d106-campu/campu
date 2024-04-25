import { ButtonHTMLAttributes, PropsWithChildren } from "react";

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
}

const Button = ({
  text,
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
  children,
  ...props
}: PropsWithChildren<IButtonProps>) => {
  return (
    <button
      className={`text-center ${fontWeight} ${width} ${height} ${backgroundColor} ${borderColor} ${borderRadius} ${hoverBackgroundColor} ${hoverTextColor} ${textColor} ${textSize}`}
      {...props}
    >
      {text}
      {children}
    </button>
  );
};
export default Button;
