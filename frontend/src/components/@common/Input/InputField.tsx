import { PropsWithChildren } from "react";

interface IInputFieldProps {
  label: string;
  type: string;
  name: string;
  value: string;
  placeholder: string;
  maxLength?: number;
  error: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  flex?: string,
  justifyContent?: string;
  width?: string;
  height?: string;
  labelPadding?: string;
  inputPadding?: string;
  errorPadding?: string;
  border?: string;
  borderColor?: string;
  rounded?: string;
  outline?: string;
  inputTextSize?: string;
  labelTextSize?: string;
  errorTextSize?: string;
  errorTextColor?: string;
}

const InputField = ({
  // input 속성 필드
  label,
  type,
  name,
  value,
  placeholder,
  maxLength,
  error,
  onChange,
  // 아래서부터 TailWind CSS
  flex = 'flex',
  justifyContent = 'justify-between',
  width = 'w-full',
  height = 'h-10',
  inputPadding = 'pl-2',
  labelPadding = 'pl-1 pt-3',
  errorPadding = 'pl-1 pt-4',
  border = 'border-2',
  borderColor = 'border-gray-100',
  rounded = 'rounded-lg',
  outline = 'outline-none',
  inputTextSize = 'text-sm',
  labelTextSize = 'text-sm',
  errorTextSize = 'text-xs',
  errorTextColor = 'text-red-400',
  children,
  ...props
}: PropsWithChildren<IInputFieldProps>): JSX.Element => {
  return (
    <div>
      <div className={`${flex} ${justifyContent}`}>
        <label className={`${labelTextSize} ${labelPadding}`}>{label}</label>
        {error && <p className={`${errorTextSize} ${errorTextColor} ${errorPadding}`}>{error}</p>}
      </div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${width} ${height} ${inputPadding} ${border} ${borderColor} ${rounded} ${outline} ${inputTextSize} `}
        maxLength={maxLength}
        {...props}
      />
    </div>
  )
}

export default InputField